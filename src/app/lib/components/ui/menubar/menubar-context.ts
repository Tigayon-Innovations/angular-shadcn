import { InjectionToken, type WritableSignal } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

/**
 * Direction for menubar layout
 */
export type MenubarDirection = 'ltr' | 'rtl';

/**
 * Keyboard navigation direction
 */
export type MenubarNavigationDirection = 'horizontal' | 'vertical';

// ============================================================================
// Context Interfaces
// ============================================================================

/**
 * Context value for the Menubar component
 *
 * @description
 * Provides shared state and navigation methods for all menus within a menubar.
 * Handles menu registration, focus management, and keyboard navigation.
 */
export interface MenubarContextValue {
  /** Currently active/open menu ID */
  activeMenu: WritableSignal<string | null>;
  /** List of registered menu IDs */
  menuIds: WritableSignal<string[]>;
  /** Index of the currently focused menu */
  focusedMenuIndex: WritableSignal<number>;
  /** Register a menu with the menubar */
  registerMenu: (menuId: string) => void;
  /** Unregister a menu from the menubar */
  unregisterMenu: (menuId: string) => void;
  /** Focus the next menu (Right arrow) */
  focusNextMenu: () => void;
  /** Focus the previous menu (Left arrow) */
  focusPreviousMenu: () => void;
}

export const MENUBAR_CONTEXT = new InjectionToken<MenubarContextValue>('MENUBAR_CONTEXT');

/**
 * Context value for individual MenubarMenu components
 *
 * @description
 * Provides state for a single menu within the menubar, including
 * its open state and focused item tracking.
 */
export interface MenubarMenuContextValue {
  /** Unique identifier for this menu */
  menuId: string;
  /** Whether this menu is open */
  open: WritableSignal<boolean>;
  /** Index of the currently focused item within the menu */
  focusedItemIndex: WritableSignal<number>;
}

export const MENUBAR_MENU_CONTEXT = new InjectionToken<MenubarMenuContextValue>(
  'MENUBAR_MENU_CONTEXT',
);
