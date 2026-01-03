import { InjectionToken, WritableSignal } from '@angular/core';

export interface PopoverContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const POPOVER_CONTEXT = new InjectionToken<PopoverContextValue>('POPOVER_CONTEXT');
