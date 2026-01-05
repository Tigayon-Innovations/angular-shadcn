import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NAVIGATION_MENU_CONTEXT, type NavigationMenuContextValue } from './navigation-menu-context';
import { NavigationMenuViewport } from './navigation-menu-viewport.component';

/**
 * NavigationMenu component - navigation menu with links.
 * Matches shadcn/ui React NavigationMenu exactly.
 */
@Component({
  selector: 'NavigationMenu',
  imports: [NavigationMenuViewport],
  template: `
    <div [class]="computedClass()">
      <ng-content />
      <NavigationMenuViewport />
    </div>
  `,
  providers: [
    {
      provide: NAVIGATION_MENU_CONTEXT,
      useFactory: (): NavigationMenuContextValue => ({
        activeItem: signal(null),
        orientation: signal('horizontal'),
      }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenu {
  /** Orientation */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center gap-1',
      this.class()
    )
  );
}
