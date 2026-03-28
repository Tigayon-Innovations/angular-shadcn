import { AriaIdService } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  model,
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
 * <AlertDialog [(open)]="isOpen">
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

  /** Controlled open state - uses model for proper two-way binding */
  readonly open = model<boolean>(false);

  /** ARIA IDs for accessibility relationships */
  private readonly ariaIds = this.ariaIdService.generateDialogIds('alertdialog');
  readonly titleId = this.ariaIds.titleId;
  readonly descriptionId = this.ariaIds.descriptionId;
  readonly contentId = this.ariaIds.contentId;

  /** Reference to trigger element for focus restoration */
  private triggerEl: HTMLElement | null = null;

  /** Check if dialog is open - directly reads from model */
  isOpen(): boolean {
    return this.open();
  }

  /** Set the open state */
  setOpen(open: boolean): void {
    this.open.set(open);
  }

  /** Set trigger element for focus restoration */
  setTriggerElement(element: HTMLElement | null): void {
    this.triggerEl = element;
  }

  /** Get trigger element for focus restoration */
  getTriggerElement(): HTMLElement | null {
    return this.triggerEl;
  }
}
