import { DatePicker } from '@/ui/date-picker';
import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'DatePickerDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePicker, Label, ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-6 w-full max-w-sm">
      <!-- Basic -->
      <div class="grid gap-1.5">
        <Label>Pick a date</Label>
        <DatePicker [(date)]="date" placeholder="Select a date" />
        @if (date(); as selectedDate) {
          <p class="text-sm text-muted-foreground">Selected: {{ selectedDate.toDateString() }}</p>
        }
      </div>

      <!-- With minDate / maxDate -->
      <div class="grid gap-1.5">
        <Label>This month only</Label>
        <DatePicker
          placeholder="Select within this month"
          [minDate]="monthStart"
          [maxDate]="monthEnd"
        />
      </div>

      <!-- Locale -->
      <div class="grid gap-1.5">
        <Label>French locale</Label>
        <DatePicker placeholder="Choisir une date" locale="fr-FR" />
      </div>

      <!-- formControl -->
      <div class="grid gap-1.5">
        <Label>Reactive form</Label>
        <DatePicker [formControl]="dateControl" placeholder="formControl date" />
        @if (dateControl.value; as controlDate) {
          <p class="text-sm text-muted-foreground">
            Control value: {{ controlDate.toDateString() }}
          </p>
        }
      </div>
    </div>
  `,
})
export class DatePickerDemo {
  protected readonly date = signal<Date | undefined>(undefined);
  protected readonly dateControl = new FormControl<Date | undefined>(undefined);

  protected readonly monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  protected readonly monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
}
