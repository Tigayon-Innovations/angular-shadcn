import { cn, Presence } from '@/lib/utils';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    OnDestroy,
} from '@angular/core';
import { MENUBAR_CONTEXT, MENUBAR_MENU_CONTEXT } from './menubar-context';

/**
 * MenubarContent component - content panel for a menu.
 * Matches shadcn/ui React MenubarContent exactly.
 * Implements full keyboard navigation with arrow keys, Home/End, and typeahead.
 */
@Component({
  selector: 'MenubarContent',
  imports: [Presence],
  template: `
    <Presence [present]="menuContext.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="menuContext.open() ? 'open' : 'closed'"
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
    class: 'contents',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscapeKey()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarContent implements AfterViewInit, OnDestroy {
  protected readonly context = inject(MENUBAR_CONTEXT);
  protected readonly menuContext = inject(MENUBAR_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef);

  /** Alignment */
  readonly align = input<'start' | 'center' | 'end'>('start');

  /** Side offset */
  readonly sideOffset = input<number>(8);

  /** Align offset */
  readonly alignOffset = input<number>(-4);

  /** Additional CSS classes */
  readonly class = input<string>('');

  private menuItems: HTMLElement[] = [];
  private typeaheadBuffer = '';
  private typeaheadTimeout: ReturnType<typeof setTimeout> | null = null;

  protected readonly computedClass = computed(() => {
    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return cn(
      'absolute top-full z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      alignClasses[this.align()],
      this.class()
    );
  });

  constructor() {
    // Focus first item when menu opens
    effect(() => {
      if (this.menuContext.open()) {
        setTimeout(() => {
          this.updateMenuItems();
          const focusedIdx = this.menuContext.focusedItemIndex();
          if (focusedIdx >= 0 && this.menuItems[focusedIdx]) {
            this.menuItems[focusedIdx].focus();
          } else if (this.menuItems.length > 0) {
            this.menuItems[0].focus();
            this.menuContext.focusedItemIndex.set(0);
          }
        }, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateMenuItems();
  }

  ngOnDestroy(): void {
    if (this.typeaheadTimeout) {
      clearTimeout(this.typeaheadTimeout);
    }
  }

  private updateMenuItems(): void {
    const content = this.elementRef.nativeElement.querySelector('[role="menu"]');
    if (content) {
      this.menuItems = Array.from(
        content.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"]):not([data-disabled])')
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
      case 'ArrowRight':
        // Navigate to next menu in menubar
        event.preventDefault();
        this.close();
        this.context.focusNextMenu();
        break;
      case 'ArrowLeft':
        // Navigate to previous menu in menubar
        event.preventDefault();
        this.close();
        this.context.focusPreviousMenu();
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
        // Close menu and let tab continue
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
    const currentIndex = this.menuContext.focusedItemIndex();
    const nextIndex = currentIndex < this.menuItems.length - 1 ? currentIndex + 1 : 0;
    this.focusItem(nextIndex);
  }

  private focusPrevious(): void {
    const currentIndex = this.menuContext.focusedItemIndex();
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
      this.menuContext.focusedItemIndex.set(index);
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
      item.textContent?.toLowerCase().trim().startsWith(this.typeaheadBuffer)
    );

    if (matchIndex >= 0) {
      this.focusItem(matchIndex);
    }
  }

  private close(): void {
    this.menuContext.open.set(false);
    this.context.activeMenu.set(null);
    this.menuContext.focusedItemIndex.set(-1);
  }

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;
    const parent = hostElement.closest('MenubarMenu');

    if (parent && !parent.contains(target)) {
      this.close();
    }
  }

  protected onEscapeKey(): void {
    this.close();
  }
}
