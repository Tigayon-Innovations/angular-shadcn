import { AriaIdService } from '@/lib/utils/accessibility';
import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT, type AlertDialogContextValue } from './alert-dialog-context';

/**
 * AlertDialog component - a modal dialog for important actions.
 * Matches shadcn/ui React AlertDialog exactly.
 * Follows Radix UI AlertDialog behavior:
 * - Escape key closes the dialog
 * - Overlay/backdrop click does NOT close the dialog
 * - User can explicitly click Cancel or Action to close
 *
 * @example
 * <AlertDialog>
 *   <AlertDialogTrigger>
 *     <Button variant="destructive">Delete Account</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 */
@Component({
  selector: 'AlertDialog',
  template: `<ng-content />`,
  providers: [
    {
      provide: ALERT_DIALOG_CONTEXT,
      useExisting: forwardRef(() => AlertDialog),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialog implements AlertDialogContextValue {
  private readonly ariaIdService = inject(AriaIdService);

  /** Default open state */
  readonly defaultOpen = input<boolean>(false);

  /** Controlled open state */
  readonly controlledOpen = input<boolean | undefined>(undefined, { alias: 'open' });

  /** Open change event emitted when dialog state changes */
  readonly openChange = output<boolean>();

  /** Internal open state signal */
  readonly open = signal(false);

  /** ARIA IDs for accessibility relationships */
  private readonly ariaIds = this.ariaIdService.generateDialogIds('alertdialog');
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

  /** Set the open state and emit change event */
  setOpen(open: boolean): void {
    if (this.controlledOpen() === undefined) {
      this.open.set(open);
    }
    this.openChange.emit(open);
  }

  /** Get current open state */
  isOpen(): boolean {
    return this.controlledOpen() !== undefined ? this.controlledOpen()! : this.open();
  }
}
