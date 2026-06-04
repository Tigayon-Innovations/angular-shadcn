import { cn, Presence } from '@/lib/utils';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu-context';

/**
 * ContextMenuContent component - the content panel of the context menu.
 * Matches shadcn/ui React ContextMenuContent exactly.
 * Includes full keyboard navigation: Arrow keys, Home/End, typeahead, roving tabindex.
 */
@Component({
  selector: 'ContextMenuContent',
  imports: [Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        [style.position]="'fixed'"
        [style.left.px]="displayPosition().x"
        [style.top.px]="displayPosition().y"
        role="menu"
        aria-orientation="vertical"
        tabindex="-1"
        (keydown)="onKeydown($event)"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    'attr.data-slot': '"context-menu-content"',
    class: 'contents',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscapeKey()',
    '(document:contextmenu)': 'onAnotherContextMenu()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuContent implements OnDestroy {
  constructor() {
    // Clamp position and focus first item when menu opens
    effect(() => {
      if (this.context.open()) {
        this.isPositioned.set(false);
        afterNextRender(
          () => {
            this.clampPosition();
            this.isPositioned.set(true);
            this.updateMenuItems();
            const focusedIdx = this.context.focusedIndex();
            if (focusedIdx >= 0 && this.menuItems[focusedIdx]) {
              this.menuItems[focusedIdx].focus();
            } else if (this.menuItems.length > 0) {
              this.menuItems[0].focus();
              this.context.focusedIndex.set(0);
            }
          },
          { injector: this._injector },
        );
      } else {
        this.isPositioned.set(false);
        this.clampedPos.set(null);
      }
    });

    // Initial menu items update (browser-only)
    afterNextRender(() => {
      this.updateMenuItems();
    });
  }

  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _elementRef = inject(ElementRef);
  private readonly _injector = inject(Injector);

  protected readonly context = inject(CONTEXT_MENU_CONTEXT);

  protected readonly isPositioned = signal(false);
  protected readonly clampedPos = signal<{ x: number; y: number } | null>(null);
  protected readonly displayPosition = computed(() => this.clampedPos() ?? this.context.position());

  protected readonly computedClass = computed(() =>
    cn(
      'z-50 min-w-[12rem] overflow-hidden rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      !this.isPositioned() && 'pointer-events-none opacity-0',
      this.class(),
    ),
  );

  private menuItems: HTMLElement[] = [];
  private typeaheadBuffer = '';
  private typeaheadTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    if (this.typeaheadTimeout) {
      clearTimeout(this.typeaheadTimeout);
    }
  }

  private clampPosition(): void {
    const menu = this._elementRef.nativeElement.querySelector('[role="menu"]') as HTMLElement;
    if (!menu) return;
    const pos = this.context.position();
    const rect = menu.getBoundingClientRect();
    const padding = 8;
    const x = Math.max(padding, Math.min(pos.x, window.innerWidth - rect.width - padding));
    const y = Math.max(padding, Math.min(pos.y, window.innerHeight - rect.height - padding));
    this.clampedPos.set({ x, y });
  }
  private updateMenuItems(): void {
    const content = this._elementRef.nativeElement.querySelector('[role="menu"]');
    if (content) {
      this.menuItems = Array.from(
        content.querySelectorAll(
          ':is([role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]):not([aria-disabled="true"]):not([data-disabled=""])',
        ),
      );
    }
  }
  protected onKeydown(event: KeyboardEvent): void {
    this.updateMenuItems();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious();
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this.focusLast();
        break;
      case 'Tab':
        // Close menu and let tab continue naturally
        this.close();
        break;
      default:
        // Typeahead search
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          this.handleTypeahead(event.key);
        }
        break;
    }
  }
  private focusNext(): void {
    const currentIndex = this.context.focusedIndex();
    const nextIndex = currentIndex < this.menuItems.length - 1 ? currentIndex + 1 : 0;
    this.focusItem(nextIndex);
  }
  private focusPrevious(): void {
    const currentIndex = this.context.focusedIndex();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.menuItems.length - 1;
    this.focusItem(prevIndex);
  }
  private focusFirst(): void {
    this.focusItem(0);
  }
  private focusLast(): void {
    this.focusItem(this.menuItems.length - 1);
  }
  private focusItem(index: number): void {
    if (index >= 0 && index < this.menuItems.length) {
      // Update roving tabindex
      this.menuItems.forEach((item, i) => {
        item.setAttribute('tabindex', i === index ? '0' : '-1');
      });
      this.menuItems[index].focus();
      this.context.focusedIndex.set(index);
    }
  }
  private handleTypeahead(key: string): void {
    this.typeaheadBuffer += key.toLowerCase();

    if (this.typeaheadTimeout) {
      clearTimeout(this.typeaheadTimeout);
    }

    this.typeaheadTimeout = setTimeout(() => {
      this.typeaheadBuffer = '';
    }, 500);

    // Find first matching item
    const matchIndex = this.menuItems.findIndex((item) =>
      item.textContent?.toLowerCase().trim().startsWith(this.typeaheadBuffer),
    );

    if (matchIndex >= 0) {
      this.focusItem(matchIndex);
    }
  }
  private close(): void {
    this.context.open.set(false);
    this.context.focusedIndex.set(-1);
    // Restore focus to trigger element
    const triggerEl = this.context.triggerElement();
    if (triggerEl) {
      triggerEl.focus();
    }
  }
  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const host = this._elementRef.nativeElement;
    if (!host.contains(target)) {
      this.close();
    }
  }
  protected onEscapeKey(): void {
    this.close();
  }
  protected onAnotherContextMenu(): void {
    // Will be handled by new context menu trigger
  }
}
