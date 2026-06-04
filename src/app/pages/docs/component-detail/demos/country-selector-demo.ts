import { CountrySelector, type Country } from '@/ui/country-selector';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'CountrySelectorDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountrySelector],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-sm">
      <CountrySelector
        placeholder="Select a country"
        [value]="selectedCode()"
        (countryChange)="onCountryChange($event)"
      />
      @if (selectedCountry()) {
        <p class="text-sm text-muted-foreground">
          Selected:
          <span class="font-medium text-foreground">
            {{ selectedCountry()!.flag }} {{ selectedCountry()!.name }}
            ({{ selectedCountry()!.dialCode }})
          </span>
        </p>
      }
    </div>
  `,
})
export class CountrySelectorDemo {
  protected readonly selectedCode = signal<string>('');
  protected readonly selectedCountry = signal<Country | null>(null);

  protected onCountryChange(country: Country): void {
    this.selectedCode.set(country.code);
    this.selectedCountry.set(country);
  }
}
