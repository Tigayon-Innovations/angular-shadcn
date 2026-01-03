import { Button } from '@/ui/button';
import { ButtonGroup } from '@/ui/button-group';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlignCenter, AlignLeft, AlignRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ButtonGroupDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, ButtonGroup, LucideAngularModule],
  template: `
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <lucide-icon [img]="AlignLeft" class="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <lucide-icon [img]="AlignCenter" class="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <lucide-icon [img]="AlignRight" class="h-4 w-4" />
      </Button>
    </ButtonGroup>
  `,
})
export class ButtonGroupDemo {
  protected readonly AlignLeft = AlignLeft;
  protected readonly AlignCenter = AlignCenter;
  protected readonly AlignRight = AlignRight;
}
