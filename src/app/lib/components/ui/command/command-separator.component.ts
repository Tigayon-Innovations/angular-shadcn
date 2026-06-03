import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * CommandSeparator component - a separator between groups.
 * Matches shadcn/ui React CommandSeparator exactly.
 */
@Component({
  selector: 'CommandSeparator',
  template: ``,
  host: {
    'attr.data-slot': '"command-separator"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('-mx-1 h-px bg-border', this.class()));
}
