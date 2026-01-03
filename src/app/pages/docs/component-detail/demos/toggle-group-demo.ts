import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlignCenter, AlignLeft, AlignRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ToggleGroupDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToggleGroup, ToggleGroupItem, LucideAngularModule],
  template: `
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Left align">
        <lucide-icon [img]="AlignLeft" class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center align">
        <lucide-icon [img]="AlignCenter" class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right align">
        <lucide-icon [img]="AlignRight" class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  `,
})
export class ToggleGroupDemo {
  protected readonly AlignLeft = AlignLeft;
  protected readonly AlignCenter = AlignCenter;
  protected readonly AlignRight = AlignRight;
}
