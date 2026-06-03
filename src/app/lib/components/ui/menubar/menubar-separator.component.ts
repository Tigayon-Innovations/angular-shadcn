import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * MenubarSeparator component - separator between menu items.
 * Matches shadcn/ui React MenubarSeparator exactly.
 */
@Component({
  selector: 'MenubarSeparator',
  template: ``,
  host: {
    'attr.data-slot': '"menubar-separator"',
    '[class]': 'computedClass()',
    '[attr.role]': '"separator"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('-mx-1 my-1 h-px bg-muted', this.class()));
}
