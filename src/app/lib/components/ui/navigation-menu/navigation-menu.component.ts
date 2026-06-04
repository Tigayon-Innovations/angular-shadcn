import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import {
  NAVIGATION_MENU_CONTEXT,
  type NavigationMenuContextValue,
  type NavigationMenuOrientation,
} from './navigation-menu-context';
import { NavigationMenuViewport } from './navigation-menu-viewport.component';

function createNavigationMenuContext(): NavigationMenuContextValue {
  const triggerIds = signal<string[]>([]);
  return {
    activeItem: signal(null),
    orientation: signal('horizontal'),
    triggerIds,
    registerTrigger: (triggerId: string) => {
      triggerIds.update((ids) => [...ids, triggerId]);
    },
    unregisterTrigger: (triggerId: string) => {
      triggerIds.update((ids) => ids.filter((id) => id !== triggerId));
    },
    focusNextTrigger: (currentTriggerId: string) => {
      const ids = triggerIds();
      const idx = ids.indexOf(currentTriggerId);
      const nextId = idx < ids.length - 1 ? ids[idx + 1] : ids[0];
      if (nextId) {
        document.getElementById(nextId)?.focus();
      }
    },
    focusPreviousTrigger: (currentTriggerId: string) => {
      const ids = triggerIds();
      const idx = ids.indexOf(currentTriggerId);
      const prevId = idx > 0 ? ids[idx - 1] : ids[ids.length - 1];
      if (prevId) {
        document.getElementById(prevId)?.focus();
      }
    },
  };
}

/**
 * Props for the NavigationMenu component
 */
export interface NavigationMenuProps {
  /** Layout orientation of the menu.
   * @default "horizontal" */
  orientation?: NavigationMenuOrientation;
  /** The value of the active item when controlled */
  value?: string;
  /** The default value when uncontrolled */
  defaultValue?: string;
  /** Time in ms before opening on hover.
   * @default 200 */
  delayDuration?: number;
  /** Time in ms to skip delay when moving between items.
   * @default 300 */
  skipDelayDuration?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component NavigationMenu
 *
 * A collection of links for navigating websites.
 *
 * @description
 * NavigationMenu provides a horizontal or vertical navigation component
 * with dropdown content panels. It's commonly used for main site navigation
 * with mega-menu style dropdowns.
 *
 * ## Features
 * - Horizontal and vertical orientations
 * - Dropdown content panels
 * - Animated viewport
 * - Hover delay handling
 * - Full keyboard navigation
 * - Indicator for active items
 *
 * ## Accessibility
 * - Uses `role="navigation"` for landmark
 * - Proper `aria-expanded` states
 * - `aria-haspopup` for dropdown triggers
 * - Focus management within dropdowns
 * - Escape key closes dropdowns
 *
 * ## Keyboard Navigation
 * - `Tab` - Move focus between trigger and content
 * - `Enter/Space` - Open dropdown, follow link
 * - `ArrowDown` - Open dropdown (horizontal), next item (vertical)
 * - `ArrowRight` - Next trigger (horizontal), open sub (vertical)
 * - `Escape` - Close dropdown
 *
 * ## Data Attributes
 * | Attribute | Values |
 * |-----------|--------|
 * | `data-state` | `"open"` \| `"closed"` |
 * | `data-orientation` | `"horizontal"` \| `"vertical"` |
 * | `data-motion` | `"from-start"` \| `"from-end"` \| `"to-start"` \| `"to-end"` |
 *
 * @example Basic usage
 * ```html
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul class="grid gap-3 p-6 md:w-[400px]">
 *           <li>
 *             <NavigationMenuLink routerLink="/docs">
 *               Documentation
 *             </NavigationMenuLink>
 *           </li>
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink routerLink="/about">About</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 *
 * @example With indicator
 * ```html
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <!-- Content -->
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 *   <NavigationMenuIndicator />
 * </NavigationMenu>
 * ```
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
  host: {
    'attr.data-slot': '"navigation-menu"',
    style: 'display: contents',
  },
  providers: [
    {
      provide: NAVIGATION_MENU_CONTEXT,
      useFactory: createNavigationMenuContext,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenu {
  /** Layout orientation of the menu */
  readonly orientation = input<NavigationMenuOrientation>('horizontal');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('relative z-10 flex max-w-max flex-1 items-center justify-center gap-1', this.class()),
  );
}
