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
 * AccordionTrigger component - clickable header that toggles content.
 * Implements proper ARIA pattern for accordion triggers.
 *
 * @example
 * <AccordionTrigger>Click to expand</AccordionTrigger>
 */
@Component({
  selector: 'AccordionTrigger',
  template: `
    <span class="me-2"><ng-content /></span>
    <svg
      class="size-4 shrink-0 ms-auto text-muted-foreground transition-transform duration-200"
      [class.rotate-180]="item.isOpen()"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'item.triggerId',
    '[attr.data-state]': 'item.isOpen() ? "open" : "closed"',
    '[attr.aria-expanded]': 'item.isOpen()',
    '[attr.aria-controls]': 'item.contentId',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onSpace($event)',
    '[attr.tabindex]': '0',
    'role': 'button',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTrigger {
  protected readonly item = inject(ACCORDION_ITEM_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180 cursor-pointer w-full',
      this.class()
    )
  );

  protected onClick(): void {
    this.item.toggle();
  }

  protected onSpace(event: Event): void {
    event.preventDefault();
    this.item.toggle();
  }
}
