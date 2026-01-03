import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarContent component - main content area of sidebar.
 */
@Component({
  selector: 'SidebarContent',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]/sidebar-wrapper:overflow-hidden',
      this.class()
    )
  );
}
