import { AriaIdService } from '@/lib/utils/accessibility';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    forwardRef,
    inject,
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
  private readonly ariaIdService = inject(AriaIdService);

  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Side from which the sheet appears */
  readonly side: 'top' | 'right' | 'bottom' | 'left' = 'right';

  /** Open change event */
  readonly openChange = output<boolean>();

  private readonly _internalOpen = signal(false);

  /** ARIA IDs for accessibility relationships */
  private readonly ariaIds = this.ariaIdService.generateDialogIds('sheet');
  readonly titleId = this.ariaIds.titleId;
  readonly descriptionId = this.ariaIds.descriptionId;
  readonly contentId = this.ariaIds.contentId;

  /** Reference to trigger element for focus restoration */
  readonly triggerElement = signal<HTMLElement | null>(null);

  /** Computed open state - uses controlled value if provided, otherwise internal state */
  readonly open = computed(() => {
    const controlled = this.controlledOpen();
    if (controlled !== undefined) {
      return controlled;
    }
    return this._internalOpen();
  });

  constructor() {
    // Sync defaultOpen on init
    effect(() => {
      if (this.defaultOpen() && this.controlledOpen() === undefined) {
        this._internalOpen.set(true);
      }
    }, { allowSignalWrites: true });
  }

  setOpen(open: boolean): void {
    // Always update internal state for uncontrolled mode
    this._internalOpen.set(open);
    this.openChange.emit(open);
  }

  isOpen(): boolean {
    return this.open();
  }
}
