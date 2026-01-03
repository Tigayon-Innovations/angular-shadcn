import { Toggle } from '@/ui/toggle';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Bold, Italic, LucideAngularModule, Underline } from 'lucide-angular';

@Component({
  selector: 'ToggleDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Toggle, LucideAngularModule],
  template: `
    <div class="flex items-center gap-2">
      <Toggle aria-label="Toggle bold">
        <lucide-icon [img]="Bold" class="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <lucide-icon [img]="Italic" class="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <lucide-icon [img]="Underline" class="h-4 w-4" />
      </Toggle>
    </div>
  `,
})
export class ToggleDemo {
  protected readonly Bold = Bold;
  protected readonly Italic = Italic;
  protected readonly Underline = Underline;
}
