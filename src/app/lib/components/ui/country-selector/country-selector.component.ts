import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Command } from '../command/command.component';
import { CommandEmpty } from '../command/command-empty.component';
import { CommandInput } from '../command/command-input.component';
import { CommandItem } from '../command/command-item.component';
import { CommandList } from '../command/command-list.component';
import { Popover } from '../popover/popover.component';
import { PopoverContent } from '../popover/popover-content.component';
import { PopoverTrigger } from '../popover/popover-trigger.component';
import { COUNTRIES, type Country, getCountryByCode } from './country-data';

/**
 * CountrySelector component
 *
 * A searchable country dropdown that integrates with Angular Forms via ControlValueAccessor.
 * The value is the ISO 2-letter country code (e.g. "US").
 *
 * @example
 * ```html
 * <CountrySelector [(ngModel)]="countryCode" />
 * <CountrySelector [value]="'US'" (countryChange)="onCountryChange($event)" />
 * ```
 */
@Component({
  selector: 'CountrySelector',
  imports: [Popover, PopoverTrigger, PopoverContent, Command, CommandInput, CommandList, CommandItem, CommandEmpty],
  template: `
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          [disabled]="isDisabled()"
          [class]="triggerClass()"
          [attr.aria-label]="selectedCountry() ? selectedCountry()!.name : placeholder()"
        >
          @if (selectedCountry()) {
            <span class="text-base leading-none">{{ selectedCountry()!.flag }}</span>
            <span class="truncate">{{ selectedCountry()!.name }}</span>
          } @else {
            <span class="text-muted-foreground truncate">{{ placeholder() }}</span>
          }
          <svg
            class="ml-auto h-4 w-4 shrink-0 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent [matchTriggerWidth]="true" class="p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandList>
            @for (country of countries; track country.code) {
              <CommandItem
                [value]="country.name"
                [keywords]="[country.code, country.dialCode]"
                (onSelect)="selectCountry(country)"
                [class]="country.code === selectedCode() ? 'bg-accent text-accent-foreground' : ''"
              >
                <span class="text-base leading-none mr-2">{{ country.flag }}</span>
                <span class="flex-1">{{ country.name }}</span>
                <span class="text-muted-foreground text-xs ml-auto">{{ country.dialCode }}</span>
                @if (country.code === selectedCode()) {
                  <svg
                    class="ml-2 h-4 w-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                }
              </CommandItem>
            }
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  `,
  host: {
    'attr.data-slot': '"country-selector"',
    '[class]': 'hostClass()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelector),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelector implements ControlValueAccessor {
  /** Placeholder text shown when no country is selected */
  readonly placeholder = input<string>('Select country');
  /** Whether the selector is disabled */
  readonly disabled = input<boolean>(false);
  /** Additional CSS classes */
  readonly class = input<string>('');
  /**
   * Direct value binding (ISO 2-letter country code).
   * Takes precedence when set — syncs to internal state.
   */
  readonly value = input<string>('');

  /** Emits the full Country object when selection changes */
  readonly countryChange = output<Country>();

  /** All available countries */
  protected readonly countries = COUNTRIES;

  /** Internal selected country code */
  protected readonly selectedCode = signal<string>('');
  /** Internal disabled state (from CVA) */
  private readonly _isDisabledFromCVA = signal<boolean>(false);

  constructor() {
    // Sync the value input to internal signal
    effect(() => {
      const v = this.value();
      if (v) {
        this.selectedCode.set(v);
      }
    });
  }

  protected readonly isDisabled = computed(() => this.disabled() || this._isDisabledFromCVA());

  protected readonly selectedCountry = computed(() => {
    const code = this.selectedCode();
    return code ? getCountryByCode(code) : undefined;
  });

  protected readonly hostClass = computed(() => cn('block', this.class()));

  protected readonly triggerClass = computed(() =>
    cn(
      'flex h-10 w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm text-left',
      'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700/50',
      'text-zinc-900 dark:text-zinc-50',
      'shadow-xs transition-[color,box-shadow] outline-none',
      'focus-visible:border-primary/30 dark:focus-visible:border-white/30 focus-visible:ring-primary/20 dark:focus-visible:ring-white/20 focus-visible:ring-2',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );

  /** ControlValueAccessor callbacks */
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.selectedCode.set(value ?? '');
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

  protected selectCountry(country: Country): void {
    this.selectedCode.set(country.code);
    this.onChange(country.code);
    this.onTouched();
    this.countryChange.emit(country);
  }
}
