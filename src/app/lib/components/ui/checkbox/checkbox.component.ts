import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    input,
    model,
    signal,
    viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Checkbox component for boolean selection.
 * Implements ControlValueAccessor for Angular Forms integration.
 * Supports checked, unchecked, and indeterminate states (Radix UI compatible).
 *
 * @example
 * <!-- Basic checkbox -->
 * <Checkbox id="terms" />
 *
 * <!-- Controlled checkbox -->
 * <Checkbox [(checked)]="isChecked" />
 *
 * <!-- Indeterminate state -->
 * <Checkbox [checked]="'indeterminate'" />
 *
 * <!-- With reactive forms -->
 * <Checkbox formControlName="agree" />
 *
 * <!-- Disabled checkbox -->
 * <Checkbox [disabled]="true" />
 *
 * <!-- With label -->
 * <div class="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <Label for="terms">Accept terms</Label>
 * </div>
 */
@Component({
  selector: 'Checkbox',
  template: `
    <input
      #inputElement
      type="checkbox"
      [attr.id]="id()"
      [checked]="checked() === true"
      [indeterminate]="checked() === 'indeterminate'"
      [disabled]="isDisabled()"
      (change)="toggle()"
      class="sr-only peer"
    />
    <div
      [class]="boxClass()"
      [attr.data-state]="getDataState()"
      [attr.data-disabled]="isDisabled() ? '' : null"
      aria-hidden="true"
    >
      <span
        data-slot="checkbox-indicator"
        class="flex items-center justify-center text-current"
      >
        @if (checked() === true) {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="checkIconClass()"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        }
        @if (checked() === 'indeterminate') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="checkIconClass()"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        }
      </span>
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'checkbox',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox implements ControlValueAccessor {
  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  /** The id for the checkbox input - used for label association */
  readonly id = input<string>();

  /** Whether the checkbox is checked (boolean) or indeterminate ('indeterminate') */
  readonly checked = model<boolean | 'indeterminate'>(false);

  /** Whether the checkbox is disabled via input */
  readonly disabled = input<boolean>(false);

  /** Whether the checkbox is disabled via forms */
  private readonly formsDisabled = signal<boolean>(false);

  /** Whether the checkbox is disabled (either via input or forms) */
  readonly isDisabled = computed(() => this.disabled() || this.formsDisabled());

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** ControlValueAccessor callbacks */
  private onChange: (value: boolean | 'indeterminate') => void = () => {};
  private onTouched: () => void = () => {};

  /** Get the data-state attribute value */
  getDataState(): string {
    const state = this.checked();
    if (state === true) return 'checked';
    if (state === 'indeterminate') return 'indeterminate';
    return 'unchecked';
  }

  /** Toggle the checkbox state */
  toggle() {
    if (!this.isDisabled()) {
      const current = this.checked();
      // Cycle through: unchecked -> checked -> unchecked
      const next = current === true ? false : true;
      this.checked.set(next);
      this.onChange(next);
      this.onTouched();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean | 'indeterminate'): void {
    this.checked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean | 'indeterminate') => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formsDisabled.set(isDisabled);
  }

  /** Computed class for the check icon with animation */
  protected readonly checkIconClass = computed(() =>
    cn(
      'size-3.5 transition-all duration-200 ease-in-out',
      this.checked()
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-0'
    )
  );

  /** Computed class for the visual checkbox box */
  protected readonly boxClass = computed(() =>
    cn(
      'peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-[3px]',
      'border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary',
      'size-4 shrink-0 rounded-[4px] border shadow-xs transition-all duration-200 outline-none',
      'inline-flex items-center justify-center cursor-pointer',
      this.isDisabled() && 'cursor-not-allowed opacity-50'
    )
  );

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'relative inline-flex',
      this.class()
    )
  );
}
