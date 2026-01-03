import { InjectionToken, WritableSignal } from '@angular/core';

export interface TooltipContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  delayDuration: number;
}

export const TOOLTIP_CONTEXT = new InjectionToken<TooltipContextValue>('TOOLTIP_CONTEXT');
