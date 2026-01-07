import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxContext {
  /** Unique ID for the combobox */
  id: string;
  /** Whether the dropdown is open */
  open: WritableSignal<boolean>;
  /** Currently selected value */
  value: WritableSignal<string>;
  /** Current search/filter text */
  search: WritableSignal<string>;
  /** All available options */
  options: WritableSignal<ComboboxOption[]>;
  /** Filtered options based on search */
  filteredOptions: Signal<ComboboxOption[]>;
  /** Currently highlighted option index for keyboard navigation */
  highlightedIndex: WritableSignal<number>;
  /** ID of the listbox element */
  listboxId: string;
  /** ID of the currently highlighted option */
  activeDescendantId: Signal<string | null>;
  /** Select an option */
  onSelect: (value: string) => void;
  /** Toggle or set open state */
  onOpenChange: (open: boolean) => void;
  /** Handle search input */
  onSearch: (searchTerm: string) => void;
  /** Handle keyboard navigation */
  onKeyDown: (event: KeyboardEvent) => void;
  /** Move highlight up */
  highlightPrevious: () => void;
  /** Move highlight down */
  highlightNext: () => void;
  /** Select highlighted option */
  selectHighlighted: () => void;
  /** Get option ID for ARIA */
  getOptionId: (index: number) => string;
}

export const COMBOBOX_CONTEXT = new InjectionToken<ComboboxContext>(
  'ComboboxContext'
);

