import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    input,
    output,
    signal,
} from '@angular/core';
import { SHEET_CONTEXT, type SheetContextValue } from './sheet-context';

/**
 * Sheet component - a slide-out panel from any edge of the screen.
 * Matches shadcn/ui React Sheet exactly.
 *
 * @example
 * <Sheet>
 *   <SheetTrigger>
 *     <Button variant="outline">Open Sheet</Button>
 *   </SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Sheet Title</SheetTitle>
 *       <SheetDescription>Sheet description.</SheetDescription>
 *     </SheetHeader>
 *     Content here...
 *   </SheetContent>
 * </Sheet>
 */
@Component({
  selector: 'Sheet',
  template: `<ng-content />`,
  providers: [
    {
      provide: SHEET_CONTEXT,
      useExisting: forwardRef(() => Sheet),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sheet implements SheetContextValue {
  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Side from which the sheet appears */
  readonly side: 'top' | 'right' | 'bottom' | 'left' = 'right';

  /** Open change event */
  readonly openChange = output<boolean>();

  readonly open = signal(false);

  constructor() {
    if (this.defaultOpen()) {
      this.open.set(true);
    }
  }

  setOpen(open: boolean): void {
    if (this.controlledOpen() === undefined) {
      this.open.set(open);
    }
    this.openChange.emit(open);
  }

  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
