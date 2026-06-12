import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountrySelector } from '../country-selector/country-selector.component';
import { COUNTRIES, type Country, getCountryByCode } from '../country-selector/country-data';

/**
 * PhoneInput component
 *
 * Combines a CountrySelector (dial code) with a number input.
 * Implements ControlValueAccessor — value is the full phone string (e.g. "+1 555-123-4567").
 *
 * @example
 * ```html
 * <PhoneInput [(ngModel)]="phone" placeholder="Enter phone number" />
 * ```
 */
@Component({
  selector: 'PhoneInput',
  imports: [CountrySelector],
  template: `
    <div [class]="containerClass()">
      <CountrySelector
        [disabled]="isDisabled()"
        [class]="'rounded-r-none border-r-0 shrink-0 w-auto min-w-[120px]'"
        [placeholder]="'Country'"
        [value]="selectedCountryCode()"
        (countryChange)="onCountryChange($event)"
      />
      <input
        type="tel"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [value]="localNumber()"
        (input)="onNumberInput($event)"
        (blur)="onTouched()"
        [class]="inputClass()"
      />
    </div>
  `,
  host: {
    'attr.data-slot': '"phone-input"',
    '[class]': 'hostClass()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInput),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneInput implements ControlValueAccessor {
  /** Placeholder for the number input */
  readonly placeholder = input<string>('Phone number');
  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);
  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Internal country code (ISO 2-letter) */
  protected readonly selectedCountryCode = signal<string>('US');
  /** Internal local number (without dial code) */
  protected readonly localNumber = signal<string>('');
  /** Internal disabled state from CVA */
  private readonly _isDisabledFromCVA = signal<boolean>(false);

  protected readonly isDisabled = computed(() => this.disabled() || this._isDisabledFromCVA());

  protected readonly hostClass = computed(() => cn('block', this.class()));

  protected readonly containerClass = computed(() =>
    cn(
      'flex items-stretch w-full',
      this.isDisabled() && 'pointer-events-none opacity-50',
    ),
  );

  protected readonly inputClass = computed(() =>
    cn(
      'flex-1 min-w-0 h-10 rounded-xl rounded-l-none border px-3 py-2 text-sm',
      'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700/50',
      'text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500',
      'shadow-xs transition-[color,box-shadow] outline-none',
      'focus-visible:border-primary/30 dark:focus-visible:border-white/30 focus-visible:ring-primary/20 dark:focus-visible:ring-white/20 focus-visible:ring-2',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );

  /** ControlValueAccessor callbacks */
  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (!value) {
      this.localNumber.set('');
      return;
    }
    // Parse: if value starts with a known dial code, split it
    const country = getCountryByCode(this.selectedCountryCode());
    const dialCode = country?.dialCode ?? '';
    if (dialCode && value.startsWith(dialCode)) {
      this.localNumber.set(value.slice(dialCode.length).trimStart());
    } else if (value.startsWith('+')) {
      // Try to find a matching dial code
      const matched = this.findCountryByDialCode(value);
      if (matched) {
        this.selectedCountryCode.set(matched.code);
        this.localNumber.set(value.slice(matched.dialCode.length).trimStart());
      } else {
        this.localNumber.set(value);
      }
    } else {
      this.localNumber.set(value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabledFromCVA.set(isDisabled);
  }

  protected onCountryChange(country: Country): void {
    this.selectedCountryCode.set(country.code);
    this.emitValue();
    this.onTouched();
  }

  protected onNumberInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.localNumber.set(target.value);
    this.emitValue();
  }

  private emitValue(): void {
    const country = getCountryByCode(this.selectedCountryCode());
    const dialCode = country?.dialCode ?? '';
    const number = this.localNumber().trim();
    const fullValue = number ? `${dialCode} ${number}` : dialCode;
    this.onChange(fullValue);
  }

  private findCountryByDialCode(phone: string): Country | undefined {
    let best: Country | undefined;
    let bestLen = 0;
    for (const c of COUNTRIES) {
      if (phone.startsWith(c.dialCode) && c.dialCode.length > bestLen) {
        best = c;
        bestLen = c.dialCode.length;
      }
    }
    return best;
  }
}
