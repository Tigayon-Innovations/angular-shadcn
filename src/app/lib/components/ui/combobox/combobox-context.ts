import { InjectionToken, WritableSignal } from '@angular/core';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxContext {
  open: WritableSignal<boolean>;
  value: WritableSignal<string>;
  search: WritableSignal<string>;
  options: WritableSignal<ComboboxOption[]>;
  filteredOptions: WritableSignal<ComboboxOption[]>;
  onSelect: (value: string) => void;
  onOpenChange: (open: boolean) => void;
}

export const COMBOBOX_CONTEXT = new InjectionToken<ComboboxContext>(
  'ComboboxContext'
);
