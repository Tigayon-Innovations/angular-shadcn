import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * NavigationMenuViewport component - viewport for content.
 * Matches shadcn/ui React NavigationMenuViewport exactly.
 */
@Component({
  selector: 'NavigationMenuViewport',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"navigation-menu-viewport"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuViewport {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
      this.class(),
    ),
  );
}
