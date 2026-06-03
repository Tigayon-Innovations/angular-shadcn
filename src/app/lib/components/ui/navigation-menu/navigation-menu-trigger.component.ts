import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
    'attr.data-slot': '"navigation-menu-trigger"',
    '[class]': 'computedClass()',
    '[attr.id]': 'itemContext.triggerId',
    '[attr.data-state]': 'itemContext.open() ? "open" : "closed"',
    '[attr.role]': '"button"',
    '[attr.aria-expanded]': 'itemContext.open()',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-controls]': 'itemContext.contentId',
    '(click)': 'toggle()',
    '(mouseenter)': 'onMouseEnter()',
    '(keydown)': 'onKeyDown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuTrigger implements OnInit, OnDestroy {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(NAVIGATION_MENU_CONTEXT);
  protected readonly itemContext = inject(NAVIGATION_MENU_ITEM_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(navigationMenuTriggerStyle(), 'group', this.class()),
  );

  protected readonly ChevronDownIcon = ChevronDown;

  ngOnInit(): void {
    this.context.registerTrigger(this.itemContext.triggerId);
  }

  ngOnDestroy(): void {
    this.context.unregisterTrigger(this.itemContext.triggerId);
  }

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

  protected onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        if (this.itemContext.open()) {
          this.focusFirstContentItem();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.itemContext.open()) {
          this.itemContext.open.set(true);
          this.context.activeItem.set(this.itemContext.itemId);
        }
        this.focusFirstContentItem();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.context.focusNextTrigger(this.itemContext.triggerId);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.context.focusPreviousTrigger(this.itemContext.triggerId);
        break;
      case 'Escape':
        if (this.itemContext.open()) {
          this.itemContext.open.set(false);
          this.context.activeItem.set(null);
          document.getElementById(this.itemContext.triggerId)?.focus();
        }
        break;
    }
  }

  private focusFirstContentItem(): void {
    setTimeout(() => {
      const content = document.getElementById(this.itemContext.contentId);
      const focusable = content?.querySelector<HTMLElement>('a, button, [tabindex]');
      focusable?.focus();
    }, 10);
  }
}
