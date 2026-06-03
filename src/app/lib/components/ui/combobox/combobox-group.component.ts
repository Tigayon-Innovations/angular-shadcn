import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ComboboxGroup component - groups combobox items with proper accessibility.
 */
@Component({
  selector: 'ComboboxGroup',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"combobox-group"',
    '[class]': 'computedClass()',
    role: 'group',
    '[attr.aria-label]': 'label()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxGroup {
  /** Accessible label for this group */
  readonly label = input<string>();

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('overflow-hidden p-1 overflow-y-auto', this.class()),
  );
}
