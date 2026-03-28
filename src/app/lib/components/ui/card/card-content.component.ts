import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Card content section.
 * The main content area of the card.
 *
 * @example
 * <CardContent>
 *   <p>Your content goes here.</p>
 * </CardContent>
 */
@Component({
  selector: 'CardContent',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContent {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('px-6', this.class()));
}
