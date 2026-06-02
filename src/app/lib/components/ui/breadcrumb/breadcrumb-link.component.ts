import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'BreadcrumbLink',
  template: `<a [attr.href]="href()" [class]="computedClass()"><ng-content /></a>`,
  host: {
    'attr.data-slot': '"breadcrumb-link"',
    style: 'display:contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbLink {
  readonly href = input<string | undefined>(undefined);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('transition-colors hover:text-foreground', this.class()),
  );
}
