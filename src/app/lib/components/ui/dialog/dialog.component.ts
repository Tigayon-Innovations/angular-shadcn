import { AriaIdService } from '@/lib/utils/accessibility';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { DIALOG_CONTEXT, type DialogContextValue } from './dialog-context';

/**
 * Dialog component - root container for modal dialogs.
 * Matches shadcn/ui React Dialog exactly.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger>
 *     <Button variant="outline">Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog description here.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button>Save changes</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 */
@Component({
  selector: 'Dialog',
  template: `<ng-content />`,
  providers: [
    {
      provide: DIALOG_CONTEXT,
      useExisting: forwardRef(() => Dialog),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog implements DialogContextValue {
  private readonly ariaIdService = inject(AriaIdService);

  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Modal mode - prevents interaction with outside elements */
  readonly modal = input<boolean>(true);

  /** Open change event */
  readonly openChange = output<boolean>();

  readonly open = signal(false);

  /** ARIA IDs for accessibility relationships */
  private readonly ariaIds = this.ariaIdService.generateDialogIds('dialog');
  readonly titleId = this.ariaIds.titleId;
  readonly descriptionId = this.ariaIds.descriptionId;
  readonly contentId = this.ariaIds.contentId;

  /** Reference to trigger element for focus restoration */
  readonly triggerElement = signal<HTMLElement | null>(null);

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

  readonly isOpen = computed(() =>
    this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open()
  );
}
