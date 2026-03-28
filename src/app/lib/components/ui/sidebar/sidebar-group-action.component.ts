import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarGroupAction component - action button for a sidebar group.
 */
@Component({
  selector: 'SidebarGroupAction',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group-action',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupAction {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'after:absolute after:-inset-2 after:md:hidden',
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      this.class(),
    ),
  );
}
