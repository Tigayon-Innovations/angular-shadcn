import { InjectionToken, WritableSignal } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupContext {
  /** Current selected value */
  value: WritableSignal<string>;
  /** Whether the group is disabled */
  disabled: WritableSignal<boolean>;
  /** The name for radio inputs */
  name: WritableSignal<string>;
  /** Orientation for keyboard navigation */
  orientation: WritableSignal<RadioGroupOrientation>;
  /** Whether to loop focus at boundaries */
  loop: WritableSignal<boolean>;
  /** Whether the group is required */
  required: WritableSignal<boolean>;
  /** Registry of all radio item values */
  itemValues: WritableSignal<string[]>;
  /** Set the selected value */
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

export const RADIO_GROUP_CONTEXT = new InjectionToken<RadioGroupContext>('RadioGroupContext');
