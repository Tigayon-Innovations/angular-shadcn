import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography Small component
 *
 * @example
 * <TypographySmall>Small text</TypographySmall>
 */
@Component({
  selector: 'TypographySmall',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"typography-small"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographySmall {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm font-medium leading-none', this.class()),
  );
}
