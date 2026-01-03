import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { TOOLTIP_CONTEXT, type TooltipContextValue } from './tooltip-context';

/**
 * TooltipProvider component - provides tooltip context.
 * Matches shadcn/ui React TooltipProvider exactly.
 *
 * @example
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip content</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */
@Component({
  selector: 'TooltipProvider',
  template: `<ng-content />`,
  providers: [
    {
      provide: TOOLTIP_CONTEXT,
      useExisting: forwardRef(() => TooltipProvider),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipProvider implements TooltipContextValue {
  /** Delay before showing tooltip (ms) */
  readonly delayDuration = 700;

  /** Skip delay when switching between tooltips */
  readonly skipDelayDuration = input<number>(300);

  /** Disable closing on hover away */
  readonly disableHoverableContent = input<boolean>(false);

  readonly open = signal(false);

  setOpen(open: boolean): void {
    this.open.set(open);
  }
}
