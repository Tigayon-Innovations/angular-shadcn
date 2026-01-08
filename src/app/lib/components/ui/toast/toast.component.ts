import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AlertCircle, AlertTriangle, CheckCircle, Info, LucideAngularModule, X } from 'lucide-angular';
import { toastVariants, type ToastVariants } from './toast-variants';
import type { ToastType } from './toast.service';

/**
 * Toast component - individual toast notification.
 * Matches shadcn/ui React Toast exactly.
 */
@Component({
  selector: 'Toast',
  imports: [LucideAngularModule],
  template: `
    <div
      [class]="computedClass()"
      [attr.data-state]="isVisible() ? 'open' : 'closed'"
      role="status"
      aria-atomic="true"
    >
      <div class="flex items-start gap-3">
        @if (showIcon()) {
          <span class="shrink-0">
            @switch (variant()) {
              @case ('success') {
                <lucide-icon [img]="CheckCircleIcon" class="h-5 w-5 text-green-600 dark:text-green-400" />
              }
              @case ('error') {
                <lucide-icon [img]="AlertCircleIcon" class="h-5 w-5" />
              }
              @case ('warning') {
                <lucide-icon [img]="AlertTriangleIcon" class="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              }
              @case ('info') {
                <lucide-icon [img]="InfoIcon" class="h-5 w-5 text-blue-600 dark:text-blue-400" />
              }
            }
          </span>
        }
        <div class="grid gap-1">
          <ng-content />
        </div>
      </div>
      <button
        type="button"
        class="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
        (click)="onClose.emit()"
        aria-label="Close"
      >
        <lucide-icon [img]="XIcon" class="h-4 w-4" />
      </button>
    </div>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
  protected readonly XIcon = X;
  protected readonly CheckCircleIcon = CheckCircle;
  protected readonly AlertCircleIcon = AlertCircle;
  protected readonly AlertTriangleIcon = AlertTriangle;
  protected readonly InfoIcon = Info;

  /** Toast variant */
  readonly variant = input<ToastType>('default');

  /** Whether to show icon */
  readonly showIcon = input<boolean>(true);

  /** Whether the toast is visible (for animation state) */
  readonly isVisible = input<boolean>(true);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Close event */
  readonly onClose = output<void>();

  protected readonly computedClass = computed(() => {
    const variantMap: Record<ToastType, ToastVariants['variant']> = {
      default: 'default',
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };

    return cn(
      toastVariants({ variant: variantMap[this.variant()] }),
      this.class()
    );
  });
}
