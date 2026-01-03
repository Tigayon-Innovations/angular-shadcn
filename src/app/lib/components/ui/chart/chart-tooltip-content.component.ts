import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * ChartTooltipContent component - content inside tooltip.
 */
@Component({
  selector: 'ChartTooltipContent',
  template: `
    <div [class]="computedClass()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTooltipContent {
  /** Hide label */
  readonly hideLabel = input<boolean>(false);

  /** Hide indicator */
  readonly hideIndicator = input<boolean>(false);

  /** Indicator type */
  readonly indicator = input<'line' | 'dot' | 'dashed'>('dot');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-1', this.class())
  );
}
