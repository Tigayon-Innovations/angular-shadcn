import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarMenuSkeleton component - loading skeleton for menu items.
 */
@Component({
  selector: 'SidebarMenuSkeleton',
  template: `
    <div
      [style.width.%]="width"
      class="h-4 max-w-[--skeleton-width] flex-1 rounded-md bg-sidebar-accent"
    ></div>
  `,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-skeleton',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSkeleton {
  /** Width of the skeleton */
  readonly width = Math.floor(Math.random() * 40) + 50;

  /** Whether to show icon skeleton */
  readonly showIcon = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('rounded-md h-8 flex gap-2 px-2 items-center', this.class()),
  );
}
