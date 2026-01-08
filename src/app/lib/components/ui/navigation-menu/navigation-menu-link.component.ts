import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { navigationMenuTriggerStyle } from './navigation-menu-trigger-style';

/**
 * NavigationMenuLink component - navigation link.
 * Matches shadcn/ui React NavigationMenuLink exactly.
 *
 * ACCESSIBILITY: Supports aria-current for indicating current page.
 */
@Component({
  selector: 'NavigationMenuLink',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-current]': 'ariaCurrent()',
    '[attr.data-active]': 'active() || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuLink {
  /** Whether the link is active (current page) */
  readonly active = input<boolean>(false);

  /** Type of aria-current attribute when active */
  readonly currentType = input<'page' | 'step' | 'location' | 'date' | 'time' | 'true'>('page');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Calculate aria-current value */
  protected readonly ariaCurrent = computed(() =>
    this.active() ? this.currentType() : null
  );

  protected readonly computedClass = computed(() =>
    cn(
      navigationMenuTriggerStyle(),
      this.active() && 'bg-accent/50 font-medium',
      this.class()
    )
  );
}
