import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import { FocusManagementService } from './focus-management.service';

/**
 * Directive to trap focus within a container element.
 * Essential for modals, dialogs, and other overlay components.
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
  host: {
    '(keydown)': 'handleKeydown($event)',
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
  private focusSentinelStart: HTMLElement | null = null;
  private focusSentinelEnd: HTMLElement | null = null;

  ngOnInit(): void {
    if (this.restoreFocus()) {
      this.previouslyFocused = this.focusManager.saveFocus();
    }

    this.createFocusSentinels();

    if (this.autoFocus() && this.trapFocus()) {
      // Delay to ensure DOM is ready
      setTimeout(() => this.setInitialFocus(), 0);
    }
  }

  ngOnDestroy(): void {
    this.removeFocusSentinels();

    if (this.restoreFocus()) {
      this.focusManager.restoreFocus();
    }
  }

  /**
   * Handles keydown events to manage Tab navigation within the trap.
   */
  handleKeydown(event: KeyboardEvent): void {
    if (!this.trapFocus() || event.key !== 'Tab') return;

    const container = this.elementRef.nativeElement;
    const focusable = this.focusManager.getTabbableElements(container);

    if (focusable.length === 0) {
      // No focusable elements, prevent tab
      event.preventDefault();
      return;
    }

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    const activeElement = this.document.activeElement as HTMLElement;

    if (event.shiftKey) {
      // Shift+Tab: going backward
      if (activeElement === firstFocusable || !container.contains(activeElement)) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab: going forward
      if (activeElement === lastFocusable || !container.contains(activeElement)) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  /**
   * Manually focuses the first or specified initial element.
   */
  focusFirst(): void {
    this.setInitialFocus();
  }

  /**
   * Manually focuses the last focusable element.
   */
  focusLast(): void {
    const container = this.elementRef.nativeElement;
    this.focusManager.focusLastFocusable(container);
  }

  /**
   * Sets the initial focus based on configuration.
   */
  private setInitialFocus(): void {
    const container = this.elementRef.nativeElement;
    const selector = this.initialFocus();

    if (selector) {
      const target = container.querySelector(selector) as HTMLElement | null;
      if (target && this.focusManager.isElementFocusable(target)) {
        target.focus();
        return;
      }
    }

    this.focusManager.focusFirstFocusable(container);
  }

  /**
   * Creates invisible sentinel elements at the start and end of the container.
   * These catch focus when tabbing out of the trap.
   */
  private createFocusSentinels(): void {
    const container = this.elementRef.nativeElement;

    // Create start sentinel
    this.focusSentinelStart = this.createSentinel('start');
    container.insertBefore(this.focusSentinelStart, container.firstChild);

    // Create end sentinel
    this.focusSentinelEnd = this.createSentinel('end');
    container.appendChild(this.focusSentinelEnd);

    // Add focus listeners to sentinels
    this.focusSentinelStart.addEventListener('focus', () => {
      if (this.trapFocus()) {
        this.focusManager.focusLastFocusable(container);
      }
    });

    this.focusSentinelEnd.addEventListener('focus', () => {
      if (this.trapFocus()) {
        this.focusManager.focusFirstFocusable(container);
      }
    });
  }

  /**
   * Creates a focus sentinel element.
   */
  private createSentinel(position: 'start' | 'end'): HTMLElement {
    const sentinel = this.document.createElement('span');
    sentinel.setAttribute('tabindex', '0');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.setAttribute('data-focus-sentinel', position);
    sentinel.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    return sentinel;
  }

  /**
   * Removes focus sentinel elements.
   */
  private removeFocusSentinels(): void {
    this.focusSentinelStart?.remove();
    this.focusSentinelEnd?.remove();
    this.focusSentinelStart = null;
    this.focusSentinelEnd = null;
  }
}
