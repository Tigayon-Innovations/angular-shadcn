import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SidebarHeader component - header section of sidebar.
 */
@Component({
  selector: 'SidebarHeader',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarHeader {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-2 p-2', this.class())
  );
}
