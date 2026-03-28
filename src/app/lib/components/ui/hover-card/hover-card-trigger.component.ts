import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { HOVER_CARD_CONTEXT } from './hover-card-context';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the HoverCardTrigger component
 */
export interface HoverCardTriggerProps {
  /** Change the default rendered element for the one passed as a child.
   * @default false */
  asChild?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component HoverCardTrigger
 *
 * The link that opens the hover card when hovered.
 *
 * @description
 * HoverCardTrigger wraps the element that activates the hover card on hover
 * or focus. It manages timing for open/close delays.
 *
 * ## Features
 * - Opens on hover with delay
 * - Opens immediately on focus (keyboard)
 * - Toggle on Enter/Space (keyboard)
 * - Escape dismisses and returns focus
 *
 * ## Accessibility
 * - `aria-expanded` reflects open state
 * - `aria-haspopup="dialog"` indicates content type
 * - Focus triggers immediate open for keyboard users
 * - Escape returns focus to trigger
 *
 * ## Keyboard Navigation
 * - `Tab` - Focus triggers hover card
 * - `Enter` / `Space` - Toggle hover card
 * - `Escape` - Close and return focus
 *
 * @example Basic usage
 * ```html
 * <HoverCardTrigger>
 *   <a href="#">&#64;username</a>
 * </HoverCardTrigger>
 * ```
 *
 * @example With custom element
 * ```html
 * <HoverCardTrigger>
 *   <span class="cursor-pointer underline">Hover for info</span>
 * </HoverCardTrigger>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed'
 */
@Component({
  selector: 'HoverCardTrigger',
  template: `<ng-content />`,
  host: {
    tabindex: '0',
    role: 'button',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur($event)',
    '(keydown.enter)': 'onKeyDown($event)',
    '(keydown.space)': 'onKeyDown($event)',
    '(keydown.escape)': 'onEscape()',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"dialog"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCardTrigger implements OnDestroy {
  protected readonly context = inject(HOVER_CARD_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Change the default rendered element for the one passed as a child */
  readonly asChild = input<boolean>(false);

  private openTimeout: ReturnType<typeof setTimeout> | null = null;
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  onMouseEnter(): void {
    this.clearTimeouts();
    this.openTimeout = setTimeout(() => {
      this.context.setOpen(true);
    }, this.context.openDelay);
  }

  onMouseLeave(): void {
    this.clearTimeouts();
    this.closeTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, this.context.closeDelay);
  }

  onFocus(): void {
    this.clearTimeouts();
    // Open immediately on focus for keyboard users
    this.context.setOpen(true);
  }

  onBlur(event: FocusEvent): void {
    // Check if focus moved to the hover card content
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    const hoverCardContent = this.elementRef.nativeElement.parentElement?.querySelector(
      '[data-slot="hover-card-content"]',
    );

    if (relatedTarget && hoverCardContent?.contains(relatedTarget)) {
      // Focus moved to content, don't close
      return;
    }

    this.clearTimeouts();
    this.closeTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, this.context.closeDelay);
  }

  onKeyDown(event: Event): void {
    event.preventDefault();
    this.context.setOpen(!this.context.open());
  }

  onEscape(): void {
    this.context.setOpen(false);
    this.elementRef.nativeElement.focus();
  }

  private clearTimeouts(): void {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}
