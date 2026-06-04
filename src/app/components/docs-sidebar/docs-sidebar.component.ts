import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
  external?: boolean;
}

/**
 * Documentation sidebar navigation component.
 */
@Component({
  selector: 'DocsSidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    LucideAngularModule,
  ],
  template: `
    <aside class="h-full border-r border-border/40 overflow-y-auto">
      <div class="py-6 pr-6 pl-4 lg:py-8">
        <nav class="flex flex-col gap-4">
          @for (section of navigation; track section.title) {
            <div class="flex flex-col gap-1">
              <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {{ section.title }}
              </h4>
              @if (section.items) {
                @for (item of section.items; track item.title) {
                  @if (item.items) {
                    <!-- Collapsible section -->
                    <Collapsible [open]="true">
                      <CollapsibleTrigger
                        class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {{ item.title }}
                        <lucide-icon
                          [img]="icons.ChevronRight"
                          class="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90"
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div class="ml-4 flex flex-col gap-1 border-l pl-2">
                          @for (subItem of item.items; track subItem.title) {
                            <a
                              [routerLink]="subItem.href"
                              routerLinkActive="font-medium text-foreground"
                              (click)="scrollToTop()"
                              class="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {{ subItem.title }}
                            </a>
                          }
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  } @else {
                    <!-- Simple link -->
                    <a
                      [routerLink]="item.href"
                      routerLinkActive="font-medium text-foreground"
                      (click)="scrollToTop()"
                      class="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {{ item.title }}
                    </a>
                  }
                }
              }
            </div>
          }
        </nav>
      </div>
    </aside>
  `,
})
export class DocsSidebar {
  protected readonly icons = { ChevronRight };
  private readonly router = inject(Router);

  protected scrollToTop(): void {
    // Use setTimeout to ensure navigation happens first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  protected readonly navigation: NavItem[] = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs/introduction' },
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Theming', href: '/docs/theming' },
        { title: 'Dark Mode', href: '/docs/dark-mode' },
        { title: 'MCP Setup', href: '/docs/mcp-setup' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { title: 'Playground', href: '/playground' },
        { title: 'Theme Editor', href: '/theme-editor' },
      ],
    },
    {
      title: 'Components',
      items: [
        { title: 'All Components', href: '/docs/components' },
        {
          title: 'Layout',
          items: [
            { title: 'Aspect Ratio', href: '/docs/components/aspect-ratio' },
            { title: 'Card', href: '/docs/components/card' },
            { title: 'Collapsible', href: '/docs/components/collapsible' },
            { title: 'Resizable', href: '/docs/components/resizable' },
            { title: 'Scroll Area', href: '/docs/components/scroll-area' },
            { title: 'Separator', href: '/docs/components/separator' },
          ],
        },
        {
          title: 'Navigation',
          items: [
            { title: 'Accordion', href: '/docs/components/accordion' },
            { title: 'Breadcrumb', href: '/docs/components/breadcrumb' },
            { title: 'Context Menu', href: '/docs/components/context-menu' },
            { title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
            { title: 'Menubar', href: '/docs/components/menubar' },
            { title: 'Navigation Menu', href: '/docs/components/navigation-menu' },
            { title: 'Pagination', href: '/docs/components/pagination' },
            { title: 'Tabs', href: '/docs/components/tabs' },
          ],
        },
        {
          title: 'Forms',
          items: [
            { title: 'Button', href: '/docs/components/button' },
            { title: 'Checkbox', href: '/docs/components/checkbox' },
            { title: 'Combobox', href: '/docs/components/combobox' },
            { title: 'Date Picker', href: '/docs/components/date-picker' },
            { title: 'Form', href: '/docs/components/form' },
            { title: 'Input', href: '/docs/components/input' },
            { title: 'Input OTP', href: '/docs/components/input-otp' },
            { title: 'Label', href: '/docs/components/label' },
            { title: 'Radio Group', href: '/docs/components/radio-group' },
            { title: 'Select', href: '/docs/components/select' },
            { title: 'Slider', href: '/docs/components/slider' },
            { title: 'Switch', href: '/docs/components/switch' },
            { title: 'Country Selector', href: '/docs/components/country-selector' },
            { title: 'Phone Input', href: '/docs/components/phone-input' },
            { title: 'Textarea', href: '/docs/components/textarea' },
            { title: 'Toggle', href: '/docs/components/toggle' },
            { title: 'Toggle Group', href: '/docs/components/toggle-group' },
          ],
        },
        {
          title: 'Feedback',
          items: [
            { title: 'Alert', href: '/docs/components/alert' },
            { title: 'Alert Dialog', href: '/docs/components/alert-dialog' },
            { title: 'Dialog', href: '/docs/components/dialog' },
            { title: 'Drawer', href: '/docs/components/drawer' },
            { title: 'Hover Card', href: '/docs/components/hover-card' },
            { title: 'Popover', href: '/docs/components/popover' },
            { title: 'Progress', href: '/docs/components/progress' },
            { title: 'Sheet', href: '/docs/components/sheet' },
            { title: 'Skeleton', href: '/docs/components/skeleton' },
            { title: 'Toast', href: '/docs/components/toast' },
            { title: 'Tooltip', href: '/docs/components/tooltip' },
          ],
        },
        {
          title: 'Data Display',
          items: [
            { title: 'Avatar', href: '/docs/components/avatar' },
            { title: 'Badge', href: '/docs/components/badge' },
            { title: 'Calendar', href: '/docs/components/calendar' },
            { title: 'Carousel', href: '/docs/components/carousel' },
            { title: 'Chart', href: '/docs/components/chart' },
            { title: 'Command', href: '/docs/components/command' },
            { title: 'Data Table', href: '/docs/components/data-table' },
            { title: 'Table', href: '/docs/components/table' },
          ],
        },
        {
          title: 'Extended',
          items: [
            { title: 'Button Group', href: '/docs/components/button-group' },
            { title: 'Empty', href: '/docs/components/empty' },
            { title: 'Input Group', href: '/docs/components/input-group' },
            { title: 'Kbd', href: '/docs/components/kbd' },
            { title: 'Native Select', href: '/docs/components/native-select' },
            { title: 'Segmented', href: '/docs/components/segmented' },
            { title: 'Sidebar', href: '/docs/components/sidebar' },
            { title: 'Spinner', href: '/docs/components/spinner' },
            { title: 'Typography', href: '/docs/components/typography' },
          ],
        },
      ],
    },
  ];
}
