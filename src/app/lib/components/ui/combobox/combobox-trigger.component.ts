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
 */
@Component({
  selector: 'ComboboxTrigger',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'combobox',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"listbox"',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onClick(); $event.preventDefault()',
    '(keydown.arrowdown)': 'onArrowDown($event)',
    '(keydown.arrowup)': 'onArrowUp($event)',
    '(keydown.escape)': 'onEscape()',
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

  protected onArrowDown(event: Event): void {
    event.preventDefault();
    if (!this.context.open()) {
      this.context.onOpenChange(true);
    }
  }

  protected onArrowUp(event: Event): void {
    event.preventDefault();
    if (!this.context.open()) {
      this.context.onOpenChange(true);
    }
  }

  protected onEscape(): void {
    this.context.onOpenChange(false);
  }
}
