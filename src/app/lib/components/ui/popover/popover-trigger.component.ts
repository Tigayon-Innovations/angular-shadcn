import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { POPOVER_CONTEXT } from './popover-context';

/**
 * PopoverTrigger component - element that triggers the popover.
 * Matches shadcn/ui React PopoverTrigger exactly.
 */
@Component({
  selector: 'PopoverTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"dialog"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverTrigger {
  protected readonly context = inject(POPOVER_CONTEXT);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.toggle();
  }
}
