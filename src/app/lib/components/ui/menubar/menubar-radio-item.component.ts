import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Circle, LucideAngularModule } from 'lucide-angular';
import { MENUBAR_RADIO_GROUP_CONTEXT } from './menubar-radio-group.component';

/**
 * MenubarRadioItem component - radio menu item.
 * Matches shadcn/ui React MenubarRadioItem exactly.
 */
@Component({
  selector: 'MenubarRadioItem',
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
    '[class]': 'computedClass()',
    '[attr.role]': '"menuitemradio"',
    '[attr.aria-checked]': 'isSelected()',
    '[attr.data-state]': 'isSelected() ? "checked" : "unchecked"',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarRadioItem {
  private readonly radioGroupContext = inject(MENUBAR_RADIO_GROUP_CONTEXT);
  protected readonly CircleIcon = Circle;

  /** The value of this radio item */
  readonly value = input.required<string>();

  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Select event */
  readonly onSelect = output<void>();

  protected readonly isSelected = computed(() => this.radioGroupContext.value() === this.value());

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
    this.radioGroupContext.setValue(this.value());
    this.onSelect.emit();
  }
}
