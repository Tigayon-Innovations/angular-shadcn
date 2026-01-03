import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarMenuButton component - button in menu item.
 */
@Component({
  selector: 'SidebarMenuButton',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "" : null',
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

  protected readonly computedClass = computed(() =>
    cn(
      'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active]:bg-sidebar-accent data-[active]:font-medium data-[active]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]/sidebar-wrapper:!size-8 group-data-[collapsible=icon]/sidebar-wrapper:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      this.size() === 'sm' && 'text-xs',
      this.size() === 'lg' && 'text-sm group-data-[collapsible=icon]/sidebar-wrapper:!p-0',
      this.class()
    )
  );
}
