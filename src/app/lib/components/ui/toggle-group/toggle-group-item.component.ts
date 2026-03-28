import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { toggleVariants, type ToggleVariants } from '../toggle/toggle-variants';
import { TOGGLE_GROUP_CONTEXT } from './toggle-group-context';

export type ToggleGroupItemProps = {
  /** The unique value for this toggle item */
  value: string;
  /** Override the variant from the group */
  variant?: ToggleVariants['variant'];
  /** Override the size from the group */
  size?: ToggleVariants['size'];
  /** Whether this toggle item is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
};

/**
 * ToggleGroupItem component - individual toggle button within a group.
 * Based on Radix UI ToggleGroup.Item with shadcn/ui styling.
 * Supports keyboard navigation with arrow keys.
 *
 * ## Features
 * - Can be individually styled with variant/size overrides
 * - Inherits disabled state from parent group
 * - Roving tabindex for efficient keyboard navigation
 * - Full keyboard support
 *
 * ## Accessibility
 * - Uses `aria-pressed` to indicate pressed state
 * - Part of roving tabindex pattern
 * - Supports keyboard navigation from parent group
 *
 * ## Data Attributes
 * - `data-state`: "on" | "off"
 * - `data-disabled`: Present when disabled
 * - `data-value`: The item's value
 *
 * @example
 * <ToggleGroupItem value="bold" aria-label="Toggle bold">
 *   <BoldIcon />
 * </ToggleGroupItem>
 *
 * @example
 * <!-- With custom variant override -->
 * <ToggleGroupItem value="special" variant="outline">
 *   Special
 * </ToggleGroupItem>
 *
 * @example
 * <!-- Individually disabled -->
 * <ToggleGroupItem value="unavailable" [disabled]="true">
 *   Unavailable
 * </ToggleGroupItem>
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/toggle-group Radix ToggleGroup}
 * @see {@link https://ui.shadcn.com/docs/components/toggle-group shadcn/ui ToggleGroup}
 */
@Component({
  selector: 'ToggleGroupItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    type: 'button',
    '[attr.aria-pressed]': 'isPressed()',
    '[attr.data-state]': 'state()',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-value]': 'value()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'tabIndex()',
    '(click)': 'toggle()',
    '(keydown)': 'onKeyDown($event)',
    'data-slot': 'toggle-group-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleGroupItem implements OnInit, OnDestroy {
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

  private readonly _context = inject(TOGGLE_GROUP_CONTEXT, { optional: true });

  /** Whether this item is pressed */
  protected readonly isPressed = computed(() => {
    return this._context?.isPressed(this.value()) ?? false;
  });
  /** State for data attribute */
  protected readonly state = computed(() => (this.isPressed() ? 'on' : 'off'));
  /** Whether this item is disabled */
  protected readonly isDisabled = computed(() => {
    return this.disabled() || this._context?.disabled() || false;
  });
  /**
   * Roving tabindex pattern:
   * - If roving focus is enabled: first item or focused item is tabbable
   * - Otherwise: all items are tabbable
   */
  protected readonly tabIndex = computed(() => {
    if (this.isDisabled()) return -1;
    if (!this._context) return 0;

    const rovingFocus = this._context.rovingFocus();
    if (!rovingFocus) return 0;

    const itemValues = this._context.itemValues();
    const focusedValue = this._context.focusedValue();

    // If an item is explicitly focused, only that item is tabbable
    if (focusedValue !== null) {
      return focusedValue === this.value() ? 0 : -1;
    }

    // Otherwise, first item is tabbable
    if (itemValues.length > 0 && itemValues[0] === this.value()) {
      return 0;
    }

    return -1;
  });
  /** Get the effective variant */
  protected readonly effectiveVariant = computed(() => {
    return this.variant() ?? this._context?.variant() ?? 'default';
  });
  /** Get the effective size */
  protected readonly effectiveSize = computed(() => {
    return this.size() ?? this._context?.size() ?? 'default';
  });
  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      toggleVariants({
        variant: this.effectiveVariant(),
        size: this.effectiveSize(),
      }),
      this.class(),
    ),
  );

  ngOnInit(): void {
    // Register this item with the group
    this._context?.itemValues.update((values) => {
      if (!values.includes(this.value())) {
        return [...values, this.value()];
      }
      return values;
    });
  }
  ngOnDestroy(): void {
    // Unregister this item from the group
    this._context?.itemValues.update((values) => values.filter((v) => v !== this.value()));
  }

  /** Toggle this item */
  toggle(): void {
    if (!this.isDisabled()) {
      this._context?.toggle(this.value());
    }
  }
  /** Handle keyboard navigation */
  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled() || !this._context) return;

    const orientation = this._context.orientation();
    const isVertical = orientation === 'vertical';
    const isHorizontal = orientation === 'horizontal';

    switch (event.key) {
      case 'ArrowDown':
        if (isVertical) {
          event.preventDefault();
          this._context.focusNext(this.value());
        }
        break;
      case 'ArrowUp':
        if (isVertical) {
          event.preventDefault();
          this._context.focusPrevious(this.value());
        }
        break;
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          this._context.focusNext(this.value());
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          this._context.focusPrevious(this.value());
        }
        break;
      case 'Home':
        event.preventDefault();
        this._context.focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this._context.focusLast();
        break;
    }
  }
}
