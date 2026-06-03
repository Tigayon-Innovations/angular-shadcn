import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography Muted component
 *
 * @example
 * <TypographyMuted>Muted helper text</TypographyMuted>
 */
@Component({
  selector: 'TypographyMuted',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"typography-muted"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyMuted {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class()),
  );
}
