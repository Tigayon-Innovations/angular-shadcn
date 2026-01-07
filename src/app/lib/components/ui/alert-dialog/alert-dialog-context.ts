import { InjectionToken, WritableSignal } from '@angular/core';

export interface AlertDialogContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  /** Unique IDs for ARIA relationships */
  titleId: string;
  descriptionId: string;
  contentId: string;
  /** Trigger element reference for focus restoration */
  triggerElement: WritableSignal<HTMLElement | null>;
}

export const ALERT_DIALOG_CONTEXT = new InjectionToken<AlertDialogContextValue>('ALERT_DIALOG_CONTEXT');
