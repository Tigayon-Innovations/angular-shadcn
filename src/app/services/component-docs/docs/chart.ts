/**
 * Chart Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const CHART_DOCUMENTATION: ComponentDocumentation = {
  name: 'Chart',
  slug: 'chart',
  description:
    'A set of SVG-based chart components supporting bar, line, area, pie, and donut chart types. ChartContainer provides theme-aware color configuration and CSS custom properties; Chart renders the visualisation; ChartTooltip and ChartLegend compose optional overlay layers.',

  features: [
    { text: 'Five built-in chart types: bar, line, area, pie, donut.', highlight: true },
    { text: 'CSS variable-driven theming with per-series color configuration.', highlight: true },
    { text: 'ChartContainer generates --color-<key> CSS variables automatically.' },
    { text: 'Optional X and Y axis labels.' },
    { text: 'ChartLegendContent auto-reads config from context for zero-boilerplate legends.' },
    { text: 'Composable: mix Tooltip and Legend independently.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/chart',
      pnpm: 'pnpm add @ng-cn/chart',
      yarn: 'yarn add @ng-cn/chart',
      bun: 'bun add @ng-cn/chart',
    },
    ngAdd: 'ng g @ng-cn/core:c chart',
  },

  anatomy: {
    importStatement: `import {
  ChartContainer,
  Chart,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/ui/chart';
import type { ChartConfig, ChartDataPoint } from '@/ui/chart';`,
    structure: `<ChartContainer [config]="chartConfig">
  <Chart type="bar" [data]="data" />
  <ChartTooltip>
    <ChartTooltipContent />
  </ChartTooltip>
  <ChartLegend>
    <ChartLegendContent />
  </ChartLegend>
</ChartContainer>`,
  },

  apiReference: [
    {
      name: 'ChartContainer',
      description:
        'Wrapper that provides chart context to children. Generates CSS custom properties (--color-<key>) from the config object and applies aspect-video sizing.',
      props: [
        {
          name: 'config',
          type: 'ChartConfig',
          default: '{}',
          description:
            'A map of series keys to their label and color. Each entry generates a --color-<key> CSS variable and is used by ChartLegendContent.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"chart-container"' },
        { name: '[data-chart]', values: 'Present on the container element' },
      ],
      cssVariables: [
        {
          name: '--color-<key>',
          description:
            'Generated per config entry. Value is the color string from the matching ChartConfig entry.',
        },
      ],
    },
    {
      name: 'Chart',
      description:
        'The SVG rendering engine. Draws the chosen chart type from data points and respects color config from ChartContainer context.',
      props: [
        {
          name: 'type',
          type: "'bar' | 'line' | 'area' | 'pie' | 'donut'",
          default: "'bar'",
          description: 'The chart variant to render.',
        },
        {
          name: 'data',
          type: 'ChartDataPoint[]',
          default: '[]',
          description:
            'Array of data points. Each point has a label (string), value (number), and an optional per-point color override.',
        },
        {
          name: 'series',
          type: 'ChartSeries[]',
          default: '[]',
          description: 'Multi-series data for charts that support multiple data sets.',
        },
        {
          name: 'width',
          type: 'number',
          default: '400',
          description: 'SVG viewBox width in logical pixels.',
        },
        {
          name: 'height',
          type: 'number',
          default: '300',
          description: 'SVG viewBox height in logical pixels.',
        },
        {
          name: 'showXAxis',
          type: 'boolean',
          default: 'true',
          description: 'Whether to render X-axis labels below the chart.',
        },
        {
          name: 'showYAxis',
          type: 'boolean',
          default: 'true',
          description: 'Whether to render Y-axis labels to the left of the chart.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the SVG element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"chart"' },
      ],
    },
    {
      name: 'ChartTooltip',
      description:
        'Tooltip shell with a border, background, and shadow. Place ChartTooltipContent inside for structured content.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the tooltip container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"chart-tooltip"' },
      ],
    },
    {
      name: 'ChartTooltipContent',
      description: 'Content area inside ChartTooltip for label, indicator, and value rows.',
      props: [
        {
          name: 'hideLabel',
          type: 'boolean',
          default: 'false',
          description: 'When true, the series label is not rendered.',
        },
        {
          name: 'hideIndicator',
          type: 'boolean',
          default: 'false',
          description: 'When true, the color indicator dot/line is not rendered.',
        },
        {
          name: 'indicator',
          type: "'line' | 'dot' | 'dashed'",
          default: "'dot'",
          description: 'Visual style of the color indicator shown next to each value.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content wrapper.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"chart-tooltip-content"' },
      ],
    },
    {
      name: 'ChartLegend',
      description:
        'Legend wrapper that arranges items in a flex-wrap row. Place ChartLegendContent inside.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the legend container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"chart-legend"' },
      ],
    },
    {
      name: 'ChartLegendContent',
      description:
        'Renders a colored dot and label for each entry in the parent ChartContainer config. Reads config automatically from context.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the legend content.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"chart-legend-content"' },
      ],
      notes: [
        'Requires a ChartContainer ancestor to read the config signal.',
        'Falls back to built-in CHART_COLORS (chart1–chart5) when no color is set in config.',
      ],
    },
  ],

  examples: [
    {
      title: 'Bar chart',
      description: 'A basic bar chart with color config and a legend.',
      hasDemo: true,
      code: `// In your component:
chartConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
  mobile:  { label: 'Mobile',  color: 'hsl(var(--chart-2))' },
};

data: ChartDataPoint[] = [
  { label: 'January',  value: 186 },
  { label: 'February', value: 305 },
  { label: 'March',    value: 237 },
  { label: 'April',    value: 273 },
  { label: 'May',      value: 209 },
  { label: 'June',     value: 214 },
];

// In your template:
<ChartContainer [config]="chartConfig" class="min-h-[200px] w-full">
  <Chart type="bar" [data]="data" [height]="200" />
  <ChartLegend>
    <ChartLegendContent />
  </ChartLegend>
</ChartContainer>`,
    },
    {
      title: 'Line chart',
      description: 'Render a connected line chart for trend data.',
      code: `chartConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
};

data: ChartDataPoint[] = [
  { label: 'Jan', value: 1200 },
  { label: 'Feb', value: 1900 },
  { label: 'Mar', value: 1600 },
  { label: 'Apr', value: 2400 },
  { label: 'May', value: 2200 },
  { label: 'Jun', value: 3100 },
];

<ChartContainer [config]="chartConfig" class="min-h-[200px] w-full">
  <Chart type="line" [data]="data" [height]="200" />
</ChartContainer>`,
    },
    {
      title: 'Area chart',
      description: 'An area chart fills the region below the line with a semi-transparent color.',
      code: `<ChartContainer [config]="chartConfig" class="min-h-[200px] w-full">
  <Chart type="area" [data]="data" [height]="200" />
  <ChartLegend>
    <ChartLegendContent />
  </ChartLegend>
</ChartContainer>`,
    },
    {
      title: 'Pie chart',
      description: 'Display proportional data as a pie chart.',
      code: `chartConfig: ChartConfig = {
  Chrome:  { label: 'Chrome',  color: 'hsl(var(--chart-1))' },
  Safari:  { label: 'Safari',  color: 'hsl(var(--chart-2))' },
  Firefox: { label: 'Firefox', color: 'hsl(var(--chart-3))' },
  Edge:    { label: 'Edge',    color: 'hsl(var(--chart-4))' },
  Other:   { label: 'Other',   color: 'hsl(var(--chart-5))' },
};

data: ChartDataPoint[] = [
  { label: 'Chrome',  value: 275 },
  { label: 'Safari',  value: 200 },
  { label: 'Firefox', value: 187 },
  { label: 'Edge',    value: 173 },
  { label: 'Other',   value: 90 },
];

<ChartContainer [config]="chartConfig" class="min-h-[200px] w-full">
  <Chart type="pie" [data]="data" [showXAxis]="false" [showYAxis]="false" />
  <ChartLegend>
    <ChartLegendContent />
  </ChartLegend>
</ChartContainer>`,
    },
    {
      title: 'Donut chart',
      description: 'A ring variant of the pie chart with a hollow center.',
      code: `<ChartContainer [config]="chartConfig" class="min-h-[200px] w-full">
  <Chart
    type="donut"
    [data]="data"
    [width]="300"
    [height]="300"
    [showXAxis]="false"
    [showYAxis]="false"
  />
  <ChartLegend>
    <ChartLegendContent />
  </ChartLegend>
</ChartContainer>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element inside or after the chart container.',
      },
    ],
    ariaAttributes: [
      {
        name: 'data-chart',
        description: 'Present on ChartContainer. Can be used as a CSS selector for chart-specific overrides.',
      },
      {
        name: '--color-<key>',
        description:
          'CSS custom property generated per config entry. Enables consistent theming across chart elements and tooltips.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/chart',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'shadcn/ui Charts',
      url: 'https://ui.shadcn.com/charts',
      icon: 'docs',
    },
  ],
};
