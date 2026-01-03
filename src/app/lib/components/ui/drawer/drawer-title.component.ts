import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * DrawerTitle component - title text of the drawer.
 * Matches shadcn/ui React DrawerTitle exactly.
 */
@Component({
  selector: 'DrawerTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTitle {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.class())
  );
}
