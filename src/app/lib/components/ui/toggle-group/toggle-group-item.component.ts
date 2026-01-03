import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { toggleVariants, type ToggleVariants } from '../toggle/toggle-variants';
import { TOGGLE_GROUP_CONTEXT } from './toggle-group-context';

/**
 * ToggleGroupItem component - individual toggle button within a group.
 *
 * @example
 * <ToggleGroupItem value="bold" aria-label="Toggle bold">
 *   <svg>...</svg>
 * </ToggleGroupItem>
 */
@Component({
  selector: 'ToggleGroupItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'type': 'button',
    '[attr.aria-pressed]': 'isPressed()',
    '[attr.data-state]': 'isPressed() ? "on" : "off"',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '(click)': 'toggle()',
    'data-slot': 'toggle-group-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleGroupItem {
  private readonly context = inject(TOGGLE_GROUP_CONTEXT, { optional: true });

  /** The value of this toggle item */
  readonly value = input.required<string>();

  /** Override the variant from the group */
  readonly variant = input<ToggleVariants['variant']>();

  /** Override the size from the group */
  readonly size = input<ToggleVariants['size']>();

  /** Whether this toggle item is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether this item is pressed */
  protected readonly isPressed = computed(() => {
    return this.context?.isPressed(this.value()) ?? false;
  });

  /** Whether this item is disabled */
  protected readonly isDisabled = computed(() => {
    return this.disabled() || this.context?.disabled() || false;
  });

  /** Get the effective variant */
  protected readonly effectiveVariant = computed(() => {
    return this.variant() ?? this.context?.variant() ?? 'default';
  });

  /** Get the effective size */
  protected readonly effectiveSize = computed(() => {
    return this.size() ?? this.context?.size() ?? 'default';
  });

  /** Toggle this item */
  toggle() {
    if (!this.isDisabled()) {
      this.context?.toggle(this.value());
    }
  }

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      toggleVariants({
        variant: this.effectiveVariant(),
        size: this.effectiveSize(),
      }),
      this.class()
    )
  );
}
