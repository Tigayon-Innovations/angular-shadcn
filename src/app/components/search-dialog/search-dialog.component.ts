import { cn } from '@/lib/utils';
import { Kbd } from '@/ui/kbd';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ArrowRight,
  Book,
  Boxes,
  Code2,
  FileText,
  Home,
  LayoutGrid,
  LucideAngularModule,
  Moon,
  Palette,
  Search,
  Settings,
} from 'lucide-angular';

interface SearchItem {
  icon: typeof Home;
  label: string;
  description?: string;
  route?: string;
  url?: string;
  keywords?: string[];
}

interface SearchGroup {
  title: string;
  items: SearchItem[];
}

/**
 * Search dialog component - a command palette for quick navigation.
 * Similar to shadcn/ui documentation search dialog.
 */
@Component({
  selector: 'SearchDialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, Kbd],
  template: `
    @if (open()) {
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in-0"
        (click)="close()"
      ></div>

      <!-- Dialog -->
      <div [class]="dialogClass()">
        <!-- Search Input -->
        <div class="flex items-center border-b border-border px-4">
          <lucide-icon [img]="icons.Search" class="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            #searchInput
            type="text"
            [placeholder]="'Search documentation...'"
            [value]="searchQuery()"
            (input)="onSearchInput($event)"
            class="flex h-14 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Kbd size="sm" class="ml-2 hidden sm:inline-flex">ESC</Kbd>
        </div>

        <!-- Results -->
        <div class="max-h-[400px] overflow-y-auto overflow-x-hidden">
          @if (filteredGroups().length === 0) {
            <div class="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          } @else {
            @for (group of filteredGroups(); track group.title) {
              <div class="overflow-hidden p-2">
                <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  {{ group.title }}
                </div>
                @for (item of group.items; track item.label) {
                  <button
                    type="button"
                    [class]="itemClass(item)"
                    (click)="selectItem(item)"
                    (mouseenter)="selectedItem.set(item.label)"
                  >
                    <lucide-icon [img]="item.icon" class="mr-3 h-4 w-4 text-muted-foreground" />
                    <span class="flex-1 text-left">{{ item.label }}</span>
                    @if (item.description) {
                      <span class="ml-2 text-xs text-muted-foreground hidden sm:inline">
                        {{ item.description }}
                      </span>
                    }
                    <lucide-icon [img]="icons.ArrowRight" class="ml-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                  </button>
                }
              </div>
            }
          }
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between border-t border-border px-4 py-3">
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              <Kbd size="sm">↑</Kbd>
              <Kbd size="sm">↓</Kbd>
              <span>Navigate</span>
            </span>
            <span class="flex items-center gap-1">
              <Kbd size="sm">↵</Kbd>
              <span>Select</span>
            </span>
          </div>
          <button
            type="button"
            class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            (click)="close()"
          >
            <span>Go to Page</span>
            <lucide-icon [img]="icons.ArrowRight" class="h-3 w-3" />
          </button>
        </div>
      </div>
    }
  `,
  host: {
    class: 'contents',
  },
})
export class SearchDialog {
  readonly open = input<boolean>(false);
  readonly class = input<string>('');
  readonly openChange = output<boolean>();

  protected readonly searchQuery = signal('');
  protected readonly selectedItem = signal<string>('');

  protected readonly icons = {
    Search,
    ArrowRight,
    Home,
    Book,
    Boxes,
    Code2,
    FileText,
    LayoutGrid,
    Moon,
    Palette,
    Settings,
  };

  private readonly searchGroups: SearchGroup[] = [
    {
      title: 'Pages',
      items: [
        { icon: Book, label: 'Docs', route: '/docs', description: 'Documentation' },
        { icon: Boxes, label: 'Components', route: '/docs/components', description: '60+ components' },
      ],
    },
    {
      title: 'Get Started',
      items: [
        { icon: FileText, label: 'Introduction', route: '/docs/introduction', description: 'Getting started guide' },
        { icon: Settings, label: 'Installation', route: '/docs/installation', description: 'Setup instructions' },
        { icon: Palette, label: 'Theming', route: '/docs/theming', description: 'Customize colors' },
        { icon: Moon, label: 'Dark Mode', route: '/docs/dark-mode', description: 'Toggle themes' },
      ],
    },
    {
      title: 'Components',
      items: [
        { icon: Code2, label: 'Button', route: '/docs/components/button', keywords: ['click', 'action'] },
        { icon: Code2, label: 'Card', route: '/docs/components/card', keywords: ['container', 'content'] },
        { icon: Code2, label: 'Dialog', route: '/docs/components/dialog', keywords: ['modal', 'popup'] },
        { icon: Code2, label: 'Dropdown Menu', route: '/docs/components/dropdown-menu', keywords: ['select', 'menu'] },
        { icon: Code2, label: 'Input', route: '/docs/components/input', keywords: ['form', 'text'] },
        { icon: Code2, label: 'Select', route: '/docs/components/select', keywords: ['dropdown', 'choice'] },
        { icon: Code2, label: 'Tabs', route: '/docs/components/tabs', keywords: ['navigation', 'switch'] },
        { icon: Code2, label: 'Toast', route: '/docs/components/toast', keywords: ['notification', 'alert'] },
        { icon: Code2, label: 'Tooltip', route: '/docs/components/tooltip', keywords: ['hover', 'info'] },
        { icon: Code2, label: 'Calendar', route: '/docs/components/calendar', keywords: ['date', 'picker'] },
      ],
    },
  ];

  constructor(private router: Router) {}

  protected readonly filteredGroups = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return this.searchGroups;
    }

    return this.searchGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const labelMatch = item.label.toLowerCase().includes(query);
          const descMatch = item.description?.toLowerCase().includes(query);
          const keywordMatch = item.keywords?.some((k) => k.toLowerCase().includes(query));
          return labelMatch || descMatch || keywordMatch;
        }),
      }))
      .filter((group) => group.items.length > 0);
  });

  protected readonly dialogClass = computed(() =>
    cn(
      'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
      'rounded-xl border border-border bg-popover shadow-2xl',
      'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]',
      this.class()
    )
  );

  protected itemClass(item: SearchItem) {
    return cn(
      'group relative flex w-full cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors',
      this.selectedItem() === item.label
        ? 'bg-accent text-accent-foreground'
        : 'hover:bg-accent hover:text-accent-foreground'
    );
  }

  protected onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  protected selectItem(item: SearchItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
    this.close();
  }

  protected close(): void {
    this.searchQuery.set('');
    this.openChange.emit(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }
}
