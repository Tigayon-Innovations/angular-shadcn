import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  LucideAngularModule,
  Users,
} from 'lucide-angular';

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: typeof DollarSign;
}

interface Sale {
  name: string;
  email: string;
  amount: string;
  avatar: string;
  initials: string;
}

interface Bar {
  label: string;
  value: number;
}

@Component({
  selector: 'example-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, CardContent, CardHeader, CardTitle, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-4 p-4 md:gap-6 md:p-8">
      <!-- Header row -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h2>
        <div class="flex items-center gap-2">
          <span class="hidden text-sm text-muted-foreground sm:inline">
            Jan 20, 2026 - Feb 09, 2026
          </span>
          <Button size="sm" class="gap-2">
            <lucide-icon [img]="DownloadIcon" class="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <!-- Stat cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (stat of stats; track stat.title) {
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
              <lucide-icon [img]="stat.icon" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ stat.value }}</div>
              <p class="text-xs text-muted-foreground">{{ stat.change }} from last month</p>
            </CardContent>
          </Card>
        }
      </div>

      <!-- Overview + Recent Sales -->
      <div class="grid gap-4 lg:grid-cols-7">
        <Card class="lg:col-span-4">
          <CardHeader>
            <CardTitle class="text-base font-semibold">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex h-[240px] items-end gap-2 md:h-[300px]">
              @for (bar of overview; track bar.label) {
                <div class="flex h-full flex-1 flex-col justify-end gap-2">
                  <div
                    class="w-full rounded-md bg-primary transition-all"
                    [style.height.%]="bar.value"
                  ></div>
                  <span class="text-center text-[10px] text-muted-foreground sm:text-xs">
                    {{ bar.label }}
                  </span>
                </div>
              }
            </div>
          </CardContent>
        </Card>

        <Card class="lg:col-span-3">
          <CardHeader>
            <CardTitle class="text-base font-semibold">Recent Sales</CardTitle>
            <p class="text-sm text-muted-foreground">You made 265 sales this month.</p>
          </CardHeader>
          <CardContent class="grid gap-6">
            @for (sale of sales; track sale.email) {
              <div class="flex items-center gap-4">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
                >
                  {{ sale.initials }}
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium leading-none">{{ sale.name }}</p>
                  <p class="mt-1 truncate text-sm text-muted-foreground">{{ sale.email }}</p>
                </div>
                <div class="text-sm font-medium">{{ sale.amount }}</div>
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  `,
})
export class ExampleDashboard {
  protected readonly DownloadIcon = Download;

  protected readonly stats: Stat[] = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
    { title: 'Subscriptions', value: '+2350', change: '+180.1%', icon: Users },
    { title: 'Sales', value: '+12,234', change: '+19%', icon: CreditCard },
    { title: 'Active Now', value: '+573', change: '+201', icon: Activity },
  ];

  protected readonly overview: Bar[] = [
    { label: 'Jan', value: 62 },
    { label: 'Feb', value: 41 },
    { label: 'Mar', value: 78 },
    { label: 'Apr', value: 35 },
    { label: 'May', value: 55 },
    { label: 'Jun', value: 90 },
    { label: 'Jul', value: 48 },
    { label: 'Aug', value: 70 },
    { label: 'Sep', value: 38 },
    { label: 'Oct', value: 84 },
    { label: 'Nov', value: 58 },
    { label: 'Dec', value: 96 },
  ];

  protected readonly sales: Sale[] = [
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
