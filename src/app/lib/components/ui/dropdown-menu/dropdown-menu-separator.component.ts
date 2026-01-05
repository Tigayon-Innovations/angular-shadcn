import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * DropdownMenuSeparator component - a separator line in the dropdown.
 * Matches shadcn/ui React DropdownMenuSeparator exactly.
 */
@Component({
  selector: 'DropdownMenuSeparator',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"separator"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('-mx-2 my-2 h-px bg-border', this.class())
  );
}
