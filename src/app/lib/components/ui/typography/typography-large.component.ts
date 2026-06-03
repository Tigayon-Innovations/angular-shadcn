import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography Large component
 *
 * @example
 * <TypographyLarge>Large text</TypographyLarge>
 */
@Component({
  selector: 'TypographyLarge',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"typography-large"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyLarge {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => cn('text-lg font-semibold', this.class()));
}
