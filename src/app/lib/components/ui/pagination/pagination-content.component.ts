import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * PaginationContent component - ul container.
 * Matches shadcn/ui React PaginationContent exactly.
 */
@Component({
  selector: 'PaginationContent',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-row items-center gap-1', this.class()),
  );
}
