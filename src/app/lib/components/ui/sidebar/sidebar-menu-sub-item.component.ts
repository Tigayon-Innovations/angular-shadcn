import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarMenuSubItem component - item in submenu.
 */
@Component({
  selector: 'SidebarMenuSubItem',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"sidebar-menu-sub-item"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSubItem {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn(this.class()));
}
