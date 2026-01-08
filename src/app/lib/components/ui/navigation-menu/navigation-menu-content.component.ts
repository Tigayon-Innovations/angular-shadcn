import { cn, Presence } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core';
import { NAVIGATION_MENU_CONTEXT, NAVIGATION_MENU_ITEM_CONTEXT } from './navigation-menu-context';

/**
 * NavigationMenuContent component - content panel.
 * Matches shadcn/ui React NavigationMenuContent exactly.
 */
@Component({
  selector: 'NavigationMenuContent',
  imports: [Presence],
  template: `
    <Presence [present]="itemContext.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="itemContext.open() ? 'open' : 'closed'"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscapeKey()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuContent {
  protected readonly context = inject(NAVIGATION_MENU_CONTEXT);
  protected readonly itemContext = inject(NAVIGATION_MENU_ITEM_CONTEXT);
  private readonly elementRef = inject(ElementRef);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute left-0 top-full mt-2 w-full rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
      'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
      'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
      'md:absolute md:w-auto',
      this.class()
    )
  );

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;
    const parent = hostElement.closest('NavigationMenuItem');

    if (parent && !parent.contains(target)) {
      this.itemContext.open.set(false);
      this.context.activeItem.set(null);
    }
  }

  protected onEscapeKey(): void {
    this.itemContext.open.set(false);
    this.context.activeItem.set(null);
  }
}
