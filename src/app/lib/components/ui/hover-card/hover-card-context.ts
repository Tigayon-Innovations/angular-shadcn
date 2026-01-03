import { InjectionToken, WritableSignal } from '@angular/core';

export interface HoverCardContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
}

export const HOVER_CARD_CONTEXT = new InjectionToken<HoverCardContextValue>('HOVER_CARD_CONTEXT');
