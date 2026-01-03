import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SelectSeparator component - visual separator between select items.
 *
 * @example
 * <SelectSeparator />
 */
@Component({
  selector: 'SelectSeparator',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'role': 'separator',
    'aria-orientation': 'horizontal',
    'data-slot': 'select-separator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSeparator {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('bg-muted pointer-events-none -mx-1 my-1 h-px', this.class())
  );
}
