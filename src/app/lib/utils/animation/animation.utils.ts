/**
 * Animation Utility Functions
 * Helper functions for managing animation states and CSS classes
 */

import { signal, Signal } from '@angular/core';
import type { AnimationAlign, AnimationSide, AnimationState } from './animation.types';

/**
 * Animation preset names matching shadcn/ui semantics
 */
export const ANIMATION_PRESETS = {
  // Fade animations
  fadeIn: 'animate-in fade-in-0',
  fadeOut: 'animate-out fade-out-0',

  // Scale/Zoom animations
  scaleIn: 'animate-in zoom-in-95',
  scaleOut: 'animate-out zoom-out-95',

  // Slide animations
  slideInFromTop: 'animate-in slide-in-from-top-2',
  slideOutToTop: 'animate-out slide-out-to-top-2',
  slideInFromRight: 'animate-in slide-in-from-right-2',
  slideOutToRight: 'animate-out slide-out-to-right-2',
  slideInFromBottom: 'animate-in slide-in-from-bottom-2',
  slideOutToBottom: 'animate-out slide-out-to-bottom-2',
  slideInFromLeft: 'animate-in slide-in-from-left-2',
  slideOutToLeft: 'animate-out slide-out-to-left-2',

  // Combined animations (common patterns)
  fadeScale: 'animate-in fade-in-0 zoom-in-95',
  fadeScaleOut: 'animate-out fade-out-0 zoom-out-95',
} as const;

/**
 * Create animation state signal
 * Manages the 4-state animation lifecycle
 */
export function createAnimationState(
  initialState: AnimationState = 'closed'
): Signal<AnimationState> {
  return signal<AnimationState>(initialState);
}

/**
 * Determine animation CSS classes based on state and direction
 */
export function getAnimationClasses(
  state: AnimationState,
  direction?: AnimationSide,
  animate: boolean = true
): string {
  if (!animate) return '';

  const baseClasses = ['duration-200'];

  switch (state) {
    case 'closed':
      return [...baseClasses, 'animate-out fade-out-0'].join(' ');

    case 'entering':
      return [...baseClasses, 'animate-in fade-in-0'].join(' ');

    case 'open':
      return [...baseClasses, 'animate-in fade-in-0'].join(' ');

    case 'exiting':
      return [...baseClasses, 'animate-out fade-out-0'].join(' ');

    default:
      return '';
  }
}

/**
 * Get slide animation classes based on direction
 */
export function getSlideAnimationClasses(
  state: AnimationState,
  direction: AnimationSide
): string {
  const baseClasses = ['duration-200'];

  const directionMap: Record<AnimationState, Record<AnimationSide, string>> = {
    entering: {
      top: 'animate-in slide-in-from-top-2',
      bottom: 'animate-in slide-in-from-bottom-2',
      left: 'animate-in slide-in-from-left-2',
      right: 'animate-in slide-in-from-right-2',
    },
    open: {
      top: 'animate-in slide-in-from-top-2',
      bottom: 'animate-in slide-in-from-bottom-2',
      left: 'animate-in slide-in-from-left-2',
      right: 'animate-in slide-in-from-right-2',
    },
    exiting: {
      top: 'animate-out slide-out-to-top-2',
      bottom: 'animate-out slide-out-to-bottom-2',
      left: 'animate-out slide-out-to-left-2',
      right: 'animate-out slide-out-to-right-2',
    },
    closed: {
      top: 'animate-out slide-out-to-top-2',
      bottom: 'animate-out slide-out-to-bottom-2',
      left: 'animate-out slide-out-to-left-2',
      right: 'animate-out slide-out-to-right-2',
    },
  };

  return [...baseClasses, directionMap[state]?.[direction] || ''].join(' ');
}

/**
 * Build data attributes for animation state exposure
 */
export function buildAnimationAttributes(
  state: AnimationState,
  side?: AnimationSide,
  align?: AnimationAlign
): Record<string, string | undefined> {
  return {
    'data-state': state,
    'data-side': side,
    'data-align': align,
  };
}

/**
 * Wait for animation to complete
 * Useful for coordinating multiple animations
 */
export async function waitForAnimation(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const handleAnimationEnd = () => {
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    };

    element.addEventListener('animationend', handleAnimationEnd);

    // Timeout fallback (300ms for safety)
    setTimeout(() => {
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    }, 300);
  });
}

/**
 * Check if animations are enabled (respects prefers-reduced-motion)
 */
export function areAnimationsEnabled(): boolean {
  if (typeof window === 'undefined') return true;

  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
