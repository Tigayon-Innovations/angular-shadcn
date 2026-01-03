import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    model,
} from '@angular/core';
import { toggleVariants, type ToggleVariants } from './toggle-variants';

/**
 * Toggle component - a two-state button that can be on or off.
 *
 * @example
 * <!-- Basic toggle -->
 * <Toggle aria-label="Toggle bold">
 *   <svg>...</svg>
 * </Toggle>
 *
 * <!-- Controlled toggle -->
 * <Toggle [(pressed)]="isBold">
 *   <svg>...</svg>
 * </Toggle>
 *
 * <!-- With variant -->
 * <Toggle variant="outline">
 *   <svg>...</svg>
 * </Toggle>
 */
@Component({
  selector: 'Toggle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'type': 'button',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '(click)': 'toggle()',
    'data-slot': 'toggle',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toggle {
  /** Whether the toggle is pressed/on */
  readonly pressed = model<boolean>(false);

  /** The visual style variant of the toggle */
  readonly variant = input<ToggleVariants['variant']>('default');

  /** The size of the toggle */
  readonly size = input<ToggleVariants['size']>('default');

  /** Whether the toggle is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Toggle the pressed state */
  toggle() {
    if (!this.disabled()) {
      this.pressed.update((v) => !v);
    }
  }

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      toggleVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    )
  );
}
