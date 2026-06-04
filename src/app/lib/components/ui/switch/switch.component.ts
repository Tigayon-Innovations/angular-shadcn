import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SwitchState = 'checked' | 'unchecked';

export type SwitchProps = {
  /** The controlled checked state */
  checked?: boolean;
  /** Whether the switch starts checked (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is required */
  required?: boolean;
  /** The name for the hidden input (form submission) */
  name?: string;
  /** The value for the hidden input (form submission) */
  value?: string;
  /** The id for the switch input */
  id?: string;
  /** Additional CSS classes */
  class?: string;
};

/**
 * Switch component for toggling between on/off states.
 * Based on Radix UI Switch primitive with shadcn/ui styling.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * ## Features
 * - Toggle between checked/unchecked states
 * - Full keyboard support (Space, Enter)
 * - Native form submission support via hidden input
 * - Controlled and uncontrolled modes
 * - Angular Forms integration (ngModel, formControl)
 * - Focus ring styling
 *
 * ## Accessibility
 * - Uses `role="switch"` per WAI-ARIA
 * - `aria-checked` indicates current state
 * - `aria-required` when required
 * - Keyboard: Space/Enter to toggle
 * - Focus visible ring for keyboard navigation
 *
 * ## Data Attributes
 * - `data-state`: "checked" | "unchecked"
 * - `data-disabled`: Present when disabled
 *
 * @example
 * <!-- Basic switch -->
 * <Switch id="airplane-mode" />
 *
 * @example
 * <!-- Controlled with two-way binding -->
 * <Switch [(checked)]="isEnabled" />
 *
 * @example
 * <!-- With reactive forms -->
 * <Switch formControlName="notifications" />
 *
 * @example
 * <!-- With label -->
 * <div class="flex items-center gap-2">
 *   <Switch id="notifications" />
 *   <Label for="notifications">Enable notifications</Label>
 * </div>
 *
 * @example
 * <!-- Disabled switch -->
 * <Switch [disabled]="true" [checked]="true" />
 *
 * @example
 * <!-- Required in form -->
 * <Switch [required]="true" name="terms" value="accepted" />
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/switch Radix Switch}
 * @see {@link https://ui.shadcn.com/docs/components/switch shadcn/ui Switch}
 */
@Component({
  selector: 'Switch',
  template: `
    <!-- Accessible button with switch role -->
    <button
      #buttonElement
      type="button"
      role="switch"
      [attr.id]="id()"
      [attr.aria-checked]="checked()"
      [attr.aria-required]="required() || null"
      [attr.data-state]="state()"
      [attr.data-disabled]="isDisabled() ? '' : null"
      [disabled]="isDisabled()"
      [class]="trackClass()"
      (click)="toggle()"
    >
      <span data-slot="switch-thumb" [class]="thumbClass()" [attr.data-state]="state()"></span>
    </button>
    <!-- Hidden input for form submission -->
    @if (name()) {
      <input
        type="checkbox"
        [attr.name]="name()"
        [attr.value]="inputValue()"
        [checked]="checked()"
        [disabled]="isDisabled()"
        aria-hidden="true"
        tabindex="-1"
        class="sr-only"
      />
    }
  `,
  host: {
    '[class]': 'computedClass()',
    'attr.data-slot': '"switch"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Switch implements ControlValueAccessor {
  constructor() {
    // Initialize from defaultChecked if provided
    if (this.defaultChecked()) {
      this.checked.set(true);
    }
  }

  private readonly buttonElement = viewChild<ElementRef<HTMLButtonElement>>('buttonElement');

  /** Emitted when checked state changes */
  readonly checkedChange = output<boolean>();

  /** Whether the switch is checked/on */
  readonly checked = model<boolean>(false);

  /** The id for the switch button - used for label association */
  readonly id = input<string>();
  /** Whether the switch starts checked (uncontrolled mode) */
  readonly defaultChecked = input<boolean>(false);
  /** Whether the switch is disabled via input */
  readonly disabled = input<boolean>(false);
  /** Whether the switch is required */
  readonly required = input<boolean>(false);
  /** The name for the hidden input (form submission) */
  readonly name = input<string>();
  /** The value for the hidden input (form submission) */
  readonly value = input<string>('on');
  /** Additional CSS classes to apply */
  readonly class = input<string>('');
  /** Additional CSS classes to apply to the inner track button */
  readonly buttonClass = input<string>('');
  /** Current state for data attribute */
  protected readonly state = computed(
    (): SwitchState => (this.checked() ? 'checked' : 'unchecked'),
  );
  /** Input value for form submission */
  protected readonly inputValue = computed(() => (this.checked() ? this.value() : undefined));
  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('relative inline-flex', this.class()));
  /** Computed track class */
  protected readonly trackClass = computed(() =>
    cn(
      // Custom overrides first (higher specificity)
      this.buttonClass(),
      // Base styles
      'inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      'shadow-xs transition-colors duration-200',
      // Focus styles
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      // State styles
      'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      'dark:data-[state=unchecked]:bg-input/80',
      // Disabled styles
      'disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );
  /** Computed thumb class */
  protected readonly thumbClass = computed(() =>
    cn(
      // Base styles
      'pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0',
      // Transition
      'transition-transform duration-200',
      // Position based on state
      'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
    ),
  );
  /** Whether the switch is disabled (either via input or forms) */
  readonly isDisabled = computed(() => this.disabled() || this.isFormsDisabled());

  /** Whether the switch is disabled via forms */
  private readonly isFormsDisabled = signal<boolean>(false);

  /** ControlValueAccessor callbacks */
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

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
    this.isFormsDisabled.set(isDisabled);
  }

  /** Focus the switch button */
  focus(): void {
    this.buttonElement()?.nativeElement.focus();
  }
  /** Toggle the switch state */
  toggle(): void {
    if (!this.isDisabled()) {
      const newValue = !this.checked();
      this.checked.set(newValue);
      this.onChange(newValue);
      this.onTouched();
      this.checkedChange.emit(newValue);
    }
  }

}
