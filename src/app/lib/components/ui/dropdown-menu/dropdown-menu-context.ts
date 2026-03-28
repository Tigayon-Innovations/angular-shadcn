import { InjectionToken, type WritableSignal } from '@angular/core';

export interface DropdownMenuContextValue {
  open: WritableSignal<boolean>;
  /** ID for the menu content for ARIA */
  contentId: string;
  /** Reference to trigger element for focus restoration */
  triggerElement: WritableSignal<HTMLElement | null>;
  /** Currently focused item index for keyboard navigation */
  focusedIndex: WritableSignal<number>;
}

export const DROPDOWN_MENU_CONTEXT = new InjectionToken<DropdownMenuContextValue>(
  'DROPDOWN_MENU_CONTEXT',
);
