import { Badge } from '@/ui/badge';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'BadgeDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Badge],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  `,
})
export class BadgeDemo {}
