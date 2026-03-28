import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { TOOLTIP_CONTEXT, type TooltipContextValue } from './tooltip-context';

let tooltipIdCounter = 0;

/**
 * Props for the TooltipProvider component
 */
export interface TooltipProviderProps {
  /** The duration from when the pointer enters the trigger until the tooltip opens.
   * @default 700 */
  delayDuration?: number;
  /** How much time a user has to enter another trigger without incurring a delay again.
   * @default 300 */
  skipDelayDuration?: number;
  /** When true, trying to hover the content will result in the tooltip closing.
   * @default false */
  disableHoverableContent?: boolean;
}

/**
 * @component TooltipProvider
 *
 * Wraps your app to provide global tooltip behavior configuration.
 *
 * @description
 * TooltipProvider allows you to configure shared tooltip behavior for all
 * tooltips in your application. Place it near the root of your app.
 *
 * ## Features
 * - Shared delay duration for all tooltips
 * - Skip delay when rapidly moving between tooltips
 * - Control hoverable content behavior
 *
 * @example Basic usage
 * ```html
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip content</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 *
 * @example Custom delays
 * ```html
 * <TooltipProvider [delayDuration]="400" [skipDelayDuration]="200">
 *   <!-- Tooltips will use these delays -->
 * </TooltipProvider>
 * ```
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
  /** When true, trying to hover the content will result in the tooltip closing */
  readonly disableHoverableContent = input<boolean>(false);

  readonly open = signal(false);

  /** Unique ID for aria-describedby relationship */
  readonly tooltipId = `tooltip-provider-${++tooltipIdCounter}`;
  /** The duration from when the pointer enters the trigger until the tooltip opens */
  readonly delayDuration = 700;
  /** How much time a user has to enter another trigger without incurring a delay again */
  readonly skipDelayDuration = 300;

  setOpen(open: boolean): void {
    this.open.set(open);
  }
}
