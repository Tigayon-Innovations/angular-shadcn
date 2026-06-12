import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';
import { Separator } from '@/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GalleryVerticalEnd, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar-03',
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <a href="#" class="flex items-center gap-2">
                  <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <lucide-icon [img]="icons.GalleryVerticalEnd" class="size-4" />
                  </div>
                  <div class="flex flex-col gap-0.5 leading-none">
                    <span class="font-semibold">Documentation</span>
                    <span>v1.0.0</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              @for (item of navMain; track item.title) {
                <SidebarMenuItem>
                  <SidebarMenuButton class="font-medium">
                    <a href="#">{{ item.title }}</a>
                  </SidebarMenuButton>
                  @if (item.items.length) {
                    <SidebarMenuSub>
                      @for (subItem of item.items; track subItem.title) {
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton [isActive]="subItem.isActive">
                            <a href="#">{{ subItem.title }}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      }
                    </SidebarMenuSub>
                  }
                </SidebarMenuItem>
              }
            </SidebarMenu>
          </SidebarGroup>
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
export class Sidebar03Component {
  readonly icons = { GalleryVerticalEnd };

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
