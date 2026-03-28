import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography Blockquote component
 *
 * @example
 * <TypographyBlockquote>
 *   "This is a quote from someone important."
 * </TypographyBlockquote>
 */
@Component({
  selector: 'TypographyBlockquote',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    style: 'display: block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyBlockquote {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('mt-6 border-l-2 pl-6 italic', this.class()),
  );
}
