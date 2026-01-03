import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Alert title component.
 *
 * @example
 * <h5 AlertTitle>Heads up!</h5>
 */
@Component({
  selector: '[AlertTitle]',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'alert-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTitle {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', this.class())
  );
}
