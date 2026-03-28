import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

/**
 * Navigation direction for keyboard events.
 */
export type NavigationDirection =
  | 'next'
  | 'previous'
  | 'first'
  | 'last'
  | 'up'
  | 'down'
  | 'left'
  | 'right';

/**
 * Keyboard navigation configuration.
 */
export interface KeyboardNavigationConfig {
  /** Whether to wrap around when reaching the end/start */
  wrap?: boolean;
  /** Orientation: horizontal uses left/right, vertical uses up/down */
  orientation?: 'horizontal' | 'vertical' | 'both';
  /** Whether to move focus on arrow keys or just emit events */
  moveFocus?: boolean;
  /** Selector for navigable items */
  itemSelector?: string;
  /** Whether typeahead search is enabled */
  typeahead?: boolean;
  /** Delay in ms to clear typeahead buffer */
  typeaheadTimeout?: number;
}

/**
 * Event emitted when navigation occurs.
 */
export interface NavigationEvent {
  direction: NavigationDirection;
  currentIndex: number;
  targetIndex: number;
  currentElement: HTMLElement | null;
  targetElement: HTMLElement | null;
  event: KeyboardEvent;
}

/**
 * Directive that provides keyboard navigation patterns for lists, menus, tabs, etc.
 * Implements roving tabindex, arrow key navigation, Home/End support, and typeahead.
 *
 * @example
 * ```html
 * <ul hlmKeyboardNavigation [orientation]="'vertical'" [wrap]="true" itemSelector="li">
 *   <li tabindex="-1">Item 1</li>
 *   <li tabindex="0">Item 2</li>
 *   <li tabindex="-1">Item 3</li>
 * </ul>
 * ```
 */
@Directive({
  selector: '[hlmKeyboardNavigation]',
  host: {
    '(keydown)': 'handleKeydown($event)',
    '(focusin)': 'handleFocusIn($event)',
  },
})
export class KeyboardNavigationDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);

  /** Whether navigation wraps around */
  readonly wrap = input<boolean>(true);

  /** Orientation for arrow key mapping */
  readonly orientation = input<'horizontal' | 'vertical' | 'both'>('vertical');

  /** Whether to move focus automatically */
  readonly moveFocus = input<boolean>(true);

  /** CSS selector for navigable items */
  readonly itemSelector = input<string>(
    '[role="menuitem"], [role="option"], [role="tab"], [role="treeitem"], li, button',
  );

  /** Enable typeahead search */
  readonly typeahead = input<boolean>(true);

  /** Typeahead buffer clear timeout in ms */
  readonly typeaheadTimeout = input<number>(500);

  /** Event emitted when navigation occurs */
  readonly navigate = output<NavigationEvent>();

  /** Event emitted when item is selected (Enter/Space) */
  readonly select = output<{ index: number; element: HTMLElement; event: KeyboardEvent }>();

  /** Event emitted when typeahead matches an item */
  readonly typeaheadMatch = output<{ query: string; index: number; element: HTMLElement }>();

  private readonly activeIndex = signal<number>(-1);
  private typeaheadBuffer = '';
  private typeaheadTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    // Initialize active index based on current tabindex
    this.initializeActiveIndex();
  }

  ngOnDestroy(): void {
    if (this.typeaheadTimeoutId) {
      clearTimeout(this.typeaheadTimeoutId);
    }
  }

  /**
   * Gets all navigable items within the container.
   */
  getItems(): HTMLElement[] {
    const container = this.elementRef.nativeElement;
    const selector = this.itemSelector();
    const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    return elements.filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true',
    );
  }

  /**
   * Gets the currently active index.
   */
  getActiveIndex(): number {
    return this.activeIndex();
  }

  /**
   * Sets the active index and updates tabindex.
   */
  setActiveIndex(index: number): void {
    const items = this.getItems();
    if (index < 0 || index >= items.length) return;

    this.updateRovingTabindex(index, items);
    this.activeIndex.set(index);
  }

  /**
   * Focuses a specific index.
   */
  focusIndex(index: number): void {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      this.setActiveIndex(index);
      if (this.moveFocus()) {
        items[index].focus();
      }
    }
  }

  /**
   * Focuses the first item.
   */
  focusFirst(): void {
    this.focusIndex(0);
  }

  /**
   * Focuses the last item.
   */
  focusLast(): void {
    const items = this.getItems();
    this.focusIndex(items.length - 1);
  }

  /**
   * Handles keydown events for navigation.
   */
  handleKeydown(event: KeyboardEvent): void {
    const items = this.getItems();
    if (items.length === 0) return;

    const currentIndex = this.activeIndex();
    let handled = false;

    switch (event.key) {
      case 'ArrowDown':
        if (this.supportsVertical()) {
          this.navigateTo('next', event);
          handled = true;
        }
        break;

      case 'ArrowUp':
        if (this.supportsVertical()) {
          this.navigateTo('previous', event);
          handled = true;
        }
        break;

      case 'ArrowRight':
        if (this.supportsHorizontal()) {
          this.navigateTo('next', event);
          handled = true;
        }
        break;

      case 'ArrowLeft':
        if (this.supportsHorizontal()) {
          this.navigateTo('previous', event);
          handled = true;
        }
        break;

      case 'Home':
        this.navigateTo('first', event);
        handled = true;
        break;

      case 'End':
        this.navigateTo('last', event);
        handled = true;
        break;

      case 'Enter':
      case ' ':
        if (currentIndex >= 0 && currentIndex < items.length) {
          this.select.emit({
            index: currentIndex,
            element: items[currentIndex],
            event,
          });
          handled = true;
        }
        break;

      default:
        // Handle typeahead
        if (this.typeahead() && this.isTypeaheadKey(event)) {
          this.handleTypeahead(event);
          handled = true;
        }
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Handles focus in events to update active index.
   */
  handleFocusIn(event: FocusEvent): void {
    const items = this.getItems();
    const target = event.target as HTMLElement;
    const index = items.indexOf(target);

    if (index !== -1) {
      this.setActiveIndex(index);
    }
  }

  /**
   * Navigates to a target based on direction.
   */
  private navigateTo(direction: NavigationDirection, event: KeyboardEvent): void {
    const items = this.getItems();
    const currentIndex = this.activeIndex();
    let targetIndex: number;

    switch (direction) {
      case 'next':
      case 'down':
      case 'right':
        targetIndex = this.getNextIndex(currentIndex, items.length);
        break;

      case 'previous':
      case 'up':
      case 'left':
        targetIndex = this.getPreviousIndex(currentIndex, items.length);
        break;

      case 'first':
        targetIndex = 0;
        break;

      case 'last':
        targetIndex = items.length - 1;
        break;

      default:
        return;
    }

    if (targetIndex === currentIndex) return;

    const navigationEvent: NavigationEvent = {
      direction,
      currentIndex,
      targetIndex,
      currentElement: currentIndex >= 0 ? items[currentIndex] : null,
      targetElement: items[targetIndex],
      event,
    };

    this.navigate.emit(navigationEvent);
    this.focusIndex(targetIndex);
  }

  /**
   * Gets the next index, handling wrap.
   */
  private getNextIndex(current: number, length: number): number {
    if (current === -1) return 0;
    if (current >= length - 1) {
      return this.wrap() ? 0 : length - 1;
    }
    return current + 1;
  }

  /**
   * Gets the previous index, handling wrap.
   */
  private getPreviousIndex(current: number, length: number): number {
    if (current === -1) return length - 1;
    if (current <= 0) {
      return this.wrap() ? length - 1 : 0;
    }
    return current - 1;
  }

  /**
   * Updates the roving tabindex pattern.
   */
  private updateRovingTabindex(activeIndex: number, items: HTMLElement[]): void {
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });
  }

  /**
   * Initializes active index based on existing tabindex values.
   */
  private initializeActiveIndex(): void {
    const items = this.getItems();
    let activeIndex = items.findIndex((item) => item.getAttribute('tabindex') === '0');

    // If no item has tabindex="0", set the first item as active
    if (activeIndex === -1 && items.length > 0) {
      activeIndex = 0;
    }

    if (activeIndex >= 0) {
      this.setActiveIndex(activeIndex);
    }
  }

  /**
   * Checks if orientation supports vertical navigation.
   */
  private supportsVertical(): boolean {
    const orient = this.orientation();
    return orient === 'vertical' || orient === 'both';
  }

  /**
   * Checks if orientation supports horizontal navigation.
   */
  private supportsHorizontal(): boolean {
    const orient = this.orientation();
    return orient === 'horizontal' || orient === 'both';
  }

  /**
   * Checks if a key should trigger typeahead.
   */
  private isTypeaheadKey(event: KeyboardEvent): boolean {
    // Single printable character
    return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
  }

  /**
   * Handles typeahead search.
   */
  private handleTypeahead(event: KeyboardEvent): void {
    // Clear existing timeout
    if (this.typeaheadTimeoutId) {
      clearTimeout(this.typeaheadTimeoutId);
    }

    // Add character to buffer
    this.typeaheadBuffer += event.key.toLowerCase();

    // Find matching item
    const items = this.getItems();
    const matchIndex = items.findIndex((item) => {
      const text = this.getItemText(item).toLowerCase();
      return text.startsWith(this.typeaheadBuffer);
    });

    if (matchIndex !== -1) {
      this.typeaheadMatch.emit({
        query: this.typeaheadBuffer,
        index: matchIndex,
        element: items[matchIndex],
      });
      this.focusIndex(matchIndex);
    }

    // Set timeout to clear buffer
    this.typeaheadTimeoutId = setTimeout(() => {
      this.typeaheadBuffer = '';
      this.typeaheadTimeoutId = null;
    }, this.typeaheadTimeout());
  }

  /**
   * Gets the text content of an item for typeahead matching.
   */
  private getItemText(element: HTMLElement): string {
    // Check for aria-label first
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;

    // Then check textContent
    return element.textContent?.trim() || '';
  }
}
