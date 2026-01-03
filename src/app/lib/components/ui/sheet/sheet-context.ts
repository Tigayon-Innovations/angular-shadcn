import { InjectionToken, WritableSignal } from '@angular/core';

export interface SheetContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  side: 'top' | 'right' | 'bottom' | 'left';
}

export const SHEET_CONTEXT = new InjectionToken<SheetContextValue>('SHEET_CONTEXT');
