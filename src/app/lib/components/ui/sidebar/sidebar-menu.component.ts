import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarMenu component - menu container in sidebar.
 *
 * Provides semantic navigation grouping with proper ARIA roles.
 */
@Component({
  selector: 'SidebarMenu',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"sidebar-menu"',
    '[class]': 'computedClass()',
    'data-sidebar': 'menu',
    '[attr.role]': '"menu"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex w-full min-w-0 flex-col gap-1', this.class()),
  );
}
