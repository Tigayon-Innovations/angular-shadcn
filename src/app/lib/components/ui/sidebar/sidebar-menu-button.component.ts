import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';
import type { AriaCurrentValue } from './sidebar-context';

/**
 * SidebarMenuButton component - button in menu item.
 *
 * Supports accessible active states with `aria-current` for semantic navigation.
 * Provides visual feedback for hover, focus, and active states.
 */
@Component({
  selector: 'SidebarMenuButton',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.aria-current]': 'isActive() ? ariaCurrent() : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuButton {
  /** Whether this button is active */
  readonly isActive = input<boolean>(false);

  /** Size variant */
  readonly size = input<'default' | 'sm' | 'lg'>('default');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** aria-current value for accessible active state */
  readonly ariaCurrent = input<AriaCurrentValue>('page');

  protected readonly computedClass = computed(() =>
    cn(
      'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding,background-color,color] ease-linear duration-150',
      // Base state - subtle hover
      'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
      // Focus state - high visibility
      'focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2',
      // Active state - prominent pill-like appearance
      'data-[active]:bg-sidebar-accent data-[active]:text-sidebar-accent-foreground data-[active]:font-medium data-[active]:shadow-md data-[active]:rounded-lg',
      // Open submenu state
      'data-[state=open]:hover:bg-sidebar-accent/50',
      // Disabled states
      'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
      // Icon and text overflow handling
      'group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      // Collapsed state
      'group-data-[collapsible=icon]/sidebar-wrapper:!size-8 group-data-[collapsible=icon]/sidebar-wrapper:!p-2',
      this.size() === 'sm' && 'text-xs px-2 py-1.5',
      this.size() === 'lg' && 'text-sm group-data-[collapsible=icon]/sidebar-wrapper:!p-0',
      this.class()
    )
  );
}

