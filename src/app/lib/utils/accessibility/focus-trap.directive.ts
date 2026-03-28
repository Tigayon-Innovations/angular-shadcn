import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnDestroy, OnInit, inject, input, output } from '@angular/core';
import { FocusManagementService } from './focus-management.service';

/**
 * Directive to trap focus within a container element.
 * Essential for modals, dialogs, and other overlay components.
 * Uses simplified Tab key handling without focus sentinels to prevent infinite loops.
 *
 * @example
 * ```html
 * <div hlmFocusTrap [trapFocus]="isOpen" [autoFocus]="true" [restoreFocus]="true">
 *   <button>Close</button>
 *   <input type="text">
 * </div>
 * ```
 */
@Directive({
  selector: '[hlmFocusTrap]',
  standalone: true,
  host: {
    '(keydown)': 'onKeydown($event)',
  },
})
export class FocusTrapDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly focusManager = inject(FocusManagementService);

  /** Whether focus trapping is active */
  readonly trapFocus = input<boolean>(true);

  /** Whether to auto-focus the first focusable element on init */
  readonly autoFocus = input<boolean>(true);

  /** Selector for the initial focus element (if not first focusable) */
  readonly initialFocus = input<string | undefined>(undefined);

  /** Whether to restore focus to the previous element on destroy */
  readonly restoreFocus = input<boolean>(true);

  /** Event emitted when focus escapes the trap (for debugging/analytics) */
  readonly focusEscaped = output<void>();

  private previouslyFocused: HTMLElement | null = null;

  ngOnInit(): void {
    if (this.restoreFocus()) {
      this.previouslyFocused = this.focusManager.saveFocus();
    }

    if (this.autoFocus() && this.trapFocus()) {
      // Delay to ensure DOM is ready
      setTimeout(() => this.setInitialFocus(), 0);
    }
  }

  ngOnDestroy(): void {
    if (this.restoreFocus() && this.previouslyFocused) {
      this.focusManager.restoreFocus();
    }
  }

  /**
   * Handles keydown events and filters for Tab key
   */
  onKeydown(event: Event): void {
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === 'Tab') {
      this.handleTabKey(keyEvent);
    }
  }

  /**
   * Handles Tab key press to manage focus within the trap.
   * Simplified approach without sentinels to prevent infinite focus loops.
   */
  private handleTabKey(event: KeyboardEvent): void {
    if (!this.trapFocus()) return;

    const container = this.elementRef.nativeElement;
    const focusable = this.focusManager.getTabbableElements(container);

    // No focusable elements - nothing to trap
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const activeElement = this.document.activeElement as HTMLElement;
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    // Check if active element is within the container
    const isInContainer = container.contains(activeElement);

    if (event.shiftKey) {
      // Shift+Tab: moving backward
      if (!isInContainer || activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus({ preventScroll: true });
      }
    } else {
      // Tab: moving forward
      if (!isInContainer || activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus({ preventScroll: true });
      }
    }
  }

  /**
   * Sets initial focus based on configuration
   */
  private setInitialFocus(): void {
    const container = this.elementRef.nativeElement;
    const selector = this.initialFocus();

    if (selector) {
      const target = container.querySelector(selector) as HTMLElement | null;
      if (target && this.focusManager.isElementFocusable(target)) {
        target.focus({ preventScroll: true });
        return;
      }
    }

    this.focusManager.focusFirstFocusable(container);
  }
}
