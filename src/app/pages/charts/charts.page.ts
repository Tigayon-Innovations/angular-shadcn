import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    PLATFORM_ID,
    signal,
} from '@angular/core';
import {
    AreaChart,
    BarChart3,
    Code,
    Copy,
    LineChart,
    LucideAngularModule,
    MessageSquare,
    PieChart,
    Radar,
    Target,
} from 'lucide-angular';

type ChartType = 'area' | 'bar' | 'line' | 'pie' | 'radar' | 'radial';

@Component({
  selector: 'ChartsPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    LucideAngularModule,
  ],
  template: `
    <div class="min-h-screen bg-background">
      <section class="container mx-auto px-4 py-16 text-center">
        <div class="mb-4">
          <span class="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
            <span class="h-2 w-2 rounded-full bg-blue-500"></span>
            npx shadcn create →
          </span>
        </div>
        <h1 class="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Beautiful Charts & Graphs
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          A collection of ready-to-use chart components built with ApexCharts.
          From basic charts to rich data displays, copy and paste into your apps.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Button variant="default">Browse Charts</Button>
          <Button variant="outline">Documentation</Button>
        </div>
      </section>

      <section class="container mx-auto px-4 pb-8">
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap gap-2">
            @for (tab of chartTabs; track tab.id) {
              <Button
                [variant]="activeTab() === tab.id ? 'default' : 'ghost'"
                size="sm"
                (click)="setActiveTab(tab.id)"
              >
                {{ tab.label }}
              </Button>
            }
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground">Theme:</span>
            <Select>
              <SelectTrigger class="w-32">
                <SelectValue placeholder="Neutral" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <lucide-icon [img]="icons.Copy" class="h-4 w-4" />
            </Button>
          </div>
        </div>

        @if (activeTab() === 'area') {
          <div class="space-y-6">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.AreaChart" class="h-4 w-4" />
                  <span class="text-sm">Area Chart</span>
                </div>
                <div class="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <lucide-icon [img]="icons.Copy" class="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" class="gap-2">
                    <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                    View Code
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div class="flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <CardTitle>Area Chart - Interactive</CardTitle>
                      <CardDescription>Showing total visitors for the last 3 months</CardDescription>
                    </div>
                    <Select>
                      <SelectTrigger class="w-40">
                        <SelectValue placeholder="Last 3 months" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90d">Last 3 months</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div id="interactive-area-chart" class="h-[350px] w-full"></div>
                </div>
              </CardContent>
            </Card>
            <div class="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader class="flex flex-row items-center justify-between">
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <lucide-icon [img]="icons.AreaChart" class="h-4 w-4" />
                    <span class="text-sm">Area Chart</span>
                  </div>
                  <Button variant="outline" size="sm" class="gap-2">
                    <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                    View Code
                  </Button>
                </CardHeader>
                <CardContent>
                  <CardTitle class="mb-1">Area Chart - Stacked</CardTitle>
                  <CardDescription class="mb-4">Showing total visitors for the last 6 months</CardDescription>
                  <div id="stacked-area-chart" class="h-[250px] w-full"></div>
                  <div class="mt-4 flex items-center justify-center gap-6 text-sm">
                    <div class="flex items-center gap-2">
                      <span class="h-3 w-3 rounded-full bg-chart-1"></span>
                      Desktop
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="h-3 w-3 rounded-full bg-chart-2"></span>
                      Mobile
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader class="flex flex-row items-center justify-between">
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <lucide-icon [img]="icons.AreaChart" class="h-4 w-4" />
                    <span class="text-sm">Area Chart</span>
                  </div>
                  <Button variant="outline" size="sm" class="gap-2">
                    <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                    View Code
                  </Button>
                </CardHeader>
                <CardContent>
                  <CardTitle class="mb-1">Area Chart - Gradient</CardTitle>
                  <CardDescription class="mb-4">Showing total visitors for the last 6 months</CardDescription>
                  <div id="gradient-area-chart" class="h-[250px] w-full"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        }

        @if (activeTab() === 'bar') {
          <div class="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.BarChart3" class="h-4 w-4" />
                  <span class="text-sm">Bar Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Bar Chart - Vertical</CardTitle>
                <CardDescription class="mb-4">January - June 2024</CardDescription>
                <div id="vertical-bar-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.BarChart3" class="h-4 w-4" />
                  <span class="text-sm">Bar Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Bar Chart - Horizontal</CardTitle>
                <CardDescription class="mb-4">January - June 2024</CardDescription>
                <div id="horizontal-bar-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
          </div>
        }

        @if (activeTab() === 'line') {
          <div class="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.LineChart" class="h-4 w-4" />
                  <span class="text-sm">Line Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Line Chart</CardTitle>
                <CardDescription class="mb-4">January - June 2024</CardDescription>
                <div id="line-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.LineChart" class="h-4 w-4" />
                  <span class="text-sm">Line Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Line Chart - Multi Series</CardTitle>
                <CardDescription class="mb-4">Page views and sessions</CardDescription>
                <div id="multi-line-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
          </div>
        }

        @if (activeTab() === 'pie') {
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.PieChart" class="h-4 w-4" />
                  <span class="text-sm">Pie Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Pie Chart</CardTitle>
                <CardDescription class="mb-4">January - June 2024</CardDescription>
                <div id="pie-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.PieChart" class="h-4 w-4" />
                  <span class="text-sm">Donut Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Donut Chart</CardTitle>
                <CardDescription class="mb-4">Visitors by browser</CardDescription>
                <div id="donut-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.PieChart" class="h-4 w-4" />
                  <span class="text-sm">Pie Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Pie Chart - Label</CardTitle>
                <CardDescription class="mb-4">With labels</CardDescription>
                <div id="pie-label-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
          </div>
        }

        @if (activeTab() === 'radar') {
          <div class="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.Radar" class="h-4 w-4" />
                  <span class="text-sm">Radar Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Radar Chart</CardTitle>
                <CardDescription class="mb-4">Skill distribution</CardDescription>
                <div id="radar-chart" class="h-[300px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.Radar" class="h-4 w-4" />
                  <span class="text-sm">Radar Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Radar Chart - Multi</CardTitle>
                <CardDescription class="mb-4">Comparing two data sets</CardDescription>
                <div id="radar-multi-chart" class="h-[300px] w-full"></div>
              </CardContent>
            </Card>
          </div>
        }

        @if (activeTab() === 'radial') {
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.Target" class="h-4 w-4" />
                  <span class="text-sm">Radial Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Radial Bar Chart</CardTitle>
                <CardDescription class="mb-4">Progress indicator</CardDescription>
                <div id="radial-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.Target" class="h-4 w-4" />
                  <span class="text-sm">Radial Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Radial Bar - Multiple</CardTitle>
                <CardDescription class="mb-4">Multiple metrics</CardDescription>
                <div id="radial-multi-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.Target" class="h-4 w-4" />
                  <span class="text-sm">Radial Chart</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Semi Circle</CardTitle>
                <CardDescription class="mb-4">Goal progress</CardDescription>
                <div id="semi-circle-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
          </div>
        }

        @if (activeTab() === 'tooltips') {
          <div class="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.MessageSquare" class="h-4 w-4" />
                  <span class="text-sm">Tooltip</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Custom Tooltip</CardTitle>
                <CardDescription class="mb-4">With custom formatting</CardDescription>
                <div id="tooltip-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <lucide-icon [img]="icons.MessageSquare" class="h-4 w-4" />
                  <span class="text-sm">Tooltip</span>
                </div>
                <Button variant="outline" size="sm" class="gap-2">
                  <lucide-icon [img]="icons.Code" class="h-4 w-4" />
                  View Code
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle class="mb-1">Shared Tooltip</CardTitle>
                <CardDescription class="mb-4">Multiple series tooltip</CardDescription>
                <div id="shared-tooltip-chart" class="h-[250px] w-full"></div>
              </CardContent>
            </Card>
          </div>
        }
      </section>
    </div>
  `,
})
export class ChartsPage implements AfterViewInit {
  protected readonly icons = { AreaChart, BarChart3, Code, Copy, LineChart, MessageSquare, PieChart, Radar, Target };
  protected readonly activeTab = signal<ChartType | 'tooltips'>('area');
  private isBrowser: boolean;
  private chartColors: string[] = [];

  protected readonly chartTabs = [
    { id: 'area' as const, label: 'Area Charts' },
    { id: 'bar' as const, label: 'Bar Charts' },
    { id: 'line' as const, label: 'Line Charts' },
    { id: 'pie' as const, label: 'Pie Charts' },
    { id: 'radar' as const, label: 'Radar Charts' },
    { id: 'radial' as const, label: 'Radial Charts' },
    { id: 'tooltips' as const, label: 'Tooltips' },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadChartColors();
      this.initializeChartsForTab(this.activeTab());
    }
  }

  private loadChartColors(): void {
    const styles = getComputedStyle(document.documentElement);
    this.chartColors = [
      styles.getPropertyValue('--chart-1').trim(),
      styles.getPropertyValue('--chart-2').trim(),
      styles.getPropertyValue('--chart-3').trim(),
      styles.getPropertyValue('--chart-4').trim(),
      styles.getPropertyValue('--chart-5').trim(),
    ];
  }

  private getColor(i: number): string {
    const c = this.chartColors[i] || this.chartColors[0];
    return c ? `oklch(${c})` : `var(--chart-${i + 1})`;
  }

  protected setActiveTab(tab: ChartType | 'tooltips'): void {
    this.activeTab.set(tab);
    if (this.isBrowser) {
      setTimeout(() => this.initializeChartsForTab(tab), 100);
    }
  }

  private async initializeChartsForTab(tab: ChartType | 'tooltips'): Promise<void> {
    if (!this.isBrowser) return;
    this.loadChartColors();
    const ApexCharts = (await import('apexcharts')).default;

    const chartConfigs: Record<string, () => void> = {
      area: () => { this.renderArea(ApexCharts); this.renderStacked(ApexCharts); this.renderGradient(ApexCharts); },
      bar: () => { this.renderVerticalBar(ApexCharts); this.renderHorizontalBar(ApexCharts); },
      line: () => { this.renderLine(ApexCharts); this.renderMultiLine(ApexCharts); },
      pie: () => { this.renderPie(ApexCharts); this.renderDonut(ApexCharts); this.renderPieLabel(ApexCharts); },
      radar: () => { this.renderRadar(ApexCharts); this.renderRadarMulti(ApexCharts); },
      radial: () => { this.renderRadial(ApexCharts); this.renderRadialMulti(ApexCharts); this.renderSemi(ApexCharts); },
      tooltips: () => { this.renderTooltip(ApexCharts); this.renderSharedTooltip(ApexCharts); },
    };
    chartConfigs[tab]?.();
  }

  private renderChart(selector: string, ApexCharts: any, opts: any): void {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = '';
    new ApexCharts(el, opts).render();
  }

  private renderArea(A: any): void {
    const data = Array.from({ length: 90 }, () => ({ d: Math.floor(Math.random() * 300) + 100, m: Math.floor(Math.random() * 200) + 50 }));
    this.renderChart('#interactive-area-chart', A, {
      series: [{ name: 'Desktop', data: data.map(x => x.d) }, { name: 'Mobile', data: data.map(x => x.m) }],
      chart: { type: 'area', height: 350, background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
      colors: [this.getColor(0), this.getColor(1)],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 100] } },
      xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { show: true, borderColor: 'var(--border)', strokeDashArray: 4 },
      tooltip: { theme: 'dark' },
      legend: { show: false },
    });
  }

  private renderStacked(A: any): void {
    this.renderChart('#stacked-area-chart', A, {
      series: [{ name: 'Desktop', data: [186, 305, 237, 73, 209, 214] }, { name: 'Mobile', data: [80, 200, 120, 190, 130, 140] }],
      chart: { type: 'area', height: 250, stacked: true, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0), this.getColor(1)],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.5, opacityTo: 0.1 } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { show: false },
      tooltip: { theme: 'dark' },
      legend: { show: false },
    });
  }

  private renderGradient(A: any): void {
    this.renderChart('#gradient-area-chart', A, {
      series: [{ name: 'Desktop', data: [186, 305, 237, 73, 209, 214] }, { name: 'Mobile', data: [80, 200, 120, 190, 130, 140] }],
      chart: { type: 'area', height: 250, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(2), this.getColor(3)],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: { type: 'gradient', gradient: { type: 'vertical', opacityFrom: 0.7, opacityTo: 0 } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { show: false },
      tooltip: { theme: 'dark' },
      legend: { show: false },
    });
  }

  private renderVerticalBar(A: any): void {
    this.renderChart('#vertical-bar-chart', A, {
      series: [{ name: 'Visitors', data: [186, 305, 237, 73, 209, 214] }],
      chart: { type: 'bar', height: 250, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0)],
      plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { show: false },
      tooltip: { theme: 'dark' },
    });
  }

  private renderHorizontalBar(A: any): void {
    this.renderChart('#horizontal-bar-chart', A, {
      series: [{ name: 'Visitors', data: [186, 305, 237, 73, 209, 214] }],
      chart: { type: 'bar', height: 250, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(1)],
      plotOptions: { bar: { borderRadius: 4, horizontal: true, barHeight: '60%' } },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
      grid: { show: false },
      tooltip: { theme: 'dark' },
    });
  }

  private renderLine(A: any): void {
    this.renderChart('#line-chart', A, {
      series: [{ name: 'Visitors', data: [186, 305, 237, 73, 209, 214] }],
      chart: { type: 'line', height: 250, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0)],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 4 },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { borderColor: 'var(--border)', strokeDashArray: 4 },
      tooltip: { theme: 'dark' },
    });
  }

  private renderMultiLine(A: any): void {
    this.renderChart('#multi-line-chart', A, {
      series: [{ name: 'Page Views', data: [186, 305, 237, 73, 209, 214] }, { name: 'Sessions', data: [80, 200, 120, 190, 130, 140] }],
      chart: { type: 'line', height: 250, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0), this.getColor(1)],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 4 },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { borderColor: 'var(--border)', strokeDashArray: 4 },
      tooltip: { theme: 'dark' },
      legend: { show: false },
    });
  }

  private renderPie(A: any): void {
    this.renderChart('#pie-chart', A, {
      series: [275, 200, 187, 173, 90],
      chart: { type: 'pie', height: 250, background: 'transparent' },
      colors: [this.getColor(0), this.getColor(1), this.getColor(2), this.getColor(3), this.getColor(4)],
      labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: false },
      tooltip: { theme: 'dark' },
    });
  }

  private renderDonut(A: any): void {
    this.renderChart('#donut-chart', A, {
      series: [275, 200, 187, 173, 90],
      chart: { type: 'donut', height: 250, background: 'transparent' },
      colors: [this.getColor(0), this.getColor(1), this.getColor(2), this.getColor(3), this.getColor(4)],
      labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: false },
      plotOptions: { pie: { donut: { size: '60%', labels: { show: true, total: { show: true, label: 'Total' } } } } },
      tooltip: { theme: 'dark' },
    });
  }

  private renderPieLabel(A: any): void {
    this.renderChart('#pie-label-chart', A, {
      series: [275, 200, 187, 173, 90],
      chart: { type: 'pie', height: 250, background: 'transparent' },
      colors: [this.getColor(0), this.getColor(1), this.getColor(2), this.getColor(3), this.getColor(4)],
      labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
      legend: { show: false },
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%`, style: { colors: ['#fff'] } },
      tooltip: { theme: 'dark' },
    });
  }

  private renderRadar(A: any): void {
    this.renderChart('#radar-chart', A, {
      series: [{ name: 'Skills', data: [80, 90, 70, 85, 60, 75] }],
      chart: { type: 'radar', height: 300, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0)],
      xaxis: { categories: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js', 'Python'] },
      yaxis: { show: false },
      stroke: { width: 2 },
      fill: { opacity: 0.3 },
      markers: { size: 4 },
      tooltip: { theme: 'dark' },
    });
  }

  private renderRadarMulti(A: any): void {
    this.renderChart('#radar-multi-chart', A, {
      series: [{ name: 'Team A', data: [80, 90, 70, 85, 60, 75] }, { name: 'Team B', data: [65, 75, 90, 70, 80, 85] }],
      chart: { type: 'radar', height: 300, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0), this.getColor(1)],
      xaxis: { categories: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js', 'Python'] },
      yaxis: { show: false },
      stroke: { width: 2 },
      fill: { opacity: 0.2 },
      markers: { size: 4 },
      tooltip: { theme: 'dark' },
      legend: { position: 'bottom' },
    });
  }

  private renderRadial(A: any): void {
    this.renderChart('#radial-chart', A, {
      series: [75],
      chart: { type: 'radialBar', height: 250, background: 'transparent' },
      colors: [this.getColor(0)],
      plotOptions: { radialBar: { hollow: { size: '60%' }, dataLabels: { name: { show: true }, value: { show: true, fontSize: '24px', fontWeight: 'bold' } } } },
      labels: ['Progress'],
      tooltip: { theme: 'dark' },
    });
  }

  private renderRadialMulti(A: any): void {
    this.renderChart('#radial-multi-chart', A, {
      series: [75, 60, 45],
      chart: { type: 'radialBar', height: 250, background: 'transparent' },
      colors: [this.getColor(0), this.getColor(1), this.getColor(2)],
      plotOptions: { radialBar: { dataLabels: { name: { fontSize: '12px' }, value: { fontSize: '14px' }, total: { show: true, label: 'Total' } } } },
      labels: ['Desktop', 'Mobile', 'Tablet'],
      tooltip: { theme: 'dark' },
    });
  }

  private renderSemi(A: any): void {
    this.renderChart('#semi-circle-chart', A, {
      series: [76],
      chart: { type: 'radialBar', height: 250, background: 'transparent', offsetY: -20 },
      colors: [this.getColor(0)],
      plotOptions: { radialBar: { startAngle: -90, endAngle: 90, hollow: { size: '60%' }, track: { background: 'var(--muted)', strokeWidth: '100%' }, dataLabels: { name: { show: true, offsetY: 30 }, value: { show: true, offsetY: -10, fontSize: '24px', fontWeight: 'bold' } } } },
      labels: ['Goal Progress'],
      tooltip: { theme: 'dark' },
    });
  }

  private renderTooltip(A: any): void {
    this.renderChart('#tooltip-chart', A, {
      series: [{ name: 'Revenue', data: [4500, 5200, 4800, 5800, 6200, 7100] }],
      chart: { type: 'area', height: 250, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0)],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.1 } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { show: false },
      tooltip: { theme: 'dark', y: { formatter: (val: number) => `$${val.toLocaleString()}` } },
    });
  }

  private renderSharedTooltip(A: any): void {
    this.renderChart('#shared-tooltip-chart', A, {
      series: [{ name: 'Revenue', data: [4500, 5200, 4800, 5800, 6200, 7100] }, { name: 'Expenses', data: [2500, 2800, 3100, 2900, 3200, 3500] }],
      chart: { type: 'line', height: 250, background: 'transparent', toolbar: { show: false } },
      colors: [this.getColor(0), this.getColor(4)],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 4 },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false },
      grid: { borderColor: 'var(--border)', strokeDashArray: 4 },
      tooltip: { theme: 'dark', shared: true, y: { formatter: (val: number) => `$${val.toLocaleString()}` } },
      legend: { show: false },
    });
  }
}
