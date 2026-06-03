import { Align, cn, computePosition, getTransformOrigin, Presence, Side } from '@/lib/utils';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { TOOLTIP_CONTEXT, TooltipAlign, TooltipSide } from './tooltip-context';

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

/**
 * @component TooltipContent
 *
 * The component that pops out when the tooltip is open.
 *
 * @description
 * TooltipContent displays the actual tooltip content. It supports positioning
 * on different sides and alignments relative to the trigger using fixed positioning
 * via computePosition to avoid clipping inside overflow:hidden ancestors.
 *
 * ## Features
 * - Configurable side (top, right, bottom, left)
 * - Configurable alignment (start, center, end)
 * - Customizable offset from trigger
 * - Smooth enter/exit animations
 * - Uses Presence for proper exit animations
 * - Fixed positioning — not clipped by overflow:hidden ancestors
 * - Escape key to dismiss
 * - disableHoverableContent support
 *
 * ## Accessibility
 * - `role="tooltip"` on the element
 * - Unique ID for aria-describedby relationship with trigger
 * - Escape key dismisses tooltip (WCAG 1.4.13)
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
        [attr.data-side]="computedSide()"
        [attr.data-align]="computedAlign()"
        [style]="positionStyles()"
        role="tooltip"
        [id]="context.tooltipId"
        (mouseenter)="onMouseEnter()"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    'attr.data-slot': '"tooltip-content"',
    class: 'contents',
    '(document:keydown.escape)': 'onEscape()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipContent {
  constructor() {
    // Recalculate position when open state changes (browser-only via afterNextRender)
    effect(() => {
      const isOpen = this.context.open();
      if (isOpen) {
        this.isPositioned.set(false);
        afterNextRender(
          () => {
            this.schedulePositionUpdate();
          },
          { injector: this._injector },
        );
      } else {
        this.cancelScheduledPositionUpdate();
        this.isPositioned.set(false);
        this.positionStyles.set({
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
        });
      }
    });
  }

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

  private readonly _elementRef = inject(ElementRef);
  private readonly _injector = inject(Injector);

  protected readonly context = inject(TOOLTIP_CONTEXT);

  protected readonly isPositioned = signal(false);
  /** Computed position after collision detection */
  protected readonly computedSide = signal<Side>('top');
  protected readonly computedAlign = signal<Align>('center');
  protected readonly positionStyles = signal<Record<string, string>>({
    position: 'fixed',
    top: '-9999px',
    left: '-9999px',
  });

  private positionFrameId: number | null = null;

  /** Current state: open or closed */
  protected readonly state = computed<TooltipContentState>(() =>
    this.context.open() ? 'open' : 'closed',
  );

  protected readonly computedClass = computed(() =>
    cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      !this.isPositioned() && 'opacity-0 pointer-events-none',
      this.class(),
    ),
  );

  onMouseEnter(): void {
    if (this.context.disableHoverableContent?.()) {
      this.context.setOpen(false);
    }
  }

  protected onEscape(): void {
    if (this.context.open()) {
      this.context.setOpen(false);
    }
  }

  private schedulePositionUpdate(): void {
    this.cancelScheduledPositionUpdate();

    this.positionFrameId = requestAnimationFrame(() => {
      this.updatePosition();

      this.positionFrameId = requestAnimationFrame(() => {
        this.updatePosition();
        this.positionFrameId = null;
      });
    });
  }

  private cancelScheduledPositionUpdate(): void {
    if (this.positionFrameId !== null) {
      cancelAnimationFrame(this.positionFrameId);
      this.positionFrameId = null;
    }
  }

  private updatePosition(): void {
    const triggerElement = this.context.triggerRef?.();
    const contentElement = this._elementRef.nativeElement.querySelector(
      '[role="tooltip"]',
    ) as HTMLElement;

    if (!triggerElement || !contentElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const contentRect = contentElement.getBoundingClientRect();
    const overlayWidth = Math.round(contentRect.width || 100);
    const overlayHeight = Math.round(contentRect.height || 32);

    const result = computePosition(
      triggerRect,
      { width: overlayWidth, height: overlayHeight },
      {
        side: this.side() as Side,
        align: this.align() as Align,
        sideOffset: this.sideOffset(),
        alignOffset: this.alignOffset(),
        avoidCollisions: true,
        collisionPadding: 8,
      },
    );

    this.computedSide.set(result.side);
    this.computedAlign.set(result.align);

    // Set position styles with transform origin for animations
    const transformOrigin = getTransformOrigin(result.side, result.align);
    this.positionStyles.set({
      position: 'fixed',
      top: result.styles.top || '',
      left: result.styles.left || '',
      '--radix-tooltip-content-transform-origin': transformOrigin,
    });
    this.isPositioned.set(true);
  }
}
