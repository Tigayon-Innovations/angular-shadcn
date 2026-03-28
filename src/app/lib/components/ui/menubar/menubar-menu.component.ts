import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  MENUBAR_CONTEXT,
  MENUBAR_MENU_CONTEXT,
  type MenubarMenuContextValue,
} from './menubar-context';

let menuIdCounter = 0;

/**
 * MenubarMenu component - individual menu in the menubar.
 * Matches shadcn/ui React MenubarMenu exactly.
 * Registers itself with parent menubar for keyboard navigation.
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
        focusedItemIndex: signal(-1),
      }),
    },
  ],
  host: {
    class: 'relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarMenu implements OnInit, OnDestroy {
  protected readonly context = inject(MENUBAR_CONTEXT);
  protected readonly menuContext = inject(MENUBAR_MENU_CONTEXT);

  ngOnInit(): void {
    this.context.registerMenu(this.menuContext.menuId);
  }

  ngOnDestroy(): void {
    this.context.unregisterMenu(this.menuContext.menuId);
  }
}
