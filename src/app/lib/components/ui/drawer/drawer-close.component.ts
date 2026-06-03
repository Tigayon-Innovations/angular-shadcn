import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DRAWER_CONTEXT } from './drawer-context';

/**
 * DrawerClose component - button that closes the drawer.
 * Matches shadcn/ui React DrawerClose exactly.
 */
@Component({
  selector: 'DrawerClose',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"drawer-close"',
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerClose {
  /** Render as child */
  readonly asChild = input<boolean>(false);

  protected readonly context = inject(DRAWER_CONTEXT);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }
}
