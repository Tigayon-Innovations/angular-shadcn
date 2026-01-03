import { InjectionToken, type WritableSignal } from '@angular/core';

export interface CommandContextValue {
  search: WritableSignal<string>;
  selectedValue: WritableSignal<string>;
}

export const COMMAND_CONTEXT = new InjectionToken<CommandContextValue>('COMMAND_CONTEXT');
