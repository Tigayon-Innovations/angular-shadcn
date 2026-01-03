import { InjectionToken, WritableSignal } from '@angular/core';

export interface DrawerContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  direction: 'top' | 'right' | 'bottom' | 'left';
}

export const DRAWER_CONTEXT = new InjectionToken<DrawerContextValue>('DRAWER_CONTEXT');
