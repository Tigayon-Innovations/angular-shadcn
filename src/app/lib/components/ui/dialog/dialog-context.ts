import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface DialogContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  isOpen: Signal<boolean>;
  /** Unique IDs for ARIA relationships */
  titleId: string;
  descriptionId: string;
  contentId: string;
  /** Trigger element reference for focus restoration */
  triggerElement: WritableSignal<HTMLElement | null>;
}

export const DIALOG_CONTEXT = new InjectionToken<DialogContextValue>('DIALOG_CONTEXT');
