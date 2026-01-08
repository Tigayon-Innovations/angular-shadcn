import { cn, Presence } from '@/lib/utils';
import { FocusTrapDirective } from '@/lib/utils/accessibility';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogContent component - the content of the alert dialog.
 * Matches shadcn/ui React AlertDialogContent exactly.
 *
 * IMPORTANT: Unlike Dialog, AlertDialog does NOT close on:
 * - Escape key press
 * - Overlay/backdrop click
 * User must explicitly click Cancel or Action button.
 */
@Component({
  selector: 'AlertDialogContent',
  imports: [FocusTrapDirective, Presence],
  template: `
    <Presence [present]="context.open()">
      <!-- Overlay - does NOT close on click -->
      <div
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        aria-hidden="true"
      ></div>
      <!-- Content -->
      <div
        hlmFocusTrap
        [trapFocus]="context.open()"
        [autoFocus]="true"
        [restoreFocus]="false"
        [initialFocus]="'[data-slot=alert-dialog-cancel]'"
        [class]="computedClass()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="context.titleId"
        [attr.aria-describedby]="context.descriptionId"
        role="alertdialog"
        aria-modal="true"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogContent implements OnInit, OnDestroy {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
      'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      'sm:rounded-lg',
      this.class()
    )
  );

  ngOnInit(): void {
    // Lock body scroll when alert dialog opens
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    // Restore body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    // Restore focus to trigger element
    this.restoreFocus();
  }

  private restoreFocus(): void {
    const triggerEl = this.context.triggerElement();
    if (triggerEl) {
      setTimeout(() => {
        triggerEl.focus();
      }, 0);
    }
  }
}
