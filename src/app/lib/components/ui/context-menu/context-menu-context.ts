import { InjectionToken, type WritableSignal } from '@angular/core';

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface ContextMenuContextValue {
  open: WritableSignal<boolean>;
  position: WritableSignal<ContextMenuPosition>;
  focusedIndex: WritableSignal<number>;
  triggerElement: WritableSignal<HTMLElement | null>;
}

export const CONTEXT_MENU_CONTEXT = new InjectionToken<ContextMenuContextValue>(
  'CONTEXT_MENU_CONTEXT'
);
