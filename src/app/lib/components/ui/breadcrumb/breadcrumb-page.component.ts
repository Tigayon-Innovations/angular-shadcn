import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * BreadcrumbPage component - current page span.
 * Matches shadcn/ui React BreadcrumbPage exactly.
 */
@Component({
  selector: 'BreadcrumbPage',
  template: `<ng-content />`,
  host: {
    role: 'link',
    '[attr.aria-disabled]': '"true"',
    '[attr.aria-current]': '"page"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbPage {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('font-normal text-foreground', this.class()),
  );
}
