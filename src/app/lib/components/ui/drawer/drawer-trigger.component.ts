import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { DRAWER_CONTEXT } from './drawer-context';

/**
 * DrawerTrigger component - element that opens the drawer.
 * Matches shadcn/ui React DrawerTrigger exactly.
 */
@Component({
  selector: 'DrawerTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTrigger {
  protected readonly context = inject(DRAWER_CONTEXT);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(true);
  }
}
