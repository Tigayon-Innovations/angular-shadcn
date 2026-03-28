/**
 * Animation System Index
 * Exports all animation utilities and services
 */

export type {
  AnimatedElementAttributes,
  AnimationAlign,
  AnimationConfig,
  AnimationSide,
  AnimationState,
  PresenceToken,
} from './animation.types';

export { AnimatedDirective } from './animated.directive';
export { AnimationTokensService } from './animation-tokens.service';
export {
  ANIMATION_PRESETS,
  areAnimationsEnabled,
  buildAnimationAttributes,
  createAnimationState,
  getAnimationClasses,
  getSlideAnimationClasses,
  waitForAnimation,
} from './animation.utils';
export { Presence, type PresenceState } from './presence.component';
export { PresenceIfDirective, PresenceService } from './presence.directive';
