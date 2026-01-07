import { cn } from '@/lib/utils';
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
import { SHEET_CONTEXT } from './sheet-context';
import { sheetVariants, type SheetVariants } from './sheet-variants';

/**
 * SheetContent component - the content of the sheet panel.
 * Matches shadcn/ui React SheetContent exactly.
 * Includes focus trapping, focus restoration, and proper ARIA relationships.
 */
@Component({
  selector: 'SheetContent',
  imports: [FocusTrapDirective],
  template: `
    @if (context.open()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        (click)="onOverlayClick($event)"
        aria-hidden="true"
      ></div>
      <!-- Content -->
      <div
        hlmFocusTrap
        [trapFocus]="context.open()"
        [autoFocus]="true"
        [restoreFocus]="false"
        [class]="computedClass()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="context.titleId"
        [attr.aria-describedby]="context.descriptionId"
        role="dialog"
        aria-modal="true"
        (keydown.escape)="onEscapeKey()"
      >
        <ng-content />
        <!-- Close button -->
        <button
          type="button"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          (click)="onClose()"
          aria-label="Close sheet"
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
      </div>
    }
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetContent implements OnInit, OnDestroy {
  protected readonly context = inject(SHEET_CONTEXT);

  /** Side from which the sheet appears */
  readonly side = input<SheetVariants['side']>('right');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(sheetVariants({ side: this.side() }), this.class())
  );

  ngOnInit(): void {
    // Lock body scroll when sheet opens
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

  onOverlayClick(event: Event): void {
    event.stopPropagation();
    this.close();
  }

  onEscapeKey(): void {
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
