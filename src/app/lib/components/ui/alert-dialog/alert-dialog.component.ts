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
 * Unlike Dialog, AlertDialog does NOT close on Escape or overlay click.
 * User must explicitly click Cancel or Action to close.
 * Matches shadcn/ui React AlertDialog exactly.
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

  /** Open change event */
  readonly openChange = output<boolean>();

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
