import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    input,
    model,
    signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Checkbox component for boolean selection.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * @example
 * <!-- Basic checkbox -->
 * <Checkbox id="terms" />
 *
 * <!-- Controlled checkbox -->
 * <Checkbox [(checked)]="isChecked" />
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
    <span
      data-slot="checkbox-indicator"
      class="flex items-center justify-center text-current"
    >
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
    </span>
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"checkbox"',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '(click)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
    '(keydown.enter)': 'toggle(); $event.preventDefault()',
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
  /** Whether the checkbox is checked */
  readonly checked = model<boolean>(false);

  /** Whether the checkbox is disabled via input */
  readonly disabled = input<boolean>(false);

  /** Whether the checkbox is disabled via forms */
  private readonly formsDisabled = signal<boolean>(false);

  /** Whether the checkbox is disabled (either via input or forms) */
  readonly isDisabled = computed(() => this.disabled() || this.formsDisabled());

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** ControlValueAccessor callbacks */
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /** Toggle the checkbox state */
  toggle() {
    if (!this.isDisabled()) {
      this.checked.update((v) => !v);
      this.onChange(this.checked());
      this.onTouched();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
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

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      'inline-flex items-center justify-center cursor-pointer',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
      this.class()
    )
  );
}
