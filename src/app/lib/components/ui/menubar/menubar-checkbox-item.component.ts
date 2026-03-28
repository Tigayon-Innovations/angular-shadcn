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
import { MENUBAR_CONTEXT, MENUBAR_MENU_CONTEXT } from './menubar-context';

/**
 * MenubarCheckboxItem component - checkbox menu item.
 * Matches shadcn/ui React MenubarCheckboxItem exactly.
 */
@Component({
  selector: 'MenubarCheckboxItem',
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
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarCheckboxItem {
  /** Checked change event */
  readonly onCheckedChange = output<boolean>();

  /** Whether the checkbox is checked */
  readonly checked = model<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');
  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);

  private readonly _context = inject(MENUBAR_CONTEXT);
  private readonly _menuContext = inject(MENUBAR_MENU_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      !this.disabled() && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
      this.class(),
    ),
  );

  protected readonly CheckIcon = Check;

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
