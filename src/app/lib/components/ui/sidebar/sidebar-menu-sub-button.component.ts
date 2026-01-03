import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarMenuSubButton component - button in submenu item.
 */
@Component({
  selector: 'SidebarMenuSubButton',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-sub-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "" : null',
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

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
      this.size() === 'sm' && 'text-xs',
      this.size() === 'md' && 'text-sm',
      this.isActive() && 'bg-sidebar-accent text-sidebar-accent-foreground',
      this.class()
    )
  );
}
