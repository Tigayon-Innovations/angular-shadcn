import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarIcon, LucideAngularModule } from 'lucide-angular';
import { buttonVariants } from '../button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

/**
 * DatePicker component - date selection with calendar popover.
 * Matches shadcn/ui React DatePicker exactly.
 * Implements ControlValueAccessor for Angular Forms integration.
 */
@Component({
  selector: 'DatePicker',
  imports: [LucideAngularModule, Popover, PopoverTrigger, PopoverContent, Calendar],
  template: `
    <Popover class="block w-full">
      <PopoverTrigger class="block w-full">
        <button type="button" [class]="computedButtonClass()">
          <lucide-icon [img]="CalendarIconRef" class="h-4 w-4 shrink-0" />
          @if (date()) {
            <span class="flex-1 truncate text-left">{{ formatDate(date()!) }}</span>
          } @else {
            <span class="flex-1 truncate text-left">{{ placeholder() }}</span>
          }
        </button>
      </PopoverTrigger>
      <PopoverContent class="p-0" align="start" [matchTriggerWidth]="true">
        <Calendar
          [mode]="'single'"
          [selected]="date()"
          (onSelect)="onDateSelect($event)"
          [disabled]="disabledDates()"
          [minDate]="minDate()"
          [maxDate]="maxDate()"
          class="w-full"
        />
      </PopoverContent>
    </Popover>
  `,
  host: {
    'attr.data-slot': '"date-picker"',
    class: 'contents',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker implements ControlValueAccessor {
  private readonly popover = viewChild(Popover);

  /** Date select event */
  readonly onSelect = output<Date | undefined>();

  /** Selected date (model input for two-way binding) */
  readonly date = model<Date | undefined>(undefined);

  /** Additional CSS classes */
  readonly class = input<string>('');
  /** Placeholder text */
  readonly placeholder = input<string>('Pick a date');
  /** Date format */
  readonly dateFormat = input<string>('PPP');
  /** Disabled dates function */
  readonly disabledDates = input<((date: Date) => boolean) | undefined>(undefined);
  /** Minimum selectable date — passed to Calendar */
  readonly minDate = input<Date | undefined>(undefined);
  /** Maximum selectable date — passed to Calendar */
  readonly maxDate = input<Date | undefined>(undefined);
  /** Locale used for date formatting (e.g. 'en-US', 'fr-FR') */
  readonly locale = input<string>('en-US');

  /** Internal disabled state set by ControlValueAccessor */
  protected readonly isDisabled = signal<boolean>(false);

  /** ControlValueAccessor callbacks */
  private onChange: (value: Date | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly computedButtonClass = computed(() =>
    cn(
      buttonVariants({ variant: 'outline' }),
      'h-10 w-full justify-start gap-3 px-4 py-6 text-left font-normal hover:bg-gray-100 dark:hover:bg-neutral-800',
      this.popover()?.isOpen() &&
        'border-primary/30 ring-primary/20 ring-2 dark:border-white/30 dark:ring-white/20',
      !this.date() && 'text-muted-foreground',
      this.isDisabled() && 'pointer-events-none cursor-not-allowed opacity-50',
      this.class(),
    ),
  );

  protected readonly CalendarIconRef = CalendarIcon;

  protected formatDate(date: Date): string {
    return date.toLocaleDateString(this.locale(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  protected onDateSelect(date: Date | undefined): void {
    this.date.set(date);
    this.onSelect.emit(date);
    this.onChange(date);
    this.onTouched();
    this.popover()?.setOpen(false);
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | undefined): void {
    this.date.set(value ?? undefined);
  }
  registerOnChange(fn: (value: Date | undefined) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
