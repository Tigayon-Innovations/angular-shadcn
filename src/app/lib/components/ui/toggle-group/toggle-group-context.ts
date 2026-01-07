import { InjectionToken, WritableSignal } from '@angular/core';
import type { ToggleVariants } from '../toggle/toggle-variants';

export interface ToggleGroupContext {
  value: WritableSignal<string | string[]>;
  type: WritableSignal<'single' | 'multiple'>;
  disabled: WritableSignal<boolean>;
  variant: WritableSignal<ToggleVariants['variant']>;
  size: WritableSignal<ToggleVariants['size']>;
  orientation: WritableSignal<'horizontal' | 'vertical'>;
  /** Registry of all toggle item values */
  itemValues: WritableSignal<string[]>;
  toggle: (value: string) => void;
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

export const TOGGLE_GROUP_CONTEXT = new InjectionToken<ToggleGroupContext>(
  'ToggleGroupContext'
);
