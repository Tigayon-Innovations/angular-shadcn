import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Switch } from '@/ui/switch';
import { Textarea } from '@/ui/textarea';
import { UiAvatar } from '@/ui/avatar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  Chrome,
  CreditCard,
  Github,
  LucideAngularModule,
  Smartphone,
  Wallet,
} from 'lucide-angular';

interface Person {
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
}

interface CookieSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'example-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    Switch,
    Textarea,
    UiAvatar,
    LucideAngularModule,
  ],
  template: `
    <div class="grid items-start gap-6 p-4 md:p-8 lg:grid-cols-3">
      <!-- Column 1 -->
      <div class="grid gap-6">
        <!-- Create Account -->
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <Button variant="outline" class="gap-2">
                <lucide-icon [img]="icons.Github" class="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" class="gap-2">
                <lucide-icon [img]="icons.Chrome" class="h-4 w-4" />
                Google
              </Button>
            </div>
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div class="grid gap-2">
              <Label htmlFor="cards-email">Email</Label>
              <input Input id="cards-email" type="email" placeholder="m@example.com" />
            </div>
            <div class="grid gap-2">
              <Label htmlFor="cards-password">Password</Label>
              <input Input id="cards-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full">Create account</Button>
          </CardFooter>
        </Card>

        <!-- Share Document -->
        <Card>
          <CardHeader>
            <CardTitle>Share this document</CardTitle>
            <CardDescription>Anyone with the link can view this document.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            <div class="flex gap-2">
              <input Input value="http://example.com/link/to/document" class="flex-1" />
              <Button variant="secondary" class="shrink-0">Copy Link</Button>
            </div>
            <Separator />
            <div class="grid gap-4">
              <h4 class="text-sm font-medium">People with access</h4>
              @for (person of people; track person.email) {
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <ui-avatar
                      class="h-9 w-9"
                      [src]="person.avatar"
                      [alt]="person.name"
                      [fallback]="person.initials"
                    />
                    <div>
                      <p class="text-sm font-medium leading-none">{{ person.name }}</p>
                      <p class="mt-1 text-sm text-muted-foreground">{{ person.email }}</p>
                    </div>
                  </div>
                  <Select [value]="person.role">
                    <SelectTrigger class="w-[110px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edit">Can edit</SelectItem>
                      <SelectItem value="view">Can view</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Column 2 -->
      <div class="grid gap-6">
        <!-- Payment Method -->
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Add a new payment method to your account.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            <RadioGroup defaultValue="card" class="grid grid-cols-3 gap-4">
              <label
                class="flex cursor-pointer flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <RadioGroupItem value="card" class="sr-only" />
                <lucide-icon [img]="icons.CreditCard" class="h-6 w-6" />
                <span class="text-sm font-medium">Card</span>
              </label>
              <label
                class="flex cursor-pointer flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <RadioGroupItem value="paypal" class="sr-only" />
                <lucide-icon [img]="icons.Wallet" class="h-6 w-6" />
                <span class="text-sm font-medium">Paypal</span>
              </label>
              <label
                class="flex cursor-pointer flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <RadioGroupItem value="apple" class="sr-only" />
                <lucide-icon [img]="icons.Smartphone" class="h-6 w-6" />
                <span class="text-sm font-medium">Apple</span>
              </label>
            </RadioGroup>
            <div class="grid gap-2">
              <Label htmlFor="cards-name">Name</Label>
              <input Input id="cards-name" placeholder="First Last" />
            </div>
            <div class="grid gap-2">
              <Label htmlFor="cards-number">Card number</Label>
              <input Input id="cards-number" placeholder="" />
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="grid gap-2">
                <Label htmlFor="cards-month">Expires</Label>
                <Select>
                  <SelectTrigger id="cards-month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    @for (month of months; track month) {
                      <SelectItem [value]="month">{{ month }}</SelectItem>
                    }
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-2">
                <Label htmlFor="cards-year">Year</Label>
                <Select>
                  <SelectTrigger id="cards-year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    @for (year of years; track year) {
                      <SelectItem [value]="year">{{ year }}</SelectItem>
                    }
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-2">
                <Label htmlFor="cards-cvc">CVC</Label>
                <input Input id="cards-cvc" placeholder="CVC" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full">Continue</Button>
          </CardFooter>
        </Card>

        <!-- Cookie Settings -->
        <Card>
          <CardHeader>
            <CardTitle>Cookie Settings</CardTitle>
            <CardDescription>Manage your cookie settings here.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            @for (setting of cookieSettings; track setting.id) {
              <div class="flex items-center justify-between gap-4">
                <div class="space-y-1">
                  <Label [htmlFor]="setting.id">{{ setting.label }}</Label>
                  <p class="text-sm text-muted-foreground">{{ setting.description }}</p>
                </div>
                <Switch [id]="setting.id" [checked]="setting.enabled" />
              </div>
            }
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full">Save preferences</Button>
          </CardFooter>
        </Card>
      </div>

      <!-- Column 3 -->
      <div class="grid gap-6">
        <!-- Team Members -->
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Invite your team members to collaborate.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            @for (member of members; track member.email) {
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <ui-avatar
                    class="h-9 w-9"
                    [src]="member.avatar"
                    [alt]="member.name"
                    [fallback]="member.initials"
                  />
                  <div>
                    <p class="text-sm font-medium leading-none">{{ member.name }}</p>
                    <p class="mt-1 text-sm text-muted-foreground">{{ member.email }}</p>
                  </div>
                </div>
                <Select [value]="member.role">
                  <SelectTrigger class="w-[110px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
          </CardContent>
        </Card>

        <!-- Report Issue -->
        <Card>
          <CardHeader>
            <CardTitle>Report an issue</CardTitle>
            <CardDescription>What area are you having problems with?</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label htmlFor="cards-area">Area</Label>
                <Select [(value)]="issueArea">
                  <SelectTrigger id="cards-area">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="deployments">Deployments</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-2">
                <Label htmlFor="cards-severity">Severity</Label>
                <Select [(value)]="issueSeverity">
                  <SelectTrigger id="cards-severity">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Severity 1</SelectItem>
                    <SelectItem value="2">Severity 2</SelectItem>
                    <SelectItem value="3">Severity 3</SelectItem>
                    <SelectItem value="4">Severity 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="grid gap-2">
              <Label htmlFor="cards-subject">Subject</Label>
              <input Input id="cards-subject" placeholder="I need help with..." />
            </div>
            <div class="grid gap-2">
              <Label htmlFor="cards-description">Description</Label>
              <textarea
                Textarea
                id="cards-description"
                placeholder="Please include all information relevant to your issue."
              ></textarea>
            </div>
          </CardContent>
          <CardFooter class="justify-between gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  `,
})
export class ExampleCards {
  protected readonly icons = { Github, Chrome, CreditCard, Wallet, Smartphone };

  protected readonly issueArea = signal('billing');
  protected readonly issueSeverity = signal('2');

  protected readonly months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  protected readonly years = ['2026', '2027', '2028', '2029', '2030'];

  protected readonly people: Person[] = [
    {
      name: 'Olivia Martin',
      email: 'm@example.com',
      avatar: 'https://i.pravatar.cc/100?img=10',
      initials: 'OM',
      role: 'edit',
    },
    {
      name: 'Isabella Nguyen',
      email: 'b@example.com',
      avatar: 'https://i.pravatar.cc/100?img=11',
      initials: 'IN',
      role: 'view',
    },
    {
      name: 'Sofia Davis',
      email: 'p@example.com',
      avatar: 'https://i.pravatar.cc/100?img=12',
      initials: 'SD',
      role: 'view',
    },
  ];

  protected readonly members: Person[] = [
    {
      name: 'Sofia Davis',
      email: 'm@example.com',
      avatar: 'https://i.pravatar.cc/100?img=20',
      initials: 'SD',
      role: 'owner',
    },
    {
      name: 'Jackson Lee',
      email: 'p@example.com',
      avatar: 'https://i.pravatar.cc/100?img=21',
      initials: 'JL',
      role: 'developer',
    },
    {
      name: 'Isabella Nguyen',
      email: 'i@example.com',
      avatar: 'https://i.pravatar.cc/100?img=22',
      initials: 'IN',
      role: 'viewer',
    },
  ];

  protected readonly cookieSettings: CookieSetting[] = [
    {
      id: 'cookie-necessary',
      label: 'Strictly Necessary',
      description: 'These cookies are essential in order to use the website.',
      enabled: true,
    },
    {
      id: 'cookie-functional',
      label: 'Functional Cookies',
      description: 'These cookies allow the website to provide personalized functionality.',
      enabled: false,
    },
    {
      id: 'cookie-performance',
      label: 'Performance Cookies',
      description: 'These cookies help to improve the performance of the website.',
      enabled: false,
    },
  ];
}
