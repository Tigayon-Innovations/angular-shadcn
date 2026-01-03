import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Card footer section.
 * Contains action buttons or additional information.
 *
 * @example
 * <CardFooter>
 *   <button Button>Save</button>
 *   <button Button variant="outline">Cancel</button>
 * </CardFooter>
 */
@Component({
  selector: 'CardFooter',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card-footer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooter {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center px-6 [.border-t]:pt-6', this.class())
  );
}
