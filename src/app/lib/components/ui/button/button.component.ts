import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
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
 */
@Component({
  selector: 'Button',
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
