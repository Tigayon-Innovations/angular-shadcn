import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ChartTooltip component - tooltip for chart data points.
 */
@Component({
  selector: 'ChartTooltip',
  template: `
    <div [class]="computedClass()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTooltip {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('rounded-lg border bg-background p-2 shadow-sm', this.class()),
  );
}
