import { InjectionToken, WritableSignal } from '@angular/core';

export type SelectPosition = 'popper' | 'item-aligned';

export interface SelectContext {
  /** Current selected value */
  value: WritableSignal<string>;
  /** Whether the select is open */
  open: WritableSignal<boolean>;
  /** Set the open state and emit related events */
  setOpen: (open: boolean) => void;
  /** Whether the select is disabled */
  disabled: WritableSignal<boolean>;
  /** Placeholder text when no value is selected */
  placeholder: WritableSignal<string>;
  /** Set the selected value and optionally the label */
  setValue: (value: string, label?: string) => void;
  /** The label of the currently selected item */
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
  /** Whether the select is required */
  required?: () => boolean;
  /** Name for form submission */
  name?: () => string;
}

export interface SelectGroupContext {
  /** The label for this group */
  label: WritableSignal<string>;
}

export const SELECT_CONTEXT = new InjectionToken<SelectContext>('SelectContext');

export const SELECT_GROUP_CONTEXT = new InjectionToken<SelectGroupContext>('SelectGroupContext');
