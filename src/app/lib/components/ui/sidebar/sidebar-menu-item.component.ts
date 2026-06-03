import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarMenuItem component - individual menu item.
 *
 * Wraps a menu button and provides semantic grouping and context.
 * Supports active state tracking and accessibility features.
 */
@Component({
  selector: 'SidebarMenuItem',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"sidebar-menu-item"',
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-item',
    '[attr.role]': '"presentation"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItem {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('group/menu-item relative', this.class()));
}
