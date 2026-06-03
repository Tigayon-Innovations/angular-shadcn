import { cn } from '@/lib/utils';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ScrollAreaType = 'auto' | 'always' | 'scroll' | 'hover';
export type ScrollAreaScrollbarVisibility = 'always' | 'scroll' | 'auto' | 'hover';

/**
 * Props for the ScrollArea component
 */
export interface ScrollAreaProps {
  /** Describes the nature of scrollbar visibility.
   * - 'auto': Scrollbars are visible when content is overflowing.
   * - 'always': Scrollbars are always visible.
   * - 'scroll': Scrollbars are visible when the user is scrolling.
   * - 'hover': Scrollbars are visible when hovering over the scroll area.
   * @default 'hover' */
  type?: ScrollAreaType;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component ScrollArea
 *
 * Augments native scroll functionality for custom, cross-browser styling.
 *
 * @description
 * ScrollArea provides a consistent scrolling experience with custom-styled
 * scrollbars across all browsers. It wraps content and provides optional
 * ScrollBar components for visual feedback.
 *
 * ## Features
 * - Custom styled scrollbars
 * - Consistent cross-browser appearance
 * - Configurable visibility (auto, always, scroll, hover)
 * - Supports both vertical and horizontal scrolling
 * - Uses Angular CDK for scroll container management
 *
 * ## Accessibility
 * - Native scroll behavior preserved
 * - Keyboard scrolling works normally
 * - Screen readers see content normally
 *
 * @example Basic usage
 * ```html
 * <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
 *   <div>Long scrollable content here...</div>
 *   <ScrollBar orientation="vertical" />
 * </ScrollArea>
 * ```
 *
 * @example With horizontal scrollbar
 * ```html
 * <ScrollArea class="w-96 whitespace-nowrap">
 *   <div class="flex gap-4">
 *     <div *ngFor="let item of items">{{ item }}</div>
 *   </div>
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 *
 * @example Both scrollbars
 * ```html
 * <ScrollArea class="h-[400px] w-[400px]">
 *   <div class="w-[600px]">Wide and tall content</div>
 *   <ScrollBar orientation="vertical" />
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 *
 * @data-attributes
 * - `data-radix-scroll-area-viewport` - On the viewport element (for compatibility)
 */
@Component({
  selector: 'ScrollArea',
  imports: [CdkScrollable],
  template: `
    <div class="h-full w-full overflow-hidden" cdkScrollable>
      <div [class]="viewportClass()" data-radix-scroll-area-viewport>
        <ng-content />
      </div>
    </div>
    <ng-content select="ScrollBar" />
  `,
  host: {
    'attr.data-slot': '"scroll-area"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollArea {
  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Describes the nature of scrollbar visibility */
  readonly type = input<ScrollAreaType>('hover');

  protected readonly computedClass = computed(() => cn('relative overflow-hidden', this.class()));

  protected readonly viewportClass = computed(() =>
    cn(
      'h-full w-full rounded-[inherit]',
      '[&>div]:!block',
      // Hide native scrollbar
      '[&::-webkit-scrollbar]:hidden',
      '[-ms-overflow-style:none]',
      '[scrollbar-width:none]',
      'overflow-auto',
    ),
  );
}
