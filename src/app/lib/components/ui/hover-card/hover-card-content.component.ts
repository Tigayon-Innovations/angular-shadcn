import { cn, Presence } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { HOVER_CARD_CONTEXT } from './hover-card-context';

/**
 * HoverCardContent component - the content displayed in the hover card.
 * Matches shadcn/ui React HoverCardContent exactly.
 */
@Component({
  selector: 'HoverCardContent',
  imports: [Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        [attr.data-side]="side()"
        [attr.data-align]="align()"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCardContent {
  protected readonly context = inject(HOVER_CARD_CONTEXT);

  /** Side of the trigger to place card */
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('bottom');

  /** Side offset */
  readonly sideOffset = input<number>(4);

  /** Alignment of the card */
  readonly align = input<'start' | 'center' | 'end'>('center');

  /** Additional CSS classes */
  readonly class = input<string>('');

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

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
      'absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
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

  onMouseEnter(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  onMouseLeave(): void {
    this.closeTimeout = setTimeout(() => {
      this.context.setOpen(false);
    }, this.context.closeDelay);
  }
}
