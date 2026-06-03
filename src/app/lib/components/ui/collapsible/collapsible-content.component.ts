import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
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
    <div [class]="innerClass()">
      <ng-content />
    </div>
  `,
  host: {
    'attr.data-slot': '"collapsible-content"',
    '[class]': 'computedClass()',
    '[attr.data-state]': 'collapsible.isOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'collapsible.disabled() ? "" : null',
    '[attr.aria-hidden]': '!collapsible.isOpen()',
  },
  styles: [
    `
      :host {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 200ms ease-out;
      }
      :host[data-state='open'] {
        grid-template-rows: 1fr;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly collapsible = inject(COLLAPSIBLE_CONTEXT);

  protected readonly computedClass = computed(() => cn('overflow-hidden', this.class()));
  protected readonly innerClass = computed(() => 'min-h-0');
}
