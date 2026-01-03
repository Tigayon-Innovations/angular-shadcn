import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants } from './button-variants';

/**
 * Button component that applies shadcn button styles.
 *
 * @example
 * <!-- Default button -->
 * <button Button>Click me</button>
 *
 * <!-- With variant -->
 * <button Button variant="destructive">Delete</button>
 *
 * <!-- With size -->
 * <button Button size="lg">Large Button</button>
 *
 * <!-- Combined -->
 * <button Button variant="outline" size="sm">Small Outline</button>
 *
 * <!-- As link -->
 * <a Button variant="link" href="/path">Link Button</a>
 */
@Component({
  selector: '[Button]',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  /** The visual style variant of the button */
  readonly variant = input<ButtonVariants['variant']>('default');

  /** The size of the button */
  readonly size = input<ButtonVariants['size']>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    )
  );
}
