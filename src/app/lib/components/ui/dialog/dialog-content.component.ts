import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
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
  template: `
    @if (context.isOpen()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="context.isOpen() ? 'open' : 'closed'"
        (click)="onOverlayClick($event)"
      ></div>
      <!-- Content -->
      <div
        [class]="computedClass()"
        [attr.data-state]="context.isOpen() ? 'open' : 'closed'"
        role="dialog"
        aria-modal="true"
        (keydown.escape)="onEscapeKey()"
      >
        <ng-content />
        <!-- Close button -->
        <button
          type="button"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          (click)="onClose()"
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
export class DialogContent {
  readonly context = inject(DIALOG_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Whether to show close button */
  readonly showClose = input<boolean>(true);

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

  onOverlayClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }

  onEscapeKey(): void {
    this.context.setOpen(false);
  }

  onClose(): void {
    this.context.setOpen(false);
  }
}
