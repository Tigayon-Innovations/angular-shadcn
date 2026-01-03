import { InjectionToken, type WritableSignal } from '@angular/core';

export interface DropdownMenuContextValue {
  open: WritableSignal<boolean>;
}

export const DROPDOWN_MENU_CONTEXT = new InjectionToken<DropdownMenuContextValue>(
  'DROPDOWN_MENU_CONTEXT'
);
