import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * BreadcrumbItem component - li container.
 * Matches shadcn/ui React BreadcrumbItem exactly.
 */
@Component({
  selector: 'BreadcrumbItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbItem {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('inline-flex items-center gap-1.5', this.class())
  );
}
