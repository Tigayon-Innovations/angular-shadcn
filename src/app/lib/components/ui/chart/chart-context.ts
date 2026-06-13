import { InjectionToken, WritableSignal } from '@angular/core';

export type ChartType = 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'radar';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
    icon?: string;
  };
}

export interface ChartContext {
  config: WritableSignal<ChartConfig>;
}

export const CHART_CONTEXT = new InjectionToken<ChartContext>('ChartContext');

// CSS variable name mapping for chart colors.
// The --chart-* tokens are full oklch() colors, so reference them directly
// (wrapping in hsl() produced invalid hsl(oklch(...)) and rendered monochrome).
export const CHART_COLORS = {
  chart1: 'var(--chart-1)',
  chart2: 'var(--chart-2)',
  chart3: 'var(--chart-3)',
  chart4: 'var(--chart-4)',
  chart5: 'var(--chart-5)',
} as const;
