import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarMenuAction component - action button in menu item.
 *
 * Provides accessible action buttons with focus and hover states.
 * Can be configured to show on hover or remain visible.
 */
@Component({
  selector: 'SidebarMenuAction',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-action',
    '[attr.role]': '"button"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuAction {
  /** Whether to show on hover only */
  readonly showOnHover = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-[background-color,color,opacity] ease-linear duration-150',
      // Hover and focus states
      'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      'focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2',
      // Peer interactions
      'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      // Icons
      '[&>svg]:size-4 [&>svg]:shrink-0',
      // Touch target expansion on mobile
      'after:absolute after:-inset-2 after:md:hidden',
      // Size responsive positioning
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      // Collapse behavior
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      // Show on hover behavior
      this.showOnHover() &&
        'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
      this.class()
    )
  );
}
