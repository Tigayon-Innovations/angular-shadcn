import { InjectionToken, WritableSignal } from '@angular/core';

export interface AlertDialogContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
}

export const ALERT_DIALOG_CONTEXT = new InjectionToken<AlertDialogContextValue>('ALERT_DIALOG_CONTEXT');
