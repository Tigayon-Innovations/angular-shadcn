import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    input,
    output,
    signal,
} from '@angular/core';
import { POPOVER_CONTEXT, type PopoverContextValue } from './popover-context';

/**
 * Popover component - container for popover trigger and content.
 * Matches shadcn/ui React Popover exactly.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger>
 *     <Button variant="outline">Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>Content here</p>
 *   </PopoverContent>
 * </Popover>
 */
@Component({
  selector: 'Popover',
  template: `<ng-content />`,
  host: {
    class: 'relative inline-block',
  },
  providers: [
    {
      provide: POPOVER_CONTEXT,
      useExisting: forwardRef(() => Popover),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popover implements PopoverContextValue {
  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Modal mode */
  readonly modal = input<boolean>(false);

  /** Open change event */
  readonly openChange = output<boolean>();

  readonly open = signal(false);

  constructor() {
    // Initialize from defaultOpen
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

  toggle(): void {
    this.setOpen(!this.open());
  }

  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
