import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogContent component - the content of the alert dialog.
 * Matches shadcn/ui React AlertDialogContent exactly.
 */
@Component({
  selector: 'AlertDialogContent',
  template: `
    @if (context.open()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
      ></div>
      <!-- Content -->
      <div
        [class]="computedClass()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
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
}
