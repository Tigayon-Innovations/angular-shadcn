import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * BreadcrumbEllipsis component - shows more items indicator.
 * Matches shadcn/ui React BreadcrumbEllipsis exactly.
 */
@Component({
  selector: 'BreadcrumbEllipsis',
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
    <span class="sr-only">More</span>
  `,
  host: {
    role: 'presentation',
    '[attr.aria-hidden]': '"true"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbEllipsis {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex h-9 w-9 items-center justify-center', this.class())
  );
}
