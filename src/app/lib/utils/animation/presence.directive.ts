/**
 * Presence Directive & Service
 * Keeps DOM elements in the tree until animations complete
 * Critical for exit animations in modals, tooltips, popovers, etc.
 */

import {
  DestroyRef,
  Directive,
  EmbeddedViewRef,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

/**
 * Presence state for tracking animation lifecycle
 */
interface PresenceState {
  isPresent: boolean;
  isAnimating: boolean;
}

/**
 * Manages presence state for animated components
 * Ensures DOM elements stay in tree during exit animations
 */
@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private presenceMap = new Map<string, WritableSignal<PresenceState>>();

  /**
   * Register a presence element
   */
  register(id: string, initialState: boolean = false): WritableSignal<PresenceState> {
    if (!this.presenceMap.has(id)) {
      this.presenceMap.set(
        id,
        signal<PresenceState>({
          isPresent: initialState,
          isAnimating: false,
        }),
      );
    }
    return this.presenceMap.get(id)!;
  }

  /**
   * Unregister a presence element
   */
  unregister(id: string): void {
    this.presenceMap.delete(id);
  }

  /**
   * Update presence state
   */
  setState(id: string, state: Partial<PresenceState>): void {
    const current = this.presenceMap.get(id);
    if (current) {
      current.update((prev) => ({ ...prev, ...state }));
    }
  }

  /**
   * Get current presence state
   */
  getState(id: string): PresenceState | undefined {
    return this.presenceMap.get(id)?.();
  }
}

/**
 * Presence Directive
 * Usage: <div *presenceIf="isVisible; duration: 300">Content</div>
 *
 * Keeps the element in DOM during exit animations, then removes it
 * Properly handles animation completion before unmounting
 */
@Directive({
  selector: '[presenceIf]',
})
export class PresenceIfDirective<T> implements OnInit, OnDestroy {
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly presenceService = inject(PresenceService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() presenceIfTemplate?: TemplateRef<T>;
  @Input() set presenceIf(show: boolean) {
    this.handlePresenceChange(show);
  }

  @Input() presenceDuration: number = 200;

  private viewRef: EmbeddedViewRef<T> | null = null;
  private presenceId = `presence-${Math.random().toString(36).substr(2, 9)}`;
  private isVisible = signal(false);

  ngOnInit(): void {
    this.presenceService.register(this.presenceId, false);

    // Clean up on destroy
    this.destroyRef.onDestroy(() => {
      this.presenceService.unregister(this.presenceId);
    });
  }

  ngOnDestroy(): void {
    this.presenceService.unregister(this.presenceId);
    if (this.viewRef) {
      this.viewRef.destroy();
      this.viewRef = null;
    }
  }

  private handlePresenceChange(show: boolean): void {
    if (show) {
      this.showElement();
    } else {
      this.hideElement();
    }
  }

  private showElement(): void {
    if (!this.viewRef && this.presenceIfTemplate) {
      this.viewRef = this.viewContainer.createEmbeddedView(this.presenceIfTemplate);
      this.presenceService.setState(this.presenceId, {
        isPresent: true,
        isAnimating: true,
      });

      // Mark animation as complete after duration
      setTimeout(() => {
        this.presenceService.setState(this.presenceId, {
          isAnimating: false,
        });
      }, this.presenceDuration);
    }

    this.isVisible.set(true);
  }

  private hideElement(): void {
    this.isVisible.set(false);
    this.presenceService.setState(this.presenceId, {
      isAnimating: true,
    });

    // Remove from DOM after animation completes
    setTimeout(() => {
      if (this.viewRef) {
        this.viewRef.destroy();
        this.viewRef = null;
      }
      this.presenceService.setState(this.presenceId, {
        isPresent: false,
        isAnimating: false,
      });
    }, this.presenceDuration);
  }
}
