
import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'InputDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Label],
  template: `
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  `,
})
export class InputDemo {}
