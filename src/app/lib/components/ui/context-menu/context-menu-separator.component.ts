import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ContextMenuSeparator component - a separator line in the context menu.
 * Matches shadcn/ui React ContextMenuSeparator exactly.
 */
@Component({
  selector: 'ContextMenuSeparator',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"separator"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('-mx-1 my-1 h-px bg-border', this.class())
  );
}
