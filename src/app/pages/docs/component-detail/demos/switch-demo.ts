import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'SwitchDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Switch, Label],
  template: `
    <div class="flex items-center space-x-2">
      <Switch id="airplane-mode" [(checked)]="enabled" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
    <p class="text-sm text-muted-foreground mt-2">Status: {{ enabled() ? 'On' : 'Off' }}</p>
  `,
})
export class SwitchDemo {
  readonly enabled = signal(false);
}
