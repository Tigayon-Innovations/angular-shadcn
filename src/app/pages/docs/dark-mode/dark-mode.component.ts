import { CodeBlock } from '@/components/code-block';
import { ThemeService } from '@/services/theme.service';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LucideAngularModule,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sun,
  Zap
} from 'lucide-angular';

/**
 * Dark mode documentation page with improved visual hierarchy.
 */
@Component({
  selector: 'DarkModePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Badge, Separator, CodeBlock, Card, CardContent, CardDescription, CardHeader, CardTitle, LucideAngularModule],
  template: `
    <div class="space-y-10">
      <!-- Header Section -->
      <header class="space-y-4">
        <div class="flex items-center gap-3">
          <Badge variant="secondary" class="gap-1.5">
            <lucide-icon [img]="icons.Palette" class="h-3 w-3" />
            Theming
          </Badge>
        </div>
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Dark Mode
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl">
          Dark mode that feels native — light, dark, or follow the system.
        </p>
      </header>

      <Separator />

      <!-- Quick Overview Cards -->
      <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-3">
          <Card class="border-border/50">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <lucide-icon [img]="icons.Zap" class="h-4 w-4 text-primary" />
                </div>
                <CardTitle class="text-base">CSS Variables</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                CSS variables switch themes instantly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card class="border-border/50">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <lucide-icon [img]="icons.Monitor" class="h-4 w-4 text-primary" />
                </div>
                <CardTitle class="text-base">System Aware</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tracks your OS setting and updates in real time.
              </CardDescription>
            </CardContent>
          </Card>

          <Card class="border-border/50">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <lucide-icon [img]="icons.Settings" class="h-4 w-4 text-primary" />
                </div>
                <CardTitle class="text-base">Persistent</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Remembers your choice across sessions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- How it Works -->
      <section class="space-y-6">
        <div class="space-y-2">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            How it Works
          </h2>
          <p class="text-muted-foreground">
            A quick look under the hood.
          </p>
        </div>

        <div class="rounded-xl border bg-card p-6 space-y-4">
          <p class="leading-7">
            Dark mode is implemented using a
            <code class="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">.dark</code>
            class on the
            <code class="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">&lt;html&gt;</code>
            element. When this class is present, Tailwind's dark mode variants become active,
            applying the dark theme variables.
          </p>

          <div class="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
            <lucide-icon [img]="icons.Check" class="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <div class="space-y-1">
              <p class="font-medium text-sm">No Flash of Unstyled Content</p>
              <p class="text-sm text-muted-foreground">
                The theme is set before first paint by reading localStorage in a head
                script.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Step 1: Tailwind Configuration -->
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">1</span>
          <div>
            <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
              Tailwind Configuration
            </h2>
            <p class="text-muted-foreground">
              Enable dark mode variants.
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <p class="leading-7">
            Add the dark mode variant to your
            <code class="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">styles.scss</code>:
          </p>
          <CodeBlock
            [code]="tailwindConfigCode"
            language="css"
            filename="styles.scss"
          />
        </div>
      </section>

      <!-- Step 2: Theme Service -->
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">2</span>
          <div>
            <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
              Theme Service
            </h2>
            <p class="text-muted-foreground">
              Manage theme state with signals.
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <p class="leading-7">
            A small service that applies the theme and stays in sync with system
            preferences:
          </p>
          <CodeBlock
            [code]="themeServiceCode"
            language="typescript"
            filename="theme.service.ts"
          />
        </div>
      </section>

      <!-- Step 3: Theme Toggle Component -->
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">3</span>
          <div>
            <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
              Theme Toggle Component
            </h2>
            <p class="text-muted-foreground">
              Let users choose a theme.
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <CodeBlock
            [code]="themeToggleCode"
            language="typescript"
            filename="theme-toggle.component.ts"
          />
        </div>
      </section>

      <!-- Step 4: Usage -->
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">4</span>
          <div>
            <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
              Usage
            </h2>
            <p class="text-muted-foreground">
              Drop it into your app.
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <CodeBlock
            [code]="usageCode"
            language="html"
            filename="header.component.html"
          />

          <!-- Live Preview -->
          <div class="rounded-xl border bg-card overflow-hidden">
            <div class="border-b bg-muted/30 px-4 py-3">
              <p class="text-sm font-medium">Live Preview</p>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-center gap-4">
                <div class="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-12 w-12"
                    [class.ring-2]="themeService.theme() === 'light'"
                    [class.ring-primary]="themeService.theme() === 'light'"
                    (click)="themeService.setTheme('light')"
                  >
                    <lucide-icon [img]="icons.Sun" class="h-5 w-5" />
                  </Button>
                  <span class="text-xs text-muted-foreground">Light</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-12 w-12"
                    [class.ring-2]="themeService.theme() === 'dark'"
                    [class.ring-primary]="themeService.theme() === 'dark'"
                    (click)="themeService.setTheme('dark')"
                  >
                    <lucide-icon [img]="icons.Moon" class="h-5 w-5" />
                  </Button>
                  <span class="text-xs text-muted-foreground">Dark</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-12 w-12"
                    [class.ring-2]="themeService.theme() === 'system'"
                    [class.ring-primary]="themeService.theme() === 'system'"
                    (click)="themeService.setTheme('system')"
                  >
                    <lucide-icon [img]="icons.Monitor" class="h-5 w-5" />
                  </Button>
                  <span class="text-xs text-muted-foreground">System</span>
                </div>
              </div>
              <p class="text-center text-sm text-muted-foreground mt-4">
                Current theme:
                <code class="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">
                  {{ themeService.theme() }}
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- System Preference Section -->
      <section class="space-y-6">
        <div class="space-y-2">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            System Preference Detection
          </h2>
          <p class="text-muted-foreground">
            Automatically follows your OS setting.
          </p>
        </div>

        <div class="rounded-xl border bg-card p-6 space-y-4">
          <p class="leading-7">
            When the theme is set to
            <code class="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">"system"</code>,
            the service listens to the
            <code class="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">prefers-color-scheme</code>
            media query and updates when the user changes their system preference.
          </p>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
              <lucide-icon [img]="icons.Sun" class="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">Light Mode</p>
                <p class="text-sm text-muted-foreground">
                  Used when the system is set to light
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
              <lucide-icon [img]="icons.Moon" class="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">Dark Mode</p>
                <p class="text-sm text-muted-foreground">
                  Used when the system is set to dark
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <nav class="flex items-center justify-between pt-8 border-t">
        <Button routerLink="/docs/theming" variant="outline" class="gap-2">
          <lucide-icon [img]="icons.ArrowLeft" class="h-4 w-4" />
          Theming
        </Button>
        <Button routerLink="/docs/components" variant="outline" class="gap-2">
          Components
          <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
        </Button>
      </nav>
    </div>
  `,
})
export class DarkModePage {
  protected readonly themeService = inject(ThemeService);
  protected readonly icons = { ArrowRight, ArrowLeft, Sun, Moon, Monitor, Palette, Zap, Settings, Check };

  protected readonly tailwindConfigCode = `@import "tailwindcss";

/* Custom dark mode variant - activates styles inside .dark class */
@custom-variant dark (&:is(.dark *));`;

  protected readonly themeServiceCode = `import { computed, effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.getStoredTheme());

  readonly isDark = computed(() => {
    const theme = this.theme();
    if (theme === 'system') {
      return this.systemPrefersDark();
    }
    return theme === 'dark';
  });

  private readonly systemPrefersDark = signal(
    this.getSystemPreference()
  );

  constructor() {
    // Apply theme class reactively
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDark());
    });

    // Listen for system preference changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.systemPrefersDark.set(e.matches);
      });
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  private getStoredTheme(): Theme {
    return (localStorage.getItem('theme') as Theme) || 'system';
  }

  private getSystemPreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}`;

  protected readonly themeToggleCode = `import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from './theme.service';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu';
import { Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'ThemeToggle',
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  ],
  template: \`
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          @if (themeService.isDark()) {
            <lucide-icon [img]="Moon" class="h-5 w-5" />
          } @else {
            <lucide-icon [img]="Sun" class="h-5 w-5" />
          }
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem (click)="setTheme('light')">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem (click)="setTheme('dark')">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem (click)="setTheme('system')">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  \`,
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);

  protected setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}`;

  protected readonly usageCode = `<!-- In your header component template -->
<header class="flex items-center justify-between border-b px-4 py-3">
  <a routerLink="/" class="font-semibold">
    My App
  </a>

  <nav class="flex items-center gap-4">
    <a routerLink="/docs">Docs</a>
    <a routerLink="/components">Components</a>
  </nav>

  <ThemeToggle />
</header>`;
}
