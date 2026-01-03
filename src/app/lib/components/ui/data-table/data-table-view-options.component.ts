import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    signal,
} from '@angular/core';
import { DATA_TABLE_CONTEXT } from './data-table-context';

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
