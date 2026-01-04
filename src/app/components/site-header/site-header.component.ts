import { SearchDialog } from '@/components/search-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/ui/button';
import { Kbd } from '@/ui/kbd';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Github, LucideAngularModule, Menu, Search, Star } from 'lucide-angular';

/**
 * Site header component with logo, navigation, search, and theme toggle.
 */
@Component({
  selector: 'SiteHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, ThemeToggle, LucideAngularModule, SearchDialog, Kbd],
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="md:px-6 flex h-14   items-center px-4">
        <!-- Logo -->
        <div class="mr-4 flex">
          <a routerLink="/" class="mr-6 flex items-center flex gap-2 space-x-2">

            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAb1BMVEUAAAD///8XFxfGxsbJycm5ubkgICAYGBjMzMwqKiqkpKShoaHZ2dkcHBzW1tYtLS0PDw/19fU8PDwICAgkJCS/v7/n5+cxMTE3NzcSEhKEhISYmJjh4eE9PT3r6+uLi4tVVVVoaGiwsLBRUVFdXV34CXnyAAACxUlEQVR4nO2bbXObQAyEfeAXcDDFPYcE26VNmv//Gxu7IYgZt3PIw4nN7POdyUaj22MlvFgQQgghhBBCCCGEEEIIIYQQQr4ojbWA0VQ/W1f88tYyRpGn7sIRSbVfXjW79mCtJJw8cx+8WUsJZpd2mt2LtZZQ1stPzftnazGB5H2d3WtlrSaMKus1nxNrNWHkfW+4FYjmSmjOdtZqwjgIzY8gdV6LM/i4tlYTxk72BkidpdetQPrZI3qd0IzidYnojQzkDA68bmOtJowDoNclos4lSD+je10B0s+IXieylUtBzqDIVi4FqbP0uhVIneU7fwFS50G2AvENWecSxJ+l1zFbTccgW4H0cw7odZDZCnCO1HCOFAXEbLXhHCkOiF4HmK02ojeWIGdQel0K8r6B6HWNbo7UJI3dhlyXrZpjua+3T1MK+w9e1jm8n7fXB2obo9Flq+Th45HTlNr+hXKO1Gl2mcG+Wc6RluH9vHWGonXZqnron4rfHrodve/rbHAQddkqEXUuv0+p7xbKHb2oc/xPVXTZKhGai+hXi3KOJHqjjt4buh19Jep8/jalvlvospX0uiJ6nZVzJHkG49dZla0GXhfdN5Q7eqHZ2Os07xuuiN4bumzlTb1Ot6MfvG+AeF0zG68bsaOXXhf97kb0unuzlYXX6Xb08/G68Gwlve78Y0p9t9Dt6KXXtfG9TjdHmk22GrGjn43XKeZIl/8UMFu1ttkquJ9nlK1Uc6QiutdBZqv750jR7+5KZiuQOdLiqPI60znSwu8VXmebrd7v4b43VHOk+NnqQtGdQZBsdeU3ltf9xR/b9z/+CuJ1Hf7w9vIcvs4xzVY6bLOVEuHqZ5szOJ6mNPY6DcnnVWTkdRqaujuDVp8XKOiyt53XaXiqrd437iE5ZdkJ5GsxQQXy43tCCCGEEEIIIYQQQgghhBBCCCFfnT9MgR8dTROf8AAAAABJRU5ErkJggg=="
              alt="shadcn-angular"
              class="h-6  scale-150 me-2"

            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Angular_gradient_logo.png/1200px-Angular_gradient_logo.png"
              alt="shadcn-angular"
              class="h-6  scale-150 ms-2"

            />
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
            routerLink="/blocks"
            class="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Blocks
          </a>
          <a
            routerLink="/theme-editor"
            class="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Theme Editor
          </a>
          <a
            routerLink="/docs/mcp-setup"
            class="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            MCP Setup
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
          <!-- Search Button -->
          <Button
            variant="outline"
            class="relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm text-muted-foreground sm:w-64 md:w-80"
            (click)="openSearch()"
          >
            <lucide-icon [img]="icons.Search" class="mr-2 h-4 w-4" />
            <span class="hidden lg:inline-flex">Search documentation...</span>
            <span class="inline-flex lg:hidden">Search...</span>
            <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">K</Kbd>
            </span>
          </Button>

          <!-- GitHub Stars -->
          <a
            href="https://github.com/example/shadcn-angular"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex"
          >
            <Button variant="outline" size="sm" class="h-9 gap-2 px-3">
              <lucide-icon [img]="icons.Star" class="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span class="font-medium">{{ starCount() }}</span>
              <span class="text-muted-foreground hidden md:inline">Stars</span>
            </Button>
          </a>

          <!-- GitHub Icon -->
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

          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
      </div>
    </header>

    <!-- Search Dialog -->
    <SearchDialog
      [open]="searchOpen()"
      (openChange)="searchOpen.set($event)"
    />
  `,
})
export class SiteHeader implements OnInit {
  protected readonly icons = { Github, Menu, Search, Star };
  protected readonly searchOpen = signal(false);
  protected readonly starCount = signal('1.2k');

  ngOnInit(): void {
    // In a real app, you would fetch the actual star count from GitHub API
    // this.fetchGitHubStars();
  }

  protected openSearch(): void {
    this.searchOpen.set(true);
  }
  protected onKeydown(event: KeyboardEvent): void {
    // Open search on Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchOpen.set(true);
    }
  }
}
