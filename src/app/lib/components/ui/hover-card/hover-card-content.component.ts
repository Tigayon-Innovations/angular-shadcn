import { cn, Presence } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    OnDestroy,
} from '@angular/core';
import { HOVER_CARD_CONTEXT, HoverCardAlign, HoverCardSide } from './hover-card-context';

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Component
// ============================================================================

/**
 * @component HoverCardContent
 *
 * The component that pops out when the hover card is open.
 *
 * @description
 * HoverCardContent displays the preview content. It stays open when
 * hovered, allowing users to interact with the content.
 *
 * ## Features
 * - Stays open when content is hovered
 * - Configurable side and alignment
 * - Smooth animations
 * - Escape key to dismiss
 *
 * ## Accessibility
 * - `role="dialog"` on the content
 * - Focusable content items
 * - Escape returns focus to trigger
 *
 * @example Basic usage
 * ```html
 * <HoverCardContent>
 *   <p>Preview content</p>
 * </HoverCardContent>
 * ```
 *
 * @example With positioning
 * ```html
 * <HoverCardContent side="right" align="start">
 *   <p>Right-aligned content</p>
 * </HoverCardContent>
 * ```
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
        [attr.data-state]="state()"
        [attr.data-side]="side()"
        [attr.data-align]="align()"
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
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCardContent implements OnDestroy {
  protected readonly context = inject(HOVER_CARD_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** The preferred side of the trigger to render against */
  readonly side = input<HoverCardSide>('bottom');

  /** The distance in pixels from the trigger */
  readonly sideOffset = input<number>(4);

  /** The preferred alignment against the trigger */
  readonly align = input<HoverCardAlign>('center');

  /** Additional CSS classes */
  readonly class = input<string>('');

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Current state: open or closed */
  protected readonly state = computed<HoverCardContentState>(() =>
    this.context.open() ? 'open' : 'closed'
  );

  protected readonly computedClass = computed(() => {
    const sideClasses = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
      right: 'left-full ml-2',
    };

    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return cn(
      'absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sideClasses[this.side()],
      this.side() === 'top' || this.side() === 'bottom' ? alignClasses[this.align()] : '',
      this.class()
    );
  });

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  onMouseEnter(): void {
    this.clearTimeout();
  }

  onMouseLeave(): void {
    this.closeTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, this.context.closeDelay);
  }

  onFocusIn(): void {
    this.clearTimeout();
  }

  onFocusOut(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    const trigger = this.elementRef.nativeElement.parentElement?.querySelector('[data-state]');

    // Check if focus moved to trigger or stayed within content
    if (relatedTarget && (trigger === relatedTarget || trigger?.contains(relatedTarget))) {
      return;
    }

    this.closeTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, this.context.closeDelay);
  }

  onEscape(): void {
    this.context.setOpen(false);
    // Return focus to trigger
    const trigger = this.elementRef.nativeElement.parentElement?.querySelector('[data-state]') as HTMLElement;
    trigger?.focus();
  }

  private clearTimeout(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}
