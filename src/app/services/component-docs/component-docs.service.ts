/**
 * Component Documentation Registry
 * Provides Radix-like comprehensive documentation for all components
 */

import { Injectable } from '@angular/core';
import type { ComponentDocumentation } from './types';

// Import all component documentation
import { ACCORDION_DOCUMENTATION } from './docs/accordion';
import { AVATAR_DOCUMENTATION } from './docs/avatar';
import { CHECKBOX_DOCUMENTATION } from './docs/checkbox';
import { COLLAPSIBLE_DOCUMENTATION } from './docs/collapsible';
import { CONTEXT_MENU_DOCUMENTATION } from './docs/context-menu';
import { DIALOG_DOCUMENTATION } from './docs/dialog';
import { DROPDOWN_MENU_DOCUMENTATION } from './docs/dropdown-menu';
import { FORM_DOCUMENTATION } from './docs/form';
import { HOVER_CARD_DOCUMENTATION } from './docs/hover-card';
import { INPUT_OTP_DOCUMENTATION } from './docs/input-otp';
import { MENUBAR_DOCUMENTATION } from './docs/menubar';
import { NAVIGATION_MENU_DOCUMENTATION } from './docs/navigation-menu';
import { POPOVER_DOCUMENTATION } from './docs/popover';
import { SCROLL_AREA_DOCUMENTATION } from './docs/scroll-area';
import { SELECT_DOCUMENTATION } from './docs/select';
import { TABS_DOCUMENTATION } from './docs/tabs';
import { TOAST_DOCUMENTATION } from './docs/toast';
import { TOOLTIP_DOCUMENTATION } from './docs/tooltip';

/**
 * Registry service for comprehensive component documentation.
 * Follows Radix UI documentation patterns with features, anatomy,
 * API reference per sub-component, examples, and accessibility info.
 */
@Injectable({ providedIn: 'root' })
export class ComponentDocsRegistry {
  private readonly docs: Map<string, ComponentDocumentation> = new Map([
    ['accordion', ACCORDION_DOCUMENTATION],
    ['avatar', AVATAR_DOCUMENTATION],
    ['checkbox', CHECKBOX_DOCUMENTATION],
    ['collapsible', COLLAPSIBLE_DOCUMENTATION],
    ['context-menu', CONTEXT_MENU_DOCUMENTATION],
    ['dialog', DIALOG_DOCUMENTATION],
    ['dropdown-menu', DROPDOWN_MENU_DOCUMENTATION],
    ['form', FORM_DOCUMENTATION],
    ['hover-card', HOVER_CARD_DOCUMENTATION],
    ['input-otp', INPUT_OTP_DOCUMENTATION],
    ['menubar', MENUBAR_DOCUMENTATION],
    ['navigation-menu', NAVIGATION_MENU_DOCUMENTATION],
    ['popover', POPOVER_DOCUMENTATION],
    ['scroll-area', SCROLL_AREA_DOCUMENTATION],
    ['select', SELECT_DOCUMENTATION],
    ['tabs', TABS_DOCUMENTATION],
    ['toast', TOAST_DOCUMENTATION],
    ['tooltip', TOOLTIP_DOCUMENTATION],
  ]);

  /**
   * Get documentation for a specific component by slug
   */
  getBySlug(slug: string): ComponentDocumentation | undefined {
    return this.docs.get(slug);
  }

  /**
   * Check if detailed documentation exists for a component
   */
  hasDocumentation(slug: string): boolean {
    return this.docs.has(slug);
  }

  /**
   * Get all documented component slugs
   */
  getDocumentedSlugs(): string[] {
    return Array.from(this.docs.keys());
  }

  /**
   * Get all component documentations
   */
  getAll(): ComponentDocumentation[] {
    return Array.from(this.docs.values());
  }
}
