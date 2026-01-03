import { InjectionToken } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export interface CollapsibleContext {
  isOpen: () => boolean;
  toggle: () => void;
  disabled: () => boolean;
}

// ============================================================================
// Injection Tokens
// ============================================================================

export const COLLAPSIBLE_CONTEXT = new InjectionToken<CollapsibleContext>('CollapsibleContext');
