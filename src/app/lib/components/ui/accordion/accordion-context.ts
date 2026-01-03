import { InjectionToken } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export type AccordionType = 'single' | 'multiple';

export interface AccordionContext {
  type: () => AccordionType;
  collapsible: () => boolean;
  value: () => string | string[] | undefined;
  onValueChange: (itemValue: string) => void;
  isItemOpen: (itemValue: string) => boolean;
}

export interface AccordionItemContext {
  value: () => string;
  isOpen: () => boolean;
  toggle: () => void;
}

// ============================================================================
// Injection Tokens
// ============================================================================

export const ACCORDION_CONTEXT = new InjectionToken<AccordionContext>('AccordionContext');
export const ACCORDION_ITEM_CONTEXT = new InjectionToken<AccordionItemContext>('AccordionItemContext');
