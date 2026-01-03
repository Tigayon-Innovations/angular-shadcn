import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { buttonVariants } from '../button';

/**
 * Calendar component - a date picker calendar.
 * Matches shadcn/ui React Calendar exactly.
 */
@Component({
  selector: 'Calendar',
  imports: [LucideAngularModule],
  template: `
    <div [class]="computedClass()">
      <!-- Header with navigation -->
      <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div class="space-y-4">
          <!-- Month navigation -->
          <div class="flex justify-center pt-1 relative items-center">
            <div class="text-sm font-medium">
              {{ monthYear() }}
            </div>
            <div class="flex items-center space-x-1 absolute right-1">
              <button
                type="button"
                [class]="navButtonClass()"
                (click)="previousMonth()"
                aria-label="Go to previous month"
              >
                <lucide-icon [img]="ChevronLeftIcon" class="h-4 w-4" />
              </button>
              <button
                type="button"
                [class]="navButtonClass()"
                (click)="nextMonth()"
                aria-label="Go to next month"
              >
                <lucide-icon [img]="ChevronRightIcon" class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Calendar grid -->
          <table class="w-full border-collapse space-y-1">
            <thead>
              <tr class="flex">
                @for (day of weekDays; track day) {
                  <th
                    class="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                  >
                    {{ day }}
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (week of calendarWeeks(); track $index) {
                <tr class="flex w-full mt-2">
                  @for (day of week; track day.date.toISOString()) {
                    <td
                      class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md"
                      [class.first:rounded-l-md]="true"
                      [class.last:rounded-r-md]="true"
                    >
                      <button
                        type="button"
                        [class]="getDayClass(day)"
                        [attr.aria-selected]="isSelected(day.date)"
                        [disabled]="day.disabled"
                        (click)="selectDate(day.date)"
                      >
                        {{ day.date.getDate() }}
                      </button>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar {
  protected readonly ChevronLeftIcon = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;

  /** Selected date */
  readonly selected = model<Date | undefined>(undefined);

  /** Mode - single, multiple, or range */
  readonly mode = input<'single' | 'multiple' | 'range'>('single');

  /** Number of months to display */
  readonly numberOfMonths = input<number>(1);

  /** Whether to show days outside current month */
  readonly showOutsideDays = input<boolean>(true);

  /** Disabled dates function */
  readonly disabled = input<((date: Date) => boolean) | undefined>(undefined);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Date select event */
  readonly onSelect = output<Date | undefined>();

  /** Month change event */
  readonly onMonthChange = output<Date>();

  protected readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  protected readonly currentMonth = signal(new Date());

  protected readonly computedClass = computed(() =>
    cn('p-3', this.class())
  );

  protected readonly navButtonClass = computed(() =>
    cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
    )
  );

  protected readonly monthYear = computed(() => {
    const date = this.currentMonth();
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  protected readonly calendarWeeks = computed(() => {
    const date = this.currentMonth();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const weeks: {
      date: Date;
      isOutside: boolean;
      disabled: boolean;
    }[][] = [];

    const current = new Date(startDate);
    while (current <= endDate) {
      const week: {
        date: Date;
        isOutside: boolean;
        disabled: boolean;
      }[] = [];

      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(current);
        const isOutside = dayDate.getMonth() !== month;
        const disabledFn = this.disabled();
        const isDisabled = disabledFn ? disabledFn(dayDate) : false;

        week.push({
          date: dayDate,
          isOutside,
          disabled: isDisabled,
        });

        current.setDate(current.getDate() + 1);
      }

      weeks.push(week);
    }

    return weeks;
  });

  protected getDayClass(day: {
    date: Date;
    isOutside: boolean;
    disabled: boolean;
  }): string {
    const isToday = this.isSameDay(day.date, new Date());
    const selected = this.isSelected(day.date);

    return cn(
      buttonVariants({ variant: 'ghost' }),
      'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
      isToday && 'bg-accent text-accent-foreground',
      selected &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      day.isOutside &&
        'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
      day.disabled && 'text-muted-foreground opacity-50'
    );
  }

  protected isSelected(date: Date): boolean {
    const selected = this.selected();
    if (!selected) return false;
    return this.isSameDay(date, selected);
  }

  protected selectDate(date: Date): void {
    this.selected.set(date);
    this.onSelect.emit(date);
  }

  protected previousMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    this.currentMonth.set(newDate);
    this.onMonthChange.emit(newDate);
  }

  protected nextMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    this.currentMonth.set(newDate);
    this.onMonthChange.emit(newDate);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
