import { InjectionToken, type Signal, type WritableSignal } from '@angular/core';

export type CommandFilterFunction = (value: string, search: string, keywords?: string[]) => number; // 0 = hidden, 1 = shown, between 0-1 for ranking

export interface CommandContextValue {
  search: WritableSignal<string>;
  selectedValue: WritableSignal<string>;
  focusedIndex: WritableSignal<number>;
  itemCount: WritableSignal<number>;
  visibleItemCount: WritableSignal<number>;
  listId: string;
  inputId: string;
  filterFunction: Signal<CommandFilterFunction>;
  registerItem: (value: string) => void;
  unregisterItem: (value: string) => void;
  getItems: () => string[];
  shouldShowItem: (value: string, keywords?: string[]) => boolean;
}

export const COMMAND_CONTEXT = new InjectionToken<CommandContextValue>('COMMAND_CONTEXT');
