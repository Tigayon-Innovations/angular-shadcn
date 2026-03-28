import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SidebarGroupContent component - content wrapper for sidebar group.
 */
@Component({
  selector: 'SidebarGroupContent',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('w-full text-sm', this.class()));
}
