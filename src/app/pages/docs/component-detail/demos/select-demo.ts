import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'SelectDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, SelectContent, SelectItem, SelectTrigger, SelectValue],
  template: `
    <Select [(value)]="selectedFruit">
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  `,
})
export class SelectDemo {
  readonly selectedFruit = signal('');
}
