import { Separator } from "@/app/lib";
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
import { Github, LucideAngularModule, Menu, Plus, Search, Star, X } from 'lucide-angular';

/**
 * Site header component with logo, navigation, search, and theme toggle.
 */
@Component({
  selector: 'SiteHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Button,
    ThemeToggle,
    LucideAngularModule,
    SearchDialog,
    Kbd,
    Separator
],
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="md:px-6 flex h-14 items-center px-4">
        <!-- Mobile Menu Toggle -->
        <Button
          variant="ghost"
          size="icon"
          class="h-9 w-9 mr-2 md:hidden me-auto"
          (click)="toggleMobileMenu()"
        >
          <lucide-icon [img]="icons.Menu" class="h-5 w-5" />
          <span class="sr-only">Toggle menu</span>
        </Button>

        <!-- Logo (hidden on mobile) -->
        <div class="mr-4 hidden md:flex">
          <a routerLink="/" class="mr-6 flex items-center gap-2 space-x-2">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAb1BMVEUAAAD///8XFxfGxsbJycm5ubkgICAYGBjMzMwqKiqkpKShoaHZ2dkcHBzW1tYtLS0PDw/19fU8PDwICAgkJCS/v7/n5+cxMTE3NzcSEhKEhISYmJjh4eE9PT3r6+uLi4tVVVVoaGiwsLBRUVFdXV34CXnyAAACxUlEQVR4nO2bbXObQAyEfeAXcDDFPYcE26VNmv//Gxu7IYgZt3PIw4nN7POdyUaj22MlvFgQQgghhBBCCCGEEEIIIYQQQr4ojbWA0VQ/W1f88tYyRpGn7sIRSbVfXjW79mCtJJw8cx+8WUsJZpd2mt2LtZZQ1stPzftnazGB5H2d3WtlrSaMKus1nxNrNWHkfW+4FYjmSmjOdtZqwjgIzY8gdV6LM/i4tlYTxk72BkidpdetQPrZI3qd0IzidYnojQzkDA68bmOtJowDoNclos4lSD+je10B0s+IXieylUtBzqDIVi4FqbP0uhVIneU7fwFS50G2AvENWecSxJ+l1zFbTccgW4H0cw7odZDZCnCO1HCOFAXEbLXhHCkOiF4HmK02ojeWIGdQel0K8r6B6HWNbo7UJI3dhlyXrZpjua+3T1MK+w9e1jm8n7fXB2obo9Flq+Th45HTlNr+hXKO1Gl2mcG+Wc6RluH9vHWGonXZqnron4rfHrodve/rbHAQddkqEXUuv0+p7xbKHb2oc/xPVXTZKhGai+hXi3KOJHqjjt4buh19Jep8/jalvlvospX0uiJ6nZVzJHkG49dZla0GXhfdN5Q7eqHZ2Os07xuuiN4bumzlTb1Ot6MfvG+AeF0zG68bsaOXXhf97kb0unuzlYXX6Xb08/G68Gwlve78Y0p9t9Dt6KXXtfG9TjdHmk22GrGjn43XKeZIl/8UMFu1ttkquJ9nlK1Uc6QiutdBZqv750jR7+5KZiuQOdLiqPI60znSwu8VXmebrd7v4b43VHOk+NnqQtGdQZBsdeU3ltf9xR/b9z/+CuJ1Hf7w9vIcvs4xzVY6bLOVEuHqZ5szOJ6mNPY6DcnnVWTkdRqaujuDVp8XKOiyt53XaXiqrd437iE5ZdkJ5GsxQQXy43tCCCGEEEIIIYQQQgghhBBCCCFfnT9MgR8dTROf8AAAAABJRU5ErkJggg=="
              alt="shadcn-angular"
              class="h-6 scale-110 me-2"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Angular_gradient_logo.png/1200px-Angular_gradient_logo.png"
              alt="shadcn-angular"
              class="h-6 scale-150 ms-2"
            />
          </a>
        </div>

        <!-- Main Nav -->
        <nav class="hidden md:flex flex-1 items-center gap-6 text-sm">
          <a routerLink="/docs" class="text-foreground/60 transition-colors hover:text-foreground/80">
            Docs
          </a>
          <a routerLink="/docs/components" class="text-foreground/60 transition-colors hover:text-foreground/80">
            Components
          </a>
          <a routerLink="/blocks" class="text-foreground/60 transition-colors hover:text-foreground/80">
            Blocks
          </a>
          <a routerLink="/charts" class="text-foreground/60 transition-colors hover:text-foreground/80">
            Charts
          </a>
          <a routerLink="/playground" class="text-foreground/60 transition-colors hover:text-foreground/80">
            Playground
          </a>
          <a routerLink="/theme-editor" class="text-foreground/60 transition-colors hover:text-foreground/80">
            Theme Editor
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
        <div class="flex items-center justify-end gap-2">
          <!-- Search Button - Icon only on mobile -->
          <Button
            variant="ghost"
            size="icon"
            class="h-9 w-9 md:hidden"
            (click)="openSearch()"
          >
            <lucide-icon [img]="icons.Search" class="h-4 w-4" />
            <span class="sr-only">Search</span>
          </Button>

          <!-- Search Button - Full on desktop -->
          <Button
            variant="outline"
            class="relative h-9 hidden md:flex w-64 lg:w-80 justify-start rounded-md bg-muted/50 text-sm text-muted-foreground"
            (click)="openSearch()"
          >
            <lucide-icon [img]="icons.Search" class="mr-2 h-4 w-4" />
            <span class="hidden lg:inline-flex">Search documentation...</span>
            <span class="inline-flex lg:hidden">Search...</span>
            <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">K</Kbd>
            </span>
          </Button>

          <Separator orientation="vertical" class="h-6 hidden md:block" />

          <!-- GitHub Stars -->
          <a
            href="https://github.com/example/shadcn-angular"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex"
          >
            <Button variant="outline" size="sm" class="h-9 gap-2 px-3">
              <lucide-icon [img]="icons.Github" class="h-4 w-4" />
              <span class="font-medium">{{ starCount() }}</span>
              <span class="text-muted-foreground hidden md:inline">Stars</span>
            </Button>
          </a>

          <Separator orientation="vertical" class="h-6 hidden md:block" />

          <!-- Theme Toggle -->
          <ThemeToggle />

          <Separator orientation="vertical" class="h-6 hidden md:block" />

          <!-- Install Button -->
          <a routerLink="/docs/installation">
            <Button variant="default" size="sm" class="h-9 gap-2 px-3 rounded-lg hidden sm:flex">
              <lucide-icon [img]="icons.Plus" class="h-4 w-4" />
              <span class="font-medium">Install</span>
            </Button>
          </a>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    @if (mobileMenuOpen()) {
      <div
        class="fixed inset-0 z-[100] bg-black/80 md:hidden"
        (click)="closeMobileMenu()"
      ></div>
    }

    <!-- Mobile Menu Sidebar -->
    <aside
      class="fixed left-0 top-0 z-[101] h-full w-[280px] bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden"
      [class.translate-x-0]="mobileMenuOpen()"
      [class.-translate-x-full]="!mobileMenuOpen()"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAb1BMVEUAAAD///8XFxfGxsbJycm5ubkgICAYGBjMzMwqKiqkpKShoaHZ2dkcHBzW1tYtLS0PDw/19fU8PDwICAgkJCS/v7/n5+cxMTE3NzcSEhKEhISYmJjh4eE9PT3r6+uLi4tVVVVoaGiwsLBRUVFdXV34CXnyAAACxUlEQVR4nO2bbXObQAyEfeAXcDDFPYcE26VNmv//Gxu7IYgZt3PIw4nN7POdyUaj22MlvFgQQgghhBBCCCGEEEIIIYQQQr4ojbWA0VQ/W1f88tYyRpGn7sIRSbVfXjW79mCtJJw8cx+8WUsJZpd2mt2LtZZQ1stPzftnazGB5H2d3WtlrSaMKus1nxNrNWHkfW+4FYjmSmjOdtZqwjgIzY8gdV6LM/i4tlYTxk72BkidpdetQPrZI3qd0IzidYnojQzkDA68bmOtJowDoNclos4lSD+je10B0s+IXieylUtBzqDIVi4FqbP0uhVIneU7fwFS50G2AvENWecSxJ+l1zFbTccgW4H0cw7odZDZCnCO1HCOFAXEbLXhHCkOiF4HmK02ojeWIGdQel0K8r6B6HWNbo7UJI3dhlyXrZpjua+3T1MK+w9e1jm8n7fXB2obo9Flq+Th45HTlNr+hXKO1Gl2mcG+Wc6RluH9vHWGonXZqnron4rfHrodve/rbHAQddkqEXUuv0+p7xbKHb2oc/xPVXTZKhGai+hXi3KOJHqjjt4buh19Jep8/jalvlvospX0uiJ6nZVzJHkG49dZla0GXhfdN5Q7eqHZ2Os07xuuiN4bumzlTb1Ot6MfvG+AeF0zG68bsaOXXhf97kb0unuzlYXX6Xb08/G68Gwlve78Y0p9t9Dt6KXXtfG9TjdHmk22GrGjn43XKeZIl/8UMFu1ttkquJ9nlK1Uc6QiutdBZqv750jR7+5KZiuQOdLiqPI60znSwu8VXmebrd7v4b43VHOk+NnqQtGdQZBsdeU3ltf9xR/b9z/+CuJ1Hf7w9vIcvs4xzVY6bLOVEuHqZ5szOJ6mNPY6DcnnVWTkdRqaujuDVp8XKOiyt53XaXiqrd437iE5ZdkJ5GsxQQXy43tCCCGEEEIIIYQQQgghhBBCCCFfnT9MgR8dTROf8AAAAABJRU5ErkJggg=="
            alt="shadcn-angular"
            class="h-5"
          />
          <span class="font-semibold">Menu</span>
        </div>
        <Button variant="ghost" size="icon" class="h-8 w-8" (click)="closeMobileMenu()">
          <lucide-icon [img]="icons.X" class="h-4 w-4" />
          <span class="sr-only">Close menu</span>
        </Button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col gap-1">
        <a
          routerLink="/"
          class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          (click)="closeMobileMenu()"
        >
          Home
        </a>
        <a
          routerLink="/docs"
          class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          (click)="closeMobileMenu()"
        >
          Docs
        </a>
        <a
          routerLink="/docs/components"
          class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          (click)="closeMobileMenu()"
        >
          Components
        </a>
        <a
          routerLink="/blocks"
          class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          (click)="closeMobileMenu()"
        >
          Blocks
        </a>
        <a
          routerLink="/charts"
          class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          (click)="closeMobileMenu()"
        >
          Charts
        </a>
        <a
          routerLink="/playground"
          class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          (click)="closeMobileMenu()"
        >
          Playground
        </a>
        <a
          routerLink="/theme-editor"
          class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          (click)="closeMobileMenu()"
        >
          Theme Editor
        </a>

        <div class="border-t border-border my-3"></div>

        <a
          href="https://github.com/example/shadcn-angular"
          target="_blank"
          rel="noopener noreferrer"
          class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
        >
          <lucide-icon [img]="icons.Github" class="h-4 w-4" />
          GitHub
        </a>
      </nav>
    </aside>

    <!-- Search Dialog -->
    <SearchDialog
      [open]="searchOpen()"
      (openChange)="searchOpen.set($event)"
    />
  `,
})
export class SiteHeader implements OnInit {
  protected readonly icons = { Github, Menu, Plus, Search, Star, X };
  protected readonly searchOpen = signal(false);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly starCount = signal('1.2k');

  ngOnInit(): void {
    // In a real app, you would fetch the actual star count from GitHub API
  }

  protected openSearch(): void {
    this.searchOpen.set(true);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Open search on Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchOpen.set(true);
    }
    // Close mobile menu on Escape
    if (event.key === 'Escape' && this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }
}
