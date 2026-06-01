import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ACCORDION_ITEM_CONTEXT } from './accordion-context';

/**
 * AccordionContent component - expandable content area.
 * Uses CSS grid animation (grid-template-rows: 0fr → 1fr) for smooth open/close.
 * Content is always in the DOM; visibility is controlled by the grid row height.
 *
 * @example
 * <AccordionContent>
 *   <p>Your content here</p>
 * </AccordionContent>
 */
@Component({
  selector: 'AccordionContent',
  template: `
    <div [class]="innerClass()">
      <ng-content />
    </div>
  `,
  host: {
    'attr.data-slot': '"accordion-content"',
    role: 'region',
    '[class]': 'computedClass()',
    '[attr.id]': 'item.contentId',
    '[attr.data-state]': 'item.isOpen() ? "open" : "closed"',
    '[attr.aria-labelledby]': 'item.triggerId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly item = inject(ACCORDION_ITEM_CONTEXT);

  // No overflow-hidden on the host — grid-template-rows handles expansion.
  // Global CSS ([data-slot='accordion-content'] > div { overflow: hidden }) clips the inner div.
  protected readonly computedClass = computed(() => cn('text-sm', this.class()));

  protected readonly innerClass = computed(() =>
    cn('pb-4 pt-2 px-1 text-muted-foreground leading-relaxed'),
  );
}
