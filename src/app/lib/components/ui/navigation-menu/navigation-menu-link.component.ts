import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { navigationMenuTriggerStyle } from './navigation-menu-trigger-style';

/**
 * NavigationMenuLink component - navigation link.
 * Matches shadcn/ui React NavigationMenuLink exactly.
 */
@Component({
  selector: 'NavigationMenuLink',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuLink {
  /** Whether the link is active */
  readonly active = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(navigationMenuTriggerStyle(), this.class())
  );
}
