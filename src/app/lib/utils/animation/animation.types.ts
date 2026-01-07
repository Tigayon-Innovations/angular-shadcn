/**
 * Animation System Types - Radix-Ready Animation Layer for shadcn-angular
 * Defines the animation lifecycle states and configuration
 */

/**
 * Animation lifecycle states
 * Mirrors Radix UI's internal state management
 */
export type AnimationState = 'closed' | 'entering' | 'open' | 'exiting';

/**
 * Positional information for directional animations
 */
export type AnimationSide = 'top' | 'bottom' | 'left' | 'right';
export type AnimationAlign = 'start' | 'center' | 'end';

/**
 * Animation lifecycle configuration
 */
export interface AnimationConfig {
  /** Duration in milliseconds */
  duration?: number;
  /** Easing function */
  easing?: string;
  /** CSS class to apply during animation */
  class?: string;
}

/**
 * State exposure API - all animated components must expose these attributes
 */
export interface AnimatedElementAttributes {
  /** Current animation lifecycle state */
  'data-state': AnimationState;
  /** Positional side (if applicable) */
  'data-side'?: AnimationSide;
  /** Alignment (if applicable) */
  'data-align'?: AnimationAlign;
  /** Motion phase for directional animations */
  'data-motion'?: 'from-start' | 'to-end';
}

/**
 * Presence component token
 * Keeps component in DOM until exit animation completes
 */
export interface PresenceToken {
  /** Unique identifier for presence tracking */
  id: string;
  /** Current animation state */
  state: AnimationState;
  /** Callback when animation completes */
  onAnimationEnd?: () => void;
}
