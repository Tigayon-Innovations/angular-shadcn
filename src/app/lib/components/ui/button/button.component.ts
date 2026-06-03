import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { buttonVariants, type ButtonVariants } from './button-variants';

/**
 * Button component that applies shadcn button styles.
 *
 * @example
 * <!-- Default button -->
 * <Button>Click me</Button>
 *
 * <!-- With variant -->
 * <Button variant="destructive">Delete</Button>
 *
 * <!-- With size -->
 * <Button size="lg">Large Button</Button>
 *
 * <!-- Combined -->
 * <Button variant="outline" size="sm">Small Outline</Button>
 *
 * <!-- As link -->
 * <Button variant="link">Link Button</Button>
 *
 * <!-- Loading state -->
 * <Button [loading]="isLoading">Submit</Button>
 *
 * <!-- Disabled state -->
 * <Button [disabled]="true">Disabled</Button>
 */
@Component({
  selector: 'Button',
  template: `
    @if (loading()) {
      <svg
        class="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
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
      <span class="sr-only">Loading</span>
    }
    <ng-content />
  `,
  host: {
    'attr.data-slot': '"button"',
    '[class]': 'computedClass()',
    '[attr.disabled]': 'isDisabled() || null',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.data-loading]': 'loading() || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  /** The visual style variant of the button */
  readonly variant = input<ButtonVariants['variant']>('default');

  /** The size of the button */
  readonly size = input<ButtonVariants['size']>('default');

  /** Whether the button is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether the button is in a loading state */
  readonly loading = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether button is effectively disabled (disabled or loading) */
  protected readonly isDisabled = computed(() => this.disabled() || this.loading());

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.loading() && 'relative cursor-wait',
      this.class(),
    ),
  );
}
