import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox-context';

/**
 * ComboboxTrigger component - button that opens the combobox.
 * Implements WAI-ARIA combobox trigger pattern.
 */
@Component({
  selector: 'ComboboxTrigger',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'combobox',
    '[attr.id]': 'context.id + "-trigger"',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-controls]': 'context.listboxId',
    '[attr.aria-activedescendant]': 'context.open() ? context.activeDescendantId() : null',
    '[attr.tabindex]': '0',
    '(click)': 'onClick()',
    '(keydown)': 'onKeyDown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxTrigger {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      this.class()
    )
  );

  protected onClick(): void {
    this.context.onOpenChange(!this.context.open());
  }

  protected onKeyDown(event: KeyboardEvent): void {
    // Let the main combobox handle most keyboard events
    this.context.onKeyDown(event);
  }
}
