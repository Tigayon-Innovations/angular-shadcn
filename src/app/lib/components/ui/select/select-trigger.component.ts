import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectTrigger component - the button that opens the select dropdown.
 *
 * @example
 * <SelectTrigger class="w-[180px]">
 *   <SelectValue placeholder="Select an option" />
 * </SelectTrigger>
 */
@Component({
  selector: 'SelectTrigger',
  template: `
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
      class="size-4 opacity-50"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  `,
  host: {
    '[class]': 'computedClass()',
    'type': 'button',
    'role': 'combobox',
    '[attr.aria-expanded]': 'context?.open()',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.data-state]': 'context?.open() ? "open" : "closed"',
    '[attr.data-disabled]': 'context?.disabled() ? "" : null',
    '[attr.data-placeholder]': '!context?.value() ? "" : null',
    '[attr.disabled]': 'context?.disabled() ? "" : null',
    '(click)': 'toggleOpen()',
    '(keydown.space)': 'toggleOpen(); $event.preventDefault()',
    '(keydown.enter)': 'toggleOpen(); $event.preventDefault()',
    '(keydown.escape)': 'close()',
    'data-slot': 'select-trigger',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTrigger {
  protected readonly context = inject(SELECT_CONTEXT, { optional: true });

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Toggle the select open state */
  toggleOpen() {
    if (!this.context?.disabled()) {
      const newState = !this.context?.open();
      this.context?.open.set(newState);
    }
  }

  /** Close the select */
  close() {
    this.context?.open.set(false);
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
      this.class()
    )
  );
}
