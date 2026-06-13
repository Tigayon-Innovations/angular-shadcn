import { SearchDialog } from '@/components/search-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/ui/button';
import { Kbd } from '@/ui/kbd';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Code, Github, Menu, Plus, Search, X, LucideAngularModule } from 'lucide-angular';

interface NavItem {
  href: string;
  label: string;
  exact?: boolean;
}

/**
 * Site header — matches shadcn/ui's: nav (Home → Create), command-menu
 * search, GitHub link, mode switcher, and Open in v0 / Get Code on the
 * designer (/create) route, otherwise a + New action.
 */
@Component({
  selector: 'SiteHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    Button,
    ThemeToggle,
    LucideAngularModule,
    SearchDialog,
    Kbd,
    Separator,
  ],
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
  template: `
    <header class="sticky top-0 z-50 w-full bg-background">
      <div class="px-4 md:px-6">
        <div class="flex h-14 items-center">
          <!-- Mobile menu toggle -->
          <button
            type="button"
            class="me-auto mr-2 inline-flex size-9 items-center justify-center rounded-md hover:bg-accent lg:hidden"
            (click)="toggleMobileMenu()"
          >
            <lucide-icon [img]="icons.Menu" class="h-5 w-5" />
            <span class="sr-only">Toggle menu</span>
          </button>

          <!-- Main nav -->
          <nav class="hidden items-center gap-0 lg:flex">
            @for (item of navItems; track item.href) {
              <a
                [routerLink]="item.href"
                routerLinkActive="bg-accent text-accent-foreground"
                [routerLinkActiveOptions]="{ exact: !!item.exact }"
                class="inline-flex h-8 items-center rounded-md px-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {{ item.label }}
              </a>
            }
          </nav>

          <!-- Right side -->
          <div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <!-- Search (command menu trigger) -->
            <button
              type="button"
              class="relative hidden h-8 w-44 items-center rounded-md bg-surface px-3 text-sm text-muted-foreground ring-1 ring-border transition-colors hover:bg-muted md:inline-flex lg:w-56"
              (click)="openSearch()"
            >
              <span class="truncate">Search documentation...</span>
              <span class="pointer-events-none absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">K</Kbd>
              </span>
            </button>
            <button
              type="button"
              class="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent md:hidden"
              (click)="openSearch()"
            >
              <lucide-icon [img]="icons.Search" class="h-4 w-4" />
              <span class="sr-only">Search</span>
            </button>

            <Separator orientation="vertical" class="ml-2 hidden !h-4 lg:block" />

            <!-- GitHub -->
            <a
              href="https://github.com/Tigayon-Innovations/angular-shadcn"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden items-center gap-1.5 px-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:flex"
            >
              <lucide-icon [img]="icons.Github" class="h-4 w-4" />
              <span>{{ starCount() }}</span>
            </a>

            <Separator orientation="vertical" class="hidden !h-4 sm:block" />

            <!-- Mode switcher -->
            <ThemeToggle />

            <Separator orientation="vertical" class="hidden !h-4 sm:block" />

            <!-- Designer actions (Open in v0 + Get Code) vs + New -->
            @if (isCreate()) {
              <a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
                class="hidden sm:block"
              >
                <Button variant="outline" size="sm" class="h-[31px] gap-1.5 rounded-lg">
                  Open in <span class="font-semibold">v0</span>
                </Button>
              </a>
              <a routerLink="/docs/installation">
                <Button size="sm" class="h-[31px] gap-1.5 rounded-lg">
                  <lucide-icon [img]="icons.Code" class="h-3.5 w-3.5" />
                  Get Code
                </Button>
              </a>
            } @else {
              <a routerLink="/create">
                <Button size="sm" class="h-[31px] gap-1.5 rounded-lg">
                  <lucide-icon [img]="icons.Plus" class="h-3.5 w-3.5" />
                  New
                </Button>
              </a>
            }
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile menu overlay -->
    @if (mobileMenuOpen()) {
      <div class="fixed inset-0 z-[100] bg-black/80 lg:hidden" (click)="closeMobileMenu()"></div>
    }

    <!-- Mobile menu sidebar -->
    <aside
      class="fixed left-0 top-0 z-[101] h-full w-[280px] bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out lg:hidden"
      [class.translate-x-0]="mobileMenuOpen()"
      [class.-translate-x-full]="!mobileMenuOpen()"
    >
      <div class="mb-6 flex items-center justify-between">
        <span class="font-semibold">Menu</span>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent"
          (click)="closeMobileMenu()"
        >
          <lucide-icon [img]="icons.X" class="h-4 w-4" />
          <span class="sr-only">Close menu</span>
        </button>
      </div>

      <nav class="flex flex-col gap-1">
        @for (item of navItems; track item.href) {
          <a
            [routerLink]="item.href"
            class="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            (click)="closeMobileMenu()"
          >
            {{ item.label }}
          </a>
        }
        <div class="my-3 border-t border-border"></div>
        <a
          href="https://github.com/Tigayon-Innovations/angular-shadcn"
          target="_blank"
          rel="noopener noreferrer"
          class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
        >
          <lucide-icon [img]="icons.Github" class="h-4 w-4" />
          GitHub
        </a>
      </nav>
    </aside>

    <!-- Search dialog -->
    <SearchDialog [open]="searchOpen()" (openChange)="searchOpen.set($event)" />
  `,
})
export class SiteHeader {
  protected readonly icons = { Code, Github, Menu, Plus, Search, X };
  protected readonly searchOpen = signal(false);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly starCount = signal('1.2k');
  protected readonly isCreate = signal(false);

  protected readonly navItems: NavItem[] = [
    { href: '/', label: 'Home', exact: true },
    { href: '/docs/installation', label: 'Docs' },
    { href: '/docs/components', label: 'Components' },
    { href: '/blocks', label: 'Blocks' },
    { href: '/charts', label: 'Charts' },
    { href: '/colors', label: 'Directory' },
    { href: '/create', label: 'Create' },
  ];

  private readonly router = inject(Router);

  constructor() {
    this.isCreate.set(this.router.url.startsWith('/create'));
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.isCreate.set(e.urlAfterRedirects.startsWith('/create')));
  }

  protected openSearch(): void {
    this.searchOpen.set(true);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchOpen.set(true);
    }
    if (event.key === 'Escape' && this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }
}
