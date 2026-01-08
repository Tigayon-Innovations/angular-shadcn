import { Progress } from '@/ui/progress';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'ProgressDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  template: `
    <div class="w-full max-w-md space-y-3">
      <Progress [value]="progress()" class="h-2"></Progress>
      <div class="flex items-center justify-between text-sm text-muted-foreground">
        <span>Loading...</span>
        <span class="font-medium tabular-nums">{{ progress() }}%</span>
      </div>
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
