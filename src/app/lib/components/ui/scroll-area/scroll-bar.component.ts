import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * ScrollBar component - custom styled scrollbar for ScrollArea.
 * Matches shadcn/ui React ScrollBar exactly.
 *
 * @example
 * <ScrollArea class="h-[200px]">
 *   <div>Content</div>
 *   <ScrollBar orientation="vertical" />
 * </ScrollArea>
 */
@Component({
  selector: 'ScrollBar',
  template: `
    <div [class]="thumbClass()"></div>
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBar {
  /** Orientation of the scrollbar */
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex touch-none select-none transition-colors',
      this.orientation() === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      this.orientation() === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      this.class()
    )
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'relative rounded-full bg-border',
      this.orientation() === 'vertical' && 'flex-1'
    )
  );
}
