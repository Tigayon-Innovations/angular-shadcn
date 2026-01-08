import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {
  CHART_CONTEXT,
  type ChartConfig,
  type ChartContext,
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
      'flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_]:stroke-border [&_.recharts-sector]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none',
      this.class()
    )
  );
}
