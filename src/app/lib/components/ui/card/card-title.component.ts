import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Card title element.
 * The main heading of the card.
 *
 * @example
 * <h3 CardTitle>My Card Title</h3>
 */
@Component({
  selector: '[CardTitle]',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitle {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('leading-none font-semibold', this.class())
  );
}
