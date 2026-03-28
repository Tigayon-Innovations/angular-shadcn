import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DRAWER_CONTEXT } from './drawer-context';

/**
 * DrawerDescription component - description text of the drawer.
 * Matches shadcn/ui React DrawerDescription exactly with ARIA support.
 */
@Component({
  selector: 'DrawerDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'context.descriptionId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDescription {
  protected readonly context = inject(DRAWER_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class()),
  );
}
