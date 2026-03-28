import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/ui/command';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Calculator,
  Calendar,
  CreditCard,
  LucideAngularModule,
  Settings,
  Smile,
  User,
} from 'lucide-angular';

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
    CommandShortcut,
    LucideAngularModule,
  ],
  template: `
    <Command class="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type to search (try 'search', 'calendar', 'profile')..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem [value]="'calendar'" [keywords]="['date', 'event', 'schedule']">
            <lucide-icon [img]="Calendar" class="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem [value]="'search-emoji'" [keywords]="['emoji', 'emoticon', 'face']">
            <lucide-icon [img]="Smile" class="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem [value]="'calculator'" [keywords]="['math', 'compute', 'calc']">
            <lucide-icon [img]="Calculator" class="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem [value]="'profile'" [keywords]="['account', 'user', 'me']">
            <lucide-icon [img]="User" class="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem [value]="'billing'" [keywords]="['payment', 'invoice', 'charge']">
            <lucide-icon [img]="CreditCard" class="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem [value]="'settings'" [keywords]="['config', 'preferences', 'options']">
            <lucide-icon [img]="Settings" class="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
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
