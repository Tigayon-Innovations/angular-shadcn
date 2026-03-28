import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Typography Lead component - larger intro text
 *
 * @example
 * <TypographyLead>
 *   A modal dialog that interrupts the user with important content.
 * </TypographyLead>
 */
@Component({
  selector: 'TypographyLead',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    style: 'display: block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyLead {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-xl text-muted-foreground', this.class()),
  );
}
