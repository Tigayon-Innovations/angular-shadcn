import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarInput component - input field for sidebar.
 */
@Component({
  selector: 'SidebarInput',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'input',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarInput {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
      this.class(),
    ),
  );
}
