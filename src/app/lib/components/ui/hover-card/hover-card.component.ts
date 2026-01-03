import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { HOVER_CARD_CONTEXT, type HoverCardContextValue } from './hover-card-context';

/**
 * HoverCard component - container for hover-triggered card.
 * Matches shadcn/ui React HoverCard exactly.
 *
 * @example
 * <HoverCard>
 *   <HoverCardTrigger>
 *     <a href="#">&#64;username</a>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Profile info here</p>
 *   </HoverCardContent>
 * </HoverCard>
 */
@Component({
  selector: 'HoverCard',
  template: `<ng-content />`,
  host: {
    class: 'relative inline-block',
  },
  providers: [
    {
      provide: HOVER_CARD_CONTEXT,
      useExisting: forwardRef(() => HoverCard),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCard implements HoverCardContextValue {
  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Delay before opening (ms) */
  readonly openDelay = 700;

  /** Delay before closing (ms) */
  readonly closeDelay = 300;

  /** Open change event */
  readonly openChange = output<boolean>();

  readonly open = signal(false);

  constructor() {
    if (this.defaultOpen()) {
      this.open.set(true);
    }
  }

  setOpen(open: boolean): void {
    if (this.controlledOpen() === undefined) {
      this.open.set(open);
    }
    this.openChange.emit(open);
  }

  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
