import { cn } from '@/lib/utils';
import { FocusTrapDirective } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogContent component - the modal content of the alert dialog.
 * Matches shadcn/ui React AlertDialogContent exactly.
 *
 * Features:
 * - Escape key closes the dialog
 * - Overlay/backdrop click does NOT close the dialog
 * - Focus is trapped within the dialog
 * - User must explicitly click Cancel or Action to close
 */
@Component({
  selector: 'AlertDialogContent',
  imports: [FocusTrapDirective],
  template: `
    @if (context.isOpen()) {
      <!-- Overlay - does NOT close on click -->
      <div class="fixed inset-0 z-50 bg-black/80" aria-hidden="true"></div>
      <!-- Content Dialog -->
      <div
        hlmFocusTrap
        [trapFocus]="context.isOpen()"
        [autoFocus]="true"
        [restoreFocus]="false"
        [initialFocus]="'[data-slot=alert-dialog-cancel]'"
        [class]="computedClass()"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="context.titleId"
        [attr.aria-describedby]="context.descriptionId"
        role="alertdialog"
        aria-modal="true"
      >
        <ng-content />
      </div>
    }
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogContent {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);
  private readonly destroyRef = inject(DestroyRef);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Previous body overflow for restoration */
  private previousBodyOverflow = '';

  protected readonly computedClass = computed(() =>
    cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
      'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      'sm:rounded-lg',
      this.class(),
    ),
  );

  constructor() {
    // Handle body scroll lock based on open state
    effect(() => {
      const isOpen = this.context.isOpen();
      if (isOpen) {
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.unlockBodyScroll();
      this.restoreFocus();
    });
  }

  private lockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      this.previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  }

  private unlockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.previousBodyOverflow;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.context.isOpen()) {
      this.close();
    }
  }

  private close(): void {
    this.restoreFocus();
    this.context.setOpen(false);
  }

  private restoreFocus(): void {
    const triggerEl = this.context.getTriggerElement();
    if (triggerEl) {
      setTimeout(() => {
        triggerEl.focus();
      }, 0);
    }
  }
}
