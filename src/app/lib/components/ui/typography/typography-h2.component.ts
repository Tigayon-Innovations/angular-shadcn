import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography H2 component
 *
 * @example
 * <TypographyH2>Heading 2</TypographyH2>
 */
@Component({
  selector: 'TypographyH2',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    style: 'display: block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH2 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', this.class()),
  );
}
