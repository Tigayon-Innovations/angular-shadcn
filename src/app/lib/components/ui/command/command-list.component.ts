import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { COMMAND_CONTEXT } from './command-context';

/**
 * CommandList component - the scrollable list of items.
 * Matches shadcn/ui React CommandList exactly.
 * Implements listbox role for accessibility.
 */
@Component({
  selector: 'CommandList',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'context.listId',
    'role': 'listbox',
    '[attr.aria-label]': '"Command suggestions"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandList {
  protected readonly context = inject(COMMAND_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('max-h-[300px] overflow-y-auto overflow-x-hidden', this.class())
  );
}
