import { InjectionToken, type WritableSignal } from '@angular/core';

export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselContextValue {
  orientation: WritableSignal<CarouselOrientation>;
  currentIndex: WritableSignal<number>;
  itemCount: WritableSignal<number>;
  canScrollPrev: WritableSignal<boolean>;
  canScrollNext: WritableSignal<boolean>;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  /** Announce slide change to screen readers */
  announceSlide?: (index: number, total: number) => void;
}

export const CAROUSEL_CONTEXT = new InjectionToken<CarouselContextValue>('CAROUSEL_CONTEXT');
