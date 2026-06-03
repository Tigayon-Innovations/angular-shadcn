import { AriaIdService } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  model,
} from '@angular/core';
import { DIALOG_CONTEXT, type DialogContextValue } from './dialog-context';

/**
 * Dialog component - root container for modal dialogs.
 * Matches shadcn/ui React Dialog exactly.
 *
 * @example
 * <Dialog [(open)]="isOpen">
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
  host: {
    'attr.data-slot': '"dialog"',
    style: 'display: contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog implements DialogContextValue {
  /** Controlled open state - uses model for proper two-way binding */
  readonly open = model<boolean>(false);

  /** Default open state */
  readonly defaultOpen = input<boolean>(false);
  /** Modal mode - prevents interaction with outside elements */
  readonly modal = input<boolean>(true);

  private readonly _ariaIdService = inject(AriaIdService);

  /** ARIA IDs for accessibility relationships */
  private readonly ariaIds = this._ariaIdService.generateDialogIds('dialog');
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
