import { UiAvatar } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Check, Copy, LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { ThemeService } from 'src/app/services';
import { THEME_PRESETS, type ThemePreset } from './themes-data';

@Component({
  selector: 'ThemesPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Badge,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
    Switch,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    UiAvatar,
    LucideAngularModule,
  ],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Header -->
      <section class="container mx-auto px-4 py-12 text-center md:py-16">
        <h1 class="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Add colors. Make it yours.
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          Hand-picked themes that you can copy and paste into your apps.
        </p>
      </section>

      <!-- Theme picker -->
      <section class="container mx-auto px-4 pb-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            @for (theme of themes; track theme.slug) {
              <Button
                [variant]="activeTheme().slug === theme.slug ? 'default' : 'outline'"
                size="sm"
                class="gap-2"
                (click)="selectTheme(theme)"
              >
                <span
                  class="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10"
                  [style.background-color]="theme.activeColor"
                ></span>
                {{ theme.name }}
              </Button>
            }
          </div>
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              (click)="toggleMode()"
              [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <lucide-icon [img]="isDark() ? icons.Sun : icons.Moon" class="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm" class="gap-2" (click)="codeDialogOpen.set(true)">
              <lucide-icon [img]="icons.Copy" class="h-4 w-4" />
              Copy code
            </Button>
          </div>
        </div>
      </section>

      <!-- Copy code dialog -->
      <Dialog [open]="codeDialogOpen()" (openChange)="codeDialogOpen.set($event)">
        <DialogContent class="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Theme: {{ activeTheme().name }}</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>
          <div class="relative">
            <pre
              class="max-h-[450px] overflow-auto rounded-lg bg-zinc-950 p-4 text-sm text-zinc-50 dark:bg-zinc-900"
            ><code>{{ generatedCss() }}</code></pre>
            <Button
              variant="secondary"
              size="icon"
              class="absolute right-3 top-3 h-8 w-8"
              (click)="copyCss()"
              aria-label="Copy CSS to clipboard"
            >
              <lucide-icon [img]="copied() ? icons.Check : icons.Copy" class="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <!-- Live preview -->
      <section class="container mx-auto px-4 pb-16">
        <div class="rounded-xl border bg-background p-4 shadow-sm md:p-6">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <!-- Stats card -->
            <Card>
              <CardHeader>
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle class="text-3xl">$15,231.89</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-xs text-muted-foreground">+20.1% from last month</p>
                <div class="mt-4 flex h-16 items-end gap-1">
                  @for (bar of statsBars; track $index) {
                    <div
                      class="flex-1 rounded-sm bg-primary/90"
                      [style.height.%]="bar"
                    ></div>
                  }
                </div>
              </CardContent>
            </Card>

            <!-- Cookie Settings card -->
            <Card>
              <CardHeader>
                <CardTitle>Cookie Settings</CardTitle>
                <CardDescription>Manage your cookie settings here.</CardDescription>
              </CardHeader>
              <CardContent class="grid gap-6">
                <div class="flex items-center justify-between gap-4">
                  <div class="flex flex-col gap-1">
                    <Label htmlFor="necessary" class="mb-0">Strictly Necessary</Label>
                    <span class="text-xs text-muted-foreground">
                      These cookies are essential for the website.
                    </span>
                  </div>
                  <Switch id="necessary" [defaultChecked]="true" />
                </div>
                <div class="flex items-center justify-between gap-4">
                  <div class="flex flex-col gap-1">
                    <Label htmlFor="functional" class="mb-0">Functional Cookies</Label>
                    <span class="text-xs text-muted-foreground">
                      These cookies allow personalized features.
                    </span>
                  </div>
                  <Switch id="functional" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" class="w-full">Save preferences</Button>
              </CardFooter>
            </Card>

            <!-- Login card -->
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your email below to login to your account.</CardDescription>
              </CardHeader>
              <CardContent class="grid gap-4">
                <div class="grid gap-1.5">
                  <Label htmlFor="theme-email">Email</Label>
                  <input Input id="theme-email" type="email" placeholder="m@example.com" />
                </div>
                <div class="grid gap-1.5">
                  <Label htmlFor="theme-password">Password</Label>
                  <input Input id="theme-password" type="password" />
                </div>
              </CardContent>
              <CardFooter class="flex flex-col gap-2">
                <Button class="w-full">Sign in</Button>
                <Button variant="outline" class="w-full">Sign in with Google</Button>
              </CardFooter>
            </Card>

            <!-- Team members card -->
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Invite your team members to collaborate.</CardDescription>
              </CardHeader>
              <CardContent class="grid gap-5">
                @for (member of teamMembers; track member.email) {
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                      <ui-avatar [fallback]="member.initials" class="h-9 w-9" />
                      <div class="flex flex-col">
                        <span class="text-sm font-medium leading-none">{{ member.name }}</span>
                        <span class="text-xs text-muted-foreground">{{ member.email }}</span>
                      </div>
                    </div>
                    <Badge [variant]="member.badgeVariant">{{ member.role }}</Badge>
                  </div>
                }
              </CardContent>
            </Card>

            <!-- Tabs example card -->
            <Card class="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account">
                  <TabsList class="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <div class="grid gap-4">
                      <div class="grid gap-1.5">
                        <Label htmlFor="theme-name">Name</Label>
                        <input Input id="theme-name" value="Pedro Duarte" />
                      </div>
                      <Button class="w-fit">Save changes</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="password">
                    <div class="grid gap-4">
                      <div class="grid gap-1.5">
                        <Label htmlFor="theme-current">Current password</Label>
                        <input Input id="theme-current" type="password" />
                      </div>
                      <Button class="w-fit">Save password</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <!-- Badges showcase card -->
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent class="grid gap-4">
                <div class="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <div class="flex items-center gap-3 rounded-md border p-3">
                  <span class="flex h-2 w-2 rounded-full bg-primary"></span>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-medium leading-none">Your call has been confirmed</span>
                    <span class="text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                </div>
                <Button class="w-full gap-2">
                  <lucide-icon [img]="icons.Check" class="h-4 w-4" />
                  Mark all as read
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ThemesPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeService = inject(ThemeService);

  protected readonly icons = { Check, Copy, Moon, Sun };
  protected readonly themes = THEME_PRESETS;

  protected readonly activeTheme = signal<ThemePreset>(THEME_PRESETS[0]);
  protected readonly isDark = computed(() => this.themeService.isDark());
  protected readonly codeDialogOpen = signal(false);
  protected readonly copied = signal(false);

  protected readonly statsBars = [40, 60, 45, 80, 55, 95, 70, 100, 65, 85, 50, 90];

  protected readonly teamMembers: Array<{
    name: string;
    email: string;
    initials: string;
    role: string;
    badgeVariant: 'default' | 'secondary' | 'outline';
  }> = [
    {
      name: 'Sofia Davis',
      email: 'm@example.com',
      initials: 'SD',
      role: 'Owner',
      badgeVariant: 'default',
    },
    {
      name: 'Jackson Lee',
      email: 'p@example.com',
      initials: 'JL',
      role: 'Member',
      badgeVariant: 'secondary',
    },
    {
      name: 'Isabella Nguyen',
      email: 'i@example.com',
      initials: 'IN',
      role: 'Developer',
      badgeVariant: 'outline',
    },
  ];

  /** Generated CSS for the active theme (:root + .dark blocks). */
  protected readonly generatedCss = computed(() => {
    const theme = this.activeTheme();
    const block = (vars: Record<string, string>) =>
      Object.entries(vars)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n');

    return `:root {\n${block(theme.cssVars.light)}\n}\n\n.dark {\n${block(theme.cssVars.dark)}\n}`;
  });

  constructor() {
    // Re-apply the theme whenever the active preset or light/dark mode changes.
    effect(() => {
      this.activeTheme();
      this.themeService.isDark();
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme();
      }
    });
  }

  protected selectTheme(theme: ThemePreset): void {
    this.activeTheme.set(theme);
  }

  protected toggleMode(): void {
    this.themeService.toggle();
  }

  protected copyCss(): void {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(this.generatedCss()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  private applyTheme(): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const theme = this.activeTheme();
    const isDark = root.classList.contains('dark') || this.themeService.isDark();
    const vars = isDark ? theme.cssVars.dark : theme.cssVars.light;

    // Clear variables that may have been set by a previously applied preset.
    for (const preset of this.themes) {
      for (const key of Object.keys(preset.cssVars.light)) {
        root.style.removeProperty(key);
      }
    }

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
}
