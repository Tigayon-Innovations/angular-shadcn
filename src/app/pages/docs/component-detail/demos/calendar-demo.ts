import { Calendar } from '@/ui/calendar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'CalendarDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Calendar],
  template: `
    <div class="flex justify-center">
      <Calendar [(selected)]="date" class="rounded-md border shadow-sm" />
    </div>
  `,
})
export class CalendarDemo {
  readonly date = signal<Date | undefined>(new Date());
}
