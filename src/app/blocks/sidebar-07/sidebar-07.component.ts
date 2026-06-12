import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Separator } from '@/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
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
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  LucideAngularModule,
  Map as MapIcon,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Share,
  Sparkles,
  SquareTerminal,
  Trash2,
} from 'lucide-angular';

interface Team {
  name: string;
  plan: string;
  logo: 'GalleryVerticalEnd' | 'AudioWaveform' | 'Command';
}

@Component({
  selector: 'app-sidebar-07',
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
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
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
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
      <Sidebar collapsible="icon">
        <!-- Team Switcher -->
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu class="w-full">
                <DropdownMenuTrigger class="w-full">
                  <SidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div
                      class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                    >
                      <lucide-icon [img]="icons[activeTeam().logo]" class="size-4" />
                    </div>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ activeTeam().name }}</span>
                      <span class="truncate text-xs">{{ activeTeam().plan }}</span>
                    </div>
                    <lucide-icon [img]="icons.ChevronsUpDown" class="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56 rounded-lg" align="start" side="bottom">
                  <DropdownMenuLabel class="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  @for (team of teams; track team.name) {
                    <DropdownMenuItem class="gap-2 p-2" (click)="activeTeam.set(team)">
                      <div class="flex size-6 items-center justify-center rounded-sm border">
                        <lucide-icon [img]="icons[team.logo]" class="size-4 shrink-0" />
                      </div>
                      {{ team.name }}
                    </DropdownMenuItem>
                  }
                  <DropdownMenuSeparator />
                  <DropdownMenuItem class="gap-2 p-2">
                    <div
                      class="flex size-6 items-center justify-center rounded-md border bg-background"
                    >
                      <lucide-icon [img]="icons.Plus" class="size-4" />
                    </div>
                    <div class="font-medium text-muted-foreground">Add team</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <!-- Nav Main -->
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              @for (item of navMain; track item.title) {
                <Collapsible [defaultOpen]="item.isActive" class="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger>
                      <SidebarMenuButton [title]="item.title">
                        <lucide-icon [img]="icons[item.icon]" class="size-4" />
                        <span>{{ item.title }}</span>
                        <lucide-icon
                          [img]="icons.ChevronRight"
                          class="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        @for (subItem of item.items; track subItem) {
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>
                              <a href="#"><span>{{ subItem }}</span></a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        }
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              }
            </SidebarMenu>
          </SidebarGroup>

          <!-- Projects -->
          <SidebarGroup class="group-data-[collapsible=icon]/sidebar-wrapper:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              @for (project of projects; track project.name) {
                <SidebarMenuItem>
                  <SidebarMenuButton [title]="project.name">
                    <lucide-icon [img]="icons[project.icon]" class="size-4" />
                    <span>{{ project.name }}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <SidebarMenuAction [showOnHover]="true">
                        <lucide-icon [img]="icons.MoreHorizontal" class="size-4" />
                        <span class="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-48 rounded-lg" side="bottom" align="end">
                      <DropdownMenuItem>
                        <lucide-icon [img]="icons.Folder" class="size-4 text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <lucide-icon [img]="icons.Share" class="size-4 text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <lucide-icon [img]="icons.Trash2" class="size-4 text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              }
              <SidebarMenuItem>
                <SidebarMenuButton class="text-sidebar-foreground/70">
                  <lucide-icon [img]="icons.MoreHorizontal" class="size-4" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <!-- User Footer -->
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu class="w-full">
                <DropdownMenuTrigger class="w-full">
                  <SidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage [src]="user.avatar" [alt]="user.name" />
                      <AvatarFallback class="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ user.name }}</span>
                      <span class="truncate text-xs">{{ user.email }}</span>
                    </div>
                    <lucide-icon [img]="icons.ChevronsUpDown" class="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56 rounded-lg" side="top" align="end">
                  <DropdownMenuLabel class="p-0 font-normal">
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar class="h-8 w-8 rounded-lg">
                        <AvatarImage [src]="user.avatar" [alt]="user.name" />
                        <AvatarFallback class="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-semibold">{{ user.name }}</span>
                        <span class="truncate text-xs">{{ user.email }}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <lucide-icon [img]="icons.Sparkles" class="size-4" />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <lucide-icon [img]="icons.BadgeCheck" class="size-4" />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <lucide-icon [img]="icons.CreditCard" class="size-4" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <lucide-icon [img]="icons.Bell" class="size-4" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <lucide-icon [img]="icons.LogOut" class="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
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
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
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
export class Sidebar07Component {
  readonly icons = {
    AudioWaveform,
    BadgeCheck,
    Bell,
    BookOpen,
    Bot,
    ChevronRight,
    ChevronsUpDown,
    Command,
    CreditCard,
    Folder,
    Frame,
    GalleryVerticalEnd,
    LogOut,
    Map: MapIcon,
    MoreHorizontal,
    PieChart,
    Plus,
    Settings2,
    Share,
    Sparkles,
    SquareTerminal,
    Trash2,
  } as const;

  readonly user = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
  };

  readonly teams: Team[] = [
    { name: 'Acme Inc', plan: 'Enterprise', logo: 'GalleryVerticalEnd' },
    { name: 'Acme Corp.', plan: 'Startup', logo: 'AudioWaveform' },
    { name: 'Evil Corp.', plan: 'Free', logo: 'Command' },
  ];
  readonly activeTeam = signal<Team>(this.teams[0]);

  readonly navMain = [
    {
      title: 'Playground',
      icon: 'SquareTerminal' as const,
      isActive: true,
      items: ['History', 'Starred', 'Settings'],
    },
    {
      title: 'Models',
      icon: 'Bot' as const,
      isActive: false,
      items: ['Genesis', 'Explorer', 'Quantum'],
    },
    {
      title: 'Documentation',
      icon: 'BookOpen' as const,
      isActive: false,
      items: ['Introduction', 'Get Started', 'Tutorials', 'Changelog'],
    },
    {
      title: 'Settings',
      icon: 'Settings2' as const,
      isActive: false,
      items: ['General', 'Team', 'Billing', 'Limits'],
    },
  ];

  readonly projects = [
    { name: 'Design Engineering', icon: 'Frame' as const },
    { name: 'Sales & Marketing', icon: 'PieChart' as const },
    { name: 'Travel', icon: 'Map' as const },
  ];
}
