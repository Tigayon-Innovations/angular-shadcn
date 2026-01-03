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

// CSS variable name mapping for chart colors
export const CHART_COLORS = {
  chart1: 'hsl(var(--chart-1))',
  chart2: 'hsl(var(--chart-2))',
  chart3: 'hsl(var(--chart-3))',
  chart4: 'hsl(var(--chart-4))',
  chart5: 'hsl(var(--chart-5))',
} as const;
