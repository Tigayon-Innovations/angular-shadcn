import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { buttonVariants } from '../button/button-variants';

/**
 * PaginationPrevious component - previous page link.
 * Matches shadcn/ui React PaginationPrevious exactly.
 */
@Component({
  selector: 'PaginationPrevious',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
    <span>Previous</span>
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.href]': 'href()',
    '[attr.aria-label]': '"Go to previous page"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPrevious {
  /** Link href */
  readonly href = input<string>('#');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'gap-1 pl-2.5', this.class()),
  );
}
