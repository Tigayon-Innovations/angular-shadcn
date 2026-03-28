import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DATA_TABLE_CONTEXT } from './data-table-context';

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
  /** Placeholder text */
  readonly placeholder = input<string>('Search...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(DATA_TABLE_CONTEXT);

  protected readonly computedClass = computed(() => cn('flex items-center', this.class()));
  protected readonly inputClass = computed(() =>
    cn(
      'flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context.onGlobalFilterChange(target.value);
  }
}
