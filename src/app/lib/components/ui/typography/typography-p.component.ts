import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Typography P (paragraph) component
 *
 * @example
 * <TypographyP>This is a paragraph of text.</TypographyP>
 */
@Component({
  selector: 'TypographyP',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    style: 'display: block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyP {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('leading-7 [&:not(:first-child)]:mt-6', this.class())
  );
}
