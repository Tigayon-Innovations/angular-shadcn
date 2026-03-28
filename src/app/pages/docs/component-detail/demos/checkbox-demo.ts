import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'CheckboxDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Checkbox, Label],
  template: `
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" [(checked)]="checked" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
    <p class="text-sm text-muted-foreground mt-2">Checked: {{ checked() }}</p>
  `,
})
export class CheckboxDemo {
  readonly checked = signal(false);
}
