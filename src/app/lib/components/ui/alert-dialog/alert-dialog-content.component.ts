import { cn, Presence } from '@/lib/utils';
import { FocusTrapDirective } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
 * - Exit animations handled by Presence component (no setTimeout needed)
 * - Focus restored on any programmatic close (Action/Cancel/Escape)
 */
@Component({
  selector: 'AlertDialogContent',
  imports: [FocusTrapDirective, Presence],
  template: `
    <Presence [present]="context.isOpen()">
      <!-- Overlay - does NOT close on click -->
      <div
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
        [attr.data-state]="context.isOpen() ? 'open' : 'closed'"
        aria-hidden="true"
      ></div>
      <!-- Content Dialog -->
      <div
        hlmFocusTrap
        [trapFocus]="context.isOpen()"
        [autoFocus]="true"
        [restoreFocus]="false"
        [initialFocus]="'[data-slot=alert-dialog-cancel]'"
        [class]="computedClass()"
        [attr.data-state]="context.isOpen() ? 'open' : 'closed'"
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
    'attr.data-slot': '"alert-dialog-content"',
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogContent {
  constructor() {
    let wasOpen = false;

    effect(() => {
      const isOpen = this.context.isOpen();
      this._cdr.markForCheck();

      if (isOpen) {
        wasOpen = true;
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
        // Restore focus whenever dialog closes (covers Action/Cancel/Escape paths)
        if (wasOpen) {
          this.restoreFocus();
        }
        wasOpen = false;
      }
    });

    this._destroyRef.onDestroy(() => {
      this.unlockBodyScroll();
      this.restoreFocus();
    });
  }

  readonly class = input<string>('');

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _cdr = inject(ChangeDetectorRef);

  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

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

  private previousBodyOverflow = '';
  private previousBodyPaddingRight = '';

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.context.isOpen()) {
      this.context.setOpen(false);
    }
  }

  private lockBodyScroll(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      this.previousBodyOverflow = document.body.style.overflow;
      this.previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
      }
    }
  }
  private unlockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.previousBodyOverflow;
      document.body.style.paddingRight = this.previousBodyPaddingRight;
    }
  }
  private restoreFocus(): void {
    const triggerEl = this.context.getTriggerElement();
    if (triggerEl) {
      setTimeout(() => triggerEl.focus(), 0);
    }
  }
}
