import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-examples-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container mx-auto px-4 py-8 md:py-12">
      <!-- Demo container -->
      <div class="overflow-hidden rounded-xl border bg-background shadow-2xl" style="height: 620px">
        <div class="flex h-full text-xs">

          <!-- SIDEBAR -->
          <div class="w-[128px] shrink-0 border-r flex flex-col overflow-hidden bg-background">
            <div class="flex items-center gap-1.5 border-b px-3 py-2.5">
              <div class="h-4 w-4 rounded-sm bg-foreground flex items-center justify-center">
                <svg viewBox="0 0 24 24" class="h-2.5 w-2.5 text-background" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span class="font-semibold text-[11px]">shadcn/ui</span>
            </div>
            <div class="flex-1 overflow-hidden p-1.5 space-y-0.5">
              @for (group of navGroups; track group.label) {
                <div class="py-0.5">
                  <p class="px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground/50">{{ group.label }}</p>
                  @for (item of group.items; track item.label) {
                    <div [class]="'flex items-center gap-1.5 rounded-sm px-2 py-[3px] text-[10px] ' + (item.active ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground')">
                      {{ item.label }}
                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <!-- RIGHT: topbar + grid -->
          <div class="flex flex-1 flex-col overflow-hidden">

            <!-- Top bar -->
            <div class="flex items-center justify-between border-b px-3 py-2 shrink-0">
              <div class="flex items-center gap-1.5">
                <div class="h-5 w-40 rounded-md border bg-muted/30 flex items-center gap-1 px-2">
                  <svg class="h-2.5 w-2.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <span class="text-[9px] text-muted-foreground">Search documentation...</span>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="h-5 w-5 rounded-md border bg-muted/30 flex items-center justify-center">
                  <svg class="h-2.5 w-2.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div class="h-5 w-5 rounded-full bg-foreground/80 flex items-center justify-center">
                  <span class="text-[7px] font-bold text-background">JD</span>
                </div>
              </div>
            </div>

            <!-- MAIN GRID -->
            <div class="flex-1 overflow-hidden"
                 style="display: grid; grid-template-columns: 20% 18% 19% 21% 22%; grid-template-rows: 29% 21% 26% 24%; gap: 1px; background: color-mix(in oklch, var(--border) 60%, transparent);">

              <!-- 1. Contribution Metrics (col1, rows 1–2) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:1; grid-row:1/span 2;">
                <div class="text-[10px] font-semibold leading-none">Contribution Metrics</div>
                <div class="text-[8px] text-muted-foreground mt-0.5 mb-2">Jan – Jun 2024 · All repos</div>
                <div class="flex items-end gap-[2px] h-14 mb-2">
                  @for (v of contribBars; track $index) {
                    <div class="flex-1 rounded-t-[1px]"
                         [style.height.%]="v"
                         [style.background]="v > 70 ? 'var(--foreground)' : 'color-mix(in oklch, var(--foreground) 35%, transparent)'">
                    </div>
                  }
                </div>
                <div class="grid grid-cols-3 gap-1 mb-2">
                  @for (s of contribStats; track s.label) {
                    <div class="rounded bg-muted/50 p-1 text-center">
                      <div class="text-[10px] font-bold">{{ s.val }}</div>
                      <div class="text-[7px] text-muted-foreground">{{ s.label }}</div>
                    </div>
                  }
                </div>
                <div class="border-t pt-1.5">
                  <div class="text-[9px] font-medium">May 23, 2024</div>
                  <div class="flex items-center gap-1 mt-0.5">
                    <div class="flex-1 h-[3px] rounded-full bg-muted overflow-hidden">
                      <div class="h-full w-[60%] bg-emerald-500 rounded-full"></div>
                    </div>
                    <span class="text-[7px] font-medium text-emerald-600">Accelerated</span>
                  </div>
                </div>
                <div class="border-t mt-1.5 pt-1.5">
                  <div class="text-[7px] text-muted-foreground">Payday</div>
                  <div class="text-[15px] font-bold leading-tight">$0.00</div>
                  <div class="text-[7px] text-muted-foreground">Pending</div>
                </div>
              </div>

              <!-- 2. Travel / Roadmap (col2, row1) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:2; grid-row:1;">
                <div class="text-[10px] font-semibold leading-none">Travel / Roadmap</div>
                <div class="text-[8px] text-muted-foreground mt-0.5 mb-1.5">Phase 2 in progress</div>
                <div class="flex -space-x-1 mb-2">
                  @for (av of avatars; track $index) {
                    <div class="h-5 w-5 rounded-full border-2 border-background text-[6px] font-bold flex items-center justify-center text-white"
                         [style.background]="av.color">{{ av.i }}</div>
                  }
                  <div class="h-5 w-5 rounded-full border-2 border-background bg-muted text-[7px] flex items-center justify-center">+3</div>
                </div>
                @for (t of roadmapTasks; track t.name) {
                  <div class="mb-1">
                    <div class="flex justify-between text-[7px] mb-[2px]">
                      <span class="text-muted-foreground">{{ t.name }}</span>
                      <span class="font-medium">{{ t.pct }}%</span>
                    </div>
                    <div class="h-[3px] rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full bg-foreground" [style.width.%]="t.pct"></div>
                    </div>
                  </div>
                }
              </div>

              <!-- 3. Savings Targets (col3, rows 1–2) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:3; grid-row:1/span 2;">
                <div class="text-[10px] font-semibold leading-none">Savings Targets</div>
                <div class="text-[8px] text-muted-foreground mt-0.5">New Goal · Annual</div>
                <div class="my-2">
                  <div class="text-[22px] font-bold leading-none">$420,000</div>
                  <div class="text-[8px] text-muted-foreground mt-0.5">Total target</div>
                </div>
                <div class="flex items-end gap-[2px] h-10 mb-2">
                  @for (b of savingsBars; track $index) {
                    <div class="flex-1 rounded-t-[1px]"
                         [style.height.%]="b.h"
                         [style.background]="b.dark ? 'var(--foreground)' : 'color-mix(in oklch, var(--muted-foreground) 25%, transparent)'">
                    </div>
                  }
                </div>
                <div class="border-t pt-1.5">
                  <div class="text-[8px] text-muted-foreground">Saved so far</div>
                  <div class="text-[16px] font-bold leading-tight">$85,000</div>
                  <div class="text-[7px] text-muted-foreground mb-1">20% of target</div>
                  <div class="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div class="h-full w-[20%] bg-foreground rounded-full"></div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-1 mt-2">
                  @for (s of savingsStats; track s.label) {
                    <div class="rounded bg-muted/50 p-1">
                      <div class="text-[7px] text-muted-foreground">{{ s.label }}</div>
                      <div class="text-[9px] font-semibold">{{ s.val }}</div>
                    </div>
                  }
                </div>
              </div>

              <!-- 4. Buy Investment (col4, row1) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:4; grid-row:1;">
                <div class="text-[10px] font-semibold leading-none">Buy Investment</div>
                <div class="text-[8px] text-muted-foreground mt-0.5 mb-1.5">Amount to invest</div>
                <div class="text-[20px] font-bold leading-tight mb-1.5">$2,500.00</div>
                <div class="flex gap-0.5 mb-1.5">
                  @for (t of ['ETF','Stock','Bond']; track t) {
                    <div class="flex-1 rounded border px-1 py-0.5 text-center text-[7px] text-muted-foreground hover:bg-accent cursor-default">{{ t }}</div>
                  }
                </div>
                <div class="w-full rounded bg-foreground text-background text-[9px] py-1 text-center font-medium">Invest Now</div>
              </div>

              <!-- 5. Account Balance (col5, row1) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:5; grid-row:1;">
                <div class="text-[8px] text-muted-foreground">Account Balance</div>
                <div class="text-[18px] font-bold leading-none mt-0.5">$12,456</div>
                <div class="text-[7px] text-muted-foreground mb-2">Updated 1h ago</div>
                <div class="grid grid-cols-2 gap-1">
                  @for (c of cryptoCards; track c.label) {
                    <div class="rounded bg-muted/50 p-1.5">
                      <div class="text-[7px] text-muted-foreground">{{ c.label }}</div>
                      <div [class]="'text-[9px] font-semibold ' + c.cls">{{ c.val }}</div>
                    </div>
                  }
                </div>
              </div>

              <!-- 6. Network Score (col2, row2) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:2; grid-row:2;">
                <div class="text-[10px] font-semibold mb-1.5">Network Score</div>
                @for (item of networkItems; track item.label) {
                  <div class="mb-1">
                    <div class="flex justify-between text-[7px] mb-[2px]">
                      <span class="text-muted-foreground">{{ item.label }}</span>
                      <span class="font-medium">{{ item.val }}</span>
                    </div>
                    <div class="h-[3px] rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full bg-blue-500" [style.width.%]="item.pct"></div>
                    </div>
                  </div>
                }
              </div>

              <!-- 7. Transfer Funds (col4, row2) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:4; grid-row:2;">
                <div class="text-[10px] font-semibold mb-1">Transfer Funds</div>
                <div class="space-y-0.5">
                  @for (f of transferFields; track f.label) {
                    <div class="rounded border bg-muted/20 px-1.5 py-0.5">
                      <div class="text-[6px] uppercase tracking-wide text-muted-foreground">{{ f.label }}</div>
                      <div class="text-[8px] font-medium">{{ f.val }}</div>
                    </div>
                  }
                </div>
                <div class="w-full mt-1 rounded bg-foreground text-background text-[8px] py-0.5 text-center font-medium">Transfer</div>
              </div>

              <!-- 8. Power Usage (col5, rows 2–3) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:5; grid-row:2/span 2;">
                <div class="text-[10px] font-semibold leading-none">Power Usage</div>
                <div class="text-[8px] text-muted-foreground mt-0.5 mb-1.5">Weekly kWh</div>
                <div class="flex items-end gap-1 h-20 mb-2">
                  @for (b of powerBars; track b.day) {
                    <div class="flex-1 flex flex-col items-center gap-0.5">
                      <div class="w-full rounded-t-[1px] bg-foreground/75" [style.height.px]="b.h"></div>
                      <span class="text-[6px] text-muted-foreground">{{ b.day }}</span>
                    </div>
                  }
                </div>
                <div class="border-t pt-1.5">
                  <div class="text-[8px] text-muted-foreground">This week</div>
                  <div class="text-[14px] font-bold leading-tight">5.4 kW</div>
                  <div class="text-[7px] text-emerald-600">↓ 8% vs last week</div>
                </div>
                <div class="mt-1.5 w-full rounded border text-[7px] py-0.5 text-center text-muted-foreground">Export CSV</div>
              </div>

              <!-- 9. Recent Transactions (col1–2, row3) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:1/span 2; grid-row:3;">
                <div class="flex justify-between items-center mb-1.5">
                  <div class="text-[10px] font-semibold">Recent Transactions</div>
                  <div class="text-[7px] text-blue-500">View all</div>
                </div>
                @for (tx of transactions; track tx.name) {
                  <div class="flex items-center gap-1.5 py-[3px] border-b border-border/30 last:border-0">
                    <div class="h-5 w-5 rounded-full bg-muted shrink-0 flex items-center justify-center text-[8px]">{{ tx.icon }}</div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[9px] font-medium truncate">{{ tx.name }}</div>
                      <div class="text-[7px] text-muted-foreground">{{ tx.date }}</div>
                    </div>
                    <div [class]="'text-[9px] font-medium shrink-0 ' + (tx.pos ? 'text-emerald-600' : '')">
                      {{ tx.pos ? '+' : '-' }}{{ tx.amount }}
                    </div>
                  </div>
                }
              </div>

              <!-- 10. Preferences / Toggles (col3, row3) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:3; grid-row:3;">
                <div class="text-[10px] font-semibold mb-1.5">Preferences</div>
                @for (t of toggleItems; track t.label) {
                  <div class="flex items-center justify-between py-[3px] border-b border-border/20 last:border-0">
                    <span class="text-[8px]">{{ t.label }}</span>
                    <div [class]="'h-3 w-5 rounded-full relative ' + (t.on ? 'bg-foreground' : 'bg-muted')">
                      <div [class]="'absolute top-[1px] h-[10px] w-[10px] rounded-full bg-background shadow-sm ' + (t.on ? 'right-[1px]' : 'left-[1px]')"></div>
                    </div>
                  </div>
                }
              </div>

              <!-- 11. Calendar (col4, rows 3–4) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:4; grid-row:3/span 2;">
                <div class="text-[10px] font-semibold mb-1.5">June 2024</div>
                <div class="grid grid-cols-7 gap-0.5 mb-0.5">
                  @for (d of ['S','M','T','W','T','F','S']; track $index) {
                    <div class="text-center text-[6px] text-muted-foreground font-medium">{{ d }}</div>
                  }
                </div>
                <div class="grid grid-cols-7 gap-0.5">
                  @for (day of calendarDays; track $index) {
                    <div [class]="'h-4 w-4 mx-auto flex items-center justify-center rounded text-[7px] ' + (day.today ? 'bg-foreground text-background font-bold' : day.event ? 'bg-accent font-medium' : day.empty ? '' : 'text-foreground')">
                      {{ day.label }}
                    </div>
                  }
                </div>
                <div class="mt-1.5 border-t pt-1.5">
                  <div class="text-[7px] font-medium uppercase tracking-wide text-muted-foreground mb-1">Upcoming</div>
                  @for (ev of calendarEvents; track ev.title) {
                    <div class="flex items-center gap-1 mb-0.5">
                      <div class="h-1.5 w-1.5 rounded-full shrink-0" [style.background]="ev.color"></div>
                      <div>
                        <div class="text-[7px] font-medium">{{ ev.title }}</div>
                        <div class="text-[6px] text-muted-foreground">{{ ev.time }}</div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- 12. Referral (col1, row4) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:1; grid-row:4;">
                <div class="text-[10px] font-semibold mb-1">Get a new referral</div>
                <div class="flex gap-2 items-center">
                  <div class="h-10 w-10 shrink-0 rounded border bg-muted/40 flex items-center justify-center">
                    <svg viewBox="0 0 40 40" class="h-8 w-8 opacity-40">
                      <rect x="2" y="2" width="14" height="14" rx="2" fill="currentColor"/>
                      <rect x="5" y="5" width="8" height="8" fill="white"/>
                      <rect x="24" y="2" width="14" height="14" rx="2" fill="currentColor"/>
                      <rect x="27" y="5" width="8" height="8" fill="white"/>
                      <rect x="2" y="24" width="14" height="14" rx="2" fill="currentColor"/>
                      <rect x="5" y="27" width="8" height="8" fill="white"/>
                      <rect x="24" y="24" width="3" height="3" fill="currentColor"/>
                      <rect x="29" y="24" width="3" height="3" fill="currentColor"/>
                      <rect x="34" y="24" width="3" height="3" fill="currentColor"/>
                      <rect x="24" y="29" width="3" height="3" fill="currentColor"/>
                      <rect x="29" y="34" width="3" height="3" fill="currentColor"/>
                      <rect x="34" y="34" width="3" height="3" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-[7px] text-muted-foreground">Your code</div>
                    <div class="text-[9px] font-mono font-bold">REF-A8X2K</div>
                    <div class="text-[7px] text-muted-foreground mt-0.5">3 friends joined</div>
                  </div>
                </div>
              </div>

              <!-- 13. Global Cuisine (col2–3, row4) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:2/span 2; grid-row:4;">
                <div class="text-[10px] font-semibold mb-1.5">Global Cuisine</div>
                @for (c of cuisines; track c.name) {
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-11 text-[7px] text-muted-foreground truncate shrink-0">{{ c.name }}</div>
                    <div class="flex-1 h-[5px] rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full bg-foreground/80" [style.width.%]="c.pct"></div>
                    </div>
                    <div class="text-[7px] text-muted-foreground w-8 text-right shrink-0">{{ c.count }}</div>
                  </div>
                }
              </div>

              <!-- 14. Top Earners (col5, row4) -->
              <div class="bg-background p-2.5 overflow-hidden" style="grid-column:5; grid-row:4;">
                <div class="text-[10px] font-semibold mb-1.5">Top Earners</div>
                @for (m of teamMembers; track m.name) {
                  <div class="flex items-center gap-1 mb-1">
                    <div class="h-4 w-4 rounded-full shrink-0 flex items-center justify-center text-[6px] font-bold text-white"
                         [style.background]="m.color">{{ m.i }}</div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[7px] truncate">{{ m.name }}</div>
                      <div class="h-[3px] w-full rounded-full bg-muted overflow-hidden mt-[1px]">
                        <div class="h-full rounded-full bg-foreground/70" [style.width.%]="m.pct"></div>
                      </div>
                    </div>
                    <div class="text-[7px] font-semibold shrink-0 ml-0.5">{{ m.amount }}</div>
                  </div>
                }
              </div>

            </div><!-- end grid -->
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeExamplesSection {
  navGroups = [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', active: true },
        { label: 'Analytics', active: false },
        { label: 'Transactions', active: false },
        { label: 'Investments', active: false },
        { label: 'Accounts', active: false },
      ],
    },
    {
      label: 'Planning',
      items: [
        { label: 'Documents', active: false },
        { label: 'Budget', active: false },
        { label: 'Reports', active: false },
        { label: 'Goals', active: false },
        { label: 'Calendar', active: false },
      ],
    },
    {
      label: 'Support',
      items: [
        { label: 'Help Center', active: false },
        { label: 'Docs', active: false },
        { label: 'Contact Us', active: false },
      ],
    },
    {
      label: 'Account',
      items: [
        { label: 'Profile', active: false },
        { label: 'Billing', active: false },
        { label: 'Notifications', active: false },
        { label: 'Security', active: false },
      ],
    },
  ];

  contribBars = [48, 62, 35, 78, 55, 90, 42, 68, 38, 85, 58, 95];
  contribStats = [
    { val: '238', label: 'Commits' },
    { val: '48', label: 'PRs' },
    { val: '12', label: 'Issues' },
  ];

  avatars = [
    { i: 'JL', color: '#f87171' },
    { i: 'MK', color: '#60a5fa' },
    { i: 'SR', color: '#34d399' },
    { i: 'TC', color: '#a78bfa' },
  ];

  roadmapTasks = [
    { name: 'Design', pct: 85 },
    { name: 'Backend', pct: 62 },
    { name: 'Frontend', pct: 45 },
    { name: 'Testing', pct: 30 },
  ];

  savingsBars = [
    { h: 30, dark: false }, { h: 50, dark: false }, { h: 65, dark: true },
    { h: 40, dark: false }, { h: 80, dark: true }, { h: 35, dark: false },
    { h: 55, dark: true }, { h: 70, dark: false }, { h: 45, dark: false },
    { h: 90, dark: true },
  ];

  savingsStats = [
    { label: 'Monthly', val: '$3,500' },
    { label: 'Needed', val: '$7,083' },
  ];

  cryptoCards = [
    { label: 'BTC', val: '+2.4%', cls: 'text-emerald-600' },
    { label: 'ETH', val: '-1.2%', cls: 'text-red-500' },
  ];

  networkItems = [
    { label: 'PayPal', val: '78%', pct: 78 },
    { label: 'Stripe', val: '65%', pct: 65 },
    { label: 'Square', val: '42%', pct: 42 },
  ];

  transferFields = [
    { label: 'From', val: 'Checking ••••4521' },
    { label: 'To', val: 'Savings ••••8834' },
    { label: 'Amount', val: '$500.00' },
  ];

  powerBars = [
    { day: 'M', h: 44 }, { day: 'T', h: 56 }, { day: 'W', h: 36 },
    { day: 'T', h: 64 }, { day: 'F', h: 48 }, { day: 'S', h: 28 },
    { day: 'S', h: 32 },
  ];

  transactions = [
    { icon: '🛒', name: 'Whole Foods Market', date: 'Jul 12, 2024', amount: '$84.32', pos: false },
    { icon: '🏠', name: 'Rent Payment', date: 'Jul 01, 2024', amount: '$1,650.00', pos: false },
    { icon: '💼', name: 'Salary Deposit', date: 'Jun 30, 2024', amount: '$4,850.00', pos: true },
    { icon: '📺', name: 'Netflix', date: 'Jun 28, 2024', amount: '$15.99', pos: false },
  ];

  toggleItems = [
    { label: 'Dark Mode', on: false },
    { label: 'Notifications', on: true },
    { label: 'Auto-save', on: true },
    { label: 'Analytics', on: false },
    { label: 'Two-factor', on: true },
  ];

  calendarDays = [
    // June 2024 starts on Saturday (index 6)
    ...[...Array(6)].map(() => ({ label: '', empty: true, today: false, event: false })),
    ...Array.from({ length: 30 }, (_, i) => ({
      label: String(i + 1),
      empty: false,
      today: i + 1 === 12,
      event: [3, 7, 15, 20, 24].includes(i + 1),
    })),
  ];

  calendarEvents = [
    { title: 'Team standup', time: 'Jun 12 · 9:00 AM', color: '#60a5fa' },
    { title: 'Budget review', time: 'Jun 15 · 2:00 PM', color: '#f87171' },
    { title: 'Client demo', time: 'Jun 20 · 11:00 AM', color: '#34d399' },
  ];

  cuisines = [
    { name: 'Italian', count: '2,839', pct: 85 },
    { name: 'Japanese', count: '2,124', pct: 64 },
    { name: 'Mexican', count: '1,897', pct: 57 },
    { name: 'Indian', count: '1,645', pct: 49 },
    { name: 'Thai', count: '1,234', pct: 37 },
  ];

  teamMembers = [
    { i: 'JL', name: 'Jessica Lee', pct: 85, amount: '$3,240', color: '#f87171' },
    { i: 'MR', name: 'Mike Ross', pct: 72, amount: '$2,890', color: '#60a5fa' },
    { i: 'AJ', name: 'Alex Johnson', pct: 91, amount: '$4,150', color: '#34d399' },
    { i: 'ST', name: 'Sarah Torres', pct: 68, amount: '$2,560', color: '#a78bfa' },
  ];
}
