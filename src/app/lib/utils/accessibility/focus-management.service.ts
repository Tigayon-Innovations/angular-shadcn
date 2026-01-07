import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

/**
 * Service to manage focus state across the application.
 * Handles saving/restoring focus, tracking focus history, and managing focus on open/close.
 */
@Injectable({ providedIn: 'root' })
export class FocusManagementService {
  private readonly document = inject(DOCUMENT);
  private readonly focusStack = signal<HTMLElement[]>([]);

  /**
   * Saves the currently focused element to the stack.
   * Call this before opening a modal/overlay to restore focus later.
   * @returns The element that was saved, or null if no element was focused
   */
  saveFocus(): HTMLElement | null {
    const activeElement = this.document.activeElement as HTMLElement | null;
    if (activeElement && activeElement !== this.document.body) {
      this.focusStack.update((stack) => [...stack, activeElement]);
      return activeElement;
    }
    return null;
  }

  /**
   * Restores focus to the last saved element and removes it from the stack.
   * Call this when closing a modal/overlay.
   * @returns The element that was focused, or null if stack was empty
   */
  restoreFocus(): HTMLElement | null {
    const stack = this.focusStack();
    if (stack.length === 0) return null;

    const lastElement = stack[stack.length - 1];
    this.focusStack.update((s) => s.slice(0, -1));

    if (lastElement && this.isElementFocusable(lastElement)) {
      // Use setTimeout to ensure focus happens after any animations
      setTimeout(() => {
        lastElement.focus();
      }, 0);
      return lastElement;
    }
    return null;
  }

  /**
   * Focuses the first focusable element within a container.
   * @param container - The container element to search within
   * @param options - Focus options
   * @returns The element that was focused, or null if none found
   */
  focusFirstFocusable(
    container: HTMLElement,
    options: FocusOptions = {}
  ): HTMLElement | null {
    const focusable = this.getFocusableElements(container);
    if (focusable.length > 0) {
      const target = focusable[0];
      this.focusElement(target, options);
      return target;
    }
    return null;
  }

  /**
   * Focuses the last focusable element within a container.
   * @param container - The container element to search within
   * @param options - Focus options
   * @returns The element that was focused, or null if none found
   */
  focusLastFocusable(
    container: HTMLElement,
    options: FocusOptions = {}
  ): HTMLElement | null {
    const focusable = this.getFocusableElements(container);
    if (focusable.length > 0) {
      const target = focusable[focusable.length - 1];
      this.focusElement(target, options);
      return target;
    }
    return null;
  }

  /**
   * Focuses a specific element with optional delay.
   * @param element - The element to focus
   * @param options - Focus options including preventScroll and delay
   */
  focusElement(element: HTMLElement, options: FocusOptions = {}): void {
    const { preventScroll = false, delay = 0 } = options;

    const doFocus = () => {
      if (this.isElementFocusable(element)) {
        element.focus({ preventScroll });
      }
    };

    if (delay > 0) {
      setTimeout(doFocus, delay);
    } else {
      doFocus();
    }
  }

  /**
   * Gets all focusable elements within a container.
   * @param container - The container element to search within
   * @returns Array of focusable HTML elements
   */
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'audio[controls]',
      'video[controls]',
      'details > summary:first-of-type',
    ].join(', ');

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(selector)
    );

    return elements.filter((el) => this.isElementVisible(el));
  }

  /**
   * Gets all tabbable elements (excludes tabindex="-1").
   * @param container - The container element to search within
   * @returns Array of tabbable HTML elements
   */
  getTabbableElements(container: HTMLElement): HTMLElement[] {
    return this.getFocusableElements(container).filter((el) => {
      const tabindex = el.getAttribute('tabindex');
      return tabindex !== '-1';
    });
  }

  /**
   * Checks if an element is currently focusable.
   * @param element - The element to check
   * @returns true if the element can receive focus
   */
  isElementFocusable(element: HTMLElement): boolean {
    if (!element || !this.document.body.contains(element)) return false;
    if (!this.isElementVisible(element)) return false;

    const tabindex = element.getAttribute('tabindex');
    if (tabindex !== null && parseInt(tabindex, 10) < 0) return false;

    // Check for disabled state
    if (
      element instanceof HTMLButtonElement ||
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      return !element.disabled;
    }

    // Check if element is naturally focusable
    const focusableSelectors = [
      'a[href]',
      'button',
      'input',
      'select',
      'textarea',
      '[tabindex]',
      '[contenteditable="true"]',
    ];

    return focusableSelectors.some((selector) => element.matches(selector));
  }

  /**
   * Checks if an element is visible (not hidden by CSS).
   * @param element - The element to check
   * @returns true if the element is visible
   */
  private isElementVisible(element: HTMLElement): boolean {
    if (!element) return false;

    const style = getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (element.hasAttribute('hidden')) return false;

    // Check if any ancestor is hidden
    let parent = element.parentElement;
    while (parent) {
      const parentStyle = getComputedStyle(parent);
      if (
        parentStyle.display === 'none' ||
        parentStyle.visibility === 'hidden'
      ) {
        return false;
      }
      if (parent.hasAttribute('hidden')) return false;
      parent = parent.parentElement;
    }

    return true;
  }

  /**
   * Clears the focus history stack.
   */
  clearFocusHistory(): void {
    this.focusStack.set([]);
  }

  /**
   * Gets the current focus stack length.
   */
  getFocusStackDepth(): number {
    return this.focusStack().length;
  }
}

export interface FocusOptions {
  /** Prevents scrolling to the focused element */
  preventScroll?: boolean;
  /** Delay in ms before focusing */
  delay?: number;
}
