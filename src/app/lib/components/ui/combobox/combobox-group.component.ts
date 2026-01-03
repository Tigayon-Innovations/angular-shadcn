import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * ComboboxGroup component - groups combobox items.
 */
@Component({
  selector: 'ComboboxGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'group',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxGroup {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('overflow-hidden p-1', this.class())
  );
}
