import { InjectionToken, InputSignal, WritableSignal } from '@angular/core';

export interface ResizableContextValue {
  direction: InputSignal<'horizontal' | 'vertical'>;
  registerPanel: (id: string, minSize?: number, maxSize?: number, defaultSize?: number) => void;
  getPanelSize: (id: string) => number;
  setPanelSize: (id: string, size: number) => void;
  startResize: (handleId: string) => void;
  onResize: (delta: number) => void;
  endResize: () => void;
  panelSizes: WritableSignal<Map<string, number>>;
}

export const RESIZABLE_CONTEXT = new InjectionToken<ResizableContextValue>('RESIZABLE_CONTEXT');
