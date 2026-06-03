import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { COLLAPSIBLE_CONTEXT } from './collapsible-context';

/**
 * CollapsibleTrigger component - clickable element that toggles content.
 *
 * @example
 * <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
 */
@Component({
  selector: 'CollapsibleTrigger',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"collapsible-trigger"',
    '[class]': 'computedClass()',
    '[attr.data-state]': 'collapsible.isOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'collapsible.disabled() ? "" : null',
    '[attr.aria-expanded]': 'collapsible.isOpen()',
    '[attr.disabled]': 'collapsible.disabled() ? true : null',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onSpace($event)',
    '[attr.tabindex]': 'collapsible.disabled() ? -1 : 0',
    role: 'button',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleTrigger {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly collapsible = inject(COLLAPSIBLE_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn('cursor-pointer', 'disabled:pointer-events-none disabled:opacity-50', this.class()),
  );

  protected onClick(): void {
    this.collapsible.toggle();
  }
  protected onSpace(event: Event): void {
    event.preventDefault();
    this.onClick();
  }
}
