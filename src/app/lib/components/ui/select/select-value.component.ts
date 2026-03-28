import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectValue component - displays the selected value or placeholder.
 *
 * @example
 * <SelectValue placeholder="Select an option" />
 */
@Component({
  selector: 'SelectValue',
  template: `{{ displayValue() }}`,
  host: {
    '[attr.data-placeholder]': '!context?.value() ? "" : null',
    'data-slot': 'select-value',
    'class': 'flex-1 truncate text-left',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectValue {
  protected readonly context = inject(SELECT_CONTEXT, { optional: true });

  /** Placeholder text when no value is selected */
  readonly placeholder = input<string>('');

  constructor() {
    // Update context placeholder on init and changes
    effect(() => {
      if (this.context) {
        this.context.placeholder.set(this.placeholder());
      }
    });
  }

  /** Computed display value */
  protected readonly displayValue = computed(() => {
    const label = this.context?.selectedLabel();
    const value = this.context?.value();
    if (label) return label;
    if (value) return value;
    return this.placeholder();
  });
}
