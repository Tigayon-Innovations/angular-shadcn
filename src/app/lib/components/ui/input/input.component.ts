import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    input,
    signal,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Input component that applies shadcn input styles.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * @example
 * <!-- Basic input -->
 * <Input type="text" placeholder="Enter your name" />
 *
 * <!-- With file type -->
 * <Input type="file" />
 *
 * <!-- Disabled -->
 * <Input type="email" disabled placeholder="Disabled input" />
 *
 * <!-- With reactive forms -->
 * <Input type="email" formControlName="email" placeholder="Enter email" />
 */
@Component({
  selector: 'Input',
  template: `
    <input
      #inputEl
      [type]="type()"
      [placeholder]="placeholder()"
      [disabled]="isDisabled()"
      [id]="id()"
      [name]="name()"
      [autocomplete]="autocomplete()"
      [value]="value()"
      (input)="onInput($event)"
      (blur)="onTouched()"
      [class]="inputClass()"
      [attr.aria-invalid]="ariaInvalid() || null"
      [attr.aria-describedby]="ariaDescribedBy() || null"
    />
  `,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'input',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input implements ControlValueAccessor {
  @ViewChild('inputEl', { static: true }) inputEl!: ElementRef<HTMLInputElement>;

  /** Input type */
  readonly type = input<string>('text');

  /** Placeholder text */
  readonly placeholder = input<string>('');

  /** Input id attribute */
  readonly id = input<string>('');

  /** Input name attribute */
  readonly name = input<string>('');

  /** Autocomplete attribute */
  readonly autocomplete = input<string>('');

  /** Whether the input is disabled - accepts boolean or empty string (for HTML attribute) */
  readonly disabled = input(false, {
    transform: (value: boolean | string) => value === '' || value === true || value === 'true',
  });

  /** Initial value for non-form usage */
  readonly inputValue = input<string>('', { alias: 'value' });

  /** Aria-invalid state for error display */
  readonly ariaInvalid = input<boolean | undefined>(undefined, { alias: 'aria-invalid' });

  /** Aria-describedby for accessibility */
  readonly ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Internal value signal */
  protected readonly value = signal<string>('');

  /** Internal disabled state */
  protected readonly isDisabled = signal<boolean>(false);

  /** ControlValueAccessor callbacks */
  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    // Sync initial value from input
    const initialValue = this.inputValue();
    if (initialValue) {
      this.value.set(initialValue);
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('relative inline-block w-full'));

  /** Classes applied to the actual input element */
  protected readonly inputClass = computed(() =>
    cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      this.class()
    )
  );

  /** Handle input events */
  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  /** Focus the input element */
  focus(): void {
    this.inputEl?.nativeElement?.focus();
  }
}
