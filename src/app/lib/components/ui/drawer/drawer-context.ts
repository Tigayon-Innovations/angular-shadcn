import { InjectionToken, WritableSignal } from '@angular/core';

export interface DrawerContextValue {
  open: WritableSignal<boolean>;
  setOpen: (open: boolean) => void;
  direction: 'top' | 'right' | 'bottom' | 'left';
  /** ARIA ID for the title element */
  titleId: string;
  /** ARIA ID for the description element */
  descriptionId: string;
  /** ARIA ID for the content element */
  contentId: string;
  /** Reference to the trigger element for focus restoration */
  triggerElement: WritableSignal<HTMLElement | null>;
}

export const DRAWER_CONTEXT = new InjectionToken<DrawerContextValue>('DRAWER_CONTEXT');
