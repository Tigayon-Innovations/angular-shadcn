import { cn, Presence } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TOOLTIP_CONTEXT, TooltipAlign, TooltipSide } from './tooltip-context';

// ============================================================================
// Types
// ============================================================================

export type TooltipContentState = 'open' | 'closed';

/**
 * Props for the TooltipContent component
 */
export interface TooltipContentProps {
  /** The preferred side of the trigger to render against.
   * @default 'top' */
  side?: TooltipSide;
  /** The distance in pixels from the trigger.
   * @default 4 */
  sideOffset?: number;
  /** The preferred alignment against the trigger.
   * @default 'center' */
  align?: TooltipAlign;
  /** An offset in pixels from the "start" or "end" alignment options.
   * @default 0 */
  alignOffset?: number;
  /** The padding between the arrow and the edges of the content.
   * @default 0 */
  arrowPadding?: number;
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component TooltipContent
 *
 * The component that pops out when the tooltip is open.
 *
 * @description
 * TooltipContent displays the actual tooltip content. It supports positioning
 * on different sides and alignments relative to the trigger.
 *
 * ## Features
 * - Configurable side (top, right, bottom, left)
 * - Configurable alignment (start, center, end)
 * - Customizable offset from trigger
 * - Smooth enter/exit animations
 * - Uses Presence for proper exit animations
 *
 * ## Accessibility
 * - `role="tooltip"` on the element
 * - Unique ID for aria-describedby relationship with trigger
 *
 * @example Basic usage
 * ```html
 * <TooltipContent>
 *   <p>Tooltip content</p>
 * </TooltipContent>
 * ```
 *
 * @example With side and alignment
 * ```html
 * <TooltipContent side="right" align="start">
 *   <p>Right-aligned tooltip</p>
 * </TooltipContent>
 * ```
 *
 * @example With offset
 * ```html
 * <TooltipContent [sideOffset]="8">
 *   <p>Tooltip with more spacing</p>
 * </TooltipContent>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed'
 * - `data-side` - 'top' | 'right' | 'bottom' | 'left'
 * - `data-align` - 'start' | 'center' | 'end'
 */
@Component({
  selector: 'TooltipContent',
  imports: [Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="state()"
        [attr.data-side]="side()"
        [attr.data-align]="align()"
        role="tooltip"
        [id]="context.tooltipId"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipContent {
  protected readonly context = inject(TOOLTIP_CONTEXT);

  /** The preferred side of the trigger to render against */
  readonly side = input<TooltipSide>('top');

  /** The distance in pixels from the trigger */
  readonly sideOffset = input<number>(4);

  /** The preferred alignment against the trigger */
  readonly align = input<TooltipAlign>('center');

  /** An offset in pixels from the alignment options */
  readonly alignOffset = input<number>(0);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Current state: open or closed */
  protected readonly state = computed<TooltipContentState>(() =>
    this.context.open() ? 'open' : 'closed',
  );

  protected readonly computedClass = computed(() => {
    const sideClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return cn(
      'absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sideClasses[this.side()],
      this.class(),
    );
  });
}
