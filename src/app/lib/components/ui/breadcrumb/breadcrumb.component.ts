import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Breadcrumb component - root container.
 * Matches shadcn/ui React Breadcrumb exactly.
 *
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */
@Component({
  selector: 'Breadcrumb',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"breadcrumb"',
    role: 'navigation',
    '[attr.aria-label]': '"breadcrumb"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumb {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn(this.class()));
}
