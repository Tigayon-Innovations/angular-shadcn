/**
 * Presence Component
 * Angular version of Radix UI's Presence primitive
 * Keeps DOM elements present until exit animations complete
 *
 * This is the critical component for proper exit animations in:
 * - Dialog
 * - Popover
 * - Dropdown Menu
 * - Tooltip
 * - Sheet
 * - Toast
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  signal
} from '@angular/core';

/**
 * Presence state
 */
export type PresenceState = 'mounted' | 'unmountSuspended' | 'unmounted';

/**
 * Presence Component
 * Wraps content and manages its presence in the DOM based on animation state
 *
 * Usage:
 * <Presence [present]="isOpen()">
 *   <div class="animate-in data-[state=closed]:animate-out">
 *     Content here
 *   </div>
 * </Presence>
 */
@Component({
  selector: 'Presence',
  template: `
    @if (shouldRender()) {
      <ng-content />
    }
  `,
  host: {
    class: 'contents',
    '[attr.data-presence-state]': 'presenceState()',
    '(animationend)': 'handleAnimationEnd($event)',
    '(animationcancel)': 'handleAnimationEnd($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Presence implements OnDestroy {
  /** Whether the content should be present */
  readonly present = input.required<boolean>();

  /** Force presence (bypass animation waiting) */
  readonly forceMount = input<boolean>(false);

  /** Animation duration in ms (fallback if CSS animation doesn't fire) */
  readonly exitDuration = input<number>(200);

  /** Internal presence state */
  private readonly state = signal<PresenceState>('unmounted');

  /** Previous present value for change detection */
  private prevPresent = false;

  /** Timeout for fallback animation end */
  private exitTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Whether to render content */
  readonly shouldRender = computed(() => {
    if (this.forceMount()) return true;

    const currentState = this.state();
    return currentState === 'mounted' || currentState === 'unmountSuspended';
  });

  /** Current presence state (exposed for debugging) */
  readonly presenceState = computed(() => this.state());

  constructor() {
    // React to present changes
    effect(() => {
      const isPresent = this.present();

      if (isPresent !== this.prevPresent) {
        this.handlePresenceChange(isPresent);
        this.prevPresent = isPresent;
      }
    });
  }

  ngOnDestroy(): void {
    this.clearExitTimeout();
  }

  /**
   * Handle presence change
   */
  private handlePresenceChange(isPresent: boolean): void {
    this.clearExitTimeout();

    if (isPresent) {
      // Mount immediately
      this.state.set('mounted');
    } else {
      // Start exit animation
      this.state.set('unmountSuspended');

      // Set fallback timeout in case animationend doesn't fire
      this.exitTimeout = setTimeout(() => {
        this.state.set('unmounted');
      }, this.exitDuration());
    }
  }

  /**
   * Handle animation end
   */
  protected handleAnimationEnd(event: AnimationEvent): void {
    // Only handle if we're in exit state
    if (this.state() === 'unmountSuspended') {
      // Check if this is an exit animation (based on animation name or state)
      const target = event.target as HTMLElement;
      const animationName = event.animationName;

      // Exit animations typically contain 'exit' or 'out' in the name
      if (
        animationName.includes('exit') ||
        animationName.includes('out') ||
        animationName.includes('leave')
      ) {
        this.clearExitTimeout();
        this.state.set('unmounted');
      }
    }
  }

  /**
   * Clear exit timeout
   */
  private clearExitTimeout(): void {
    if (this.exitTimeout) {
      clearTimeout(this.exitTimeout);
      this.exitTimeout = null;
    }
  }

  /**
   * Force unmount (skip animation)
   */
  forceUnmount(): void {
    this.clearExitTimeout();
    this.state.set('unmounted');
  }

  /**
   * Check if currently animating exit
   */
  isExiting(): boolean {
    return this.state() === 'unmountSuspended';
  }
}
