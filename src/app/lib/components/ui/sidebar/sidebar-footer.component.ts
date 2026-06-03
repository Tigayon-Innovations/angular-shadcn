import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarFooter component - footer section of sidebar.
 */
@Component({
  selector: 'SidebarFooter',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"sidebar-footer"',
    '[class]': 'computedClass()',
    'data-sidebar': 'footer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFooter {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('flex flex-col gap-2 p-2', this.class()));
}
