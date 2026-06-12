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
import { DIALOG_CONTEXT } from './dialog-context';

/**
 * DialogContent component - the content of the dialog.
 * Matches shadcn/ui React DialogContent exactly.
 *
 * Features:
 * - Escape key closes the dialog
 * - Overlay click closes the dialog
 * - Focus is trapped within the dialog
 * - Exit animations handled by Presence component (no setTimeout needed)
 * - Focus restored on any close path (overlay click, close button, Escape, programmatic)
 */
@Component({
  selector: 'DialogContent',
  imports: [FocusTrapDirective, Presence],
  template: `
    <Presence [present]="context.isOpen()">
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
        [attr.data-state]="context.isOpen() ? 'open' : 'closed'"
        (click)="onOverlayClick($event)"
        aria-hidden="true"
      ></div>
      <!-- Content -->
      <div
        hlmFocusTrap
        [trapFocus]="context.isOpen()"
        [autoFocus]="true"
        [restoreFocus]="false"
        [initialFocus]="initialFocus()"
        [class]="computedClass()"
        [attr.data-state]="context.isOpen() ? 'open' : 'closed'"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="context.titleId"
        [attr.aria-describedby]="context.descriptionId"
        role="dialog"
        aria-modal="true"
      >
        <ng-content />
        @if (showClose()) {
          <button
            type="button"
            class="absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-all hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none hover:bg-zinc-800 text-zinc-400 hover:text-white h-8 w-8 flex items-center justify-center p-0"
            (click)="onClose()"
            [attr.aria-label]="ariaCloselabel()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span class="sr-only">{{ ariaCloselabel() }}</span>
          </button>
        }
      </div>
    </Presence>
  `,
  host: {
    'attr.data-slot': '"dialog-content"',
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContent {
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
        // Restore focus on any close path (overlay click, close button, Escape, programmatic)
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
  readonly showClose = input<boolean>(true);
  readonly ariaCloselabel = input<string>('Close dialog');
  readonly initialFocus = input<string | undefined>(undefined);

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _cdr = inject(ChangeDetectorRef);

  readonly context = inject(DIALOG_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background text-foreground p-6 shadow-lg duration-200',
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
      this.close();
    }
  }
  onOverlayClick(event: Event): void {
    event.stopPropagation();
    this.close();
  }
  onClose(): void {
    this.close();
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
  private close(): void {
    this.context.setOpen(false);
  }
  private restoreFocus(): void {
    const triggerEl = this.context.getTriggerElement();
    if (triggerEl) {
      setTimeout(() => triggerEl.focus(), 0);
    }
  }
}
