import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';
import { DROPDOWN_MENU_SUB_CONTEXT } from './dropdown-menu-sub.component';

/**
 * DropdownMenuSubTrigger component - trigger for submenu.
 * Matches shadcn/ui React DropdownMenuSubTrigger exactly.
 */
@Component({
  selector: 'DropdownMenuSubTrigger',
  imports: [LucideAngularModule],
  template: `
    <ng-content />
    <lucide-icon [img]="ChevronRightIcon" class="ml-auto h-4 w-4" />
  `,
  host: {
    'attr.data-slot': '"dropdown-menu-sub-trigger"',
    '[class]': 'computedClass()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(keydown)': 'onKeyDown($event)',
    '[attr.data-state]': 'subContext.open() ? "open" : "closed"',
    'role': 'menuitem',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'subContext.open()',
    '[attr.tabindex]': '"-1"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuSubTrigger {
  /** Whether the trigger is inset (extra padding) */
  readonly inset = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly subContext = inject(DROPDOWN_MENU_SUB_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&>svg]:size-4 [&>svg]:shrink-0 [&>lucide-icon]:size-4 [&>lucide-icon]:shrink-0',
      this.inset() && 'pl-8',
      this.class(),
    ),
  );

  protected readonly ChevronRightIcon = ChevronRight;

  protected onMouseEnter(): void {
    this.subContext.open.set(true);
  }
  protected onMouseLeave(): void {
    setTimeout(() => {
      if (!this.subContext.isMouseInSubContent()) {
        this.subContext.open.set(false);
      }
    }, 100);
  }
  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.subContext.open.set(true);
      // Focus first focusable item in sub-content after it renders
      setTimeout(() => {
        const subContent = (event.target as HTMLElement)
          .closest('DropdownMenuSub')
          ?.querySelector<HTMLElement>('[role="menu"] [role="menuitem"]:not([aria-disabled="true"]):not([data-disabled=""])');
        if (subContent) {
          subContent.focus();
        }
      }, 10);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.subContext.open.set(false);
    }
  }
}
