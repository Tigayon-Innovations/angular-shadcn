import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ACCORDION_ITEM_CONTEXT } from './accordion-context';

/**
 * AccordionContent component - expandable content area.
 *
 * @example
 * <AccordionContent>
 *   <p>Your content here</p>
 * </AccordionContent>
 */
@Component({
  selector: 'AccordionContent',
  template: `
    @if (item.isOpen()) {
      <div [class]="innerClass()">
        <ng-content />
      </div>
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'item.isOpen() ? "open" : "closed"',
    '[attr.aria-hidden]': '!item.isOpen()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionContent {
  protected readonly item = inject(ACCORDION_ITEM_CONTEXT);

  /** Additional CSS classes */
  readonly className = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      this.item.isOpen() ? 'animate-accordion-down' : 'animate-accordion-up'
    )
  );

  protected readonly innerClass = computed(() => cn('pb-4 pt-0', this.className()));
}
