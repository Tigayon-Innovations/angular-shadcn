import { cn, Presence } from '@/lib/utils';
import { FocusTrapDirective } from '@/lib/utils/accessibility';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    HostListener,
    inject,
    input,
    OnDestroy,
    viewChild,
} from '@angular/core';
import { DIALOG_CONTEXT } from './dialog-context';

/**
 * DialogContent component - the content of the dialog.
 * Matches shadcn/ui React DialogContent exactly.
 * Includes focus trapping, focus restoration, proper ARIA relationships,
 * and Radix-compatible exit animations via Presence component.
 */
@Component({
  selector: 'DialogContent',
  imports: [FocusTrapDirective, Presence],
  template: `
    <Presence [present]="context.isOpen()">
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="context.isOpen() ? 'open' : 'closed'"
        (click)="onOverlayClick($event)"
        aria-hidden="true"
      ></div>
      <!-- Content -->
      <div
        #dialogContent
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
        <!-- Close button -->
        @if (showClose()) {
          <button
            type="button"
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            (click)="onClose()"
            aria-label="Close dialog"
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
            <span class="sr-only">Close</span>
          </button>
        }
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContent implements OnDestroy {
  readonly context = inject(DIALOG_CONTEXT);
  private readonly dialogContent = viewChild<ElementRef<HTMLElement>>('dialogContent');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Whether to show close button */
  readonly showClose = input<boolean>(true);

  /** Selector for initial focus element */
  readonly initialFocus = input<string | undefined>(undefined);

  /** Previous body overflow for restoration */
  private previousBodyOverflow = '';

  protected readonly computedClass = computed(() =>
    cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background text-foreground p-6 shadow-lg duration-200',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
      'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      'sm:rounded-lg',
      this.class()
    )
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

  ngOnDestroy(): void {
    // Restore body scroll
    this.unlockBodyScroll();
    // Restore focus to trigger element
    this.restoreFocus();
  }

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

  private close(): void {
    this.restoreFocus();
    this.context.setOpen(false);
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
