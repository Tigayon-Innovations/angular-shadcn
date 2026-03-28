import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * BreadcrumbLink component - anchor link.
 * Matches shadcn/ui React BreadcrumbLink exactly.
 */
@Component({
  selector: 'BreadcrumbLink',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.href]': 'href()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbLink {
  /** Link href */
  readonly href = input<string>('#');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('transition-colors hover:text-foreground', this.class()),
  );
}
