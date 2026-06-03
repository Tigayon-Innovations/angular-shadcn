import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Check, LucideAngularModule, Settings2 } from 'lucide-angular';
import { DATA_TABLE_CONTEXT } from './data-table-context';

/**
 * DataTableViewOptions component - column visibility options.
 */
@Component({
  selector: 'DataTableViewOptions',
  imports: [LucideAngularModule],
  template: `
    <div class="relative">
      <button
        class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        (click)="toggleDropdown()"
      >
        <lucide-icon [img]="icons.Settings2" class="mr-2 size-4" />
        View
      </button>
      @if (isOpen()) {
        <div
          class="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          <div class="px-2 py-1.5 text-sm font-semibold">Toggle columns</div>
          <div class="-mx-1 my-1 h-px bg-muted"></div>
          @for (column of toggleableColumns(); track column.id) {
            <button
              class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              (click)="toggleColumn(column.id)"
            >
              <span class="mr-2 flex h-4 w-4 items-center justify-center">
                @if (isColumnVisible(column.id)) {
                  <lucide-icon [img]="icons.Check" class="size-4" />
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
    'attr.data-slot': '"data-table-view-options"',
    '[class]': 'computedClass()',
    '(document:click)': 'onDocumentClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableViewOptions {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(DATA_TABLE_CONTEXT);

  protected readonly toggleableColumns = computed(() =>
    this.context.columns().filter((col) => col.enableHiding !== false),
  );
  protected readonly computedClass = computed(() => cn('ml-auto', this.class()));

  protected readonly isOpen = signal(false);

  protected readonly icons = { Settings2, Check };

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
