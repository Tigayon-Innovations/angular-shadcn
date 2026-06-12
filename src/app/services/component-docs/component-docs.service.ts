/**
 * Component Documentation Registry
 * Provides Radix-like comprehensive documentation for all components
 */

import { Injectable } from '@angular/core';
import type { ComponentDocumentation } from './types';

// Import all component documentation
import { ACCORDION_DOCUMENTATION } from './docs/accordion';
import { AVATAR_DOCUMENTATION } from './docs/avatar';
import { BADGE_DOCUMENTATION } from './docs/badge';
import { BUTTON_DOCUMENTATION } from './docs/button';
import { CHECKBOX_DOCUMENTATION } from './docs/checkbox';
import { COLLAPSIBLE_DOCUMENTATION } from './docs/collapsible';
import { CONTEXT_MENU_DOCUMENTATION } from './docs/context-menu';
import { DIALOG_DOCUMENTATION } from './docs/dialog';
import { DROPDOWN_MENU_DOCUMENTATION } from './docs/dropdown-menu';
import { FORM_DOCUMENTATION } from './docs/form';
import { HOVER_CARD_DOCUMENTATION } from './docs/hover-card';
import { INPUT_DOCUMENTATION } from './docs/input';
import { INPUT_OTP_DOCUMENTATION } from './docs/input-otp';
import { LABEL_DOCUMENTATION } from './docs/label';
import { MENUBAR_DOCUMENTATION } from './docs/menubar';
import { NAVIGATION_MENU_DOCUMENTATION } from './docs/navigation-menu';
import { POPOVER_DOCUMENTATION } from './docs/popover';
import { SCROLL_AREA_DOCUMENTATION } from './docs/scroll-area';
import { SELECT_DOCUMENTATION } from './docs/select';
import { SWITCH_DOCUMENTATION } from './docs/switch';
import { TABS_DOCUMENTATION } from './docs/tabs';
import { TEXTAREA_DOCUMENTATION } from './docs/textarea';
import { TOAST_DOCUMENTATION } from './docs/toast';
import { SIDEBAR_DOCUMENTATION } from './docs/sidebar';
import { TOOLTIP_DOCUMENTATION } from './docs/tooltip';
import { ASPECT_RATIO_DOCUMENTATION } from './docs/aspect-ratio';
import { CARD_DOCUMENTATION } from './docs/card';
import { RESIZABLE_DOCUMENTATION } from './docs/resizable';
import { SEPARATOR_DOCUMENTATION } from './docs/separator';
import { BREADCRUMB_DOCUMENTATION } from './docs/breadcrumb';
import { PAGINATION_DOCUMENTATION } from './docs/pagination';
import { COMBOBOX_DOCUMENTATION } from './docs/combobox';
import { DATE_PICKER_DOCUMENTATION } from './docs/date-picker';
import { COUNTRY_SELECTOR_DOCUMENTATION } from './docs/country-selector';
import { PHONE_INPUT_DOCUMENTATION } from './docs/phone-input';
import { RADIO_GROUP_DOCUMENTATION } from './docs/radio-group';
import { SLIDER_DOCUMENTATION } from './docs/slider';
import { ALERT_DOCUMENTATION } from './docs/alert';
import { ALERT_DIALOG_DOCUMENTATION } from './docs/alert-dialog';
import { BUTTON_GROUP_DOCUMENTATION } from './docs/button-group';
import { CALENDAR_DOCUMENTATION } from './docs/calendar';
import { CAROUSEL_DOCUMENTATION } from './docs/carousel';
import { CHART_DOCUMENTATION } from './docs/chart';
import { COMMAND_DOCUMENTATION } from './docs/command';
import { DATA_TABLE_DOCUMENTATION } from './docs/data-table';
import { DRAWER_DOCUMENTATION } from './docs/drawer';
import { EMPTY_DOCUMENTATION } from './docs/empty';
import { INPUT_GROUP_DOCUMENTATION } from './docs/input-group';
import { KBD_DOCUMENTATION } from './docs/kbd';
import { NATIVE_SELECT_DOCUMENTATION } from './docs/native-select';
import { PROGRESS_DOCUMENTATION } from './docs/progress';
import { SEGMENTED_DOCUMENTATION } from './docs/segmented';
import { SHEET_DOCUMENTATION } from './docs/sheet';
import { SKELETON_DOCUMENTATION } from './docs/skeleton';
import { SPINNER_DOCUMENTATION } from './docs/spinner';
import { TABLE_DOCUMENTATION } from './docs/table';
import { TOGGLE_DOCUMENTATION } from './docs/toggle';
import { TOGGLE_GROUP_DOCUMENTATION } from './docs/toggle-group';
import { TYPOGRAPHY_DOCUMENTATION } from './docs/typography';
import { FIELD_DOCUMENTATION } from './docs/field';
import { ITEM_DOCUMENTATION } from './docs/item';
import { SONNER_DOCUMENTATION } from './docs/sonner';
import { DIRECTION_DOCUMENTATION } from './docs/direction';

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
    ['badge', BADGE_DOCUMENTATION],
    ['button', BUTTON_DOCUMENTATION],
    ['checkbox', CHECKBOX_DOCUMENTATION],
    ['collapsible', COLLAPSIBLE_DOCUMENTATION],
    ['context-menu', CONTEXT_MENU_DOCUMENTATION],
    ['dialog', DIALOG_DOCUMENTATION],
    ['dropdown-menu', DROPDOWN_MENU_DOCUMENTATION],
    ['form', FORM_DOCUMENTATION],
    ['hover-card', HOVER_CARD_DOCUMENTATION],
    ['input', INPUT_DOCUMENTATION],
    ['input-otp', INPUT_OTP_DOCUMENTATION],
    ['label', LABEL_DOCUMENTATION],
    ['menubar', MENUBAR_DOCUMENTATION],
    ['navigation-menu', NAVIGATION_MENU_DOCUMENTATION],
    ['popover', POPOVER_DOCUMENTATION],
    ['scroll-area', SCROLL_AREA_DOCUMENTATION],
    ['select', SELECT_DOCUMENTATION],
    ['sidebar', SIDEBAR_DOCUMENTATION],
    ['switch', SWITCH_DOCUMENTATION],
    ['tabs', TABS_DOCUMENTATION],
    ['textarea', TEXTAREA_DOCUMENTATION],
    ['toast', TOAST_DOCUMENTATION],
    ['tooltip', TOOLTIP_DOCUMENTATION],
    ['aspect-ratio', ASPECT_RATIO_DOCUMENTATION],
    ['card', CARD_DOCUMENTATION],
    ['resizable', RESIZABLE_DOCUMENTATION],
    ['separator', SEPARATOR_DOCUMENTATION],
    ['breadcrumb', BREADCRUMB_DOCUMENTATION],
    ['pagination', PAGINATION_DOCUMENTATION],
    ['combobox', COMBOBOX_DOCUMENTATION],
    ['date-picker', DATE_PICKER_DOCUMENTATION],
    ['country-selector', COUNTRY_SELECTOR_DOCUMENTATION],
    ['phone-input', PHONE_INPUT_DOCUMENTATION],
    ['radio-group', RADIO_GROUP_DOCUMENTATION],
    ['slider', SLIDER_DOCUMENTATION],
    ['alert', ALERT_DOCUMENTATION],
    ['alert-dialog', ALERT_DIALOG_DOCUMENTATION],
    ['button-group', BUTTON_GROUP_DOCUMENTATION],
    ['calendar', CALENDAR_DOCUMENTATION],
    ['carousel', CAROUSEL_DOCUMENTATION],
    ['chart', CHART_DOCUMENTATION],
    ['command', COMMAND_DOCUMENTATION],
    ['data-table', DATA_TABLE_DOCUMENTATION],
    ['drawer', DRAWER_DOCUMENTATION],
    ['empty', EMPTY_DOCUMENTATION],
    ['input-group', INPUT_GROUP_DOCUMENTATION],
    ['kbd', KBD_DOCUMENTATION],
    ['native-select', NATIVE_SELECT_DOCUMENTATION],
    ['progress', PROGRESS_DOCUMENTATION],
    ['segmented', SEGMENTED_DOCUMENTATION],
    ['sheet', SHEET_DOCUMENTATION],
    ['skeleton', SKELETON_DOCUMENTATION],
    ['spinner', SPINNER_DOCUMENTATION],
    ['table', TABLE_DOCUMENTATION],
    ['toggle', TOGGLE_DOCUMENTATION],
    ['toggle-group', TOGGLE_GROUP_DOCUMENTATION],
    ['typography', TYPOGRAPHY_DOCUMENTATION],
    ['field', FIELD_DOCUMENTATION],
    ['item', ITEM_DOCUMENTATION],
    ['sonner', SONNER_DOCUMENTATION],
    ['direction', DIRECTION_DOCUMENTATION],
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
