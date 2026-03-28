import { InjectionToken, WritableSignal } from '@angular/core';

export type AccordionType = 'single' | 'multiple';

export interface AccordionContext {
  type: () => AccordionType;
  collapsible: () => boolean;
  value: () => string | string[] | undefined;
  onValueChange: (itemValue: string) => void;
  isItemOpen: (itemValue: string) => boolean;
  /** Registry of item values for keyboard navigation */
  itemValues: WritableSignal<string[]>;
}

export interface AccordionItemContext {
  value: () => string;
  isOpen: () => boolean;
  toggle: () => void;
  /** Unique IDs for ARIA relationships */
  triggerId: string;
  contentId: string;
}

export const ACCORDION_CONTEXT = new InjectionToken<AccordionContext>('AccordionContext');
export const ACCORDION_ITEM_CONTEXT = new InjectionToken<AccordionItemContext>(
  'AccordionItemContext',
);
