import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { TOOLTIP_CONTEXT } from './tooltip-context';

/**
 * TooltipTrigger component - element that triggers tooltip on hover.
 * Matches shadcn/ui React TooltipTrigger exactly.
 * Supports Escape key to dismiss tooltip per WCAG 1.4.13.
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
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipTrigger {
  protected readonly context = inject(TOOLTIP_CONTEXT);

  /** Whether the trigger is disabled */
  readonly asChild = input<boolean>(false);

  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  onMouseEnter(): void {
    this.clearTimeouts();
    this.showTimeout = setTimeout(() => {
      this.context.setOpen(true);
    }, this.context.delayDuration);
  }

  onMouseLeave(): void {
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, 100);
  }

  onFocus(): void {
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
