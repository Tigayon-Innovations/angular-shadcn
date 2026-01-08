import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    input,
    output,
    signal,
} from '@angular/core';
import { POPOVER_CONTEXT, type PopoverContextValue } from './popover-context';

// ============================================================================
// Types
// ============================================================================

export type PopoverState = 'open' | 'closed';

/**
 * Props for the Popover component
 */
export interface PopoverProps {
  /** The open state of the popover when initially rendered.
   * Use when you do not need to control its open state.
   * @default false */
  defaultOpen?: boolean;
  /** The controlled open state of the popover.
   * Must be used in conjunction with onOpenChange. */
  open?: boolean;
  /** The modality of the popover. When set to true,
   * interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   * @default false */
  modal?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component Popover
 *
 * Displays rich content in a portal, triggered by a button.
 *
 * @description
 * Popover provides a container for displaying floating content triggered by
 * a button. It manages open/closed state and provides context for positioning.
 *
 * ## Features
 * - Click to toggle open/close
 * - Modal and non-modal modes
 * - Click outside to close
 * - Escape key to close
 * - Controlled and uncontrolled usage
 * - Collision-aware positioning
 *
 * ## Accessibility
 * - `aria-expanded` on trigger
 * - `aria-haspopup="dialog"` on trigger
 * - `role="dialog"` on content
 * - Focus management in modal mode
 * - Escape key dismisses popover
 *
 * ## Keyboard Navigation
 * - `Enter` / `Space` - Toggle popover (on trigger)
 * - `Escape` - Close popover
 *
 * @example Basic usage
 * ```html
 * <Popover>
 *   <PopoverTrigger>
 *     <Button variant="outline">Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>Content here</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example Controlled
 * ```html
 * <Popover [open]="isOpen" (openChange)="isOpen = $event">
 *   <PopoverTrigger>
 *     <Button>Settings</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Settings panel content
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example Modal mode
 * ```html
 * <Popover [modal]="true">
 *   <PopoverTrigger>
 *     <Button>Modal Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Focus is trapped here
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed' (on content)
 */
@Component({
  selector: 'Popover',
  template: `<ng-content />`,
  host: {
    class: 'relative inline-block',
  },
  providers: [
    {
      provide: POPOVER_CONTEXT,
      useExisting: forwardRef(() => Popover),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popover implements PopoverContextValue {
  /** The open state of the popover when initially rendered */
  readonly defaultOpen = input<boolean>(false);

  /** The controlled open state of the popover */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** The modality of the popover */
  readonly modal = input<boolean>(false);

  /** Event handler called when the open state changes */
  readonly openChange = output<boolean>();

  readonly open = signal(false);

  /** Reference to the trigger element for positioning */
  readonly triggerRef = signal<HTMLElement | null>(null);

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
    this.openChange.emit(open);
  }

  toggle(): void {
    this.setOpen(!this.open());
  }

  /** Set the trigger element reference */
  setTriggerRef(element: HTMLElement | null): void {
    this.triggerRef.set(element);
  }

  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
