import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Card content section.
 * The main content area of the card.
 *
 * @example
 * <div CardContent>
 *   <p>Your content goes here.</p>
 * </div>
 */
@Component({
  selector: '[CardContent]',
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
