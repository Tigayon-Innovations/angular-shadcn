import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import {
  ColumnVisibilityState,
  DATA_TABLE_CONTEXT,
  DataTableContext,
  RowSelectionState,
  SortingState,
  type ColumnDef,
} from './data-table-context';

/**
 * DataTable component - sortable, filterable, selectable data table.
 *
 * @example
 * <DataTable [data]="users" [columns]="columns">
 *   <DataTableToolbar>
 *     <DataTableSearch placeholder="Search users..." />
 *     <DataTableViewOptions />
 *   </DataTableToolbar>
 *   <DataTableContent />
 *   <DataTablePagination />
 * </DataTable>
 */
@Component({
  selector: 'DataTable',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'data-table',
    ngSkipHydration: 'true',
  },
  providers: [
    {
      provide: DATA_TABLE_CONTEXT,
      useFactory: <T>(component: DataTable<T>) => component.context,
      deps: [forwardRef(() => DataTable)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTable<T = unknown> {
  constructor() {
    // Sync data
    effect(() => {
      this.context.data.set(this.data());
    });

    // Sync columns
    effect(() => {
      this.context.columns.set(this.columns());
      // Initialize column visibility
      const visibility: ColumnVisibilityState = {};
      this.columns().forEach((col) => {
        visibility[col.id] = true;
      });
      this.context.columnVisibility.set(visibility);
    });
  }

  /** Sorting change event */
  readonly sortingChange = output<SortingState[]>();
  /** Row selection change event */
  readonly rowSelectionChange = output<RowSelectionState>();

  /** The data to display */
  readonly data = input.required<T[]>();
  /** Column definitions */
  readonly columns = input.required<ColumnDef<T>[]>();

  /** Page size options */
  readonly pageSizeOptions = input<number[]>([10, 20, 30, 40, 50]);
  /** Initial page size */
  readonly initialPageSize = input<number>(10);
  /** Enable row selection */
  readonly enableRowSelection = input<boolean>(false);
  /** Enable multi-row selection */
  readonly enableMultiRowSelection = input<boolean>(true);
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('w-full space-y-4', this.class()));

  /** Context for child components */
  readonly context: DataTableContext<T> = {
    data: signal<T[]>([]),
    columns: signal<ColumnDef<T>[]>([]),
    sorting: signal<SortingState[]>([]),
    columnVisibility: signal<ColumnVisibilityState>({}),
    rowSelection: signal<RowSelectionState>({}),
    globalFilter: signal<string>(''),
    pageIndex: signal<number>(0),
    pageSize: signal<number>(this.initialPageSize()),
    onSortingChange: (sorting: SortingState[]) => {
      this.context.sorting.set(sorting);
      this.sortingChange.emit(sorting);
    },
    onColumnVisibilityChange: (visibility: ColumnVisibilityState) => {
      this.context.columnVisibility.set(visibility);
    },
    onRowSelectionChange: (selection: RowSelectionState) => {
      this.context.rowSelection.set(selection);
      this.rowSelectionChange.emit(selection);
    },
    onGlobalFilterChange: (filter: string) => {
      this.context.globalFilter.set(filter);
      this.context.pageIndex.set(0); // Reset to first page on filter
    },
    onPaginationChange: (pageIndex: number, pageSize: number) => {
      this.context.pageIndex.set(pageIndex);
      this.context.pageSize.set(pageSize);
    },
  };
}
