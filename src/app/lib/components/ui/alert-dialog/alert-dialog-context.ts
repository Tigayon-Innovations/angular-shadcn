import { InjectionToken } from '@angular/core';

export interface AlertDialogContextValue {
  /** Get the current open state */
  isOpen(): boolean;
  /** Set the open state */
  setOpen(open: boolean): void;
  /** Unique IDs for ARIA relationships */
  titleId: string;
  descriptionId: string;
  contentId: string;
  /** Trigger element reference for focus restoration */
  setTriggerElement(element: HTMLElement | null): void;
  getTriggerElement(): HTMLElement | null;
}

export const ALERT_DIALOG_CONTEXT = new InjectionToken<AlertDialogContextValue>(
  'ALERT_DIALOG_CONTEXT',
);
