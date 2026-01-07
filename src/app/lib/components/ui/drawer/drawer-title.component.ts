import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { DRAWER_CONTEXT } from './drawer-context';

/**
 * DrawerTitle component - title text of the drawer.
 * Matches shadcn/ui React DrawerTitle exactly with ARIA support.
 */
@Component({
  selector: 'DrawerTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'context.titleId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTitle {
  protected readonly context = inject(DRAWER_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.class())
  );
}
