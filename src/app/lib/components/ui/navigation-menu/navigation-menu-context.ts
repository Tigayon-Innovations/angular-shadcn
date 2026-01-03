import { InjectionToken, type WritableSignal } from '@angular/core';

export interface NavigationMenuContextValue {
  activeItem: WritableSignal<string | null>;
  orientation: WritableSignal<'horizontal' | 'vertical'>;
}

export const NAVIGATION_MENU_CONTEXT = new InjectionToken<NavigationMenuContextValue>(
  'NAVIGATION_MENU_CONTEXT'
);

export interface NavigationMenuItemContextValue {
  itemId: string;
  open: WritableSignal<boolean>;
}

export const NAVIGATION_MENU_ITEM_CONTEXT = new InjectionToken<NavigationMenuItemContextValue>(
  'NAVIGATION_MENU_ITEM_CONTEXT'
);
