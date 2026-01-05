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

  protected readonly computedClass = computed(() => cn('w-full', this.class()));
}
