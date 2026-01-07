import { Label } from '@/ui/label';
import { NativeSelect } from '@/ui/native-select';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'NativeSelectDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Label, NativeSelect],
  template: `
    <div class="grid w-full max-w-sm gap-1.5">
      <Label for="framework">Framework</Label>
      <select NativeSelect id="framework">
        <option value="">Select a framework</option>
        <option value="angular">Angular</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </select>
    </div>
  `,
})
export class NativeSelectDemo {}
