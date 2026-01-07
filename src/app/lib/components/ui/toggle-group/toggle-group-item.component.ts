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

/**
 * ToggleGroupItem component - individual toggle button within a group.
 * Supports keyboard navigation with arrow keys.
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

  /**
   * Roving tabindex: first item is tabbable, others are navigated with arrow keys.
   */
  protected readonly tabIndex = computed(() => {
    if (this.isDisabled()) return -1;
    if (!this.context) return 0;

    const itemValues = this.context.itemValues();
    // First item is tabbable
    if (itemValues.length > 0 && itemValues[0] === this.value()) {
      return 0;
    }
    return -1;
  });

  /** Get the effective variant */
  protected readonly effectiveVariant = computed(() => {
    return this.variant() ?? this.context?.variant() ?? 'default';
  });

  /** Get the effective size */
  protected readonly effectiveSize = computed(() => {
    return this.size() ?? this.context?.size() ?? 'default';
  });

  ngOnInit(): void {
    // Register this item
    this.context?.itemValues.update(values => {
      if (!values.includes(this.value())) {
        return [...values, this.value()];
      }
      return values;
    });
  }

  ngOnDestroy(): void {
    // Unregister this item
    this.context?.itemValues.update(values =>
      values.filter(v => v !== this.value())
    );
  }

  /** Toggle this item */
  toggle() {
    if (!this.isDisabled()) {
      this.context?.toggle(this.value());
    }
  }

  /** Handle keyboard navigation */
  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled() || !this.context) return;

    const orientation = this.context.orientation();
    const isVertical = orientation === 'vertical';
    const isHorizontal = orientation === 'horizontal';

    switch (event.key) {
      case 'ArrowDown':
        if (isVertical) {
          event.preventDefault();
          this.context.focusNext(this.value());
        }
        break;
      case 'ArrowUp':
        if (isVertical) {
          event.preventDefault();
          this.context.focusPrevious(this.value());
        }
        break;
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          this.context.focusNext(this.value());
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          this.context.focusPrevious(this.value());
        }
        break;
      case 'Home':
        event.preventDefault();
        this.context.focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this.context.focusLast();
        break;
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
