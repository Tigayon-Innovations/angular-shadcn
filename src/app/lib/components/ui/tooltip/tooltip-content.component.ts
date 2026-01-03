import { cn } from '@/lib/utils';
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
 */
@Component({
  selector: 'TooltipContent',
  template: `
    @if (context.open()) {
      <div [class]="computedClass()" role="tooltip" id="tooltip-content">
        <ng-content />
      </div>
    }
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
      'absolute z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      sideClasses[this.side()],
      this.class()
    );
  });
}
