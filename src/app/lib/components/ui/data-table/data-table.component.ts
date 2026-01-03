import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    forwardRef,
    inject,
    input,
    output,
    signal
} from '@angular/core';
import {
    ColumnDef,
    ColumnVisibilityState,
    DATA_TABLE_CONTEXT,
    DataTableContext,
    RowSelectionState,
    SortDirection,
    SortingState,
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

  /** Sorting change event */
  readonly sortingChange = output<SortingState[]>();

  /** Row selection change event */
  readonly rowSelectionChange = output<RowSelectionState>();

  /** Additional CSS classes */
  readonly class = input<string>('');

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

  protected readonly computedClass = computed(() =>
    cn('w-full space-y-4', this.class())
  );
}

/**
 * DataTableToolbar component - toolbar with search and options.
 */
@Component({
  selector: 'DataTableToolbar',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableToolbar {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center justify-between', this.class())
  );
}

/**
 * DataTableSearch component - global search input.
 */
@Component({
  selector: 'DataTableSearch',
  template: `
    <input
      [class]="inputClass()"
      [placeholder]="placeholder()"
      [value]="context.globalFilter()"
      (input)="onInput($event)"
    />
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableSearch {
  protected readonly context = inject(DATA_TABLE_CONTEXT);

  /** Placeholder text */
  readonly placeholder = input<string>('Search...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center', this.class())
  );

  protected readonly inputClass = computed(() =>
    cn(
      'flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
    )
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context.onGlobalFilterChange(target.value);
  }
}

/**
 * DataTableContent component - the actual table content.
 */
@Component({
  selector: 'DataTableContent',
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
                      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                    } @else if (getSortDirection(column.id) === 'desc') {
                      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                    } @else {
                      <svg class="size-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
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

        const aVal = this.getCellValue(a, column);
        const bVal = this.getCellValue(b, column);

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

/**
 * DataTablePagination component - pagination controls.
 */
@Component({
  selector: 'DataTablePagination',
  template: `
    <div class="flex items-center justify-between px-2">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ selectedCount() }} of {{ totalCount() }} row(s) selected.
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">Rows per page</p>
          <select
            class="h-8 w-[70px] rounded-md border border-input bg-transparent px-2 py-1 text-sm"
            [value]="context.pageSize()"
            (change)="onPageSizeChange($event)"
          >
            @for (size of pageSizeOptions(); track size) {
              <option [value]="size">{{ size }}</option>
            }
          </select>
        </div>
        <div class="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {{ context.pageIndex() + 1 }} of {{ pageCount() }}
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            [disabled]="!canPreviousPage()"
            (click)="firstPage()"
            aria-label="Go to first page"
          >
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
          </button>
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            [disabled]="!canPreviousPage()"
            (click)="previousPage()"
            aria-label="Go to previous page"
          >
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            [disabled]="!canNextPage()"
            (click)="nextPage()"
            aria-label="Go to next page"
          >
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            [disabled]="!canNextPage()"
            (click)="lastPage()"
            aria-label="Go to last page"
          >
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTablePagination {
  protected readonly context = inject(DATA_TABLE_CONTEXT);

  /** Page size options */
  readonly pageSizeOptions = input<number[]>([10, 20, 30, 40, 50]);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly totalCount = computed(() => this.context.data().length);

  protected readonly selectedCount = computed(
    () => Object.keys(this.context.rowSelection()).filter((k) => this.context.rowSelection()[k]).length
  );

  protected readonly pageCount = computed(() => {
    const total = this.totalCount();
    const pageSize = this.context.pageSize();
    return Math.ceil(total / pageSize);
  });

  protected readonly canPreviousPage = computed(
    () => this.context.pageIndex() > 0
  );

  protected readonly canNextPage = computed(
    () => this.context.pageIndex() < this.pageCount() - 1
  );

  protected readonly computedClass = computed(() =>
    cn('flex items-center justify-end space-x-2 py-4', this.class())
  );

  protected onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const pageSize = parseInt(target.value, 10);
    this.context.onPaginationChange(0, pageSize);
  }

  protected firstPage(): void {
    this.context.onPaginationChange(0, this.context.pageSize());
  }

  protected previousPage(): void {
    const newIndex = Math.max(0, this.context.pageIndex() - 1);
    this.context.onPaginationChange(newIndex, this.context.pageSize());
  }

  protected nextPage(): void {
    const newIndex = Math.min(this.pageCount() - 1, this.context.pageIndex() + 1);
    this.context.onPaginationChange(newIndex, this.context.pageSize());
  }

  protected lastPage(): void {
    this.context.onPaginationChange(this.pageCount() - 1, this.context.pageSize());
  }
}

/**
 * DataTableViewOptions component - column visibility options.
 */
@Component({
  selector: 'DataTableViewOptions',
  template: `
    <div class="relative">
      <button
        class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        (click)="toggleDropdown()"
      >
        <svg class="mr-2 size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        View
      </button>
      @if (isOpen()) {
        <div class="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <div class="px-2 py-1.5 text-sm font-semibold">Toggle columns</div>
          <div class="-mx-1 my-1 h-px bg-muted"></div>
          @for (column of toggleableColumns(); track column.id) {
            <button
              class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              (click)="toggleColumn(column.id)"
            >
              <span class="mr-2 flex h-4 w-4 items-center justify-center">
                @if (isColumnVisible(column.id)) {
                  <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                }
              </span>
              {{ column.header }}
            </button>
          }
        </div>
      }
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
    '(document:click)': 'onDocumentClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableViewOptions {
  protected readonly context = inject(DATA_TABLE_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly isOpen = signal(false);

  protected readonly toggleableColumns = computed(() =>
    this.context.columns().filter((col) => col.enableHiding !== false)
  );

  protected readonly computedClass = computed(() =>
    cn('ml-auto', this.class())
  );

  protected toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  protected onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-slot="data-table"]')) {
      this.isOpen.set(false);
    }
  }

  protected isColumnVisible(columnId: string): boolean {
    return this.context.columnVisibility()[columnId] !== false;
  }

  protected toggleColumn(columnId: string): void {
    const visibility = { ...this.context.columnVisibility() };
    visibility[columnId] = !visibility[columnId];
    this.context.onColumnVisibilityChange(visibility);
  }
}
