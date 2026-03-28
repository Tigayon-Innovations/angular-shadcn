import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography InlineCode component
 *
 * @example
 * <TypographyInlineCode>npm install</TypographyInlineCode>
 */
@Component({
  selector: 'TypographyInlineCode',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyInlineCode {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      this.class(),
    ),
  );
}
