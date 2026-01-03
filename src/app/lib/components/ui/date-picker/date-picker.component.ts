import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output
} from '@angular/core';
import { CalendarIcon, LucideAngularModule } from 'lucide-angular';
import { buttonVariants } from '../button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

/**
 * DatePicker component - date selection with calendar popover.
 * Matches shadcn/ui React DatePicker exactly.
 */
@Component({
  selector: 'DatePicker',
  imports: [LucideAngularModule, Popover, PopoverTrigger, PopoverContent, Calendar],
  template: `
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          [class]="computedButtonClass()"
        >
          <lucide-icon [img]="CalendarIconRef" class="mr-2 h-4 w-4" />
          @if (date()) {
            {{ formatDate(date()!) }}
          } @else {
            <span>{{ placeholder() }}</span>
          }
        </button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar
          [mode]="'single'"
          [selected]="date()"
          (onSelect)="onDateSelect($event)"
          [disabled]="disabledDates()"
        />
      </PopoverContent>
    </Popover>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker {
  protected readonly CalendarIconRef = CalendarIcon;

  /** Selected date */
  readonly date = model<Date | undefined>(undefined);

  /** Placeholder text */
  readonly placeholder = input<string>('Pick a date');

  /** Date format */
  readonly dateFormat = input<string>('PPP');

  /** Disabled dates function */
  readonly disabledDates = input<((date: Date) => boolean) | undefined>(undefined);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Date select event */
  readonly onSelect = output<Date | undefined>();

  protected readonly computedButtonClass = computed(() =>
    cn(
      buttonVariants({ variant: 'outline' }),
      'w-[280px] justify-start text-left font-normal',
      !this.date() && 'text-muted-foreground',
      this.class()
    )
  );

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  protected onDateSelect(date: Date | undefined): void {
    this.date.set(date);
    this.onSelect.emit(date);
  }
}
