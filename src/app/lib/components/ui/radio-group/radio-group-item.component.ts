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

/**
 * RadioGroupItem component - individual radio option.
 * Implements roving tabindex (only checked or first item is tabbable).
 *
 * @example
 * <RadioGroupItem value="option1" id="option1" />
 */
@Component({
  selector: 'RadioGroupItem',
  template: `
    <input
      #inputElement
      type="radio"
      [attr.id]="id()"
      [attr.name]="context?.name()"
      [attr.value]="value()"
      [checked]="isChecked()"
      [disabled]="isDisabled()"
      (change)="select()"
      class="sr-only peer"
    />
    <div
      [class]="radioClass()"
      [attr.data-state]="isChecked() ? 'checked' : 'unchecked'"
      [attr.data-disabled]="isDisabled() ? '' : null"
      aria-hidden="true"
    >
      <span
        data-slot="radio-group-indicator"
        class="flex items-center justify-center"
      >
        @if (isChecked()) {
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
        }
      </span>
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'radio-group-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupItem implements OnInit, OnDestroy {
  protected readonly context = inject(RADIO_GROUP_CONTEXT, { optional: true });
  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  /** The id for the radio input - used for label association */
  readonly id = input<string>();

  /** The value of this radio option */
  readonly value = input.required<string>();

  /** Whether this radio is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether this item is checked */
  protected readonly isChecked = computed(() => {
    return this.context?.value() === this.value();
  });

  /** Whether this item is disabled */
  protected readonly isDisabled = computed(() => {
    return this.disabled() || this.context?.disabled() || false;
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

  /** Select this radio option */
  select() {
    if (!this.isDisabled()) {
      this.context?.setValue(this.value());
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
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.select();
        break;
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'relative inline-flex',
      this.class()
    )
  );

  /** Computed radio visual class */
  protected readonly radioClass = computed(() =>
    cn(
      'peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-[3px]',
      'border-input text-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      'aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none',
      'inline-flex items-center justify-center cursor-pointer',
      this.isDisabled() && 'cursor-not-allowed opacity-50'
    )
  );
}
