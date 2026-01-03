import { InjectionToken, type WritableSignal } from '@angular/core';

export interface MenubarContextValue {
  activeMenu: WritableSignal<string | null>;
}

export const MENUBAR_CONTEXT = new InjectionToken<MenubarContextValue>('MENUBAR_CONTEXT');

export interface MenubarMenuContextValue {
  menuId: string;
  open: WritableSignal<boolean>;
}

export const MENUBAR_MENU_CONTEXT = new InjectionToken<MenubarMenuContextValue>('MENUBAR_MENU_CONTEXT');
