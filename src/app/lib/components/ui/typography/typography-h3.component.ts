import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography H3 component
 *
 * @example
 * <TypographyH3>Heading 3</TypographyH3>
 */
@Component({
  selector: 'TypographyH3',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"typography-h3"',
    '[class]': 'computedClass()',
    style: 'display: block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH3 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('scroll-m-20 text-2xl font-semibold tracking-tight', this.class()),
  );
}
