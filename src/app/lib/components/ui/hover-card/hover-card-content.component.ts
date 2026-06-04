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
  OnDestroy,
  signal,
} from '@angular/core';
import { HOVER_CARD_CONTEXT, HoverCardAlign, HoverCardSide } from './hover-card-context';

export type HoverCardContentState = 'open' | 'closed';

/**
 * Props for the HoverCardContent component
 */
export interface HoverCardContentProps {
  /** The preferred side of the trigger to render against.
   * @default 'bottom' */
  side?: HoverCardSide;
  /** The distance in pixels from the trigger.
   * @default 4 */
  sideOffset?: number;
  /** The preferred alignment against the trigger.
   * @default 'center' */
  align?: HoverCardAlign;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component HoverCardContent
 *
 * The component that pops out when the hover card is open.
 *
 * @description
 * HoverCardContent displays the preview content. It stays open when
 * hovered, allowing users to interact with the content.
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed'
 * - `data-side` - 'top' | 'right' | 'bottom' | 'left'
 * - `data-align` - 'start' | 'center' | 'end'
 */
@Component({
  selector: 'HoverCardContent',
  imports: [Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        role="dialog"
        [attr.aria-modal]="false"
        tabindex="-1"
        [class]="computedClass()"
        [style]="positionStyles()"
        [attr.data-state]="state()"
        [attr.data-side]="computedSide()"
        [attr.data-align]="computedAlign()"
        data-slot="hover-card-content"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
        (focusin)="onFocusIn()"
        (focusout)="onFocusOut($event)"
        (keydown.escape)="onEscape()"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    'attr.data-slot': '"hover-card-content"',
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCardContent implements OnDestroy {
  constructor() {
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
        this.positionStyles.set({ position: 'fixed', top: '-9999px', left: '-9999px' });
      }
    });
  }

  /** The preferred side of the trigger to render against */
  readonly side = input<HoverCardSide>('bottom');
  /** The distance in pixels from the trigger */
  readonly sideOffset = input<number>(4);
  /** The preferred alignment against the trigger */
  readonly align = input<HoverCardAlign>('center');
  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _injector = inject(Injector);

  protected readonly context = inject(HOVER_CARD_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'fixed z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      !this.isPositioned() && 'pointer-events-none opacity-0',
      this.class(),
    ),
  );

  protected readonly positionStyles = signal<Record<string, string>>({
    position: 'fixed',
    top: '-9999px',
    left: '-9999px',
  });
  protected readonly isPositioned = signal(false);
  protected readonly computedSide = signal<Side>('bottom');
  protected readonly computedAlign = signal<Align>('center');

  /** Current state: open or closed */
  protected readonly state = computed<HoverCardContentState>(() =>
    this.context.open() ? 'open' : 'closed',
  );

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;
  private positionFrameId: number | null = null;

  ngOnDestroy(): void {
    this.clearCloseTimeout();
    this.cancelScheduledPositionUpdate();
  }

  onMouseEnter(): void {
    this.clearCloseTimeout();
  }
  onMouseLeave(): void {
    this.closeTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, this.context.closeDelay());
  }
  onFocusIn(): void {
    this.clearCloseTimeout();
  }
  onFocusOut(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    const trigger = this.context.triggerRef();

    if (relatedTarget && (trigger === relatedTarget || trigger?.contains(relatedTarget))) {
      return;
    }

    this.closeTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, this.context.closeDelay());
  }
  onEscape(): void {
    this.context.setOpen(false);
    this.context.triggerRef()?.focus();
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
    const triggerElement = this.context.triggerRef();
    const contentElement = this._elementRef.nativeElement.querySelector(
      '[role="dialog"]',
    ) as HTMLElement;

    if (!triggerElement || !contentElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const contentRect = contentElement.getBoundingClientRect();
    const overlayWidth = Math.round(contentRect.width || 256);
    const overlayHeight = Math.round(contentRect.height || 100);

    const result = computePosition(
      triggerRect,
      { width: overlayWidth, height: overlayHeight },
      {
        side: this.side(),
        align: this.align(),
        sideOffset: this.sideOffset(),
        alignOffset: 0,
        avoidCollisions: true,
        collisionPadding: 8,
      },
    );

    this.computedSide.set(result.side);
    this.computedAlign.set(result.align);

    const transformOrigin = getTransformOrigin(result.side, result.align);
    this.positionStyles.set({
      position: 'fixed',
      top: result.styles.top || '',
      left: result.styles.left || '',
      '--radix-hover-card-content-transform-origin': transformOrigin,
    });
    this.isPositioned.set(true);
  }

  private clearCloseTimeout(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}
