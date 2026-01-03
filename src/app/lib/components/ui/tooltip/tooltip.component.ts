import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    input,
    signal,
} from '@angular/core';
import { TOOLTIP_CONTEXT, type TooltipContextValue } from './tooltip-context';

/**
 * Tooltip component - wrapper for tooltip trigger and content.
 * Matches shadcn/ui React Tooltip exactly.
 *
 * @example
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>
 *     <p>Tooltip content</p>
 *   </TooltipContent>
 * </Tooltip>
 */
@Component({
  selector: 'Tooltip',
  template: `<ng-content />`,
  host: {
    class: 'relative inline-block',
  },
  providers: [
    {
      provide: TOOLTIP_CONTEXT,
      useExisting: forwardRef(() => Tooltip),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tooltip implements TooltipContextValue {
  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Delay before showing tooltip */
  readonly delayDuration = 200;

  readonly open = signal(false);

  constructor() {
    // Initialize from defaultOpen
    if (this.defaultOpen()) {
      this.open.set(true);
    }
  }

  setOpen(open: boolean): void {
    if (this.controlledOpen() === undefined) {
      this.open.set(open);
    }
  }

  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
