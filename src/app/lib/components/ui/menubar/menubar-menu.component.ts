import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MENUBAR_CONTEXT, MENUBAR_MENU_CONTEXT, type MenubarMenuContextValue } from './menubar-context';

let menuIdCounter = 0;

/**
 * MenubarMenu component - individual menu in the menubar.
 * Matches shadcn/ui React MenubarMenu exactly.
 */
@Component({
  selector: 'MenubarMenu',
  template: `<ng-content />`,
  providers: [
    {
      provide: MENUBAR_MENU_CONTEXT,
      useFactory: (): MenubarMenuContextValue => ({
        menuId: `menubar-menu-${menuIdCounter++}`,
        open: signal(false),
      }),
    },
  ],
  host: {
    class: 'relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarMenu {
  protected readonly context = inject(MENUBAR_CONTEXT);
}
