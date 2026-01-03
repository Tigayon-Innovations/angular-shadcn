import { InjectionToken, WritableSignal } from '@angular/core';

export interface SelectContext {
  value: WritableSignal<string>;
  open: WritableSignal<boolean>;
  disabled: WritableSignal<boolean>;
  placeholder: WritableSignal<string>;
  setValue: (value: string, label?: string) => void;
  selectedLabel: WritableSignal<string>;
}

export const SELECT_CONTEXT = new InjectionToken<SelectContext>(
  'SelectContext'
);

export interface SelectGroupContext {
  label: WritableSignal<string>;
}

export const SELECT_GROUP_CONTEXT = new InjectionToken<SelectGroupContext>(
  'SelectGroupContext'
);
