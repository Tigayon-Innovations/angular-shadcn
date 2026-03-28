import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Card title element.
 * The main heading of the card.
 *
 * @example
 * <CardTitle>My Card Title</CardTitle>
 */
@Component({
  selector: 'CardTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitle {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('leading-none font-semibold', this.class()));
}
