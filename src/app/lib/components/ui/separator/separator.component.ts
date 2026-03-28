import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export type SeparatorProps = {
  /** The orientation of the separator */
  orientation?: SeparatorOrientation;
  /**
   * Whether the separator is purely decorative.
   * When true, removes from accessibility tree (role="none").
   * When false, uses role="separator" for screen readers.
   */
  decorative?: boolean;
  /** Additional CSS classes to apply */
  class?: string;
};

/**
 * Separator component creates a visual divider between content.
 * Based on Radix UI Separator primitive with shadcn/ui styling.
 *
 * ## Features
 * - Horizontal or vertical orientation
 * - Decorative mode for purely visual separators
 * - Semantic separator role for accessibility when not decorative
 * - Full ARIA support
 *
 * ## Accessibility
 * - Uses `role="separator"` for semantic meaning (unless decorative)
 * - `aria-orientation` indicates the separator direction
 * - Decorative separators are hidden from assistive technology
 *
 * @example
 * <!-- Horizontal separator (default) -->
 * <div class="space-y-4">
 *   <p>Some content above</p>
 *   <Separator />
 *   <p>Some content below</p>
 * </div>
 *
 * @example
 * <!-- Vertical separator -->
 * <div class="flex h-5 items-center space-x-4 text-sm">
 *   <span>Blog</span>
 *   <Separator orientation="vertical" />
 *   <span>Docs</span>
 *   <Separator orientation="vertical" />
 *   <span>Source</span>
 * </div>
 *
 * @example
 * <!-- Decorative separator (hidden from screen readers) -->
 * <Separator [decorative]="true" />
 *
 * @example
 * <!-- With custom styling -->
 * <Separator class="my-4 bg-primary/50" />
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/separator Radix Separator}
 * @see {@link https://ui.shadcn.com/docs/components/separator shadcn/ui Separator}
 */
@Component({
  selector: 'Separator',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': 'role()',
    '[attr.aria-orientation]': 'ariaOrientation()',
    '[attr.data-orientation]': 'orientation()',
    'data-slot': 'separator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Separator {
  /** The orientation of the separator */
  readonly orientation = input<SeparatorOrientation>('horizontal');

  /**
   * Whether the separator is purely decorative.
   * When true, removes from accessibility tree.
   */
  readonly decorative = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed role - none for decorative, separator otherwise */
  protected readonly role = computed(() => (this.decorative() ? 'none' : 'separator'));

  /**
   * aria-orientation is only needed for non-decorative separators.
   * Per WAI-ARIA, separators default to horizontal, so we only need
   * to specify when vertical.
   */
  protected readonly ariaOrientation = computed(() => {
    if (this.decorative()) return undefined;
    // Only specify aria-orientation for vertical (horizontal is default)
    return this.orientation() === 'vertical' ? 'vertical' : undefined;
  });

  /** Computed class based on orientation */
  protected readonly computedClass = computed(() =>
    cn(
      // Base styles
      'bg-border shrink-0',
      // Orientation-specific styles
      this.orientation() === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      // Custom classes
      this.class(),
    ),
  );
}
