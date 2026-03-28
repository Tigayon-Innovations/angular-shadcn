import { ChangeDetectionStrategy, Component } from '@angular/core';

interface PerformanceStat {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'home-performance-section',
  standalone: true,
  templateUrl: './home-performance-section.html',
  styleUrl: '../home.style.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePerformanceSection {
  protected readonly stats: readonly PerformanceStat[] = [
    {
      value: '100%',
      label: 'Tree-shakable',
      description: 'Import only what you use',
    },
    {
      value: '<10kb',
      label: 'Average component',
      description: 'Gzipped and minified',
    },
    {
      value: '0',
      label: 'Runtime dependencies',
      description: 'Pure Angular & Tailwind',
    },
  ];
}
