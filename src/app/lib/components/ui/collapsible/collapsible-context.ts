import { InjectionToken } from '@angular/core';

export interface CollapsibleContext {
  isOpen: () => boolean;
  toggle: () => void;
  disabled: () => boolean;
}

export const COLLAPSIBLE_CONTEXT = new InjectionToken<CollapsibleContext>('CollapsibleContext');
