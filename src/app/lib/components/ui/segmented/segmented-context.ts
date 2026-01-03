import { InjectionToken, WritableSignal } from '@angular/core';

export interface SegmentedContext {
  value: WritableSignal<string>;
  disabled: WritableSignal<boolean>;
  onValueChange: (value: string) => void;
}

export const SEGMENTED_CONTEXT = new InjectionToken<SegmentedContext>(
  'SegmentedContext'
);
