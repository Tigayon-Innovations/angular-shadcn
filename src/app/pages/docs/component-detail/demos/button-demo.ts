import { Button } from '@/ui/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ButtonDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  `,
})
export class ButtonDemo {}
