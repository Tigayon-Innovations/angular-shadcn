import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface SheetContextValue {
  open: Signal<boolean>;
  setOpen: (open: boolean) => void;
  side: 'top' | 'right' | 'bottom' | 'left';
  /** Unique IDs for ARIA relationships */
  titleId: string;
  descriptionId: string;
  contentId: string;
  /** Trigger element reference for focus restoration */
  triggerElement: WritableSignal<HTMLElement | null>;
}

export const SHEET_CONTEXT = new InjectionToken<SheetContextValue>('SHEET_CONTEXT');
