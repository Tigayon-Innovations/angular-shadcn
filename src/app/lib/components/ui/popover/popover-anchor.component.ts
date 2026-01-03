import {
    ChangeDetectionStrategy,
    Component,
    input,
} from '@angular/core';

/**
 * PopoverAnchor component - an optional anchor for positioning.
 * Matches shadcn/ui React PopoverAnchor exactly.
 */
@Component({
  selector: 'PopoverAnchor',
  template: `<ng-content />`,
  host: {
    class: 'inline-block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverAnchor {
  /** Render as child */
  readonly asChild = input<boolean>(false);
}
