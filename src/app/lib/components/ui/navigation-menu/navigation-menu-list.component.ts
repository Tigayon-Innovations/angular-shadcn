import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * NavigationMenuList component - list container for menu items.
 * Matches shadcn/ui React NavigationMenuList exactly.
 */
@Component({
  selector: 'NavigationMenuList',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuList {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'group flex flex-1 list-none items-center justify-center space-x-1',
      this.class()
    )
  );
}
