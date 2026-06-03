import { InjectionToken, WritableSignal } from '@angular/core';

export type HoverCardSide = 'top' | 'right' | 'bottom' | 'left';
export type HoverCardAlign = 'start' | 'center' | 'end';

export interface HoverCardContextValue {
  /** Signal for open state */
  open: WritableSignal<boolean>;
  /** Set open state */
  setOpen: (open: boolean) => void;
  /** The duration from when the pointer enters the trigger until the hover card opens (ms) */
  openDelay: () => number;
  /** The duration from when the pointer leaves the trigger/content until the hover card closes (ms) */
  closeDelay: () => number;
  /** Reference to the trigger element for fixed positioning */
  triggerRef: WritableSignal<HTMLElement | null>;
}

export const HOVER_CARD_CONTEXT = new InjectionToken<HoverCardContextValue>('HOVER_CARD_CONTEXT');
