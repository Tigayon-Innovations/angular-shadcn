import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RADIO_GROUP_CONTEXT } from './radio-group-context';

/**
 * RadioGroupItem component - individual radio option.
 *
 * @example
 * <RadioGroupItem value="option1" id="option1" />
 */
@Component({
  selector: 'RadioGroupItem',
  template: `
    <span
      data-slot="radio-group-indicator"
      class="flex items-center justify-center"
    >
      @if (isChecked()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-2.5"
        >
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      }
    </span>
  `,
  host: {
    '[class]': 'computedClass()',
    'role': 'radio',
    '[attr.aria-checked]': 'isChecked()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.data-state]': 'isChecked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '(click)': 'select()',
    '(keydown.space)': 'select(); $event.preventDefault()',
    '(keydown.enter)': 'select(); $event.preventDefault()',
    'data-slot': 'radio-group-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupItem {
  private readonly context = inject(RADIO_GROUP_CONTEXT, { optional: true });

  /** The value of this radio option */
  readonly value = input.required<string>();

  /** Whether this radio is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether this item is checked */
  protected readonly isChecked = computed(() => {
    return this.context?.value() === this.value();
  });

  /** Whether this item is disabled */
  protected readonly isDisabled = computed(() => {
    return this.disabled() || this.context?.disabled() || false;
  });

  /** Select this radio option */
  select() {
    if (!this.isDisabled()) {
      this.context?.setValue(this.value());
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      'inline-flex items-center justify-center cursor-pointer',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
      this.class()
    )
  );
}
