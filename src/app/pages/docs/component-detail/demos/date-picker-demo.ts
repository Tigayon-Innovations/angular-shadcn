import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CalendarIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'DatePickerDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
    LucideAngularModule,
    DatePipe,
  ],
  template: `
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          [class]="
            cn('w-[280px] justify-start text-left font-normal', !date() && 'text-muted-foreground')
          "
        >
          <lucide-icon [img]="CalendarIcon" class="mr-2 h-4 w-4" />
          @if (date()) {
            {{ date() | date: 'PPP' }}
          } @else {
            <span>Pick a date</span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar [selected]="date()" (selectedChange)="date.set($event)" mode="single" />
      </PopoverContent>
    </Popover>
  `,
})
export class DatePickerDemo {
  protected readonly CalendarIcon = CalendarIcon;
  protected readonly cn = cn;
  protected readonly date = signal<Date | undefined>(undefined);
}
