import { InjectionToken, WritableSignal } from '@angular/core';

export interface SelectContext {
  value: WritableSignal<string>;
  open: WritableSignal<boolean>;
  disabled: WritableSignal<boolean>;
  placeholder: WritableSignal<string>;
  setValue: (value: string, label?: string) => void;
  selectedLabel: WritableSignal<string>;
  /** ARIA ID for the listbox */
  contentId: string;
  /** Reference to the trigger element for focus restoration */
  triggerElement: WritableSignal<HTMLElement | null>;
  /** Registry of all item values for keyboard navigation */
  itemValues: WritableSignal<string[]>;
  /** Currently focused item index */
  focusedIndex: WritableSignal<number>;
  /** Focus a specific item by index */
  focusItem: (index: number) => void;
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
