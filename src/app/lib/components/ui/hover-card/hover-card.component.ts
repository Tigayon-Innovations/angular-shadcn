import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { HOVER_CARD_CONTEXT, type HoverCardContextValue } from './hover-card-context';

export type HoverCardState = 'open' | 'closed';

/**
 * Props for the HoverCard component
 */
export interface HoverCardProps {
  /** The open state of the hover card when initially rendered.
   * Use when you do not need to control its open state.
   * @default false */
  defaultOpen?: boolean;
  /** The controlled open state of the hover card.
   * Must be used in conjunction with onOpenChange. */
  open?: boolean;
  /** The duration from when the pointer enters the trigger until the hover card opens.
   * @default 700 */
  openDelay?: number;
  /** The duration from when the pointer leaves the trigger/content until the hover card closes.
   * @default 300 */
  closeDelay?: number;
}

/**
 * @component HoverCard
 *
 * For sighted users to preview content available behind a link.
 *
 * @description
 * HoverCard provides a preview of content when the user hovers over a trigger,
 * typically a link. It's useful for displaying additional information without
 * navigating away from the current page.
 *
 * ## Features
 * - Opens on hover with configurable delay
 * - Stays open when hovering content
 * - Keyboard accessible via focus
 * - Configurable open/close delays
 * - Controlled and uncontrolled usage
 *
 * ## Accessibility
 * - Opens on focus for keyboard users
 * - Escape key dismisses hover card
 * - `aria-expanded` on trigger
 * - `role="dialog"` on content
 *
 * ## Keyboard Navigation
 * - `Tab` - Focus trigger opens hover card
 * - `Escape` - Close hover card
 * - `Enter` / `Space` - Toggle hover card (when focused)
 *
 * @example Basic usage
 * ```html
 * <HoverCard>
 *   <HoverCardTrigger>
 *     <a href="#">&#64;username</a>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div class="flex gap-4">
 *       <Avatar>
 *         <AvatarImage src="/avatar.png" />
 *       </Avatar>
 *       <div>
 *         <h4 class="font-semibold">Username</h4>
 *         <p class="text-sm">Bio information here</p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 *
 * @example With custom delays
 * ```html
 * <HoverCard [openDelay]="500" [closeDelay]="200">
 *   <HoverCardTrigger>Quick preview</HoverCardTrigger>
 *   <HoverCardContent>Preview content</HoverCardContent>
 * </HoverCard>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed' (on trigger and content)
 */
@Component({
  selector: 'HoverCard',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"hover-card"',
    class: 'inline-block',
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
  constructor() {
    if (this.defaultOpen()) {
      this.open.set(true);
    }
  }

  /** Event handler called when the open state changes */
  readonly openChange = output<boolean>();

  /** The open state of the hover card when initially rendered */
  readonly defaultOpen = input<boolean>(false);
  /** The controlled open state of the hover card */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  readonly open = signal(false);

  /** Reference to the trigger element for fixed positioning */
  readonly triggerRef: WritableSignal<HTMLElement | null> = signal<HTMLElement | null>(null);

  /** The duration from when the pointer enters the trigger until the hover card opens (ms) */
  readonly openDelay = input<number>(700);
  /** The duration from when the pointer leaves the trigger/content until the hover card closes (ms) */
  readonly closeDelay = input<number>(300);

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
