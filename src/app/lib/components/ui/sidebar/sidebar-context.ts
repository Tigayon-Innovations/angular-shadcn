import { InjectionToken, WritableSignal } from '@angular/core';

export type SidebarState = 'expanded' | 'collapsed';
export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';
export type AriaCurrentValue = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';

export interface SidebarContext {
  state: WritableSignal<SidebarState>;
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  openMobile: WritableSignal<boolean>;
  setOpenMobile: (open: boolean) => void;
  isMobile: WritableSignal<boolean>;
  toggleSidebar: () => void;
}

export const SIDEBAR_CONTEXT = new InjectionToken<SidebarContext>('SidebarContext');

export const SIDEBAR_MENU_CONTEXT = new InjectionToken<{
  isActive: WritableSignal<boolean>;
}>('SidebarMenuContext');

// Cookie name for sidebar state persistence
export const SIDEBAR_COOKIE_NAME = 'sidebar:state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
