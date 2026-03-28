import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * TableHead component - th wrapper.
 * Matches shadcn/ui React TableHead exactly.
 *
 * ACCESSIBILITY: Includes scope="col" by default for proper table semantics.
 */
@Component({
  selector: 'TableHead',
  template: `<th [scope]="scope()" [class]="computedClass()"><ng-content /></th>`,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHead {
  /** Scope attribute for accessibility (col, row, colgroup, rowgroup) */
  readonly scope = input<'col' | 'row' | 'colgroup' | 'rowgroup'>('col');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this.class(),
    ),
  );
}
