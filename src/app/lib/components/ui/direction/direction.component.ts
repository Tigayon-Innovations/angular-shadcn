import { ChangeDetectionStrategy, Component, effect, forwardRef, input, signal } from '@angular/core';
import {
  DIRECTION_CONTEXT,
  type Direction as DirectionType,
  type DirectionContext,
} from './direction-context';

/**
 * Direction component - provides RTL/LTR direction context to descendants.
 * Equivalent to Radix UI's DirectionProvider.
 *
 * @example
 * <Direction dir="rtl">
 *   <!-- All components inside will be RTL -->
 *   <Select>...</Select>
 * </Direction>
 */
@Component({
  selector: 'Direction',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-slot': '"direction"',
    '[attr.dir]': 'dir()',
    style: 'display: contents',
  },
  providers: [
    {
      provide: DIRECTION_CONTEXT,
      useFactory: (component: Direction) => component.context,
      deps: [forwardRef(() => Direction)],
    },
  ],
})
export class Direction {
  /** Text direction */
  readonly dir = input<DirectionType>('ltr');

  readonly context: DirectionContext = {
    dir: signal<DirectionType>(this.dir()),
  };

  constructor() {
    effect(() => {
      this.context.dir.set(this.dir());
    });
  }
}
