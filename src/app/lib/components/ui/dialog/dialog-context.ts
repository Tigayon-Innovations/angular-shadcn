import { InjectionToken } from '@angular/core';

export interface DialogContextValue {
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

export const DIALOG_CONTEXT = new InjectionToken<DialogContextValue>('DIALOG_CONTEXT');
