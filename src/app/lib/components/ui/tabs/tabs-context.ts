import { InjectionToken, WritableSignal } from '@angular/core';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivationMode = 'automatic' | 'manual';

export interface TabsContext {
  /** Current active tab value */
  value: () => string;
  /** Handle tab change */
  onValueChange: (value: string) => void;
  /** ARIA ID for the tablist */
  tablistId: string;
  /** Generate tab ID for a specific value */
  getTabId: (value: string) => string;
  /** Generate panel ID for a specific value */
  getPanelId: (value: string) => string;
  /** Orientation for keyboard navigation */
  orientation: () => TabsOrientation;
  /** Activation mode: automatic (on focus) or manual (on click/enter) */
  activationMode: () => TabsActivationMode;
  /** Registry of tab values for keyboard navigation */
  tabValues: WritableSignal<string[]>;
}

export const TABS_CONTEXT = new InjectionToken<TabsContext>('TabsContext');
