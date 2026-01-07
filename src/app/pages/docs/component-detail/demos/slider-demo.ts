import { Slider } from '@/ui/slider';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'SliderDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Slider],
  template: `
    <div class="w-full max-w-md space-y-4">
      <Slider [(value)]="value"
        [max]="100"
        [step]="1"
        class="w-full"
       />
      <p class="text-sm text-muted-foreground text-center">Value: {{ value() }}</p>
    </div>
  `,
})
export class SliderDemo {
  readonly value = signal(50);
}
