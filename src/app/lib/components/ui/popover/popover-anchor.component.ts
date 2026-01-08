import {
    ChangeDetectionStrategy,
    Component,
    input,
} from '@angular/core';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the PopoverAnchor component
 */
export interface PopoverAnchorProps {
  /** Change the default rendered element for the one passed as a child.
   * @default false */
  asChild?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component PopoverAnchor
 *
 * An optional element to position the popover against.
 *
 * @description
 * PopoverAnchor allows you to use a different element as the positioning
 * anchor instead of the trigger. This is useful when you want the popover
 * to appear relative to a different element than what opens it.
 *
 * ## Features
 * - Custom positioning anchor
 * - Separates trigger from positioning
 *
 * @example Using anchor for positioning
 * ```html
 * <Popover>
 *   <PopoverAnchor>
 *     <div class="anchor-point">Anchor here</div>
 *   </PopoverAnchor>
 *   <PopoverTrigger>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Positioned relative to anchor
 *   </PopoverContent>
 * </Popover>
 * ```
 */
@Component({
  selector: 'PopoverAnchor',
  template: `<ng-content />`,
  host: {
    class: 'inline-block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverAnchor {
  /** Change the default rendered element for the one passed as a child */
  readonly asChild = input<boolean>(false);
}
