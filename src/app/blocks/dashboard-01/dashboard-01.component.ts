import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarChart3, ClipboardList, FolderOpen, LucideAngularModule, TrendingUp, Users } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-01',
  imports: [LucideAngularModule],
  template: `
    <div class="flex h-screen w-full">
      <!-- Sidebar -->
      <aside class="w-64 border-r bg-muted/30">
        <div class="flex h-14 items-center border-b px-6">
          <span class="font-semibold">Acme Inc.</span>
        </div>
        <nav class="space-y-1 p-4">
          <a
            href="#"
            class="flex items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
          >
            <lucide-icon [img]="icons.BarChart3" class="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <lucide-icon [img]="icons.ClipboardList" class="h-5 w-5" />
            <span>Lifecycle</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <lucide-icon [img]="icons.TrendingUp" class="h-5 w-5" />
            <span>Analytics</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <lucide-icon [img]="icons.FolderOpen" class="h-5 w-5" />
            <span>Projects</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <lucide-icon [img]="icons.Users" class="h-5 w-5" />
            <span>Team</span>
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <!-- Header -->
        <header class="flex h-14 items-center justify-between border-b px-6">
          <h1 class="text-xl font-semibold">Documents</h1>
          <div class="flex items-center gap-4">
            <span class="text-sm text-muted-foreground">GitHub</span>
          </div>
        </header>

        <!-- Content -->
        <div class="p-6">
          <!-- Stats Cards -->
          <div class="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-lg border bg-card p-6">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Total Revenue</span>
                <span class="text-xs text-green-600">+12.5%</span>
              </div>
              <div class="text-2xl font-bold">$1,250.00</div>
              <p class="mt-1 text-xs text-muted-foreground">
                Trending up this month
              </p>
              <p class="text-xs text-muted-foreground">
                Visitors for the last 6 months
              </p>
            </div>

            <div class="rounded-lg border bg-card p-6">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm text-muted-foreground">New Customers</span>
                <span class="text-xs text-red-600">-20%</span>
              </div>
              <div class="text-2xl font-bold">1,234</div>
              <p class="mt-1 text-xs text-muted-foreground">
                Down 20% this period
              </p>
              <p class="text-xs text-muted-foreground">
                Acquisition needs attention
              </p>
            </div>

            <div class="rounded-lg border bg-card p-6">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Active Accounts</span>
                <span class="text-xs text-green-600">+12.5%</span>
              </div>
              <div class="text-2xl font-bold">45,678</div>
              <p class="mt-1 text-xs text-muted-foreground">
                Strong user retention
              </p>
              <p class="text-xs text-muted-foreground">
                Engagement exceed targets
              </p>
            </div>

            <div class="rounded-lg border bg-card p-6">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Growth Rate</span>
                <span class="text-xs text-green-600">+4.5%</span>
              </div>
              <div class="text-2xl font-bold">4.5%</div>
              <p class="mt-1 text-xs text-muted-foreground">
                Steady performance increase
              </p>
              <p class="text-xs text-muted-foreground">
                Meets growth projections
              </p>
            </div>
          </div>

          <!-- Chart Section -->
          <div class="rounded-lg border bg-card p-6">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-lg font-semibold">Total Visitors</h2>
              <div class="flex gap-2">
                <button class="rounded-md bg-muted px-3 py-1 text-sm">
                  Last 3 months
                </button>
                <button class="rounded-md px-3 py-1 text-sm hover:bg-muted">
                  Last 30 days
                </button>
                <button class="rounded-md px-3 py-1 text-sm hover:bg-muted">
                  Last 7 days
                </button>
              </div>
            </div>
            <div class="h-64 w-full rounded bg-muted/30"></div>
            <div class="mt-4 flex gap-6">
              <button class="text-sm text-primary">Outline</button>
              <button class="text-sm text-muted-foreground">
                Past Performance <span class="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">3</span>
              </button>
              <button class="text-sm text-muted-foreground">
                Key Personnel <span class="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">2</span>
              </button>
              <button class="text-sm text-muted-foreground">
                Focus Documents
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard01Component {
  protected readonly icons = { BarChart3, ClipboardList, TrendingUp, FolderOpen, Users };
}
