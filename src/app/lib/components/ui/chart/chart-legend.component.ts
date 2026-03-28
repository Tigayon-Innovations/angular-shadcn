import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ChartLegend component - legend for chart series.
 */
@Component({
  selector: 'ChartLegend',
  template: `
    <div [class]="computedClass()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegend {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-wrap items-center justify-center gap-4', this.class()),
  );
}
