import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input
} from '@angular/core';
import { POPOVER_CONTEXT } from './popover-context';

/**
 * PopoverContent component - the content displayed in the popover.
 * Matches shadcn/ui React PopoverContent exactly.
 */
@Component({
  selector: 'PopoverContent',
  template: `
    @if (context.open()) {
      <div [class]="computedClass()" role="dialog">
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
export class PopoverContent {
  protected readonly context = inject(POPOVER_CONTEXT);
  private readonly elementRef = inject(ElementRef);

  /** Side of the trigger to place popover */
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('bottom');

  /** Side offset */
  readonly sideOffset = input<number>(4);

  /** Alignment of the popover */
  readonly align = input<'start' | 'center' | 'end'>('center');

  /** Align offset */
  readonly alignOffset = input<number>(0);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const sideClasses = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
      right: 'left-full ml-2',
    };

    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return cn(
      'absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sideClasses[this.side()],
      this.side() === 'top' || this.side() === 'bottom' ? alignClasses[this.align()] : '',
      this.class()
    );
  });

  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      // Check if click is outside the popover
      const popoverContent = this.elementRef.nativeElement.querySelector('[role="dialog"]');
      if (popoverContent && !popoverContent.contains(target)) {
        this.context.setOpen(false);
      }
    }
  }

  onEscapeKey(): void {
    this.context.setOpen(false);
  }
}
