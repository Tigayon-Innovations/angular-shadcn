import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export type ProgressState = 'indeterminate' | 'loading' | 'complete';

export type ProgressProps = {
  /** The current progress value (0 to max). Null for indeterminate. */
  value?: number | null;
  /** The maximum progress value */
  max?: number;
  /** Accessible label for the progress bar */
  ariaLabel?: string;
  /** Text description of current progress (e.g., "50% complete") */
  ariaValueText?: string;
  /** Additional CSS classes to apply to the root */
  class?: string;
  /** Additional CSS classes to apply to the indicator */
  indicatorClass?: string;
  /**
   * Function to get value label for accessibility.
   * Receives current value and returns descriptive text.
   */
  getValueLabel?: (value: number, max: number) => string;
};

// ============================================================================
// Progress Component
// ============================================================================

/**
 * Progress component displays progress feedback for tasks and operations.
 * Based on Radix UI Progress primitive with shadcn/ui styling.
 *
 * ## Features
 * - Determinate mode with value from 0 to max
 * - Indeterminate mode when value is null (shows loading animation)
 * - Complete state when value reaches max
 * - Full ARIA progressbar implementation
 * - Customizable indicator styling
 *
 * ## Accessibility
 * - Uses native `progressbar` role
 * - `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for current state
 * - `aria-valuetext` provides human-readable progress description
 * - `aria-label` for accessible name
 * - `aria-live="polite"` for screen reader announcements
 *
 * ## Data Attributes
 * - `data-state`: "indeterminate" | "loading" | "complete"
 * - `data-value`: Current numeric value
 * - `data-max`: Maximum value
 *
 * @example
 * <!-- Basic progress -->
 * <Progress [value]="50" />
 *
 * @example
 * <!-- With custom max -->
 * <Progress [value]="30" [max]="50" />
 *
 * @example
 * <!-- Indeterminate (loading) -->
 * <Progress />
 * <!-- or explicitly -->
 * <Progress [value]="null" />
 *
 * @example
 * <!-- Complete state -->
 * <Progress [value]="100" />
 *
 * @example
 * <!-- With accessible label -->
 * <Progress [value]="66" ariaLabel="Downloading file" />
 *
 * @example
 * <!-- With custom value text -->
 * <Progress
 *   [value]="3"
 *   [max]="10"
 *   ariaValueText="Step 3 of 10"
 * />
 *
 * @example
 * <!-- With custom value label function -->
 * <Progress
 *   [value]="bytesLoaded"
 *   [max]="totalBytes"
 *   [getValueLabel]="formatBytes"
 * />
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/progress Radix Progress}
 * @see {@link https://ui.shadcn.com/docs/components/progress shadcn/ui Progress}
 */
@Component({
  selector: 'Progress',
  template: `
    <div
      data-slot="progress-indicator"
      [class]="computedIndicatorClass()"
      [style.transform]="indicatorTransform()"
    ></div>
  `,
  host: {
    '[class]': 'computedClass()',
    role: 'progressbar',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuetext]': 'computedValueText()',
    '[attr.aria-live]': '"polite"',
    '[attr.data-state]': 'state()',
    '[attr.data-value]': 'value()',
    '[attr.data-max]': 'max()',
    'data-slot': 'progress',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Progress {
  /** The current progress value (0 to max). Null for indeterminate. */
  readonly value = input<number | null>(null);

  /** The maximum progress value */
  readonly max = input<number>(100);

  /** Accessible label for the progress bar */
  readonly ariaLabel = input<string>('Progress');

  /** Text description of current progress (e.g., "50% complete") */
  readonly ariaValueText = input<string | undefined>(undefined);

  /**
   * Function to get value label for accessibility.
   * Receives current value and returns descriptive text.
   */
  readonly getValueLabel = input<
    ((value: number, max: number) => string) | undefined
  >(undefined);

  /** Additional CSS classes to apply to the root */
  readonly class = input<string>('');

  /** Additional CSS classes to apply to the indicator */
  readonly indicatorClass = input<string>('');

  /** Calculate percentage (0-100) */
  protected readonly percentage = computed(() => {
    const val = this.value();
    const maxVal = this.max();
    if (val === null || maxVal === 0) return 0;
    return Math.min(100, Math.max(0, (val / maxVal) * 100));
  });

  /** Calculate state for data attribute */
  protected readonly state = computed((): ProgressState => {
    const val = this.value();
    if (val === null) return 'indeterminate';
    return val >= this.max() ? 'complete' : 'loading';
  });

  /** Compute aria-valuetext */
  protected readonly computedValueText = computed(() => {
    const customText = this.ariaValueText();
    if (customText) return customText;

    const val = this.value();
    if (val === null) return 'Loading';

    const getLabel = this.getValueLabel();
    if (getLabel) {
      return getLabel(val, this.max());
    }

    return `${this.percentage().toFixed(0)}% complete`;
  });

  /** Transform for the indicator */
  protected readonly indicatorTransform = computed(() => {
    return `translateX(-${100 - this.percentage()}%)`;
  });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      // Base styles
      'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
      // Custom classes
      this.class()
    )
  );

  /** Computed indicator class */
  protected readonly computedIndicatorClass = computed(() =>
    cn(
      // Base styles
      'bg-primary h-full w-full flex-1 transition-all duration-300 ease-in-out',
      // Indeterminate animation
      this.state() === 'indeterminate' && 'animate-pulse',
      // Custom classes
      this.indicatorClass()
    )
  );
}
