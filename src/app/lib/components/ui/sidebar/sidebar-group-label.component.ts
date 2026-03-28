import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarGroupLabel component - label for a sidebar group.
 */
@Component({
  selector: 'SidebarGroupLabel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group-label',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupLabel {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'group-data-[collapsible=icon]/sidebar-wrapper:-mt-8 group-data-[collapsible=icon]/sidebar-wrapper:opacity-0',
      this.class(),
    ),
  );
}
