import { InjectionToken, WritableSignal } from '@angular/core';

export interface RadioGroupContext {
  value: WritableSignal<string>;
  disabled: WritableSignal<boolean>;
  name: WritableSignal<string>;
  setValue: (value: string) => void;
}

export const RADIO_GROUP_CONTEXT = new InjectionToken<RadioGroupContext>(
  'RadioGroupContext'
);
