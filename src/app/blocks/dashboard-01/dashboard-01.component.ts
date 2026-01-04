import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarChart3, ClipboardList, FolderOpen, LucideAngularModule, TrendingDown, TrendingUp, Users } from 'lucide-angular';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
  subtext: string;
}

@Component({
  selector: 'app-dashboard-01',
  imports: [Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, LucideAngularModule],
  template: `
    <div class="flex h-screen w-full">
      <!-- Sidebar -->
      <aside class="w-64 border-r bg-muted/30">
        <div class="flex h-14 items-center border-b px-6">
          <span class="font-semibold">Acme Inc.</span>
        </div>
        <nav class="space-y-1 p-4">
          @for (item of navItems; track item.label) {
            <a
              href="#"
              [class]="item.active
                ? 'flex items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground'
                : 'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground'"
            >
              <lucide-icon [img]="item.icon" class="h-5 w-5" />
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <!-- Header -->
        <header class="flex h-14 items-center justify-between border-b px-6">
          <h1 class="text-xl font-semibold">Documents</h1>
          <div class="flex items-center gap-4">
            <Button variant="ghost" size="sm">GitHub</Button>
          </div>
        </header>

        <!-- Content -->
        <div class="p-6">
          <!-- Stats Cards -->
          <div class="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            @for (stat of stats; track stat.title) {
              <Card>
                <CardHeader class="pb-2">
                  <div class="flex items-center justify-between">
                    <CardDescription>{{ stat.title }}</CardDescription>
                    <Badge [variant]="stat.trend === 'up' ? 'default' : 'destructive'" class="text-xs">
                      @if (stat.trend === 'up') {
                        <lucide-icon [img]="icons.TrendingUp" class="h-3 w-3 mr-1" />
                      } @else {
                        <lucide-icon [img]="icons.TrendingDown" class="h-3 w-3 mr-1" />
                      }
                      {{ stat.change }}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-bold">{{ stat.value }}</div>
                  <p class="mt-1 text-xs text-muted-foreground">
                    {{ stat.description }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ stat.subtext }}
                  </p>
                </CardContent>
              </Card>
            }
          </div>

          <!-- Chart Section -->
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle>Total Visitors</CardTitle>
                <div class="flex gap-2">
                  <Button variant="secondary" size="sm">Last 3 months</Button>
                  <Button variant="ghost" size="sm">Last 30 days</Button>
                  <Button variant="ghost" size="sm">Last 7 days</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div class="h-64 w-full rounded bg-muted/30 flex items-center justify-center">
                <span class="text-muted-foreground text-sm">Chart visualization area</span>
              </div>
              <div class="mt-4 flex gap-6">
                <Button variant="link" class="text-primary p-0 h-auto">Outline</Button>
                <Button variant="link" class="text-muted-foreground p-0 h-auto">
                  Past Performance
                  <Badge variant="secondary" class="ml-1">3</Badge>
                </Button>
                <Button variant="link" class="text-muted-foreground p-0 h-auto">
                  Key Personnel
                  <Badge variant="secondary" class="ml-1">2</Badge>
                </Button>
                <Button variant="link" class="text-muted-foreground p-0 h-auto">Focus Documents</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard01Component {
  protected readonly icons = { BarChart3, ClipboardList, TrendingUp, TrendingDown, FolderOpen, Users };

  protected readonly navItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: ClipboardList, label: 'Lifecycle', active: false },
    { icon: TrendingUp, label: 'Analytics', active: false },
    { icon: FolderOpen, label: 'Projects', active: false },
    { icon: Users, label: 'Team', active: false },
  ];

  protected readonly stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$1,250.00',
      change: '+12.5%',
      trend: 'up',
      description: 'Trending up this month',
      subtext: 'Visitors for the last 6 months',
    },
    {
      title: 'New Customers',
      value: '1,234',
      change: '-20%',
      trend: 'down',
      description: 'Down 20% this period',
      subtext: 'Acquisition needs attention',
    },
    {
      title: 'Active Accounts',
      value: '45,678',
      change: '+12.5%',
      trend: 'up',
      description: 'Strong user retention',
      subtext: 'Engagement exceed targets',
    },
    {
      title: 'Growth Rate',
      value: '4.5%',
      change: '+4.5%',
      trend: 'up',
      description: 'Steady performance increase',
      subtext: 'Meets growth projections',
    },
  ];
}
