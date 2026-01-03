import { InjectionToken, WritableSignal } from '@angular/core';

export interface DialogContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
}

export const DIALOG_CONTEXT = new InjectionToken<DialogContextValue>('DIALOG_CONTEXT');
