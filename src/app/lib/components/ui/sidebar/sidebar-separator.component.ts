import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarSeparator component - separator line in sidebar.
 */
@Component({
  selector: 'SidebarSeparator',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'separator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mx-2 w-auto bg-sidebar-border', this.class()),
  );
}
