import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SIDEBAR_CONTEXT } from './sidebar-context';

/**
 * SidebarRail component - visual indicator for collapsible sidebar.
 */
@Component({
  selector: 'SidebarRail',
  template: ``,
  host: {
    'attr.data-slot': '"sidebar-rail"',
    '[class]': 'computedClass()',
    '[attr.aria-label]': '"Toggle Sidebar"',
    '[attr.tabindex]': '-1',
    '[title]': '"Toggle Sidebar"',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarRail {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(SIDEBAR_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]/sidebar-wrapper:right-0 group-data-[side=right]/sidebar-wrapper:left-0 sm:flex',
      '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'group-data-[collapsible=offcanvas]/sidebar-wrapper:translate-x-0 group-data-[collapsible=offcanvas]/sidebar-wrapper:after:left-full group-data-[collapsible=offcanvas]/sidebar-wrapper:hover:bg-sidebar',
      '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      this.class(),
    ),
  );

  protected onClick(): void {
    this.context.toggleSidebar();
  }
}
