import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Textarea } from '@/ui/textarea';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface NavItem {
  label: string;
  active: boolean;
}

@Component({
  selector: 'example-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    Textarea,
  ],
  template: `
    <div class="p-4 md:p-10">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
        <p class="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator class="my-6" />

      <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <!-- Sidebar nav -->
        <aside class="lg:w-1/5">
          <nav class="flex gap-1 overflow-x-auto lg:flex-col lg:gap-1">
            @for (item of navItems; track item.label) {
              <a
                href="#"
                (click)="$event.preventDefault()"
                [class]="
                  item.active
                    ? 'inline-flex items-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:justify-start'
                    : 'inline-flex items-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-transparent hover:underline lg:justify-start'
                "
              >
                {{ item.label }}
              </a>
            }
          </nav>
        </aside>

        <!-- Profile form -->
        <div class="flex-1 lg:max-w-2xl">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium">Profile</h3>
              <p class="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <Separator />

            <div class="grid gap-2">
              <Label htmlFor="forms-username">Username</Label>
              <input Input id="forms-username" placeholder="shadcn" />
              <p class="text-sm text-muted-foreground">
                This is your public display name. It can be your real name or a pseudonym. You can
                only change this once every 30 days.
              </p>
            </div>

            <div class="grid gap-2">
              <Label htmlFor="forms-email">Email</Label>
              <Select>
                <SelectTrigger id="forms-email" class="w-full md:w-[320px]">
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m@example.com">m&#64;example.com</SelectItem>
                  <SelectItem value="m@google.com">m&#64;google.com</SelectItem>
                  <SelectItem value="m@support.com">m&#64;support.com</SelectItem>
                </SelectContent>
              </Select>
              <p class="text-sm text-muted-foreground">
                You can manage verified email addresses in your email settings.
              </p>
            </div>

            <div class="grid gap-2">
              <Label htmlFor="forms-bio">Bio</Label>
              <textarea
                Textarea
                id="forms-bio"
                placeholder="Tell us a little bit about yourself"
              >I own a computer.</textarea>
              <p class="text-sm text-muted-foreground">
                You can &#64;mention other users and organizations to link to them.
              </p>
            </div>

            <Button>Update profile</Button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ExampleForms {
  protected readonly navItems: NavItem[] = [
    { label: 'Profile', active: true },
    { label: 'Account', active: false },
    { label: 'Appearance', active: false },
    { label: 'Notifications', active: false },
    { label: 'Display', active: false },
  ];
}
