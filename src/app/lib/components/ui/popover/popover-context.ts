import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverContextValue {
  /** Signal for open state */
  open: WritableSignal<boolean>;
  /** Set open state */
  setOpen: (open: boolean) => void;
  /** Toggle open state */
  toggle: () => void;
  /** Whether the popover is modal */
  modal: () => boolean;
  /** Reference to the trigger element for positioning */
  triggerRef?: Signal<HTMLElement | null>;
  /** Set the trigger element reference */
  setTriggerRef?: (element: HTMLElement | null) => void;
}

export const POPOVER_CONTEXT = new InjectionToken<PopoverContextValue>('POPOVER_CONTEXT');
