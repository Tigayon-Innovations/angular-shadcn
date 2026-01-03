import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Typography H4 component
 *
 * @example
 * <TypographyH4>Heading 4</TypographyH4>
 */
@Component({
  selector: 'TypographyH4',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH4 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('scroll-m-20 text-xl font-semibold tracking-tight', this.class())
  );
}
