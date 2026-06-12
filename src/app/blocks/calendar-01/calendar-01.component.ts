import { Calendar } from '@/ui/calendar';
import { Card, CardContent } from '@/ui/card';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-calendar-01',
  imports: [Calendar, Card, CardContent],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <Card class="w-fit">
        <CardContent class="p-0">
          <Calendar class="w-[280px]" [(selected)]="selectedDate" />
          <div class="border-t px-4 py-3 text-center text-sm text-muted-foreground">
            {{ selectedDateLabel() }}
          </div>
        </CardContent>
      </Card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar01Component {
  protected readonly selectedDate = signal<Date | undefined>(undefined);

  protected readonly selectedDateLabel = computed(() => {
    const date = this.selectedDate();
    if (!date) {
      return 'No date selected';
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  });
}
