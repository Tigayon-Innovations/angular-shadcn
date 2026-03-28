import { InjectionToken, WritableSignal } from '@angular/core';
import type { ToggleVariants } from '../toggle/toggle-variants';

// ============================================================================
// Types
// ============================================================================

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupOrientation = 'horizontal' | 'vertical';

export interface ToggleGroupContext {
  /** Current selected value(s) */
  value: WritableSignal<string | string[]>;
  /** Selection type: single or multiple */
  type: WritableSignal<ToggleGroupType>;
  /** Whether the group is disabled */
  disabled: WritableSignal<boolean>;
  /** Visual variant for items */
  variant: WritableSignal<ToggleVariants['variant']>;
  /** Size for items */
  size: WritableSignal<ToggleVariants['size']>;
  /** Orientation for keyboard navigation */
  orientation: WritableSignal<ToggleGroupOrientation>;
  /** Whether to loop focus at boundaries */
  loop: WritableSignal<boolean>;
  /** Whether focus should follow selection in single mode */
  rovingFocus: WritableSignal<boolean>;
  /** Registry of all toggle item values */
  itemValues: WritableSignal<string[]>;
  /** Currently focused item value */
  focusedValue: WritableSignal<string | null>;
  /** Toggle an item's pressed state */
  toggle: (value: string) => void;
  /** Check if an item is pressed */
  isPressed: (value: string) => boolean;
  /** Move focus to the next toggle item */
  focusNext: (currentValue: string) => void;
  /** Move focus to the previous toggle item */
  focusPrevious: (currentValue: string) => void;
  /** Move focus to the first toggle item */
  focusFirst: () => void;
  /** Move focus to the last toggle item */
  focusLast: () => void;
}

export const TOGGLE_GROUP_CONTEXT = new InjectionToken<ToggleGroupContext>('ToggleGroupContext');
