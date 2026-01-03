import { InjectionToken, type WritableSignal } from '@angular/core';

export interface InputOTPContextValue {
  value: WritableSignal<string>;
  maxLength: WritableSignal<number>;
  activeIndex: WritableSignal<number>;
}

export const INPUT_OTP_CONTEXT = new InjectionToken<InputOTPContextValue>('INPUT_OTP_CONTEXT');
