import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * DrawerFooter component - footer area of the drawer.
 * Matches shadcn/ui React DrawerFooter exactly.
 */
@Component({
  selector: 'DrawerFooter',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerFooter {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mt-auto flex flex-col gap-2 p-4', this.class()),
  );
}
