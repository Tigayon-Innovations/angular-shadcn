import { cn, Presence } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DROPDOWN_MENU_SUB_CONTEXT } from './dropdown-menu-sub.component';

/**
 * DropdownMenuSubContent component - content panel for submenu.
 * Matches shadcn/ui React DropdownMenuSubContent exactly.
 */
@Component({
  selector: 'DropdownMenuSubContent',
  imports: [Presence],
  template: `
    <Presence [present]="subContext.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="subContext.open() ? 'open' : 'closed'"
        role="menu"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuSubContent {
  protected readonly subContext = inject(DROPDOWN_MENU_SUB_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute left-full top-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      this.class(),
    ),
  );

  protected onMouseEnter(): void {
    this.subContext.open.set(true);
  }

  protected onMouseLeave(): void {
    this.subContext.open.set(false);
  }
}
