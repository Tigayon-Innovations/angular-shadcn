import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Typography List component (unordered list)
 *
 * @example
 * <TypographyList>
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 * </TypographyList>
 */
@Component({
  selector: 'TypographyList',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyList {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('my-6 ml-6 list-disc [&>li]:mt-2', this.class())
  );
}
