import { Slider } from '@/ui/slider';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'SliderDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Slider],
  template: `
    <div class="w-full max-w-sm space-y-4">
      <Slider [(value)]="value" [max]="100" [step]="1" />
      <div class="flex items-center justify-between text-sm">
        <span class="text-muted-foreground">Volume</span>
        <span class="font-medium tabular-nums">{{ value() }}%</span>
      </div>
    </div>
  `,
})
export class SliderDemo {
  readonly value = signal(50);
}
