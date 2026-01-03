import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Typography H1 component
 *
 * @example
 * <TypographyH1>Heading 1</TypographyH1>
 */
@Component({
  selector: 'TypographyH1',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyH1 {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      this.class()
    )
  );
}
