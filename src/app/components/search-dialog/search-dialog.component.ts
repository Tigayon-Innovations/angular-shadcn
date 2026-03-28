import { cn } from '@/lib/utils';
import { Kbd } from '@/ui/kbd';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  viewChild,
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
            <div class="py-6 text-center text-sm text-muted-foreground">No results found.</div>
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
                    (mouseenter)="onMouseEnterItem(item)"
                  >
                    <lucide-icon [img]="item.icon" class="mr-3 h-4 w-4 text-muted-foreground" />
                    <span class="flex-1 text-left">{{ item.label }}</span>
                    @if (item.description) {
                      <span class="ml-2 text-xs text-muted-foreground hidden sm:inline">
                        {{ item.description }}
                      </span>
                    }
                    <lucide-icon
                      [img]="icons.ArrowRight"
                      class="ml-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100"
                    />
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
  protected readonly selectedIndex = signal<number>(0);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor(private router: Router) {
    // Focus the search input when dialog opens and reset selection
    effect(() => {
      if (this.open()) {
        this.selectedIndex.set(0);
        setTimeout(() => {
          this.searchInput()?.nativeElement.focus();
        });
      }
    });

    // Reset selection when search query changes
    effect(() => {
      this.searchQuery();
      this.selectedIndex.set(0);
    });
  }

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
        {
          icon: Boxes,
          label: 'Components',
          route: '/docs/components',
          description: '60+ components',
        },
      ],
    },
    {
      title: 'Get Started',
      items: [
        {
          icon: FileText,
          label: 'Introduction',
          route: '/docs/introduction',
          description: 'Getting started guide',
        },
        {
          icon: Settings,
          label: 'Installation',
          route: '/docs/installation',
          description: 'Setup instructions',
        },
        {
          icon: Palette,
          label: 'Theming',
          route: '/docs/theming',
          description: 'Customize colors',
        },
        { icon: Moon, label: 'Dark Mode', route: '/docs/dark-mode', description: 'Toggle themes' },
      ],
    },
    {
      title: 'Basic Components',
      items: [
        {
          icon: Code2,
          label: 'Accordion',
          route: '/docs/components/accordion',
          keywords: ['collapse', 'expand', 'panel'],
        },
        {
          icon: Code2,
          label: 'Breadcrumb',
          route: '/docs/components/breadcrumb',
          keywords: ['navigation', 'path'],
        },
        {
          icon: Code2,
          label: 'Context Menu',
          route: '/docs/components/context-menu',
          keywords: ['right click', 'menu'],
        },
        {
          icon: Code2,
          label: 'Dropdown Menu',
          route: '/docs/components/dropdown-menu',
          keywords: ['select', 'menu', 'trigger'],
        },
        {
          icon: Code2,
          label: 'Menubar',
          route: '/docs/components/menubar',
          keywords: ['menu', 'desktop', 'navigation'],
        },
        {
          icon: Code2,
          label: 'Navigation Menu',
          route: '/docs/components/navigation-menu',
          keywords: ['nav', 'links', 'menu'],
        },
        {
          icon: Code2,
          label: 'Pagination',
          route: '/docs/components/pagination',
          keywords: ['pages', 'next', 'previous'],
        },
        {
          icon: Code2,
          label: 'Tabs',
          route: '/docs/components/tabs',
          keywords: ['navigation', 'switch', 'panels'],
        },
      ],
    },
    {
      title: 'Form Components',
      items: [
        {
          icon: Code2,
          label: 'Button',
          route: '/docs/components/button',
          keywords: ['click', 'action', 'submit'],
        },
        {
          icon: Code2,
          label: 'Checkbox',
          route: '/docs/components/checkbox',
          keywords: ['toggle', 'checked', 'form'],
        },
        {
          icon: Code2,
          label: 'Combobox',
          route: '/docs/components/combobox',
          keywords: ['autocomplete', 'search', 'select'],
        },
        {
          icon: Code2,
          label: 'Date Picker',
          route: '/docs/components/date-picker',
          keywords: ['calendar', 'date', 'form'],
        },
        {
          icon: Code2,
          label: 'Form',
          route: '/docs/components/form',
          keywords: ['validation', 'input', 'submit'],
        },
        {
          icon: Code2,
          label: 'Input',
          route: '/docs/components/input',
          keywords: ['form', 'text', 'field'],
        },
        {
          icon: Code2,
          label: 'Input OTP',
          route: '/docs/components/input-otp',
          keywords: ['one-time', 'password', 'code'],
        },
        {
          icon: Code2,
          label: 'Label',
          route: '/docs/components/label',
          keywords: ['form', 'accessible', 'text'],
        },
        {
          icon: Code2,
          label: 'Radio Group',
          route: '/docs/components/radio-group',
          keywords: ['select', 'option', 'form'],
        },
        {
          icon: Code2,
          label: 'Select',
          route: '/docs/components/select',
          keywords: ['dropdown', 'choice', 'pick'],
        },
        {
          icon: Code2,
          label: 'Slider',
          route: '/docs/components/slider',
          keywords: ['range', 'value', 'drag'],
        },
        {
          icon: Code2,
          label: 'Switch',
          route: '/docs/components/switch',
          keywords: ['toggle', 'on', 'off'],
        },
        {
          icon: Code2,
          label: 'Textarea',
          route: '/docs/components/textarea',
          keywords: ['multiline', 'text', 'form'],
        },
        {
          icon: Code2,
          label: 'Toggle',
          route: '/docs/components/toggle',
          keywords: ['button', 'on', 'off'],
        },
        {
          icon: Code2,
          label: 'Toggle Group',
          route: '/docs/components/toggle-group',
          keywords: ['buttons', 'select', 'group'],
        },
      ],
    },
    {
      title: 'Layout Components',
      items: [
        {
          icon: Code2,
          label: 'Aspect Ratio',
          route: '/docs/components/aspect-ratio',
          keywords: ['ratio', 'image', 'video'],
        },
        {
          icon: Code2,
          label: 'Card',
          route: '/docs/components/card',
          keywords: ['container', 'content', 'box'],
        },
        {
          icon: Code2,
          label: 'Collapsible',
          route: '/docs/components/collapsible',
          keywords: ['expand', 'collapse', 'toggle'],
        },
        {
          icon: Code2,
          label: 'Resizable',
          route: '/docs/components/resizable',
          keywords: ['panel', 'resize', 'drag'],
        },
        {
          icon: Code2,
          label: 'Scroll Area',
          route: '/docs/components/scroll-area',
          keywords: ['overflow', 'scroll', 'custom'],
        },
        {
          icon: Code2,
          label: 'Separator',
          route: '/docs/components/separator',
          keywords: ['divider', 'line', 'hr'],
        },
      ],
    },
    {
      title: 'Overlay Components',
      items: [
        {
          icon: Code2,
          label: 'Alert',
          route: '/docs/components/alert',
          keywords: ['callout', 'message', 'info'],
        },
        {
          icon: Code2,
          label: 'Alert Dialog',
          route: '/docs/components/alert-dialog',
          keywords: ['modal', 'confirm', 'warning'],
        },
        {
          icon: Code2,
          label: 'Dialog',
          route: '/docs/components/dialog',
          keywords: ['modal', 'popup', 'window'],
        },
        {
          icon: Code2,
          label: 'Drawer',
          route: '/docs/components/drawer',
          keywords: ['slide', 'panel', 'bottom'],
        },
        {
          icon: Code2,
          label: 'Hover Card',
          route: '/docs/components/hover-card',
          keywords: ['preview', 'popup', 'hover'],
        },
        {
          icon: Code2,
          label: 'Popover',
          route: '/docs/components/popover',
          keywords: ['popup', 'tooltip', 'content'],
        },
        {
          icon: Code2,
          label: 'Progress',
          route: '/docs/components/progress',
          keywords: ['loading', 'bar', 'percent'],
        },
        {
          icon: Code2,
          label: 'Sheet',
          route: '/docs/components/sheet',
          keywords: ['slide', 'panel', 'side'],
        },
        {
          icon: Code2,
          label: 'Skeleton',
          route: '/docs/components/skeleton',
          keywords: ['loading', 'placeholder', 'shimmer'],
        },
        {
          icon: Code2,
          label: 'Toast',
          route: '/docs/components/toast',
          keywords: ['notification', 'alert', 'message'],
        },
        {
          icon: Code2,
          label: 'Tooltip',
          route: '/docs/components/tooltip',
          keywords: ['hover', 'info', 'hint'],
        },
      ],
    },
    {
      title: 'Complex Components',
      items: [
        {
          icon: Code2,
          label: 'Avatar',
          route: '/docs/components/avatar',
          keywords: ['user', 'image', 'profile'],
        },
        {
          icon: Code2,
          label: 'Badge',
          route: '/docs/components/badge',
          keywords: ['tag', 'label', 'status'],
        },
        {
          icon: Code2,
          label: 'Calendar',
          route: '/docs/components/calendar',
          keywords: ['date', 'picker', 'month'],
        },
        {
          icon: Code2,
          label: 'Carousel',
          route: '/docs/components/carousel',
          keywords: ['slider', 'swipe', 'images'],
        },
        {
          icon: Code2,
          label: 'Chart',
          route: '/docs/components/chart',
          keywords: ['graph', 'data', 'visualization'],
        },
        {
          icon: Code2,
          label: 'Command',
          route: '/docs/components/command',
          keywords: ['palette', 'search', 'menu'],
        },
        {
          icon: Code2,
          label: 'Data Table',
          route: '/docs/components/data-table',
          keywords: ['grid', 'rows', 'columns'],
        },
        {
          icon: Code2,
          label: 'Table',
          route: '/docs/components/table',
          keywords: ['grid', 'data', 'rows'],
        },
      ],
    },
    {
      title: 'Advanced Components',
      items: [
        {
          icon: Code2,
          label: 'Button Group',
          route: '/docs/components/button-group',
          keywords: ['buttons', 'group', 'toolbar'],
        },
        {
          icon: Code2,
          label: 'Empty',
          route: '/docs/components/empty',
          keywords: ['placeholder', 'no data', 'state'],
        },
        {
          icon: Code2,
          label: 'Input Group',
          route: '/docs/components/input-group',
          keywords: ['prefix', 'suffix', 'addon'],
        },
        {
          icon: Code2,
          label: 'Kbd',
          route: '/docs/components/kbd',
          keywords: ['keyboard', 'shortcut', 'key'],
        },
        {
          icon: Code2,
          label: 'Native Select',
          route: '/docs/components/native-select',
          keywords: ['dropdown', 'html', 'select'],
        },
        {
          icon: Code2,
          label: 'Segmented',
          route: '/docs/components/segmented',
          keywords: ['ios', 'toggle', 'buttons'],
        },
        {
          icon: Code2,
          label: 'Sidebar',
          route: '/docs/components/sidebar',
          keywords: ['navigation', 'menu', 'panel'],
        },
        {
          icon: Code2,
          label: 'Spinner',
          route: '/docs/components/spinner',
          keywords: ['loading', 'animation', 'wait'],
        },
        {
          icon: Code2,
          label: 'Typography',
          route: '/docs/components/typography',
          keywords: ['text', 'heading', 'style'],
        },
      ],
    },
  ];

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

  // Flattened list of all items for keyboard navigation
  protected readonly flatItems = computed(() => {
    return this.filteredGroups().flatMap((group) => group.items);
  });

  // Get the currently selected item
  protected readonly selectedItem = computed(() => {
    const items = this.flatItems();
    const index = this.selectedIndex();
    return items[index] ?? null;
  });

  protected readonly dialogClass = computed(() =>
    cn(
      'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
      'rounded-xl border border-border bg-popover shadow-2xl',
      'animate-in fade-in-0 duration-150',
      this.class(),
    ),
  );

  protected itemClass(item: SearchItem) {
    return cn(
      'group relative flex w-full cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors',
      this.selectedItem()?.label === item.label
        ? 'bg-accent text-accent-foreground'
        : 'hover:bg-accent hover:text-accent-foreground',
    );
  }

  protected onMouseEnterItem(item: SearchItem): void {
    const index = this.flatItems().findIndex((i) => i.label === item.label);
    if (index !== -1) {
      this.selectedIndex.set(index);
    }
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

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: Event): void {
    if (!this.open()) return;

    const keyEvent = event as KeyboardEvent;
    const items = this.flatItems();

    switch (keyEvent.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
        keyEvent.preventDefault();
        if (items.length > 0) {
          this.selectedIndex.update((i) => (i + 1) % items.length);
        }
        break;
      case 'ArrowUp':
        keyEvent.preventDefault();
        if (items.length > 0) {
          this.selectedIndex.update((i) => (i - 1 + items.length) % items.length);
        }
        break;
      case 'Enter':
        keyEvent.preventDefault();
        const item = this.selectedItem();
        if (item) {
          this.selectItem(item);
        }
        break;
    }
  }
}
