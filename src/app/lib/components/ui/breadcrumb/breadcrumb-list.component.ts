import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'BreadcrumbList',
  template: `<ol [class]="computedClass()"><ng-content /></ol>`,
  host: {
    'attr.data-slot': '"breadcrumb-list"',
    style: 'display:contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbList {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      this.class(),
    ),
  );
}
