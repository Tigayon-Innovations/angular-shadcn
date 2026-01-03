import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core';
import { MENUBAR_CONTEXT, MENUBAR_MENU_CONTEXT } from './menubar-context';

/**
 * MenubarContent component - content panel for a menu.
 * Matches shadcn/ui React MenubarContent exactly.
 */
@Component({
  selector: 'MenubarContent',
  template: `
    @if (menuContext.open()) {
      <div [class]="computedClass()" role="menu" aria-orientation="vertical">
        <ng-content />
      </div>
    }
  `,
  host: {
    class: 'contents',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscapeKey()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarContent {
  protected readonly context = inject(MENUBAR_CONTEXT);
  protected readonly menuContext = inject(MENUBAR_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef);

  /** Alignment */
  readonly align = input<'start' | 'center' | 'end'>('start');

  /** Side offset */
  readonly sideOffset = input<number>(8);

  /** Align offset */
  readonly alignOffset = input<number>(-4);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return cn(
      'absolute top-full z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      alignClasses[this.align()],
      this.class()
    );
  });

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;
    const parent = hostElement.closest('MenubarMenu');

    if (parent && !parent.contains(target)) {
      this.menuContext.open.set(false);
      this.context.activeMenu.set(null);
    }
  }

  protected onEscapeKey(): void {
    this.menuContext.open.set(false);
    this.context.activeMenu.set(null);
  }
}
