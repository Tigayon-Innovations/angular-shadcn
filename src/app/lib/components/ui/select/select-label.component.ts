import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SelectLabel component - label for a select group.
 *
 * @example
 * <SelectLabel>Fruits</SelectLabel>
 */
@Component({
  selector: 'SelectLabel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'select-label',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLabel {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('text-muted-foreground px-2 py-1.5 text-xs', this.class())
  );
}
