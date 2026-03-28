import { InjectionToken, type WritableSignal } from '@angular/core';

export type InputOTPRenderFn = (props: { slots: InputOTPSlotProps[] }) => unknown;

export interface InputOTPSlotProps {
  /** The character in this slot */
  char: string | null;
  /** Whether this slot has a character */
  hasFakeCaret: boolean;
  /** Whether this slot is active/focused */
  isActive: boolean;
}

export interface InputOTPContextValue {
  /** The current OTP value */
  value: WritableSignal<string>;
  /** Maximum length of the OTP */
  maxLength: WritableSignal<number>;
  /** Index of the currently active/focused slot */
  activeIndex: WritableSignal<number>;
}

export const INPUT_OTP_CONTEXT = new InjectionToken<InputOTPContextValue>('INPUT_OTP_CONTEXT');
