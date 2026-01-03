import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { HOVER_CARD_CONTEXT } from './hover-card-context';

/**
 * HoverCardTrigger component - element that triggers the hover card.
 * Matches shadcn/ui React HoverCardTrigger exactly.
 */
@Component({
  selector: 'HoverCardTrigger',
  template: `<ng-content />`,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCardTrigger {
  protected readonly context = inject(HOVER_CARD_CONTEXT);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  private openTimeout: ReturnType<typeof setTimeout> | null = null;
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

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
    this.context.setOpen(true);
  }

  onBlur(): void {
    this.clearTimeouts();
    this.context.setOpen(false);
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
