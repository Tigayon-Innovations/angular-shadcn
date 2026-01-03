import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { spinnerVariants, type SpinnerVariants } from './spinner-variants';

/**
 * Spinner component - loading indicator with customizable size and color.
 *
 * @example
 * <!-- Default spinner -->
 * <Spinner />
 *
 * <!-- With size -->
 * <Spinner size="lg" />
 *
 * <!-- With variant -->
 * <Spinner variant="muted" />
 *
 * <!-- Combined -->
 * <Spinner variant="destructive" size="xl" />
 */
@Component({
  selector: 'Spinner',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      [class]="computedClass()"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  `,
  host: {
    role: 'status',
    'aria-label': 'Loading',
    '[attr.aria-busy]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
  /** The visual style variant of the spinner */
  readonly variant = input<SpinnerVariants['variant']>('default');

  /** The size of the spinner */
  readonly size = input<SpinnerVariants['size']>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      spinnerVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    )
  );
}
