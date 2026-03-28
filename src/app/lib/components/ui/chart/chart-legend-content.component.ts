import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CHART_COLORS, CHART_CONTEXT } from './chart-context';

/**
 * ChartLegendContent component - content inside legend.
 */
@Component({
  selector: 'ChartLegendContent',
  template: `
    @for (item of items(); track item.label) {
      <div class="flex items-center gap-2">
        <div class="h-2 w-2 rounded-full" [style.backgroundColor]="item.color"></div>
        <span class="text-sm text-muted-foreground">{{ item.label }}</span>
      </div>
    }
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _context = inject(CHART_CONTEXT, { optional: true });

  protected readonly items = computed(() => {
    const config = this._context?.config() || {};
    const colors = Object.values(CHART_COLORS);

    return Object.entries(config).map(([key, value], i) => ({
      label: value.label || key,
      color: value.color || colors[i % colors.length],
    }));
  });
  protected readonly computedClass = computed(() =>
    cn('flex flex-wrap items-center justify-center gap-4', this.class()),
  );
}
