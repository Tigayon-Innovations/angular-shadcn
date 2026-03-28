import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { Check, LucideAngularModule } from 'lucide-angular';
import { CONTEXT_MENU_CONTEXT } from './context-menu-context';

/**
 * ContextMenuCheckboxItem component - a checkbox item in the context menu.
 * Matches shadcn/ui React ContextMenuCheckboxItem exactly.
 */
@Component({
  selector: 'ContextMenuCheckboxItem',
  imports: [LucideAngularModule],
  template: `
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      @if (checked()) {
        <lucide-icon [img]="CheckIcon" class="h-4 w-4" />
      }
    </span>
    <ng-content />
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"menuitemcheckbox"',
    '[attr.aria-checked]': 'checked()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuCheckboxItem {
  private readonly context = inject(CONTEXT_MENU_CONTEXT);
  protected readonly CheckIcon = Check;

  /** Whether the checkbox is checked */
  readonly checked = model<boolean>(false);

  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Checked change event */
  readonly onCheckedChange = output<boolean>();

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      !this.disabled() && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
      this.class(),
    ),
  );

  protected handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onCheckedChange.emit(newValue);
  }
}
