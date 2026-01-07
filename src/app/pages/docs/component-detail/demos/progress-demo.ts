import { Progress } from '@/ui/progress';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'ProgressDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  template: `
    <div class="w-full max-w-lg space-y-2">
      <Progress [value]="progress()" class="w-full h-4" />
      <p class="text-sm text-muted-foreground text-center">{{ progress() }}%</p>
    </div>
  `,
})
export class ProgressDemo implements OnInit, OnDestroy {
  readonly progress = signal(13);
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.progress.update((p) => (p >= 100 ? 0 : p + 5));
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
