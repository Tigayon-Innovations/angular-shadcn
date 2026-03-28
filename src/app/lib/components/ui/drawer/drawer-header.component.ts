import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * DrawerHeader component - header area of the drawer.
 * Matches shadcn/ui React DrawerHeader exactly.
 */
@Component({
  selector: 'DrawerHeader',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerHeader {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('grid gap-1.5 p-4 text-center sm:text-left', this.class()),
  );
}
