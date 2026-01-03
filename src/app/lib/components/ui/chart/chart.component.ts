import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  CHART_COLORS,
  CHART_CONTEXT,
  type ChartConfig,
  type ChartContext,
  type ChartDataPoint,
  type ChartSeries,
  type ChartType,
} from './chart-context';

/**
 * ChartContainer component - wrapper that provides chart context and styling.
 *
 * @example
 * <ChartContainer [config]="chartConfig">
 *   <Chart type="bar" [data]="data" [series]="series" />
 *   <ChartTooltip />
 *   <ChartLegend />
 * </ChartContainer>
 */
@Component({
  selector: 'ChartContainer',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[style]': 'chartStyles()',
    'data-chart': '',
  },
  providers: [
    {
      provide: CHART_CONTEXT,
      useFactory: (component: ChartContainer) => component.context,
      deps: [forwardRef(() => ChartContainer)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainer {
  /** Chart configuration with colors and labels */
  readonly config = input<ChartConfig>({});

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Context for child components */
  readonly context: ChartContext = {
    config: signal(this.config()),
  };

  constructor() {
    effect(() => {
      this.context.config.set(this.config());
    });
  }

  protected readonly chartStyles = computed(() => {
    const config = this.config();
    const styles: { [key: string]: string } = {};

    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        styles[`--color-${key}`] = value.color;
      }
    });

    return styles;
  });

  protected readonly computedClass = computed(() =>
    cn(
      'flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=#ccc]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke=#fff]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke=#ccc]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=#ccc]]:stroke-border [&_.recharts-sector[stroke=#fff]]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none',
      this.class()
    )
  );
}

/**
 * Chart component - renders the actual chart visualization.
 * This is a simplified SVG-based chart implementation.
 * For production use, integrate with a charting library like ng2-charts or ngx-charts.
 */
@Component({
  selector: 'Chart',
  template: `
    <svg [attr.viewBox]="viewBox()" class="w-full h-full">
      @switch (type()) {
        @case ('bar') {
          @for (bar of barData(); track $index) {
            <rect
              [attr.x]="bar.x"
              [attr.y]="bar.y"
              [attr.width]="bar.width"
              [attr.height]="bar.height"
              [attr.fill]="bar.color"
              class="transition-all duration-300 hover:opacity-80"
              rx="4"
            />
          }
        }
        @case ('line') {
          <path
            [attr.d]="linePath()"
            fill="none"
            [attr.stroke]="primaryColor()"
            stroke-width="2"
            class="transition-all duration-300"
          />
          @for (point of linePoints(); track $index) {
            <circle
              [attr.cx]="point.x"
              [attr.cy]="point.y"
              r="4"
              [attr.fill]="primaryColor()"
              class="transition-all duration-300 hover:r-6"
            />
          }
        }
        @case ('area') {
          <path
            [attr.d]="areaPath()"
            [attr.fill]="primaryColor()"
            fill-opacity="0.2"
            class="transition-all duration-300"
          />
          <path
            [attr.d]="linePath()"
            fill="none"
            [attr.stroke]="primaryColor()"
            stroke-width="2"
            class="transition-all duration-300"
          />
        }
        @case ('pie') {
          @for (slice of pieSlices(); track $index) {
            <path
              [attr.d]="slice.path"
              [attr.fill]="slice.color"
              class="transition-all duration-300 hover:opacity-80"
            />
          }
        }
        @case ('donut') {
          @for (slice of donutSlices(); track $index) {
            <path
              [attr.d]="slice.path"
              [attr.fill]="slice.color"
              class="transition-all duration-300 hover:opacity-80"
            />
          }
        }
      }

      <!-- X-axis labels -->
      @if (showXAxis()) {
        @for (label of xAxisLabels(); track $index) {
          <text
            [attr.x]="label.x"
            [attr.y]="height() - 5"
            text-anchor="middle"
            class="fill-muted-foreground text-[10px]"
          >
            {{ label.text }}
          </text>
        }
      }

      <!-- Y-axis labels -->
      @if (showYAxis()) {
        @for (label of yAxisLabels(); track $index) {
          <text
            [attr.x]="5"
            [attr.y]="label.y"
            text-anchor="start"
            class="fill-muted-foreground text-[10px]"
          >
            {{ label.text }}
          </text>
        }
      }
    </svg>
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chart {
  private readonly context = inject(CHART_CONTEXT, { optional: true });

  /** Chart type */
  readonly type = input<ChartType>('bar');

  /** Data points for the chart */
  readonly data = input<ChartDataPoint[]>([]);

  /** Series data for multi-series charts */
  readonly series = input<ChartSeries[]>([]);

  /** Chart width */
  readonly width = input<number>(400);

  /** Chart height */
  readonly height = input<number>(300);

  /** Show X axis */
  readonly showXAxis = input<boolean>(true);

  /** Show Y axis */
  readonly showYAxis = input<boolean>(true);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly viewBox = computed(
    () => `0 0 ${this.width()} ${this.height()}`
  );

  protected readonly primaryColor = computed(() => {
    const config = this.context?.config() || {};
    const firstKey = Object.keys(config)[0];
    return config[firstKey]?.color || CHART_COLORS.chart1;
  });

  protected readonly barData = computed(() => {
    const data = this.data();
    const config = this.context?.config() || {};
    const w = this.width();
    const h = this.height();
    const padding = 40;
    const maxValue = Math.max(...data.map((d) => d.value), 1);
    const barWidth = (w - padding * 2) / data.length - 10;

    return data.map((d, i) => ({
      x: padding + i * (barWidth + 10) + 5,
      y: padding + (h - padding * 2) * (1 - d.value / maxValue),
      width: barWidth,
      height: (h - padding * 2) * (d.value / maxValue),
      color: d.color || config[d.label]?.color || CHART_COLORS.chart1,
    }));
  });

  protected readonly linePoints = computed(() => {
    const data = this.data();
    const w = this.width();
    const h = this.height();
    const padding = 40;
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    return data.map((d, i) => ({
      x: padding + (i / Math.max(data.length - 1, 1)) * (w - padding * 2),
      y: padding + (h - padding * 2) * (1 - d.value / maxValue),
    }));
  });

  protected readonly linePath = computed(() => {
    const points = this.linePoints();
    if (points.length === 0) return '';
    return (
      `M ${points[0].x} ${points[0].y}` +
      points.slice(1).map((p) => ` L ${p.x} ${p.y}`).join('')
    );
  });

  protected readonly areaPath = computed(() => {
    const points = this.linePoints();
    const h = this.height();
    const padding = 40;
    if (points.length === 0) return '';

    const linePath = this.linePath();
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const bottomY = h - padding;

    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  });

  protected readonly pieSlices = computed(() => {
    const data = this.data();
    const config = this.context?.config() || {};
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const cx = this.width() / 2;
    const cy = this.height() / 2;
    const radius = Math.min(cx, cy) - 20;
    const colors = Object.values(CHART_COLORS);

    let currentAngle = -Math.PI / 2;
    return data.map((d, i) => {
      const angle = (d.value / total) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const x1 = cx + radius * Math.cos(startAngle);
      const y1 = cy + radius * Math.sin(startAngle);
      const x2 = cx + radius * Math.cos(endAngle);
      const y2 = cy + radius * Math.sin(endAngle);
      const largeArc = angle > Math.PI ? 1 : 0;

      return {
        path: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        color: d.color || config[d.label]?.color || colors[i % colors.length],
      };
    });
  });

  protected readonly donutSlices = computed(() => {
    const data = this.data();
    const config = this.context?.config() || {};
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const cx = this.width() / 2;
    const cy = this.height() / 2;
    const outerRadius = Math.min(cx, cy) - 20;
    const innerRadius = outerRadius * 0.6;
    const colors = Object.values(CHART_COLORS);

    let currentAngle = -Math.PI / 2;
    return data.map((d, i) => {
      const angle = (d.value / total) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const x1 = cx + outerRadius * Math.cos(startAngle);
      const y1 = cy + outerRadius * Math.sin(startAngle);
      const x2 = cx + outerRadius * Math.cos(endAngle);
      const y2 = cy + outerRadius * Math.sin(endAngle);
      const x3 = cx + innerRadius * Math.cos(endAngle);
      const y3 = cy + innerRadius * Math.sin(endAngle);
      const x4 = cx + innerRadius * Math.cos(startAngle);
      const y4 = cy + innerRadius * Math.sin(startAngle);
      const largeArc = angle > Math.PI ? 1 : 0;

      return {
        path: `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`,
        color: d.color || config[d.label]?.color || colors[i % colors.length],
      };
    });
  });

  protected readonly xAxisLabels = computed(() => {
    const data = this.data();
    const w = this.width();
    const padding = 40;

    return data.map((d, i) => ({
      x: padding + (i / Math.max(data.length - 1, 1)) * (w - padding * 2),
      text: d.label,
    }));
  });

  protected readonly yAxisLabels = computed(() => {
    const data = this.data();
    const h = this.height();
    const padding = 40;
    const maxValue = Math.max(...data.map((d) => d.value), 1);
    const steps = 5;

    return Array.from({ length: steps + 1 }, (_, i) => ({
      y: padding + ((h - padding * 2) * i) / steps,
      text: String(Math.round(maxValue * (1 - i / steps))),
    }));
  });

  protected readonly computedClass = computed(() =>
    cn('w-full h-full', this.class())
  );
}

/**
 * ChartTooltip component - tooltip for chart data points.
 */
@Component({
  selector: 'ChartTooltip',
  template: `
    <div [class]="computedClass()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTooltip {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'rounded-lg border bg-background p-2 shadow-sm',
      this.class()
    )
  );
}

/**
 * ChartTooltipContent component - content inside tooltip.
 */
@Component({
  selector: 'ChartTooltipContent',
  template: `
    <div [class]="computedClass()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTooltipContent {
  /** Hide label */
  readonly hideLabel = input<boolean>(false);

  /** Hide indicator */
  readonly hideIndicator = input<boolean>(false);

  /** Indicator type */
  readonly indicator = input<'line' | 'dot' | 'dashed'>('dot');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex flex-col gap-1',
      this.class()
    )
  );
}

/**
 * ChartLegend component - legend for chart series.
 */
@Component({
  selector: 'ChartLegend',
  template: `
    <div [class]="computedClass()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegend {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex flex-wrap items-center justify-center gap-4',
      this.class()
    )
  );
}

/**
 * ChartLegendContent component - content inside legend.
 */
@Component({
  selector: 'ChartLegendContent',
  template: `
    @for (item of items(); track item.label) {
      <div class="flex items-center gap-2">
        <div
          class="h-2 w-2 rounded-full"
          [style.backgroundColor]="item.color"
        ></div>
        <span class="text-sm text-muted-foreground">{{ item.label }}</span>
      </div>
    }
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendContent {
  private readonly context = inject(CHART_CONTEXT, { optional: true });

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly items = computed(() => {
    const config = this.context?.config() || {};
    const colors = Object.values(CHART_COLORS);

    return Object.entries(config).map(([key, value], i) => ({
      label: value.label || key,
      color: value.color || colors[i % colors.length],
    }));
  });

  protected readonly computedClass = computed(() =>
    cn('flex flex-wrap items-center justify-center gap-4', this.class())
  );
}
