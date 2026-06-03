import { cn, Presence } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MENUBAR_SUB_CONTEXT } from './menubar-sub.component';

/**
 * MenubarSubContent component - content panel for submenu.
 * Matches shadcn/ui React MenubarSubContent exactly.
 */
@Component({
  selector: 'MenubarSubContent',
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
    'attr.data-slot': '"menubar-sub-content"',
    class: 'contents',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarSubContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly subContext = inject(MENUBAR_SUB_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'absolute left-full top-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
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
