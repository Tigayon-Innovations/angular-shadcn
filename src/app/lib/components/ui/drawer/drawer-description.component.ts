import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * DrawerDescription component - description text of the drawer.
 * Matches shadcn/ui React DrawerDescription exactly.
 */
@Component({
  selector: 'DrawerDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDescription {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}
