import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { AriaCurrentValue } from './sidebar-context';

/**
 * SidebarMenuSubButton component - button in submenu item.
 *
 * Supports accessible active states with `aria-current` for semantic navigation.
 * Provides visual feedback for hover, focus, and active states.
 */
@Component({
  selector: 'SidebarMenuSubButton',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-sub-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.aria-current]': 'isActive() ? ariaCurrent() : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSubButton {
  /** Whether this button is active */
  readonly isActive = input<boolean>(false);

  /** Size variant */
  readonly size = input<'sm' | 'md'>('md');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** aria-current value for accessible active state */
  readonly ariaCurrent = input<AriaCurrentValue>('page');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring transition-[background-color,color] ease-linear duration-150',
      // Base hover state - lighter
      'hover:bg-sidebar-accent/50',
      // Focus state - high visibility
      'focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2',
      // Active state - prominent
      'data-[active]:bg-sidebar-accent data-[active]:text-sidebar-accent-foreground data-[active]:font-medium data-[active]:shadow-md data-[active]:rounded-md',
      // Disabled states
      'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
      // Icon and text overflow handling
      '[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
      this.size() === 'sm' && 'text-xs',
      this.size() === 'md' && 'text-sm',
      this.class(),
    ),
  );
}
