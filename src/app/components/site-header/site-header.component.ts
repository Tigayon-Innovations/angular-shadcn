import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/ui/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Github, LucideAngularModule, Menu } from 'lucide-angular';

/**
 * Site header component with logo, navigation, and theme toggle.
 */
@Component({
  selector: 'SiteHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, ThemeToggle, LucideAngularModule],
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        <!-- Logo -->
        <div class="mr-4 flex">
          <a routerLink="/" class="mr-6 flex items-center space-x-2">
            <span class="font-bold text-xl">shadcn-angular</span>
          </a>
        </div>

        <!-- Main Nav -->
        <nav class="hidden md:flex flex-1 items-center gap-6 text-sm">
          <a
            routerLink="/docs"
            class="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Documentation
          </a>
          <a
            routerLink="/docs/components"
            class="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Components
          </a>
          <a
            href="https://github.com/example/shadcn-angular"
            target="_blank"
            rel="noopener noreferrer"
            class="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            GitHub
          </a>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-2">
          <a
            href="https://github.com/example/shadcn-angular"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" class="h-9 w-9">
              <lucide-icon [img]="icons.Github" class="h-4 w-4" />
              <span class="sr-only">GitHub</span>
            </Button>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  `,
})
export class SiteHeader {
  protected readonly icons = { Github, Menu };
}
