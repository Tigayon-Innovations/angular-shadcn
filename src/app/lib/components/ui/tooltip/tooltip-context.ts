import { InjectionToken, WritableSignal } from '@angular/core';

export interface TooltipContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  delayDuration: number;
  tooltipId: string;
}

export const TOOLTIP_CONTEXT = new InjectionToken<TooltipContextValue>('TOOLTIP_CONTEXT');
