import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ScrollBarOrientation = 'vertical' | 'horizontal';

/**
 * Props for the ScrollBar component
 */
export interface ScrollBarProps {
  /** The orientation of the scrollbar.
   * @default 'vertical' */
  orientation?: ScrollBarOrientation;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component ScrollBar
 *
 * The scrollbar itself, shown inside ScrollArea.
 *
 * @description
 * ScrollBar provides a visual indicator of scroll position and allows
 * dragging to scroll. It matches the styling of shadcn/ui scrollbars.
 *
 * ## Features
 * - Vertical and horizontal orientations
 * - Styled thumb indicator
 * - Touch-friendly
 * - Consistent cross-browser appearance
 *
 * @example Vertical scrollbar (default)
 * ```html
 * <ScrollBar orientation="vertical" />
 * ```
 *
 * @example Horizontal scrollbar
 * ```html
 * <ScrollBar orientation="horizontal" />
 * ```
 *
 * @data-attributes
 * - `data-orientation` - 'vertical' | 'horizontal'
 */
@Component({
  selector: 'ScrollBar',
  template: ` <div [class]="thumbClass()"></div> `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-orientation]': 'orientation()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBar {
  /** The orientation of the scrollbar */
  readonly orientation = input<ScrollBarOrientation>('vertical');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex touch-none select-none transition-colors',
      this.orientation() === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      this.orientation() === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      this.class(),
    ),
  );

  protected readonly thumbClass = computed(() =>
    cn('relative rounded-full bg-border', this.orientation() === 'vertical' && 'flex-1'),
  );
}
