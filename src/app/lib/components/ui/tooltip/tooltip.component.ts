import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { TOOLTIP_CONTEXT, type TooltipContextValue } from './tooltip-context';

let tooltipIdCounter = 0;

export type TooltipState = 'open' | 'closed';

/**
 * Props for the Tooltip component
 */
export interface TooltipProps {
  /** The open state of the tooltip when initially rendered.
   * Use when you do not need to control its open state.
   * @default false */
  defaultOpen?: boolean;
  /** The controlled open state of the tooltip.
   * Must be used in conjunction with onOpenChange. */
  open?: boolean;
  /** The duration from when the pointer enters the trigger until the tooltip opens.
   * @default 700 */
  delayDuration?: number;
  /** How much time a user has to enter another trigger without incurring a delay again.
   * @default 300 */
  skipDelayDuration?: number;
  /** When true, clicking on trigger will not close the tooltip.
   * @default false */
  disableHoverableContent?: boolean;
}

/**
 * @component Tooltip
 *
 * A popup that displays information related to an element when the element
 * receives keyboard focus or the mouse hovers over it.
 *
 * @description
 * Tooltip wraps the trigger and content and manages the open/closed state.
 * It provides context for child components to coordinate behavior.
 *
 * ## Features
 * - Shows on hover and focus
 * - Supports controlled and uncontrolled state
 * - Configurable open delay
 * - Skip delay for rapid hover between tooltips
 * - Keyboard support (Escape to dismiss)
 * - ARIA compliant
 *
 * ## Accessibility
 * Implements WCAG 2.1 Content on Hover or Focus (1.4.13):
 * - Dismissible: Can be dismissed with Escape key
 * - Hoverable: Content can be hovered without disappearing
 * - Persistent: Remains visible until user dismisses
 *
 * ## Keyboard Navigation
 * - `Escape` - Dismiss the tooltip
 *
 * @example Basic usage
 * ```html
 * <Tooltip>
 *   <TooltipTrigger>
 *     <button>Hover me</button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <p>Tooltip content</p>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example With custom delay
 * ```html
 * <Tooltip [delayDuration]="0">
 *   <TooltipTrigger>Instant tooltip</TooltipTrigger>
 *   <TooltipContent>Shows immediately</TooltipContent>
 * </Tooltip>
 * ```
 *
 * @example Controlled
 * ```html
 * <Tooltip [open]="isOpen" (openChange)="isOpen = $event">
 *   <TooltipTrigger>Controlled tooltip</TooltipTrigger>
 *   <TooltipContent>Controlled content</TooltipContent>
 * </Tooltip>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed' (on content)
 */
@Component({
  selector: 'Tooltip',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"tooltip"',
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
  constructor() {
    // Initialize from defaultOpen
    if (this.defaultOpen()) {
      this.open.set(true);
    }
  }

  /** Event handler called when the open state changes */
  readonly openChange = output<boolean>();

  /** The open state of the tooltip when initially rendered */
  readonly defaultOpen = input<boolean>(false);
  /** The controlled open state of the tooltip */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });
  /** When true, trying to hover the content will result in the tooltip closing */
  readonly disableHoverableContent = input<boolean>(false);

  readonly open = signal(false);
  /** Reference to the trigger element for fixed positioning */
  readonly triggerRef = signal<HTMLElement | null>(null);

  /** The duration from when the pointer enters the trigger until the tooltip opens */
  readonly delayDuration = 700;
  /** How much time a user has to enter another trigger without incurring a delay again */
  readonly skipDelayDuration = 300;
  /** Unique ID for aria-describedby relationship */
  readonly tooltipId = `tooltip-${++tooltipIdCounter}`;

  setOpen(open: boolean): void {
    const controlled = this.controlledOpen();
    if (controlled === undefined) {
      this.open.set(open);
    }
    this.openChange.emit(open);
  }
  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
