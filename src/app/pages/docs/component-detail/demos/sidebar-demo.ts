
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/ui/sidebar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calendar, Home, Inbox, LucideAngularModule, Search, Settings } from 'lucide-angular';

@Component({
  selector: 'SidebarDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    LucideAngularModule,
  ],
  template: `
    <div class="h-[400px] w-full border rounded-lg overflow-hidden">
      <SidebarProvider>
        <div class="flex h-full">
          <Sidebar>
            <SidebarHeader>
              <div class="p-2 font-semibold">Acme Inc</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    @for (item of menuItems; track item.title) {
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <lucide-icon [img]="item.icon" class="h-4 w-4" />
                          <span>{{ item.title }}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    }
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <lucide-icon [img]="Settings" class="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <main class="flex-1 p-4">
            <SidebarTrigger />
            <h2 class="text-lg font-semibold mt-4">Main Content</h2>
            <p class="text-muted-foreground">Toggle the sidebar using the button above.</p>
          </main>
        </div>
      </SidebarProvider>
    </div>
  `,
})
export class SidebarDemo {
  protected readonly Settings = Settings;

  protected readonly menuItems = [
    { title: 'Home', icon: Home },
    { title: 'Inbox', icon: Inbox },
    { title: 'Calendar', icon: Calendar },
    { title: 'Search', icon: Search },
  ];
}
