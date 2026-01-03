import { InjectionToken, WritableSignal } from '@angular/core';
import type { ToggleVariants } from '../toggle/toggle-variants';

export interface ToggleGroupContext {
  value: WritableSignal<string | string[]>;
  type: WritableSignal<'single' | 'multiple'>;
  disabled: WritableSignal<boolean>;
  variant: WritableSignal<ToggleVariants['variant']>;
  size: WritableSignal<ToggleVariants['size']>;
  toggle: (value: string) => void;
  isPressed: (value: string) => boolean;
}

export const TOGGLE_GROUP_CONTEXT = new InjectionToken<ToggleGroupContext>(
  'ToggleGroupContext'
);
