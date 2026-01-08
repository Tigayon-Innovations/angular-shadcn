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
  template: `
    <div [class]="computedClass()" role="application" [attr.aria-label]="ariaLabel()">
      <!-- Header with navigation -->
      <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div class="space-y-4">
          <!-- Month navigation -->
          <div class="flex justify-center pt-1 relative items-center">
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
                [attr.aria-label]="'Go to previous month, ' + getPreviousMonthLabel()"
              >
                <lucide-icon [img]="ChevronLeftIcon" class="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                [class]="navButtonClass()"
                (click)="nextMonth()"
                [attr.aria-label]="'Go to next month, ' + getNextMonthLabel()"
              >
                <lucide-icon [img]="ChevronRightIcon" class="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <!-- Calendar grid -->
          <table class="w-full border-collapse space-y-1" role="grid" [attr.aria-label]="monthYear()">
            <thead>
              <tr class="flex" role="row">
                @for (day of weekDays; track day; let i = $index) {
                  <th
                    scope="col"
                    class="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
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
                      class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md"
                      [class.first:rounded-l-md]="true"
                      [class.last:rounded-r-md]="true"
                    >
                      <button
                        type="button"
                        [class]="getDayClass(day)"
                        [attr.aria-label]="getDateLabel(day.date)"
                        [attr.aria-selected]="isSelected(day.date)"
                        [attr.aria-current]="isToday(day.date) ? 'date' : null"
                        [attr.aria-disabled]="day.disabled"
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
  protected readonly ChevronLeftIcon = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;
  private readonly liveAnnouncer = inject(LiveAnnouncerService);

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

  /** Accessible label for the calendar */
  readonly ariaLabel = input<string>('Calendar');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Date select event */
  readonly onSelect = output<Date | undefined>();

  /** Month change event */
  readonly onMonthChange = output<Date>();

  protected readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  protected readonly fullWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  /** Get accessible label for a date */
  protected getDateLabel(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
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
        const button = document.querySelector(`[aria-label*="${newDate!.getDate()},"]`) as HTMLElement;
        button?.focus();
      }, 0);
    }
  }

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
    const todayCheck = this.isSameDay(day.date, new Date());
    const selected = this.isSelected(day.date);

    return cn(
      buttonVariants({ variant: 'ghost' }),
      'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
      todayCheck && 'bg-accent text-accent-foreground',
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
    this.liveAnnouncer.announce(`Selected ${this.getDateLabel(date)}`, 'polite');
  }

  protected previousMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    this.currentMonth.set(newDate);
    this.onMonthChange.emit(newDate);
    this.liveAnnouncer.announce(this.getPreviousMonthLabel(), 'polite');
  }

  protected nextMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    this.currentMonth.set(newDate);
    this.onMonthChange.emit(newDate);
    this.liveAnnouncer.announce(this.getNextMonthLabel(), 'polite');
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
