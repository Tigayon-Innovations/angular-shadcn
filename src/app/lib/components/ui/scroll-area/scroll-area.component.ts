import { cn } from '@/lib/utils';
import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * ScrollArea component - augments native scroll with custom styled scrollbars.
 * Matches shadcn/ui React ScrollArea exactly.
 *
 * @example
 * <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
 *   <div>Long scrollable content here...</div>
 *   <ScrollBar orientation="vertical" />
 * </ScrollArea>
 */
@Component({
  selector: 'ScrollArea',
  imports: [CdkScrollable],
  template: `
    <div class="h-full w-full overflow-hidden" cdkScrollable>
      <div [class]="viewportClass()">
        <ng-content />
      </div>
    </div>
    <ng-content select="ScrollBar" />
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollArea {
  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Type of scrollbar - 'auto' shows on hover, 'always' always shows, 'scroll' shows when scrolling, 'hover' shows on parent hover */
  readonly type = input<'auto' | 'always' | 'scroll' | 'hover'>('hover');

  protected readonly computedClass = computed(() =>
    cn('relative overflow-hidden', this.class())
  );

  protected readonly viewportClass = computed(() =>
    cn(
      'h-full w-full rounded-[inherit]',
      '[&>div]:!block',
      // Hide native scrollbar
      '[&::-webkit-scrollbar]:hidden',
      '[-ms-overflow-style:none]',
      '[scrollbar-width:none]',
      'overflow-auto'
    )
  );
}
