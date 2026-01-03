import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Pagination component - root container.
 * Matches shadcn/ui React Pagination exactly.
 *
 * @example
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 */
@Component({
  selector: 'Pagination',
  template: `<ng-content />`,
  host: {
    role: 'navigation',
    '[attr.aria-label]': '"pagination"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mx-auto flex w-full justify-center', this.class())
  );
}
