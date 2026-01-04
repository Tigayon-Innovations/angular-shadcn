import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { ArrowDown, ArrowUp, ArrowUpDown, LucideAngularModule } from 'lucide-angular';
import {
    DATA_TABLE_CONTEXT,
    DataTableContext,
    SortDirection,
    SortingState,
    type ColumnDef,
} from './data-table-context';

/**
 * DataTableContent component - the actual table content.
 */
@Component({
  selector: 'DataTableContent',
  imports: [LucideAngularModule],
  template: `
    <div class="rounded-md border">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            @for (column of visibleColumns(); track column.id) {
              <th
                class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                [style.width.px]="column.size"
              >
                @if (column.enableSorting !== false) {
                  <button
                    class="flex items-center gap-1 hover:text-foreground"
                    (click)="toggleSort(column.id)"
                  >
                    {{ column.header }}
                    @if (getSortDirection(column.id) === 'asc') {
                      <lucide-icon [img]="icons.ArrowUp" class="size-4" />
                    } @else if (getSortDirection(column.id) === 'desc') {
                      <lucide-icon [img]="icons.ArrowDown" class="size-4" />
                    } @else {
                      <lucide-icon [img]="icons.ArrowUpDown" class="size-4 opacity-50" />
                    }
                  </button>
                } @else {
                  {{ column.header }}
                }
              </th>
            }
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          @for (row of paginatedData(); track $index; let i = $index) {
            <tr
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              [attr.data-state]="isRowSelected(i) ? 'selected' : null"
            >
              @for (column of visibleColumns(); track column.id) {
                <td class="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                  {{ getCellValue(row, column) }}
                </td>
              }
            </tr>
          } @empty {
            <tr>
              <td
                [attr.colspan]="visibleColumns().length"
                class="h-24 text-center text-muted-foreground"
              >
                No results.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableContent<T = unknown> {
  protected readonly context = inject(DATA_TABLE_CONTEXT) as DataTableContext<T>;
  protected readonly icons = { ArrowUp, ArrowDown, ArrowUpDown };

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Visible columns based on visibility state */
  protected readonly visibleColumns = computed(() => {
    const columns = this.context.columns();
    const visibility = this.context.columnVisibility();
    return columns.filter((col) => visibility[col.id] !== false);
  });

  /** Filtered data based on global filter */
  protected readonly filteredData = computed(() => {
    const data = this.context.data();
    const filter = this.context.globalFilter().toLowerCase();
    const columns = this.context.columns();

    if (!filter) return data;

    return data.filter((row) =>
      columns.some((col) => {
        const value = this.getCellValue(row, col);
        return String(value).toLowerCase().includes(filter);
      })
    );
  });

  /** Sorted data */
  protected readonly sortedData = computed(() => {
    const data = [...this.filteredData()];
    const sorting = this.context.sorting();

    if (sorting.length === 0) return data;

    const columns = this.context.columns();

    return data.sort((a, b) => {
      for (const sort of sorting) {
        const column = columns.find((c) => c.id === sort.id);
        if (!column) continue;

        const aVal = this.getCellValue(a, column) as string | number;
        const bVal = this.getCellValue(b, column) as string | number;

        if (aVal < bVal) return sort.desc ? 1 : -1;
        if (aVal > bVal) return sort.desc ? -1 : 1;
      }
      return 0;
    });
  });

  /** Paginated data */
  protected readonly paginatedData = computed(() => {
    const data = this.sortedData();
    const pageIndex = this.context.pageIndex();
    const pageSize = this.context.pageSize();
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  });

  protected readonly computedClass = computed(() => cn(this.class()));

  protected getCellValue(row: T, column: ColumnDef<T>): unknown {
    if (column.accessorFn) {
      return column.accessorFn(row);
    }
    if (column.accessorKey) {
      return row[column.accessorKey];
    }
    return '';
  }

  protected getSortDirection(columnId: string): SortDirection {
    const sorting = this.context.sorting();
    const sort = sorting.find((s) => s.id === columnId);
    if (!sort) return null;
    return sort.desc ? 'desc' : 'asc';
  }

  protected toggleSort(columnId: string): void {
    const sorting = this.context.sorting();
    const existingSort = sorting.find((s) => s.id === columnId);

    let newSorting: SortingState[];
    if (!existingSort) {
      newSorting = [{ id: columnId, desc: false }];
    } else if (!existingSort.desc) {
      newSorting = [{ id: columnId, desc: true }];
    } else {
      newSorting = [];
    }

    this.context.onSortingChange(newSorting);
  }

  protected isRowSelected(index: number): boolean {
    const selection = this.context.rowSelection();
    return selection[String(index)] === true;
  }
}
