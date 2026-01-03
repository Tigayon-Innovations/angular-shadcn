import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/ui/command';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calculator, Calendar, CreditCard, LucideAngularModule, Settings, Smile, User } from 'lucide-angular';

@Component({
  selector: 'CommandDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    LucideAngularModule,
  ],
  template: `
    <Command class="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <lucide-icon [img]="Calendar" class="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <lucide-icon [img]="Smile" class="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <lucide-icon [img]="Calculator" class="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <lucide-icon [img]="User" class="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <lucide-icon [img]="CreditCard" class="mr-2 h-4 w-4" />
            <span>Billing</span>
          </CommandItem>
          <CommandItem>
            <lucide-icon [img]="Settings" class="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  `,
})
export class CommandDemo {
  protected readonly Calendar = Calendar;
  protected readonly Smile = Smile;
  protected readonly Calculator = Calculator;
  protected readonly User = User;
  protected readonly CreditCard = CreditCard;
  protected readonly Settings = Settings;
}
