import { cn } from '@/lib/utils';
import { LiveAnnouncerService } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
 *
 * ACCESSIBILITY:
 * - Proper ARIA labels on day buttons
 * - aria-current="date" for today
 * - Month change announcements for screen readers
 * - Keyboard navigation support
 */
@Component({
  selector: 'Calendar',
  imports: [LucideAngularModule],
  host: {
    'attr.data-slot': '"calendar"',
    '[class]': 'computedClass()',
  },
  template: `
    <div role="application" [attr.aria-label]="ariaLabel()">
      <!-- Header with navigation -->
      <div class="w-full">
        <div class="w-full space-y-4">
          <!-- Month navigation -->
          <div class="relative flex items-center justify-center pt-1">
            <div
              class="text-sm font-medium"
              aria-live="polite"
              aria-atomic="true"
              role="heading"
              aria-level="2"
            >
              {{ monthYear() }}
            </div>
            <div class="flex items-center space-x-1 absolute right-1">
              <button
                type="button"
                [class]="navButtonClass()"
                (click)="previousMonth()"
                [disabled]="isPrevMonthDisabled()"
                [attr.aria-label]="'Go to previous month, ' + getPreviousMonthLabel()"
              >
                <lucide-icon [img]="ChevronLeftIcon" class="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                [class]="navButtonClass()"
                (click)="nextMonth()"
                [disabled]="isNextMonthDisabled()"
                [attr.aria-label]="'Go to next month, ' + getNextMonthLabel()"
              >
                <lucide-icon [img]="ChevronRightIcon" class="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <!-- Calendar grid -->
          <table
            class="w-full border-collapse space-y-1"
            role="grid"
            [attr.aria-label]="monthYear()"
          >
            <thead>
              <tr class="flex" role="row">
                @for (day of weekDays; track day; let i = $index) {
                  <th
                    scope="col"
                    class="text-muted-foreground w-full rounded-md font-normal text-[0.8rem]"
                    [attr.aria-label]="fullWeekDays[i]"
                  >
                    {{ day }}
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (week of calendarWeeks(); track $index) {
                <tr class="flex w-full mt-2" role="row">
                  @for (day of week; track day.date.toISOString()) {
                    <td
                      role="gridcell"
                      class="relative w-full p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-100 dark:[&:has([aria-selected])]:bg-neutral-800 [&:has([aria-selected].day-outside)]:bg-gray-100/50 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 [&:has([aria-selected].day-range-end)]:rounded-r-md"
                      [class.first:rounded-l-md]="true"
                      [class.last:rounded-r-md]="true"
                    >
                      <button
                        type="button"
                        [class]="getDayClass(day)"
                        [attr.aria-label]="getDateLabel(day.date)"
                        [attr.aria-selected]="isSelected(day.date) ? 'true' : null"
                        [attr.aria-current]="isToday(day.date) ? 'date' : null"
                        [attr.aria-disabled]="day.disabled ? 'true' : null"
                        [disabled]="day.disabled"
                        [tabindex]="getDayTabIndex(day)"
                        (click)="selectDate(day.date)"
                        (keydown)="onDayKeydown($event, day.date)"
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
  /** Date select event */
  readonly onSelect = output<Date | undefined>();
  /** Month change event */
  readonly onMonthChange = output<Date>();

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
  /** Minimum selectable date — dates before this are disabled, navigation before this month is blocked */
  readonly minDate = input<Date | undefined>(undefined);
  /** Maximum selectable date — dates after this are disabled, navigation after this month is blocked */
  readonly maxDate = input<Date | undefined>(undefined);
  /** Accessible label for the calendar */
  readonly ariaLabel = input<string>('Calendar');
  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _liveAnnouncer = inject(LiveAnnouncerService);

  protected readonly computedClass = computed(() => cn('w-full p-3', this.class()));
  protected readonly navButtonClass = computed(() =>
    cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-neutral-800',
    ),
  );
  /** True when navigating to the previous month would go before minDate */
  protected readonly isPrevMonthDisabled = computed(() => {
    const min = this.minDate();
    if (!min) return false;
    const current = this.currentMonth();
    const prevMonthEnd = new Date(current.getFullYear(), current.getMonth(), 0);
    return prevMonthEnd < new Date(min.getFullYear(), min.getMonth(), 1);
  });
  /** True when navigating to the next month would go after maxDate */
  protected readonly isNextMonthDisabled = computed(() => {
    const max = this.maxDate();
    if (!max) return false;
    const current = this.currentMonth();
    const nextMonthStart = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    return nextMonthStart > new Date(max.getFullYear(), max.getMonth() + 1, 0);
  });
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
        const min = this.minDate();
        const max = this.maxDate();
        const isDisabled =
          (disabledFn ? disabledFn(dayDate) : false) ||
          (min != null && this.isBeforeDay(dayDate, min)) ||
          (max != null && this.isAfterDay(dayDate, max));

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

  protected readonly currentMonth = signal(new Date());

  protected readonly ChevronLeftIcon = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;
  protected readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  protected readonly fullWeekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  /** Get accessible label for a date */
  protected getDateLabel(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const label = date.toLocaleDateString('en-US', options);

    if (this.isToday(date)) {
      return `${label}, today`;
    }
    if (this.isSelected(date)) {
      return `${label}, selected`;
    }
    return label;
  }
  /** Check if date is today */
  protected isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }
  /** Get label for previous month button */
  protected getPreviousMonthLabel(): string {
    const current = this.currentMonth();
    const prev = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    return prev.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
  /** Get label for next month button */
  protected getNextMonthLabel(): string {
    const current = this.currentMonth();
    const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    return next.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
  /** Get tabindex for day button (roving tabindex) */
  protected getDayTabIndex(day: { date: Date; isOutside: boolean; disabled: boolean }): number {
    if (day.disabled || day.isOutside) return -1;
    const selected = this.selected();
    if (selected && this.isSameDay(day.date, selected)) return 0;
    if (this.isToday(day.date)) return 0;
    return -1;
  }
  /** Handle keyboard navigation within the calendar */
  protected onDayKeydown(event: KeyboardEvent, currentDate: Date): void {
    let newDate: Date | null = null;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'ArrowDown':
        event.preventDefault();
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'Home':
        event.preventDefault();
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        break;
      case 'End':
        event.preventDefault();
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
    }

    if (newDate) {
      // Check if we need to change months
      if (newDate.getMonth() !== this.currentMonth().getMonth()) {
        this.currentMonth.set(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }
      // Focus the new date after DOM update
      setTimeout(() => {
        const button = document.querySelector(
          `[aria-label*="${newDate!.getDate()},"]`,
        ) as HTMLElement;
        button?.focus();
      }, 0);
    }
  }
  protected getDayClass(day: { date: Date; isOutside: boolean; disabled: boolean }): string {
    const todayCheck = this.isSameDay(day.date, new Date());
    const selected = this.isSelected(day.date);

    return cn(
      buttonVariants({ variant: 'ghost' }),
      'h-9 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
      todayCheck && 'bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-neutral-100',
      selected &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      day.isOutside &&
        'day-outside text-muted-foreground aria-selected:bg-gray-100/50 aria-selected:text-muted-foreground dark:aria-selected:bg-neutral-800/50',
      day.disabled && 'text-muted-foreground opacity-50',
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
    this._liveAnnouncer.announce(`Selected ${this.getDateLabel(date)}`, 'polite');
  }
  protected previousMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    this.currentMonth.set(newDate);
    this.onMonthChange.emit(newDate);
    this._liveAnnouncer.announce(this.getPreviousMonthLabel(), 'polite');
  }
  protected nextMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    this.currentMonth.set(newDate);
    this.onMonthChange.emit(newDate);
    this._liveAnnouncer.announce(this.getNextMonthLabel(), 'polite');
  }
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  private isBeforeDay(date: Date, ref: Date): boolean {
    if (date.getFullYear() !== ref.getFullYear()) return date.getFullYear() < ref.getFullYear();
    if (date.getMonth() !== ref.getMonth()) return date.getMonth() < ref.getMonth();
    return date.getDate() < ref.getDate();
  }
  private isAfterDay(date: Date, ref: Date): boolean {
    if (date.getFullYear() !== ref.getFullYear()) return date.getFullYear() > ref.getFullYear();
    if (date.getMonth() !== ref.getMonth()) return date.getMonth() > ref.getMonth();
    return date.getDate() > ref.getDate();
  }

  // TODO: range and multiple modes - requires multi-select state
}

