import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectTrigger component - the button that opens the select dropdown.
 * Implements proper ARIA combobox trigger pattern with keyboard navigation.
 *
 * @example
 * <SelectTrigger class="w-[180px]">
 *   <SelectValue placeholder="Select an option" />
 * </SelectTrigger>
 */
@Component({
  selector: 'SelectTrigger',
  template: `
    <button
      #triggerButton
      type="button"
      role="combobox"
      [class]="computedClass()"
      [attr.aria-expanded]="context?.open()"
      aria-haspopup="listbox"
      [attr.aria-controls]="context?.contentId"
      [attr.data-state]="context?.open() ? 'open' : 'closed'"
      [attr.data-disabled]="context?.disabled() ? '' : null"
      [attr.data-placeholder]="!context?.value() ? '' : null"
      [disabled]="context?.disabled()"
      (click)="onTriggerClick($event)"
      (keydown)="onKeyDown($event)"
    >
      <ng-content />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4 opacity-50 shrink-0"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </button>
  `,
  host: {
    class: 'contents',
    'data-slot': 'select-trigger',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTrigger {
  protected readonly context = inject(SELECT_CONTEXT, { optional: true });
  private readonly triggerButton = viewChild<ElementRef<HTMLButtonElement>>('triggerButton');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Toggle the select open state */
  toggleOpen() {
    if (!this.context?.disabled()) {
      // Save trigger element for focus restoration
      const button = this.triggerButton()?.nativeElement;
      if (button) {
        this.context?.triggerElement.set(button);
      }
      const newState = !this.context?.open();
      this.context?.setOpen(newState);
      if (newState) {
        // Focus first item when opening
        setTimeout(() => this.context?.focusItem(0));
      }
    }
  }

  onTriggerClick(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleOpen();
  }

  /** Close the select */
  close() {
    this.context?.open.set(false);
  }

  /** Handle keyboard navigation */
  onKeyDown(event: KeyboardEvent): void {
    if (!this.context || this.context.disabled()) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.toggleOpen();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.context.open()) {
          // Save trigger element
          const button = this.triggerButton()?.nativeElement;
          if (button) {
            this.context.triggerElement.set(button);
          }
          this.context.setOpen(true);
          setTimeout(() => this.context?.focusItem(0));
        } else {
          // Move to next item
          const currentIndex = this.context.focusedIndex();
          const itemCount = this.context.itemValues().length;
          this.context.focusItem(Math.min(currentIndex + 1, itemCount - 1));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.context.open()) {
          // Save trigger element
          const button = this.triggerButton()?.nativeElement;
          if (button) {
            this.context.triggerElement.set(button);
          }
          this.context.setOpen(true);
          const lastIndex = this.context.itemValues().length - 1;
          setTimeout(() => this.context?.focusItem(lastIndex));
        } else {
          // Move to previous item
          const currentIndex = this.context.focusedIndex();
          this.context.focusItem(Math.max(currentIndex - 1, 0));
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Home':
        if (this.context.open()) {
          event.preventDefault();
          this.context.focusItem(0);
        }
        break;
      case 'End':
        if (this.context.open()) {
          event.preventDefault();
          const lastIndex = this.context.itemValues().length - 1;
          this.context.focusItem(lastIndex);
        }
        break;
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
      this.class(),
    ),
  );
}
