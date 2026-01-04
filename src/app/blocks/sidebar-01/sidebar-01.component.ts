import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar-01',
  imports: [],
  template: `
    <div class="flex h-screen w-full border">
      <!-- Sidebar -->
      <aside
        [class.w-64]="!collapsed()"
        [class.w-16]="collapsed()"
        class="border-r bg-muted/30 transition-all duration-300"
      >
        <!-- Header -->
        <div class="flex h-14 items-center border-b px-4">
          @if (!collapsed()) {
            <span class="font-semibold">Acme Inc.</span>
          } @else {
            <span class="text-xl">A</span>
          }
          <button
            (click)="collapsed.set(!collapsed())"
            class="ml-auto rounded-md p-1 hover:bg-muted"
          >
            @if (collapsed()) {
              <span class="text-lg">→</span>
            } @else {
              <span class="text-lg">←</span>
            }
          </button>
        </div>

        <!-- Navigation -->
        <nav class="space-y-1 p-2">
          @for (item of navItems; track item.label) {
            <a
              href="#"
              [class.bg-primary]="item.active"
              [class.text-primary-foreground]="item.active"
              [class.text-muted-foreground]="!item.active"
              [class.justify-center]="collapsed()"
              class="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-foreground"
            >
              <span class="text-lg">{{ item.icon }}</span>
              @if (!collapsed()) {
                <span>{{ item.label }}</span>
              }
            </a>
          }
        </nav>

        <!-- User Section -->
        <div class="absolute bottom-0 w-full border-t p-4">
          <div
            [class.justify-center]="collapsed()"
            class="flex items-center gap-3"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              JD
            </div>
            @if (!collapsed()) {
              <div class="flex-1">
                <div class="text-sm font-medium">John Doe</div>
                <div class="text-xs text-muted-foreground">john&#64;example.com</div>
              </div>
            }
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <div class="p-6">
          <h1 class="mb-4 text-2xl font-bold">Dashboard</h1>
          <p class="text-muted-foreground">
            Welcome to your dashboard. This sidebar collapses to icons for a
            compact view.
          </p>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar01Component {
  collapsed = signal(false);

  navItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '📋', label: 'Lifecycle', active: false },
    { icon: '📈', label: 'Analytics', active: false },
    { icon: '📁', label: 'Projects', active: false },
    { icon: '👥', label: 'Team', active: false },
  ];
}
