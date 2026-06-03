import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Circle, LucideAngularModule } from 'lucide-angular';
import { CONTEXT_MENU_CONTEXT } from './context-menu-context';
import { CONTEXT_MENU_RADIO_GROUP_CONTEXT } from './context-menu-radio-group.component';

/**
 * ContextMenuRadioItem component - a radio item in the context menu.
 * Matches shadcn/ui React ContextMenuRadioItem exactly.
 */
@Component({
  selector: 'ContextMenuRadioItem',
  imports: [LucideAngularModule],
  template: `
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      @if (isSelected()) {
        <lucide-icon [img]="CircleIcon" class="h-2 w-2 fill-current" />
      }
    </span>
    <ng-content />
  `,
  host: {
    'attr.data-slot': '"context-menu-radio-item"',
    '[class]': 'computedClass()',
    '[attr.role]': '"menuitemradio"',
    '[attr.aria-checked]': 'isSelected()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-state]': 'isSelected() ? "checked" : "unchecked"',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuRadioItem {
  /** Select event emitted when item is clicked */
  readonly onSelect = output<void>();

  /** The value of this radio item */
  readonly value = input.required<string>();

  /** Additional CSS classes */
  readonly class = input<string>('');
  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);

  private readonly _context = inject(CONTEXT_MENU_CONTEXT);
  private readonly _radioGroupContext = inject(CONTEXT_MENU_RADIO_GROUP_CONTEXT);

  protected readonly isSelected = computed(() => this._radioGroupContext.value() === this.value());
  protected readonly computedClass = computed(() =>
    cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      !this.disabled() && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
      this.class(),
    ),
  );

  protected readonly CircleIcon = Circle;

  protected handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this._radioGroupContext.setValue(this.value());
    this.onSelect.emit();
  }
}
