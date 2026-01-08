import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    OnDestroy,
} from '@angular/core';
import { TOOLTIP_CONTEXT } from './tooltip-context';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the TooltipTrigger component
 */
export interface TooltipTriggerProps {
  /** Change the default rendered element for the one passed as a child.
   * @default false */
  asChild?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component TooltipTrigger
 *
 * The element that triggers the tooltip when hovered or focused.
 *
 * @description
 * TooltipTrigger wraps the element that activates the tooltip. It handles
 * mouse and keyboard events to show/hide the tooltip.
 *
 * ## Features
 * - Shows tooltip on hover with configurable delay
 * - Shows tooltip on focus for keyboard users
 * - Dismissible via Escape key (WCAG 1.4.13)
 * - Supports custom trigger elements via content projection
 *
 * ## Accessibility
 * - `aria-describedby` points to tooltip content when open
 * - Escape key dismisses tooltip (WCAG 1.4.13 compliance)
 * - Focus triggers tooltip for keyboard users
 *
 * ## Keyboard Navigation
 * - `Escape` - Dismiss the tooltip
 * - `Tab` - Focus triggers tooltip to show
 *
 * @example Basic usage
 * ```html
 * <TooltipTrigger>
 *   <button>Hover me</button>
 * </TooltipTrigger>
 * ```
 *
 * @example With icon button
 * ```html
 * <TooltipTrigger>
 *   <button class="icon-button">
 *     <HelpIcon />
 *   </button>
 * </TooltipTrigger>
 * ```
 */
@Component({
  selector: 'TooltipTrigger',
  template: `<ng-content />`,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(keydown.escape)': 'onEscape()',
    '[attr.aria-describedby]': 'context.open() ? context.tooltipId : null',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipTrigger implements OnDestroy {
  protected readonly context = inject(TOOLTIP_CONTEXT);

  /** Change the default rendered element for the one passed as a child */
  readonly asChild = input<boolean>(false);

  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  onMouseEnter(): void {
    this.clearTimeouts();
    this.showTimeout = setTimeout(() => {
      this.context.setOpen(true);
    }, this.context.delayDuration);
  }

  onMouseLeave(): void {
    this.clearTimeouts();
    // Small delay to allow moving to tooltip content
    this.hideTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, 100);
  }

  onFocus(): void {
    // Show immediately on focus for keyboard users
    this.context.setOpen(true);
  }

  onBlur(): void {
    this.context.setOpen(false);
  }

  /**
   * Escape key handler for WCAG 1.4.13 compliance.
   * Content on hover/focus must be dismissible via Escape.
   */
  onEscape(): void {
    if (this.context.open()) {
      this.context.setOpen(false);
    }
  }

  private clearTimeouts(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
