import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
} from '@angular/core';
import { DROPDOWN_MENU_CONTEXT } from './dropdown-menu-context';

/**
 * DropdownMenuContent component - the content panel of the dropdown.
 * Matches shadcn/ui React DropdownMenuContent exactly.
 */
@Component({
  selector: 'DropdownMenuContent',
  template: `
    @if (context.open()) {
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
export class DropdownMenuContent {
  protected readonly context = inject(DROPDOWN_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef);

  /** Side of the trigger to place content */
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('bottom');

  /** Alignment of the content */
  readonly align = input<'start' | 'center' | 'end'>('start');

  /** Side offset */
  readonly sideOffset = input<number>(4);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const sideClasses = {
      top: 'bottom-full mb-1',
      bottom: 'top-full mt-1',
      left: 'right-full mr-1',
      right: 'left-full ml-1',
    };

    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return cn(
      'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sideClasses[this.side()],
      alignClasses[this.align()],
      this.class()
    );
  });

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;
    const parent = hostElement.closest('DropdownMenu');

    if (parent && !parent.contains(target)) {
      this.context.open.set(false);
    }
  }

  protected onEscapeKey(): void {
    this.context.open.set(false);
  }
}
