import { cn } from '@/lib/utils';
import { AriaIdService } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ACCORDION_CONTEXT,
  ACCORDION_ITEM_CONTEXT,
  AccordionItemContext,
} from './accordion-context';

/**
 * AccordionItem component - wrapper for each accordion section.
 * Provides proper ARIA relationships between trigger and content.
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
    '[attr.data-value]': 'value()',
  },
  providers: [
    {
      provide: ACCORDION_ITEM_CONTEXT,
      useExisting: forwardRef(() => AccordionItem),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItem implements AccordionItemContext, OnInit, OnDestroy {
  /** Unique value for this accordion item */
  readonly value = input.required<string>();

  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _accordion = inject(ACCORDION_CONTEXT);
  private readonly _ariaIdService = inject(AriaIdService);

  /** Whether this item is currently open */
  readonly isOpen = computed(() => this._accordion.isItemOpen(this.value()));
  protected readonly computedClass = computed(() => cn('border-b w-full', this.class()));

  private readonly ariaIds = this._ariaIdService.generateAccordionIds('accordion');
  /** ARIA IDs for relationships */
  readonly triggerId = this.ariaIds.generateTriggerId();
  readonly contentId = this.ariaIds.generateContentId(0);

  ngOnInit(): void {
    // Register this item's value for keyboard navigation
    this._accordion.itemValues.update((values) => {
      if (!values.includes(this.value())) {
        return [...values, this.value()];
      }
      return values;
    });
  }
  ngOnDestroy(): void {
    // Unregister this item's value
    this._accordion.itemValues.update((values) => values.filter((v) => v !== this.value()));
  }

  /** Toggle this item's open state */
  toggle(): void {
    this._accordion.onValueChange(this.value());
  }
}
