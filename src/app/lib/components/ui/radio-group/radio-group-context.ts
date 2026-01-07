import { InjectionToken, WritableSignal } from '@angular/core';

export interface RadioGroupContext {
  value: WritableSignal<string>;
  disabled: WritableSignal<boolean>;
  name: WritableSignal<string>;
  orientation: WritableSignal<'horizontal' | 'vertical'>;
  /** Registry of all radio item values */
  itemValues: WritableSignal<string[]>;
  setValue: (value: string) => void;
  /** Move focus to the next radio item */
  focusNext: (currentValue: string) => void;
  /** Move focus to the previous radio item */
  focusPrevious: (currentValue: string) => void;
  /** Move focus to the first radio item */
  focusFirst: () => void;
  /** Move focus to the last radio item */
  focusLast: () => void;
}

export const RADIO_GROUP_CONTEXT = new InjectionToken<RadioGroupContext>(
  'RadioGroupContext'
);
