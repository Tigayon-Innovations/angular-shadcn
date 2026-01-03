import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarGroup component - groups sidebar items.
 */
@Component({
  selector: 'SidebarGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroup {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('relative flex w-full min-w-0 flex-col p-2', this.class())
  );
}
