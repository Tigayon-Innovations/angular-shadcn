import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  SIDEBAR_CONTEXT,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarVariant,
} from './sidebar-context';

/**
 * Sidebar component - the main sidebar container.
 *
 * ACCESSIBILITY:
 * - Uses <aside> element with proper role="complementary"
 * - aria-label for screen reader identification
 * - aria-hidden when sidebar is collapsed/closed
 */
@Component({
  selector: 'Sidebar',
  template: `
    @if (context.isMobile()) {
      <!-- Mobile: Sheet-style sidebar -->
      @if (context.openMobile()) {
        <div
          class="fixed inset-0 z-50 bg-black/80"
          (click)="context.setOpenMobile(false)"
          aria-hidden="true"
        ></div>
        <aside [class]="computedMobileClass()" role="complementary" [attr.aria-label]="ariaLabel()">
          <nav [attr.aria-label]="navLabel()">
            <ng-content />
          </nav>
        </aside>
      }
    } @else {
      <!-- Desktop sidebar -->
      <div [class]="computedGapClass()" [attr.data-side]="side()" aria-hidden="true"></div>
      <aside
        [class]="computedClass()"
        role="complementary"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-hidden]="context.state() === 'collapsed' && collapsible() === 'offcanvas'"
      >
        <nav
          [attr.aria-label]="navLabel()"
          [attr.data-sidebar]="'sidebar'"
          [class]="computedInnerClass()"
        >
          <ng-content />
        </nav>
      </aside>
    }
  `,
  host: {
    'attr.data-slot': '"sidebar"',
    '[attr.data-state]': 'context.state()',
    '[attr.data-collapsible]': 'context.state() === "collapsed" ? collapsible() : ""',
    '[attr.data-variant]': 'variant()',
    '[attr.data-side]': 'side()',
    ngSkipHydration: 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  /** Side of the screen */
  readonly side = input<SidebarSide>('left');

  /** Variant style */
  readonly variant = input<SidebarVariant>('sidebar');
  /** Collapsible behavior */
  readonly collapsible = input<SidebarCollapsible>('offcanvas');

  /** Accessible label for the sidebar landmark */
  readonly ariaLabel = input<string>('Sidebar');
  /** Accessible label for the navigation within */
  readonly navLabel = input<string>('Main navigation');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(SIDEBAR_CONTEXT);

  protected readonly computedGapClass = computed(() =>
    cn(
      'duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear',
      'group-data-[collapsible=offcanvas]/sidebar-wrapper:w-0',
      'group-data-[side=right]/sidebar-wrapper:rotate-180',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'group-data-[collapsible=icon]/sidebar-wrapper:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
        : 'group-data-[collapsible=icon]/sidebar-wrapper:w-[--sidebar-width-icon]',
    ),
  );
  protected readonly computedClass = computed(() =>
    cn(
      'duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex',
      this.side() === 'left'
        ? 'left-0 group-data-[collapsible=offcanvas]/sidebar-wrapper:left-[calc(var(--sidebar-width)*-1)]'
        : 'right-0 group-data-[collapsible=offcanvas]/sidebar-wrapper:right-[calc(var(--sidebar-width)*-1)]',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'p-2 group-data-[collapsible=icon]/sidebar-wrapper:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
        : 'group-data-[collapsible=icon]/sidebar-wrapper:w-[--sidebar-width-icon] group-data-[side=left]/sidebar-wrapper:border-r group-data-[side=right]/sidebar-wrapper:border-l',
      this.class(),
    ),
  );
  protected readonly computedInnerClass = computed(() =>
    cn(
      'flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]/sidebar-wrapper:rounded-lg group-data-[variant=floating]/sidebar-wrapper:border group-data-[variant=floating]/sidebar-wrapper:border-sidebar-border group-data-[variant=floating]/sidebar-wrapper:shadow',
    ),
  );
  protected readonly computedMobileClass = computed(() =>
    cn(
      'fixed inset-y-0 z-50 flex h-full w-[--sidebar-width] flex-col bg-sidebar p-0 text-sidebar-foreground',
      this.side() === 'left'
        ? 'left-0 animate-in slide-in-from-left'
        : 'right-0 animate-in slide-in-from-right',
      this.class(),
    ),
  );
}
