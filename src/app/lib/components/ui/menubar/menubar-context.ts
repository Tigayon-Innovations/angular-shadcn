import { InjectionToken, type WritableSignal } from '@angular/core';

export interface MenubarContextValue {
  activeMenu: WritableSignal<string | null>;
  menuIds: WritableSignal<string[]>;
  focusedMenuIndex: WritableSignal<number>;
  registerMenu: (menuId: string) => void;
  unregisterMenu: (menuId: string) => void;
  focusNextMenu: () => void;
  focusPreviousMenu: () => void;
}

export const MENUBAR_CONTEXT = new InjectionToken<MenubarContextValue>('MENUBAR_CONTEXT');

export interface MenubarMenuContextValue {
  menuId: string;
  open: WritableSignal<boolean>;
  focusedItemIndex: WritableSignal<number>;
}

export const MENUBAR_MENU_CONTEXT = new InjectionToken<MenubarMenuContextValue>('MENUBAR_MENU_CONTEXT');
