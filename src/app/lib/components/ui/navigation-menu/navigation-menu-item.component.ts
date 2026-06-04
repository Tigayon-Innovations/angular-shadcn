import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  NAVIGATION_MENU_CONTEXT,
  NAVIGATION_MENU_ITEM_CONTEXT,
  type NavigationMenuItemContextValue,
} from './navigation-menu-context';

let itemIdCounter = 0;

/**
 * NavigationMenuItem component - individual menu item.
 * Matches shadcn/ui React NavigationMenuItem exactly.
 */
@Component({
  selector: 'NavigationMenuItem',
  template: `<ng-content />`,
  providers: [
    {
      provide: NAVIGATION_MENU_ITEM_CONTEXT,
      useFactory: (): NavigationMenuItemContextValue => {
        const id = itemIdCounter++;
        return {
          itemId: `nav-item-${id}`,
          triggerId: `nav-trigger-${id}`,
          contentId: `nav-content-${id}`,
          open: signal(false),
        };
      },
    },
  ],
  host: {
    'attr.data-slot': '"navigation-menu-item"',
    class: 'relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuItem {
  protected readonly context = inject(NAVIGATION_MENU_CONTEXT);
}
