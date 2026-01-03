import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import {
  ACCORDION_CONTEXT,
  ACCORDION_ITEM_CONTEXT,
  AccordionItemContext,
} from './accordion-context';

/**
 * AccordionItem component - wrapper for each accordion section.
 *
 * @example
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Title</AccordionTrigger>
 *   <AccordionContent>Content</AccordionContent>
 * </AccordionItem>
 */
@Component({
  selector: 'AccordionItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
  providers: [
    {
      provide: ACCORDION_ITEM_CONTEXT,
      useExisting: forwardRef(() => AccordionItem),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItem implements AccordionItemContext {
  private readonly accordion = inject(ACCORDION_CONTEXT);

  /** Unique value for this accordion item */
  readonly value = input.required<string>();

  /** Additional CSS classes */
  readonly className = input<string>('');

  /** Whether this item is currently open */
  readonly isOpen = computed(() => this.accordion.isItemOpen(this.value()));

  /** Toggle this item's open state */
  toggle(): void {
    this.accordion.onValueChange(this.value());
  }

  protected readonly computedClass = computed(() => cn('border-b', this.className()));
}
