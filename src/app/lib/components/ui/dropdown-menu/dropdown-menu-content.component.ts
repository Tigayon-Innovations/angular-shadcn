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
  OnDestroy
} from '@angular/core';
import { DROPDOWN_MENU_CONTEXT } from './dropdown-menu-context';

/**
 * DropdownMenuContent component - the content panel of the dropdown.
 * Matches shadcn/ui React DropdownMenuContent exactly.
 * Includes keyboard navigation with arrow keys, Home/End, and typeahead.
 * Uses Presence component for proper exit animations.
 */
@Component({
  selector: 'DropdownMenuContent',
  imports: [Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        [class]="computedClass()"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="null"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        [attr.data-side]="side()"
        [attr.data-align]="align()"
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
export class DropdownMenuContent implements AfterViewInit, OnDestroy {
  protected readonly context = inject(DROPDOWN_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef);

  /** Side of the trigger to place content */
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('bottom');

  /** Alignment of the content */
  readonly align = input<'start' | 'center' | 'end'>('start');

  /** Side offset */
  readonly sideOffset = input<number>(4);

  /** Additional CSS classes */
  readonly class = input<string>('');

  private menuItems: HTMLElement[] = [];
  private typeaheadBuffer = '';
  private typeaheadTimeout: ReturnType<typeof setTimeout> | null = null;

  protected readonly computedClass = computed(() => {
    const sideClasses = {
      top: 'bottom-full mb-1',
      bottom: 'top-full mt-1',
      left: 'right-full mr-1',
      right: 'left-full ml-1',
    };

    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return cn(
      'absolute z-50 min-w-[12rem] overflow-hidden rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sideClasses[this.side()],
      alignClasses[this.align()],
      this.class()
    );
  });

  constructor() {
    // Focus first item when menu opens
    effect(() => {
      if (this.context.open()) {
        setTimeout(() => {
          this.updateMenuItems();
          const focusedIdx = this.context.focusedIndex();
          if (focusedIdx >= 0 && this.menuItems[focusedIdx]) {
            this.menuItems[focusedIdx].focus();
          } else if (this.menuItems.length > 0) {
            this.menuItems[0].focus();
            this.context.focusedIndex.set(0);
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

  onKeydown(event: KeyboardEvent): void {
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
      item.textContent?.toLowerCase().trim().startsWith(this.typeaheadBuffer)
    );

    if (matchIndex >= 0) {
      this.focusItem(matchIndex);
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;
    const parent = hostElement.closest('DropdownMenu');

    if (parent && !parent.contains(target)) {
      this.close();
    }
  }

  protected onEscapeKey(): void {
    this.close();
  }

  private close(): void {
    this.context.open.set(false);
    this.context.focusedIndex.set(-1);
    // Restore focus to trigger
    const triggerEl = this.context.triggerElement();
    if (triggerEl) {
      setTimeout(() => triggerEl.focus(), 0);
    }
  }
}
