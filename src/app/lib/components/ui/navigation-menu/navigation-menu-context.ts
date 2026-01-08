import { InjectionToken, type WritableSignal } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

/**
 * Orientation of the navigation menu
 */
export type NavigationMenuOrientation = 'horizontal' | 'vertical';

/**
 * Direction for RTL support
 */
export type NavigationMenuDirection = 'ltr' | 'rtl';

// ============================================================================
// Context Interfaces
// ============================================================================

/**
 * Context value for the NavigationMenu component
 *
 * @description
 * Provides shared state for all items within a navigation menu.
 * Tracks the currently active/open item and layout orientation.
 */
export interface NavigationMenuContextValue {
  /** ID of the currently active/open item */
  activeItem: WritableSignal<string | null>;
  /** Layout orientation of the menu */
  orientation: WritableSignal<NavigationMenuOrientation>;
}

export const NAVIGATION_MENU_CONTEXT = new InjectionToken<NavigationMenuContextValue>(
  'NAVIGATION_MENU_CONTEXT'
);

/**
 * Context value for individual NavigationMenuItem components
 *
 * @description
 * Provides state for a single navigation menu item, including
 * its unique ID and open state for dropdown content.
 */
export interface NavigationMenuItemContextValue {
  /** Unique identifier for this item */
  itemId: string;
  /** Whether this item's content is open */
  open: WritableSignal<boolean>;
}

export const NAVIGATION_MENU_ITEM_CONTEXT = new InjectionToken<NavigationMenuItemContextValue>(
  'NAVIGATION_MENU_ITEM_CONTEXT'
);
