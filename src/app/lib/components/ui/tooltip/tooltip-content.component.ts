import { cn, Presence } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { TOOLTIP_CONTEXT } from './tooltip-context';

/**
 * TooltipContent component - the content displayed in the tooltip.
 * Matches shadcn/ui React TooltipContent exactly.
 * Uses Presence component for proper exit animations.
 */
@Component({
  selector: 'TooltipContent',
  imports: [Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        [attr.data-side]="side()"
        [attr.data-align]="align()"
        role="tooltip"
        [id]="context.tooltipId"
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
export class TooltipContent {
  protected readonly context = inject(TOOLTIP_CONTEXT);

  /** Side of the trigger to place tooltip */
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('top');

  /** Side offset */
  readonly sideOffset = input<number>(4);

  /** Alignment of the tooltip */
  readonly align = input<'start' | 'center' | 'end'>('center');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const sideClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return cn(
      'absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sideClasses[this.side()],
      this.class()
    );
  });
}
