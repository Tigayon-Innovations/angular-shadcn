import { UiAvatar } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import {
  Chart,
  ChartContainer,
  type ChartConfig,
  type ChartDataPoint,
} from '@/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideAngularModule, TrendingDown, TrendingUp } from 'lucide-angular';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
}

interface RecentSale {
  name: string;
  email: string;
  amount: string;
  avatar: string;
  initials: string;
}

@Component({
  selector: 'app-dashboard-02',
  imports: [
    Badge,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Chart,
    ChartContainer,
    LucideAngularModule,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    UiAvatar,
  ],
  template: `
    <div class="flex w-full flex-col gap-6 p-6">
      <!-- Header -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Analytics</h1>
          <p class="text-sm text-muted-foreground">Overview of your business performance.</p>
        </div>
        <Select [(value)]="dateRange">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Stat Cards -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        @for (stat of stats; track stat.title) {
          <Card>
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <CardDescription>{{ stat.title }}</CardDescription>
                <Badge [variant]="stat.trend === 'up' ? 'default' : 'destructive'" class="text-xs">
                  @if (stat.trend === 'up') {
                    <lucide-icon [img]="icons.TrendingUp" class="mr-1 h-3 w-3" />
                  } @else {
                    <lucide-icon [img]="icons.TrendingDown" class="mr-1 h-3 w-3" />
                  }
                  {{ stat.change }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ stat.value }}</div>
              <p class="mt-1 text-xs text-muted-foreground">{{ stat.description }}</p>
            </CardContent>
          </Card>
        }
      </div>

      <!-- Chart + Recent Sales -->
      <div class="grid gap-4 lg:grid-cols-7">
        <Card class="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer [config]="chartConfig" class="min-h-[300px] w-full">
              <Chart type="bar" [data]="chartData" [width]="600" [height]="300" />
            </ChartContainer>
          </CardContent>
        </Card>

        <Card class="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            @for (sale of recentSales; track sale.email) {
              <div class="flex items-center gap-4">
                <ui-avatar
                  class="h-9 w-9"
                  [src]="sale.avatar"
                  [alt]="sale.name"
                  [fallback]="sale.initials"
                />
                <div class="flex-1 space-y-1">
                  <p class="text-sm font-medium leading-none">{{ sale.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ sale.email }}</p>
                </div>
                <div class="text-sm font-medium">{{ sale.amount }}</div>
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard02Component {
  protected readonly icons = { TrendingUp, TrendingDown };

  protected readonly dateRange = signal('30d');

  protected readonly chartConfig: ChartConfig = {
    revenue: { label: 'Revenue', color: 'var(--chart-1)' },
  };

  protected readonly chartData: ChartDataPoint[] = [
    { label: 'Jan', value: 4200 },
    { label: 'Feb', value: 3800 },
    { label: 'Mar', value: 5100 },
    { label: 'Apr', value: 4600 },
    { label: 'May', value: 5900 },
    { label: 'Jun', value: 5400 },
    { label: 'Jul', value: 6800 },
    { label: 'Aug', value: 6200 },
    { label: 'Sep', value: 7100 },
    { label: 'Oct', value: 6700 },
    { label: 'Nov', value: 7800 },
    { label: 'Dec', value: 8400 },
  ];

  protected readonly stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      description: 'Compared to last month',
    },
    {
      title: 'New Users',
      value: '2,350',
      change: '+18.2%',
      trend: 'up',
      description: 'Signups this period',
    },
    {
      title: 'Sales',
      value: '12,234',
      change: '-4.5%',
      trend: 'down',
      description: 'Orders this period',
    },
    {
      title: 'Active Now',
      value: '573',
      change: '+8.4%',
      trend: 'up',
      description: 'Users online right now',
    },
  ];

  protected readonly recentSales: RecentSale[] = [
    {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      amount: '+$1,999.00',
      avatar: 'https://i.pravatar.cc/100?img=1',
      initials: 'OM',
    },
    {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      amount: '+$39.00',
      avatar: 'https://i.pravatar.cc/100?img=2',
      initials: 'JL',
    },
    {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      amount: '+$299.00',
      avatar: 'https://i.pravatar.cc/100?img=3',
      initials: 'IN',
    },
    {
      name: 'William Kim',
      email: 'will@email.com',
      amount: '+$99.00',
      avatar: 'https://i.pravatar.cc/100?img=4',
      initials: 'WK',
    },
    {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      amount: '+$39.00',
      avatar: 'https://i.pravatar.cc/100?img=5',
      initials: 'SD',
    },
  ];
}
