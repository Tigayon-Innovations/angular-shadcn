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
import { POPOVER_CONTEXT, PopoverAlign, PopoverSide } from './popover-context';

// ============================================================================
// Types
// ============================================================================

export type PopoverContentState = 'open' | 'closed';

/**
 * Props for the PopoverContent component
 */
export interface PopoverContentProps {
  /** The preferred side of the anchor to render against.
   * @default 'bottom' */
  side?: PopoverSide;
  /** The distance in pixels from the anchor.
   * @default 4 */
  sideOffset?: number;
  /** The preferred alignment against the anchor.
   * @default 'center' */
  align?: PopoverAlign;
  /** An offset in pixels from the "start" or "end" alignment options.
   * @default 0 */
  alignOffset?: number;
  /** Whether to avoid collisions with viewport boundaries.
   * @default true */
  avoidCollisions?: boolean;
  /** The padding in pixels between the boundary edges and content.
   * @default 8 */
  collisionPadding?: number;
  /** Additional CSS classes */
  class?: string;
  /** Whether the content should match the trigger width. */
  matchTriggerWidth?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component PopoverContent
 *
 * The component that pops out when the popover is open.
 *
 * @description
 * PopoverContent displays the floating content. It handles positioning,
 * collision detection, and animations.
 *
 * ## Features
 * - Configurable side (top, right, bottom, left)
 * - Configurable alignment (start, center, end)
 * - Collision detection and avoidance
 * - Smooth enter/exit animations
 * - Click outside to close
 * - Escape key to close
 *
 * ## Accessibility
 * - `role="dialog"` on the content
 * - Focus management when opened
 * - Escape key dismisses popover
 *
 * ## Keyboard Navigation
 * - `Escape` - Close the popover
 *
 * @example Basic usage
 * ```html
 * <PopoverContent>
 *   <p>Popover content</p>
 * </PopoverContent>
 * ```
 *
 * @example With custom positioning
 * ```html
 * <PopoverContent side="right" align="start" [sideOffset]="8">
 *   <p>Right-aligned popover</p>
 * </PopoverContent>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed'
 * - `data-side` - 'top' | 'right' | 'bottom' | 'left'
 * - `data-align` - 'start' | 'center' | 'end'
 */
@Component({
  selector: 'PopoverContent',
  imports: [Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        #contentRef
        [class]="computedClass()"
        [attr.data-state]="state()"
        [attr.data-side]="computedSide()"
        [attr.data-align]="computedAlign()"
        [style]="mergedStyles()"
        role="dialog"
        [attr.aria-modal]="context.modal() || null"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscapeKey()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContent {
  protected readonly context = inject(POPOVER_CONTEXT);
  private readonly elementRef = inject(ElementRef);
  private readonly injector = inject(Injector);
  private positionFrameId: number | null = null;
  protected readonly isPositioned = signal(false);

  /** The preferred side of the anchor to render against */
  readonly side = input<Side>('bottom');

  /** The distance in pixels from the anchor */
  readonly sideOffset = input<number>(4);

  /** The preferred alignment against the anchor */
  readonly align = input<Align>('center');

  /** An offset in pixels from the alignment options */
  readonly alignOffset = input<number>(0);

  /** Whether to avoid collisions with viewport boundaries */
  readonly avoidCollisions = input<boolean>(true);

  /** The padding in pixels between the boundary edges and content */
  readonly collisionPadding = input<number>(8);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Whether the content should match the trigger width */
  readonly matchTriggerWidth = input<boolean>(false);

  /** Current state: open or closed */
  protected readonly state = computed<PopoverContentState>(() =>
    this.context.open() ? 'open' : 'closed',
  );

  /** Computed position after collision detection */
  protected readonly computedSide = signal<Side>('bottom');
  protected readonly computedAlign = signal<Align>('center');
  protected readonly matchedWidth = signal<number | null>(null);
  protected readonly positionStyles = signal<Record<string, string>>({
    position: 'fixed',
    top: '-9999px',
    left: '-9999px',
  });

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
          { injector: this.injector },
        );
      } else {
        this.cancelScheduledPositionUpdate();
        this.isPositioned.set(false);
        this.positionStyles.set({
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
        });
        this.matchedWidth.set(null);
      }
    });
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
    const contentElement = this.elementRef.nativeElement.querySelector(
      '[role="dialog"]',
    ) as HTMLElement;

    if (!triggerElement || !contentElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const contentRect = contentElement.getBoundingClientRect();
    const overlayWidth = this.matchTriggerWidth()
      ? Math.round(triggerRect.width)
      : Math.round(contentRect.width || 288);
    const overlayHeight = Math.round(contentRect.height || 100);

    this.matchedWidth.set(this.matchTriggerWidth() ? overlayWidth : null);

    const result = computePosition(
      triggerRect,
      { width: overlayWidth, height: overlayHeight },
      {
        side: this.side(),
        align: this.align(),
        sideOffset: this.sideOffset(),
        alignOffset: this.alignOffset(),
        avoidCollisions: this.avoidCollisions(),
        collisionPadding: this.collisionPadding(),
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
      '--radix-popover-content-transform-origin': transformOrigin,
    });
    this.isPositioned.set(true);
  }

  protected readonly computedClass = computed(() =>
    cn(
      'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
      this.matchTriggerWidth() ? 'w-full' : 'w-72',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      !this.isPositioned() && 'pointer-events-none opacity-0',
      this.class(),
    ),
  );

  protected readonly mergedStyles = computed<Record<string, string>>(() => ({
    ...this.positionStyles(),
    ...(this.matchedWidth() !== null
      ? {
          width: `${this.matchedWidth()}px`,
          minWidth: `${this.matchedWidth()}px`,
          maxWidth: `${this.matchedWidth()}px`,
        }
      : {}),
  }));

  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      // Check if click is outside the popover
      const popoverContent = this.elementRef.nativeElement.querySelector('[role="dialog"]');
      if (popoverContent && !popoverContent.contains(target)) {
        this.context.setOpen(false);
      }
    }
  }

  onEscapeKey(): void {
    this.context.setOpen(false);
  }
}
