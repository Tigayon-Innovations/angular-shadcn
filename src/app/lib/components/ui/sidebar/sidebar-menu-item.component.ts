import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarMenuItem component - individual menu item.
 */
@Component({
  selector: 'SidebarMenuItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItem {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('group/menu-item relative', this.class())
  );
}
