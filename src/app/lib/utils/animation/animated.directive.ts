/**
 * Animated Directive
 * Provides state exposure and animation lifecycle management for animated components
 * Handles the Radix-compatible data attributes for CSS-based animations
 */

import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { AnimationTokensService } from './animation-tokens.service';
import type { AnimationAlign, AnimationSide, AnimationState } from './animation.types';
import { areAnimationsEnabled } from './animation.utils';

/**
 * AnimatedDirective
 * Exposes animation state via data attributes for CSS-driven animations
 *
 * Usage:
 * <div animated [open]="isOpen()" [side]="'bottom'" [align]="'center'">Content</div>
 */
@Directive({
  selector: '[animated]',
  host: {
    '[attr.data-state]': 'dataState()',
    '[attr.data-side]': 'side()',
    '[attr.data-align]': 'align()',
    '[attr.data-motion]': 'motion()',
    '[class]': 'animationClasses()',
    '(animationend)': 'onAnimationEnd()',
  },
})
export class AnimatedDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly tokens = inject(AnimationTokensService);

  /** Controlled open state - primary input */
  readonly open = input<boolean>(false);

  /** Position side for directional animations */
  readonly side = input<AnimationSide | undefined>(undefined);

  /** Alignment for contextual positioning */
  readonly align = input<AnimationAlign | undefined>(undefined);

  /** Custom animation duration (override default) */
  readonly duration = input<number | undefined>(undefined);

  /** Disable animations for this element */
  readonly disableAnimation = input<boolean>(false);

  /** Internal animation state tracking */
  private readonly internalState = signal<AnimationState>('closed');

  /** Last known open value for detecting changes */
  private lastOpen = false;

  /** Animation timeout handle for cleanup */
  private animationTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Computed data-state attribute value */
  readonly dataState = computed<AnimationState>(() => {
    const state = this.internalState();

    // If animations disabled, skip intermediate states
    if (this.disableAnimation() || !areAnimationsEnabled()) {
      return this.open() ? 'open' : 'closed';
    }

    return state;
  });

  /** Computed motion direction for CSS transforms */
  readonly motion = computed<string | undefined>(() => {
    const state = this.internalState();

    if (state === 'entering') {
      return 'from-start';
    } else if (state === 'exiting') {
      return 'to-end';
    }

    return undefined;
  });

  /** Computed CSS classes for animation */
  readonly animationClasses = computed<string>(() => {
    const state = this.internalState();
    const disabled = this.disableAnimation() || !areAnimationsEnabled();

    if (disabled) return '';

    // Return appropriate animation classes based on state
    switch (state) {
      case 'entering':
      case 'open':
        return '';
      case 'exiting':
      case 'closed':
        return '';
      default:
        return '';
    }
  });

  constructor() {
    // Effect to track open state changes
    effect(() => {
      const currentOpen = this.open();

      if (currentOpen !== this.lastOpen) {
        this.handleStateChange(currentOpen);
        this.lastOpen = currentOpen;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  /**
   * Handle open/close state transitions
   */
  private handleStateChange(open: boolean): void {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    const duration = this.duration() ?? this.tokens.getDuration('base');

    if (open) {
      // Opening: closed → entering → open
      this.internalState.set('entering');

      this.animationTimeout = setTimeout(() => {
        this.internalState.set('open');
      }, duration);
    } else {
      // Closing: open → exiting → closed
      this.internalState.set('exiting');

      this.animationTimeout = setTimeout(() => {
        this.internalState.set('closed');
      }, duration);
    }
  }

  /**
   * Animation end event handler
   */
  protected onAnimationEnd(): void {
    const state = this.internalState();

    // Ensure we complete the transition
    if (state === 'entering') {
      this.internalState.set('open');
    } else if (state === 'exiting') {
      this.internalState.set('closed');
    }

    // Clear the timeout since animation completed naturally
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  /**
   * Get current animation state (for external access)
   */
  getAnimationState(): AnimationState {
    return this.internalState();
  }

  /**
   * Check if currently animating
   */
  isAnimating(): boolean {
    const state = this.internalState();
    return state === 'entering' || state === 'exiting';
  }
}
