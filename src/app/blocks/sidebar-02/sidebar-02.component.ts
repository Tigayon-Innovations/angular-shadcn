import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/ui/sidebar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  Check,
  ChevronDown,
  ChevronRight,
  GalleryVerticalEnd,
  LucideAngularModule,
  Search,
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar-02',
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Input,
    Label,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    LucideAngularModule,
  ],
  template: `
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <!-- Version Switcher -->
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu class="w-full">
                <DropdownMenuTrigger class="w-full">
                  <SidebarMenuButton size="lg">
                    <div
                      class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                    >
                      <lucide-icon [img]="icons.GalleryVerticalEnd" class="size-4" />
                    </div>
                    <div class="flex flex-col gap-0.5 leading-none">
                      <span class="font-semibold">Documentation</span>
                      <span>v{{ selectedVersion() }}</span>
                    </div>
                    <lucide-icon [img]="icons.ChevronDown" class="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-[--sidebar-width]" align="start">
                  @for (version of versions; track version) {
                    <DropdownMenuItem (click)="selectedVersion.set(version)">
                      v{{ version }}
                      @if (version === selectedVersion()) {
                        <lucide-icon [img]="icons.Check" class="ml-auto size-4" />
                      }
                    </DropdownMenuItem>
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>

          <!-- Search Form -->
          <form>
            <SidebarGroup class="py-0">
              <SidebarGroupContent class="relative">
                <Label for="search" class="sr-only">Search</Label>
                <input
                  Input
                  id="search"
                  placeholder="Search the docs..."
                  class="h-8 pl-7 w-full bg-background shadow-none"
                />
                <lucide-icon
                  [img]="icons.Search"
                  class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
                />
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        </SidebarHeader>

        <SidebarContent>
          <!-- Collapsible groups -->
          @for (group of navMain; track group.title) {
            <Collapsible [defaultOpen]="true" class="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel
                  class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-0"
                >
                  <CollapsibleTrigger class="flex w-full items-center px-2">
                    {{ group.title }}
                    <lucide-icon
                      [img]="icons.ChevronRight"
                      class="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90"
                    />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      @for (item of group.items; track item.title) {
                        <SidebarMenuItem>
                          <SidebarMenuButton [isActive]="item.isActive">
                            <a href="#">{{ item.title }}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      }
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          }
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
          </div>
          <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar02Component {
  readonly icons = { Check, ChevronDown, ChevronRight, GalleryVerticalEnd, Search };

  readonly versions = ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'];
  readonly selectedVersion = signal(this.versions[0]);

  readonly navMain = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Installation', isActive: false },
        { title: 'Project Structure', isActive: false },
      ],
    },
    {
      title: 'Building Your Application',
      items: [
        { title: 'Routing', isActive: false },
        { title: 'Data Fetching', isActive: true },
        { title: 'Rendering', isActive: false },
        { title: 'Caching', isActive: false },
        { title: 'Styling', isActive: false },
        { title: 'Optimizing', isActive: false },
        { title: 'Configuring', isActive: false },
        { title: 'Testing', isActive: false },
        { title: 'Authentication', isActive: false },
        { title: 'Deploying', isActive: false },
        { title: 'Upgrading', isActive: false },
        { title: 'Examples', isActive: false },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Components', isActive: false },
        { title: 'File Conventions', isActive: false },
        { title: 'Functions', isActive: false },
        { title: 'CLI', isActive: false },
        { title: 'Edge Runtime', isActive: false },
      ],
    },
    {
      title: 'Architecture',
      items: [
        { title: 'Accessibility', isActive: false },
        { title: 'Fast Refresh', isActive: false },
        { title: 'Supported Browsers', isActive: false },
        { title: 'Turbopack', isActive: false },
      ],
    },
  ];
}
