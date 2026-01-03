import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarMenuBadge component - badge in menu item.
 */
@Component({
  selector: 'SidebarMenuBadge',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-badge',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuBadge {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none',
      'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      this.class()
    )
  );
}
