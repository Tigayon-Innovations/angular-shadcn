import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { NAVIGATION_MENU_CONTEXT, NAVIGATION_MENU_ITEM_CONTEXT } from './navigation-menu-context';
import { navigationMenuTriggerStyle } from './navigation-menu-trigger-style';

/**
 * NavigationMenuTrigger component - trigger for menu content.
 * Matches shadcn/ui React NavigationMenuTrigger exactly.
 */
@Component({
  selector: 'NavigationMenuTrigger',
  imports: [LucideAngularModule],
  template: `
    <ng-content />
    <lucide-icon
      [img]="ChevronDownIcon"
      class="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'itemContext.open() ? "open" : "closed"',
    '(click)': 'toggle()',
    '(mouseenter)': 'onMouseEnter()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuTrigger {
  protected readonly context = inject(NAVIGATION_MENU_CONTEXT);
  protected readonly itemContext = inject(NAVIGATION_MENU_ITEM_CONTEXT);
  protected readonly ChevronDownIcon = ChevronDown;

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(navigationMenuTriggerStyle(), 'group', this.class()),
  );

  protected toggle(): void {
    this.itemContext.open.update((v) => !v);
    if (this.itemContext.open()) {
      this.context.activeItem.set(this.itemContext.itemId);
    } else {
      this.context.activeItem.set(null);
    }
  }

  protected onMouseEnter(): void {
    const activeItem = this.context.activeItem();
    if (activeItem && activeItem !== this.itemContext.itemId) {
      this.context.activeItem.set(this.itemContext.itemId);
      this.itemContext.open.set(true);
    }
  }
}
