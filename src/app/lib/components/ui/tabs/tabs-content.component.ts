import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { TABS_CONTEXT } from './tabs-context';

/**
 * TabsContent component - content panel for a tab.
 *
 * @example
 * <TabsContent value="account">
 *   <p>Account settings content here</p>
 * </TabsContent>
 */
@Component({
  selector: 'TabsContent',
  template: `
    @if (isActive()) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
    '[attr.aria-hidden]': '!isActive()',
    '[attr.hidden]': '!isActive() ? true : null',
    'role': 'tabpanel',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsContent {
  protected readonly tabs = inject(TABS_CONTEXT);

  /** The value that identifies which tab this content belongs to */
  readonly value = input.required<string>();

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Check if this content should be visible */
  protected readonly isActive = computed(() => this.tabs.value() === this.value());

  protected readonly computedClass = computed(() =>
    cn(
      'flex-1 outline-none',
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'mt-2',
      this.class()
    )
  );
}
