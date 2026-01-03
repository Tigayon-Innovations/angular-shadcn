import { InjectionToken } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export interface TabsContext {
  value: () => string;
  onValueChange: (value: string) => void;
}

// ============================================================================
// Injection Tokens
// ============================================================================

export const TABS_CONTEXT = new InjectionToken<TabsContext>('TabsContext');
