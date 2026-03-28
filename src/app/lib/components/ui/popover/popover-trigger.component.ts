import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { POPOVER_CONTEXT } from './popover-context';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the PopoverTrigger component
 */
export interface PopoverTriggerProps {
  /** Change the default rendered element for the one passed as a child.
   * @default false */
  asChild?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component PopoverTrigger
 *
 * The button that toggles the popover.
 *
 * @description
 * PopoverTrigger wraps the element that opens/closes the popover when clicked.
 * It registers itself as the positioning anchor for the popover content.
 *
 * ## Features
 * - Click to toggle popover
 * - Registers as positioning anchor
 * - Proper ARIA attributes
 *
 * ## Accessibility
 * - `aria-expanded` reflects open state
 * - `aria-haspopup="dialog"` indicates popover type
 *
 * @example Basic usage
 * ```html
 * <PopoverTrigger>
 *   <Button variant="outline">Open</Button>
 * </PopoverTrigger>
 * ```
 *
 * @example With icon button
 * ```html
 * <PopoverTrigger>
 *   <Button variant="ghost" size="icon">
 *     <SettingsIcon />
 *   </Button>
 * </PopoverTrigger>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed'
 */
@Component({
  selector: 'PopoverTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverTrigger implements OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);
  private readonly elementRef = inject(ElementRef);

  /** Change the default rendered element for the one passed as a child */
  readonly asChild = input<boolean>(false);

  constructor() {
    // Register this element as the trigger reference (browser-only)
    afterNextRender(() => {
      const hostElement = this.elementRef.nativeElement as HTMLElement;
      const triggerElement =
        hostElement.firstElementChild instanceof HTMLElement
          ? hostElement.firstElementChild
          : hostElement;

      this.context.setTriggerRef?.(triggerElement);
    });
  }

  ngOnDestroy(): void {
    // Clean up trigger reference
    this.context.setTriggerRef?.(null);
  }

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.toggle();
  }
}
