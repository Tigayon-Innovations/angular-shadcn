import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'LabelDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Label],
  template: `
    <div class="flex flex-col gap-2">
      <Label htmlFor="username">Username</Label>
      <input
        type="text"
        id="username"
        placeholder="Enter username"
        class="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>
  `,
})
export class LabelDemo {}
