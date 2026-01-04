import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LucideAngularModule } from 'lucide-angular';
import { DATA_TABLE_CONTEXT } from './data-table-context';

/**
 * DataTablePagination component - pagination controls.
 */
@Component({
  selector: 'DataTablePagination',
  imports: [LucideAngularModule],
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
            <lucide-icon [img]="icons.ChevronsLeft" class="size-4" />
          </button>
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            [disabled]="!canPreviousPage()"
            (click)="previousPage()"
            aria-label="Go to previous page"
          >
            <lucide-icon [img]="icons.ChevronLeft" class="size-4" />
          </button>
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            [disabled]="!canNextPage()"
            (click)="nextPage()"
            aria-label="Go to next page"
          >
            <lucide-icon [img]="icons.ChevronRight" class="size-4" />
          </button>
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            [disabled]="!canNextPage()"
            (click)="lastPage()"
            aria-label="Go to last page"
          >
            <lucide-icon [img]="icons.ChevronsRight" class="size-4" />
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
  protected readonly icons = { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight };

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
