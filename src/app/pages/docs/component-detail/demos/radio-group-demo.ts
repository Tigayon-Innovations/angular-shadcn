import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'RadioGroupDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadioGroup, RadioGroupItem, Label],
  template: `
    <RadioGroup defaultValue="comfortable" class="space-y-3">
      <div class="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  `,
})
export class RadioGroupDemo {}
