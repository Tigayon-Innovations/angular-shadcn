import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Table component - base table wrapper.
 * Matches shadcn/ui React Table exactly.
 *
 * @example
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Status</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>Active</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
@Component({
  selector: 'Table',
  template: `
    <table [class]="tableClass()">
      <ng-content />
    </table>
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('relative w-full overflow-auto', this.class()),
  );

  protected readonly tableClass = computed(() =>
    cn('w-full caption-bottom text-sm border-collapse'),
  );
}
