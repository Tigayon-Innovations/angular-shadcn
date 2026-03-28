import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarMenuSub component - submenu container.
 */
@Component({
  selector: 'SidebarMenuSub',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-sub',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSub {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      this.class(),
    ),
  );
}
