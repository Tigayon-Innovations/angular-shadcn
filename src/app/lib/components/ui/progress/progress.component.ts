import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Progress component that displays a progress bar.
 *
 * @example
 * <!-- Basic progress -->
 * <Progress [value]="50" />
 *
 * <!-- Full progress -->
 * <Progress [value]="100" />
 *
 * <!-- Indeterminate progress (no value) -->
 * <Progress />
 *
 * <!-- With custom max -->
 * <Progress [value]="30" [max]="50" />
 */
@Component({
  selector: 'Progress',
  template: `
    <div
      data-slot="progress-indicator"
      [class]="indicatorClass()"
      [style.transform]="'translateX(-' + (100 - percentage()) + '%)'"
    ></div>
  `,
  host: {
    '[class]': 'computedClass()',
    'role': 'progressbar',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuetext]': 'ariaValueText() || (value() !== null ? percentage().toFixed(0) + "% complete" : "Loading")',
    '[attr.aria-live]': '"polite"',
    '[attr.data-state]': 'state()',
    '[attr.data-value]': 'value()',
    '[attr.data-max]': 'max()',
    'data-slot': 'progress',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Progress {
  /** The current progress value (0 to max) */
  readonly value = input<number | null>(null);

  /** The maximum progress value */
  readonly max = input<number>(100);

  /** Accessible label for the progress bar */
  readonly ariaLabel = input<string>('Progress');

  /** Text description of current progress (e.g., "50% complete") */
  readonly ariaValueText = input<string | undefined>(undefined);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Additional CSS classes to apply to the indicator */
  readonly indicatorClass = input<string>('');

  /** Calculate percentage */
  protected readonly percentage = computed(() => {
    const val = this.value();
    const maxVal = this.max();
    if (val === null || maxVal === 0) return 0;
    return Math.min(100, Math.max(0, (val / maxVal) * 100));
  });

  /** Calculate state for data attribute */
  protected readonly state = computed(() => {
    const val = this.value();
    if (val === null) return 'indeterminate';
    return val >= this.max() ? 'complete' : 'loading';
  });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
      this.class()
    )
  );

  /** Computed indicator class */
  protected readonly indicatorClassComputed = computed(() =>
    cn(
      'bg-primary h-full w-full flex-1 transition-all',
      this.indicatorClass()
    )
  );
}
