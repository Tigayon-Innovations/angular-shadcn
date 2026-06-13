import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideAngularModule,
  BarChart3,
  ArrowLeftRight,
  TrendingUp,
  Landmark,
  PieChart,
  FileText,
  Wallet,
  BarChart,
  Target,
  Calendar,
  HelpCircle,
  BookOpen,
  Mail,
  Activity,
  Users,
  User,
  CreditCard,
  Bell,
  Shield,
  Palette,
} from 'lucide-angular';
import { Card } from '@/lib/components/ui/card';

@Component({
  selector: 'card-sidebar-nav',
  standalone: true,
  imports: [LucideAngularModule, Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid w-full grid-cols-2 gap-4 xl:gap-6">
      <Card
        class="w-full overflow-hidden rounded-3xl py-0 xl:col-start-1 xl:row-start-2"
      >
        <div class="flex min-h-0 w-full flex-col gap-0 overflow-hidden">
          <div class="relative flex w-full min-w-0 flex-col p-2">
            <div
              class="text-muted-foreground flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium"
            >
              Overview
            </div>
            <div class="w-full text-sm">
              <ul class="flex w-full min-w-0 flex-col gap-1">
                <li class="relative">
                  <button
                    data-active="true"
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  >
                    <lucide-icon [img]="icons.BarChart3" class="size-4" />
                    Analytics
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.ArrowLeftRight" class="size-4" />
                    Transactions
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.TrendingUp" class="size-4" />
                    Investments
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Landmark" class="size-4" />
                    Accounts
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.PieChart" class="size-4" />
                    Spending
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <Card
        class="w-full overflow-hidden rounded-3xl py-0 xl:col-start-1 xl:row-start-1"
      >
        <div class="flex min-h-0 w-full flex-col gap-0 overflow-hidden">
          <div class="relative flex w-full min-w-0 flex-col p-2">
            <div
              class="text-muted-foreground flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium"
            >
              Planning
            </div>
            <div class="w-full text-sm">
              <ul class="flex w-full min-w-0 flex-col gap-1">
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.FileText" class="size-4" />
                    Documents
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Wallet" class="size-4" />
                    Budget
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.BarChart" class="size-4" />
                    Reports
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Target" class="size-4" />
                    Goals
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Calendar" class="size-4" />
                    Calendar
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <Card
        class="flex w-full overflow-hidden rounded-3xl py-0 xl:col-start-2 xl:row-start-1"
      >
        <div class="flex min-h-0 w-full flex-col gap-0 overflow-hidden">
          <div class="relative flex w-full min-w-0 flex-col p-2">
            <div
              class="text-muted-foreground flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium"
            >
              Support
            </div>
            <div class="w-full text-sm">
              <ul class="flex w-full min-w-0 flex-col gap-1">
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.HelpCircle" class="size-4" />
                    Help Center
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.BookOpen" class="size-4" />
                    Docs
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Mail" class="size-4" />
                    Contact Us
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Activity" class="size-4" />
                    Status
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Users" class="size-4" />
                    Community
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <Card
        class="flex w-full overflow-hidden rounded-3xl py-0 xl:col-start-2 xl:row-start-2"
      >
        <div class="flex min-h-0 w-full flex-col gap-0 overflow-hidden">
          <div class="relative flex w-full min-w-0 flex-col p-2">
            <div
              class="text-muted-foreground flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium"
            >
              Account
            </div>
            <div class="w-full text-sm">
              <ul class="flex w-full min-w-0 flex-col gap-1">
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.User" class="size-4" />
                    Profile
                  </button>
                </li>
                <li class="relative">
                  <button
                    data-active="true"
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  >
                    <lucide-icon [img]="icons.CreditCard" class="size-4" />
                    Billing
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Bell" class="size-4" />
                    Notifications
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Shield" class="size-4" />
                    Security
                  </button>
                </li>
                <li class="relative">
                  <button
                    class="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden"
                  >
                    <lucide-icon [img]="icons.Palette" class="size-4" />
                    Appearance
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  `,
})
export class CardSidebarNav {
  protected readonly icons = {
    BarChart3,
    ArrowLeftRight,
    TrendingUp,
    Landmark,
    PieChart,
    FileText,
    Wallet,
    BarChart,
    Target,
    Calendar,
    HelpCircle,
    BookOpen,
    Mail,
    Activity,
    Users,
    User,
    CreditCard,
    Bell,
    Shield,
    Palette,
  };
}
