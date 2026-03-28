import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * BreadcrumbSeparator component - visual separator.
 * Matches shadcn/ui React BreadcrumbSeparator exactly.
 */
@Component({
  selector: 'BreadcrumbSeparator',
  template: `
    <ng-content>
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
        class="h-3.5 w-3.5"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </ng-content>
  `,
  host: {
    role: 'presentation',
    '[attr.aria-hidden]': '"true"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('[&>svg]:h-3.5 [&>svg]:w-3.5', this.class()),
  );
}
