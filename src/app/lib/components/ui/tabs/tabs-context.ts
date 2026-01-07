import { InjectionToken, WritableSignal } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export interface TabsContext {
  value: () => string;
  onValueChange: (value: string) => void;
  /** ARIA IDs for accessibility */
  tablistId: string;
  /** Generate tab ID for a specific value */
  getTabId: (value: string) => string;
  /** Generate panel ID for a specific value */
  getPanelId: (value: string) => string;
  /** Orientation for keyboard navigation */
  orientation: () => 'horizontal' | 'vertical';
  /** Registry of tab values for keyboard navigation */
  tabValues: WritableSignal<string[]>;
}

// ============================================================================
// Injection Tokens
// ============================================================================

export const TABS_CONTEXT = new InjectionToken<TabsContext>('TabsContext');
