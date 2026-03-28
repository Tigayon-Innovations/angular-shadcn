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
    '[class]': 'computedClass()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '[attr.data-state]': 'subContext.open() ? "open" : "closed"',
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
      'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&>svg]:size-4 [&>svg]:shrink-0',
      this.inset() && 'pl-8',
      this.class(),
    ),
  );

  protected readonly ChevronRightIcon = ChevronRight;

  protected onMouseEnter(): void {
    this.subContext.open.set(true);
  }
  protected onMouseLeave(): void {
    // Delay closing to allow mouse to move to sub-content
    setTimeout(() => {
      // Check if mouse is still outside both trigger and content
    }, 100);
  }
}
