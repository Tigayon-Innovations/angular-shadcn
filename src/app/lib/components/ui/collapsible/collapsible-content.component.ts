import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { COLLAPSIBLE_CONTEXT } from './collapsible-context';

/**
 * CollapsibleContent component - content that is shown/hidden.
 *
 * @example
 * <CollapsibleContent>
 *   <p>Content that can be collapsed</p>
 * </CollapsibleContent>
 */
@Component({
  selector: 'CollapsibleContent',
  template: `
    @if (collapsible.isOpen()) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'collapsible.isOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'collapsible.disabled() ? "" : null',
    '[attr.aria-hidden]': '!collapsible.isOpen()',
    '[attr.hidden]': '!collapsible.isOpen() ? true : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleContent {
  protected readonly collapsible = inject(COLLAPSIBLE_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'overflow-hidden',
      'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      this.class()
    )
  );
}
