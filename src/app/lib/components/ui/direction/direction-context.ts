import { InjectionToken, signal } from '@angular/core';

export type Direction = 'ltr' | 'rtl';

export interface DirectionContext {
  dir: ReturnType<typeof signal<Direction>>;
}

export const DIRECTION_CONTEXT = new InjectionToken<DirectionContext>('DirectionContext');
