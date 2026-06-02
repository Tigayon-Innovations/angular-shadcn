import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'BreadcrumbItem',
  template: `<li [class]="computedClass()"><ng-content /></li>`,
  host: {
    'attr.data-slot': '"breadcrumb-item"',
    style: 'display:contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbItem {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('inline-flex items-center gap-1.5', this.class()),
  );
}
