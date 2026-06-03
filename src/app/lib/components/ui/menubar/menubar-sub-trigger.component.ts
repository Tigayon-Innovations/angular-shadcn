import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';
import { MENUBAR_SUB_CONTEXT } from './menubar-sub.component';

/**
 * MenubarSubTrigger component - trigger for submenu.
 * Matches shadcn/ui React MenubarSubTrigger exactly.
 */
@Component({
  selector: 'MenubarSubTrigger',
  imports: [LucideAngularModule],
  template: `
    <ng-content />
    <lucide-icon [img]="ChevronRightIcon" class="ml-auto h-4 w-4" />
  `,
  host: {
    'attr.data-slot': '"menubar-sub-trigger"',
    '[class]': 'computedClass()',
    '[attr.data-state]': 'subContext.open() ? "open" : "closed"',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarSubTrigger {
  /** Whether the trigger is inset */
  readonly inset = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly subContext = inject(MENUBAR_SUB_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      this.inset() && 'pl-8',
      this.class(),
    ),
  );

  protected readonly ChevronRightIcon = ChevronRight;

  protected onMouseEnter(): void {
    this.subContext.open.set(true);
  }
  protected onMouseLeave(): void {
    // Keep open for mouse to move to sub-content
  }
}
