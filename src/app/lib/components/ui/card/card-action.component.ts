import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Card action element.
 * Optional action button/link in the header area.
 *
 * @example
 * <CardHeader>
 *   <CardTitle>Title</CardTitle>
 *   <CardAction>
 *     <button Button variant="ghost">Edit</button>
 *   </CardAction>
 * </CardHeader>
 */
@Component({
  selector: 'CardAction',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card-action',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAction {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', this.class()),
  );
}
