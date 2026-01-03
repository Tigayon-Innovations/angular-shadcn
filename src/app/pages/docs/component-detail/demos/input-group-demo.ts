import { Input } from '@/ui/input';
import { InputGroup, InputGroupAddon } from '@/ui/input-group';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AtSign, LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'InputGroupDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Input, InputGroup, InputGroupAddon, LucideAngularModule],
  template: `
    <div class="space-y-4 w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <lucide-icon [img]="Search" class="h-4 w-4 text-muted-foreground" />
        </InputGroupAddon>
        <Input placeholder="Search..." />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input placeholder="example.com" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <lucide-icon [img]="AtSign" class="h-4 w-4 text-muted-foreground" />
        </InputGroupAddon>
        <Input placeholder="username" />
      </InputGroup>
    </div>
  `,
})
export class InputGroupDemo {
  protected readonly Search = Search;
  protected readonly AtSign = AtSign;
}
