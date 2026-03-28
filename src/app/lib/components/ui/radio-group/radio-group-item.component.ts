import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { RADIO_GROUP_CONTEXT } from './radio-group-context';

// ============================================================================
// Types
// ============================================================================

export type RadioGroupItemProps = {
  /** The unique value for this radio item */
  value: string;
  /** The id for the radio input */
  id?: string;
  /** Whether this radio item is disabled */
  disabled?: boolean;
  /** Whether the item is required (inherited from group if not set) */
  required?: boolean;
  /** Additional CSS classes */
  class?: string;
};

// ============================================================================
// RadioGroupItem Component
// ============================================================================

/**
 * RadioGroupItem component - individual radio option within a group.
 * Based on Radix UI RadioGroup.Item with shadcn/ui styling.
 * Implements roving tabindex (only checked or first item is tabbable).
 *
 * ## Features
 * - Visual indicator shows checked state
 * - Inherits disabled state from parent group
 * - Roving tabindex for efficient keyboard navigation
 * - Full keyboard support
 *
 * ## Accessibility
 * - Uses native radio input for built-in accessibility
 * - `aria-checked` indicates checked state
 * - Part of roving tabindex pattern
 * - Supports keyboard navigation from parent group
 *
 * ## Data Attributes
 * - `data-state`: "checked" | "unchecked"
 * - `data-disabled`: Present when disabled
 * - `data-value`: The item's value
 *
 * @example
 * <RadioGroupItem value="option1" id="option1" />
 *
 * @example
 * <!-- With label -->
 * <div class="flex items-center gap-2">
 *   <RadioGroupItem value="apple" id="apple" />
 *   <Label for="apple">Apple</Label>
 * </div>
 *
 * @example
 * <!-- Individually disabled -->
 * <RadioGroupItem value="unavailable" [disabled]="true" />
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/radio-group Radix RadioGroup}
 * @see {@link https://ui.shadcn.com/docs/components/radio-group shadcn/ui RadioGroup}
 */
@Component({
  selector: 'RadioGroupItem',
  template: `
    <button
      #buttonElement
      type="button"
      role="radio"
      [attr.id]="id()"
      [attr.aria-checked]="isChecked()"
      [attr.data-state]="state()"
      [attr.data-disabled]="isDisabled() ? '' : null"
      [attr.data-value]="value()"
      [disabled]="isDisabled()"
      [attr.tabindex]="tabIndex()"
      [class]="radioClass()"
      (click)="select()"
      (keydown)="onKeyDown($event)"
    >
      @if (isChecked()) {
        <span data-slot="radio-group-indicator" class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-2.5"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </span>
      }
    </button>
    <!-- Hidden input for form submission -->
    @if (context?.name()) {
      <input
        type="radio"
        [attr.name]="context?.name()"
        [attr.value]="value()"
        [checked]="isChecked()"
        [disabled]="isDisabled()"
        [required]="isRequired()"
        aria-hidden="true"
        tabindex="-1"
        class="sr-only"
      />
    }
  `,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'radio-group-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupItem implements OnInit, OnDestroy {
  protected readonly context = inject(RADIO_GROUP_CONTEXT, { optional: true });
  private readonly buttonElement = viewChild<ElementRef<HTMLButtonElement>>('buttonElement');

  /** The id for the radio button - used for label association */
  readonly id = input<string>();

  /** The value of this radio option */
  readonly value = input.required<string>();

  /** Whether this radio is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether this radio is required (inherited from group if not set) */
  readonly required = input<boolean | undefined>(undefined);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether this item is checked */
  protected readonly isChecked = computed(() => {
    return this.context?.value() === this.value();
  });

  /** State for data attribute */
  protected readonly state = computed(() => (this.isChecked() ? 'checked' : 'unchecked'));

  /** Whether this item is disabled */
  protected readonly isDisabled = computed(() => {
    return this.disabled() || this.context?.disabled() || false;
  });

  /** Whether this item is required */
  protected readonly isRequired = computed(() => {
    const explicitRequired = this.required();
    if (explicitRequired !== undefined) return explicitRequired;
    return this.context?.required() || false;
  });

  /**
   * Roving tabindex: only the checked item (or first item if none checked) is tabbable.
   */
  protected readonly tabIndex = computed(() => {
    if (this.isDisabled()) return -1;
    if (!this.context) return 0;

    const currentValue = this.context.value();
    const itemValues = this.context.itemValues();

    // If this item is checked, it's tabbable
    if (currentValue === this.value()) return 0;

    // If no item is checked and this is the first item, it's tabbable
    if (!currentValue && itemValues.length > 0 && itemValues[0] === this.value()) {
      return 0;
    }

    return -1;
  });

  ngOnInit(): void {
    // Register this item with the group
    this.context?.itemValues.update((values) => {
      if (!values.includes(this.value())) {
        return [...values, this.value()];
      }
      return values;
    });
  }

  ngOnDestroy(): void {
    // Unregister this item from the group
    this.context?.itemValues.update((values) => values.filter((v) => v !== this.value()));
  }

  /** Select this radio option */
  select(): void {
    if (!this.isDisabled()) {
      this.context?.setValue(this.value());
    }
  }

  /** Focus the button element */
  focus(): void {
    this.buttonElement()?.nativeElement.focus();
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
      case ' ':
        // Space should select if not already selected
        event.preventDefault();
        this.select();
        break;
    }
  }

  /** Computed class for wrapper */
  protected readonly computedClass = computed(() => cn('relative inline-flex', this.class()));

  /** Computed radio visual class */
  protected readonly radioClass = computed(() =>
    cn(
      // Base styles
      'aspect-square size-4 shrink-0 rounded-full border shadow-xs',
      'inline-flex items-center justify-center cursor-pointer',
      'transition-[color,box-shadow] outline-none',
      // Focus styles
      'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
      // State styles
      'border-input text-primary',
      'data-[state=checked]:border-primary',
      // Disabled styles
      'disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );
}
