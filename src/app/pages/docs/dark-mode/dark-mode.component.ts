import { CodeBlock } from '@/components/code-block';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, LucideAngularModule, Monitor, Moon, Sun } from 'lucide-angular';

/**
 * Dark mode documentation page.
 */
@Component({
  selector: 'DarkModePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Separator, CodeBlock, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Dark Mode</h1>
        <p class="text-lg text-muted-foreground mt-2">
          Adding dark mode to your application.
        </p>
      </div>

      <Separator />

      <!-- Content -->
      <div class="space-y-8">
        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it Works
          </h2>
          <p class="leading-7">
            Dark mode is implemented using a <code class="bg-muted px-1.5 py-0.5 rounded text-sm">.dark</code>
            class on the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;html&gt;</code> element.
            When the class is present, the dark mode CSS variables are applied.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Tailwind Configuration
          </h2>
          <p class="leading-7">
            Add the dark mode variant to your <code class="bg-muted px-1.5 py-0.5 rounded text-sm">styles.scss</code>:
          </p>
          <CodeBlock
            [code]="tailwindConfigCode"
            language="css"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Theme Service
          </h2>
          <p class="leading-7">
            Create a theme service to manage the dark mode state:
          </p>
          <CodeBlock
            [code]="themeServiceCode"
            language="typescript"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Theme Toggle Component
          </h2>
          <p class="leading-7">
            Create a toggle component to switch between themes:
          </p>
          <CodeBlock
            [code]="themeToggleCode"
            language="typescript"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Usage
          </h2>
          <p class="leading-7">
            Add the theme toggle to your app header or wherever you want users to switch themes:
          </p>
          <CodeBlock
            [code]="usageCode"
            language="html"
          />
          <div class="rounded-lg border p-4 mt-4">
            <p class="text-sm text-muted-foreground mb-3">Preview:</p>
            <div class="flex items-center gap-4">
              <Button variant="outline" size="icon" class="h-9 w-9">
                <lucide-icon [img]="icons.Sun" class="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" class="h-9 w-9">
                <lucide-icon [img]="icons.Moon" class="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" class="h-9 w-9">
                <lucide-icon [img]="icons.Monitor" class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            System Preference
          </h2>
          <p class="leading-7">
            The theme service automatically detects and responds to system preference changes
            when the theme is set to "system". This uses the
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm">prefers-color-scheme</code>
            media query.
          </p>
        </section>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-8 border-t">
        <Button routerLink="/docs/theming" variant="outline" class="gap-2">
          <lucide-icon [img]="icons.ArrowLeft" class="h-4 w-4" />
          Theming
        </Button>
        <Button routerLink="/docs/components" variant="outline" class="gap-2">
          Components
          <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  `,
})
export class DarkModePage {
  protected readonly icons = { ArrowRight, ArrowLeft, Sun, Moon, Monitor };

  protected readonly tailwindConfigCode = `@use "tailwindcss";

/* Custom dark mode variant */
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

  private readonly systemPrefersDark = signal(this.getSystemPreference());

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDark());
    });

    window.matchMedia('(prefers-color-scheme: dark)')
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

  protected readonly themeToggleCode = `@Component({
  selector: 'ThemeToggle',
  template: \`
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          @if (isDark()) {
            <lucide-icon [img]="Moon" />
          } @else {
            <lucide-icon [img]="Sun" />
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem (click)="setTheme('light')">Light</DropdownMenuItem>
        <DropdownMenuItem (click)="setTheme('dark')">Dark</DropdownMenuItem>
        <DropdownMenuItem (click)="setTheme('system')">System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  \`,
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);
  protected readonly isDark = this.themeService.isDark;

  protected setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}`;

  protected readonly usageCode = `<!-- In your header component -->
<header class="flex items-center justify-between p-4">
  <Logo />
  <nav><!-- Navigation links --></nav>
  <ThemeToggle />
</header>`;
}
