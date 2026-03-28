import { cn } from '@/lib/utils';
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
 */
@Component({
  selector: 'DialogContent',
  imports: [FocusTrapDirective],
  template: `
    @if (context.isOpen()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80"
        (click)="onOverlayClick($event)"
        aria-hidden="true"
      ></div>
      <!-- Content -->
      <div
        hlmFocusTrap
        [trapFocus]="context.isOpen()"
        [autoFocus]="true"
        [restoreFocus]="true"
        [initialFocus]="initialFocus()"
        [class]="computedClass()"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="context.titleId"
        [attr.aria-describedby]="context.descriptionId"
        role="dialog"
        aria-modal="true"
      >
        <ng-content />
        <!-- Close button -->
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
    }
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContent {
  constructor() {
    // Handle body scroll lock based on open state
    effect(() => {
      const isOpen = this.context.isOpen();

      // Force change detection since context.isOpen() might update outside of this component's hierarchy
      // and we are using OnPush
      this._cdr.markForCheck();

      if (isOpen) {
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
      }
    });

    // Cleanup on destroy
    this._destroyRef.onDestroy(() => {
      this.unlockBodyScroll();
      this.restoreFocus();
    });
  }

  /** Additional CSS classes */
  readonly class = input<string>('');
  /** Whether to show close button */
  readonly showClose = input<boolean>(true);
  /** Aria label for close button */
  readonly ariaCloselabel = input<string>('Close dialog');
  /** Selector for initial focus element */
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

  /** Previous body overflow for restoration */
  private previousBodyOverflow = '';

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
