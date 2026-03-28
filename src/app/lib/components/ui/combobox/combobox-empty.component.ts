import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox-context';

/**
 * ComboboxEmpty component - displayed when no options match the search.
 */
@Component({
  selector: 'ComboboxEmpty',
  template: `
    @if (context.filteredOptions().length === 0) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxEmpty {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(COMBOBOX_CONTEXT);

  protected readonly computedClass = computed(() => cn('py-6 text-center text-sm', this.class()));
}
