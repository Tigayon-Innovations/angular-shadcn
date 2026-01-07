import { cn } from '@/lib/utils';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    forwardRef,
    input,
    signal,
} from '@angular/core';
import {
    ACCORDION_CONTEXT,
    AccordionContext,
    AccordionType,
} from './accordion-context';

/**
 * Accordion component - root container for accordion items.
 * Matches shadcn/ui React Accordion exactly.
 * Includes full keyboard navigation with arrow keys.
 *
 * @example
 * <Accordion type="single" collapsible defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Title</AccordionTrigger>
 *     <AccordionContent>Content here</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */
@Component({
  selector: 'Accordion',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-orientation]': '"vertical"',
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    {
      provide: ACCORDION_CONTEXT,
      useExisting: forwardRef(() => Accordion),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion implements AccordionContext {
  /** Type of accordion: 'single' allows one item open, 'multiple' allows many */
  readonly type = input<AccordionType>('single');

  /** Whether the accordion can be fully collapsed (only for single type) */
  readonly collapsible = input<boolean, unknown>(false, { transform: booleanAttribute });

  /** Default value(s) to be open initially */
  readonly defaultValue = input<string | string[] | undefined>(undefined);

  /** Controlled value - external control of open state */
  readonly controlledValue = input<string | string[] | undefined>(undefined, { alias: 'value' });

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Internal state for open items */
  private readonly openItems = signal<Set<string>>(new Set());

  /** Registry of item values for keyboard navigation */
  readonly itemValues = signal<string[]>([]);

  /** Flag to track if initialized */
  private initialized = false;

  constructor() {
    // Initialize with default value
    effect(() => {
      if (!this.initialized) {
        const defaultVal = this.defaultValue();
        if (defaultVal !== undefined) {
          if (Array.isArray(defaultVal)) {
            this.openItems.set(new Set(defaultVal));
          } else {
            this.openItems.set(new Set([defaultVal]));
          }
        }
        this.initialized = true;
      }
    });
  }

  /** Get current value(s) */
  readonly value = computed(() => {
    const controlled = this.controlledValue();
    if (controlled !== undefined) {
      return controlled;
    }
    const items = this.openItems();
    if (this.type() === 'single') {
      return items.size > 0 ? Array.from(items)[0] : undefined;
    }
    return Array.from(items);
  });

  /** Handle value change from accordion items */
  onValueChange(itemValue: string): void {
    const currentType = this.type();
    const isCollapsible = this.collapsible();

    this.openItems.update((current) => {
      const newSet = new Set(current);

      if (currentType === 'single') {
        if (newSet.has(itemValue)) {
          if (isCollapsible) {
            newSet.delete(itemValue);
          }
        } else {
          newSet.clear();
          newSet.add(itemValue);
        }
      } else {
        // multiple
        if (newSet.has(itemValue)) {
          newSet.delete(itemValue);
        } else {
          newSet.add(itemValue);
        }
      }

      return newSet;
    });
  }

  /** Check if an item is open */
  isItemOpen(itemValue: string): boolean {
    const controlled = this.controlledValue();
    if (controlled !== undefined) {
      if (Array.isArray(controlled)) {
        return controlled.includes(itemValue);
      }
      return controlled === itemValue;
    }
    return this.openItems().has(itemValue);
  }

  /** Handle keyboard navigation */
  onKeydown(event: KeyboardEvent): void {
    const values = this.itemValues();
    if (values.length === 0) return;

    // Find the currently focused trigger
    const activeElement = document.activeElement;
    const currentTrigger = activeElement?.closest('[role="button"][aria-expanded]');
    if (!currentTrigger) return;

    // Find current index by looking at the accordion item
    const accordionItem = currentTrigger.closest('AccordionItem');
    const itemValue = accordionItem?.getAttribute('data-value') ||
                     values.find(v => document.querySelector(`AccordionItem[data-state][data-value="${v}"]`)?.contains(currentTrigger));

    if (!itemValue) return;
    const currentIndex = values.indexOf(itemValue);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    let handled = false;

    switch (event.key) {
      case 'ArrowDown':
        newIndex = currentIndex < values.length - 1 ? currentIndex + 1 : 0;
        handled = true;
        break;
      case 'ArrowUp':
        newIndex = currentIndex > 0 ? currentIndex - 1 : values.length - 1;
        handled = true;
        break;
      case 'Home':
        newIndex = 0;
        handled = true;
        break;
      case 'End':
        newIndex = values.length - 1;
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      // Focus the trigger of the new item
      const newValue = values[newIndex];
      const newTrigger = document.querySelector(
        `AccordionItem[data-value="${newValue}"] AccordionTrigger, [data-accordion-trigger="${newValue}"]`
      ) as HTMLElement;
      newTrigger?.focus();
    }
  }

  protected readonly computedClass = computed(() => cn('w-full', this.class()));
}
