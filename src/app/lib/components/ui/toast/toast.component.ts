import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AlertCircle, AlertTriangle, CheckCircle, Info, LucideAngularModule, X } from 'lucide-angular';
import { toastVariants, type ToastVariants } from './toast-variants';
import type { ToastType } from './toast.service';

// ============================================================================
// Types
// ============================================================================

/**
 * Toast visual state for animations
 */
export type ToastState = 'open' | 'closed';

/**
 * Toast swipe state for gesture handling
 */
export type ToastSwipeState = 'start' | 'move' | 'cancel' | 'end';

/**
 * Props for the Toast component
 */
export interface ToastProps {
  /** Visual variant of the toast.
   * @default "default" */
  variant?: ToastType;
  /** Whether to display the variant icon.
   * @default true */
  showIcon?: boolean;
  /** Whether the toast is visible (controls animation state).
   * @default true */
  isVisible?: boolean;
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component Toast
 *
 * A succinct message that is displayed temporarily for notifications.
 *
 * @description
 * Toast displays a brief, auto-expiring message to provide feedback about
 * an operation or to convey information to the user. It supports multiple
 * variants for different types of notifications.
 *
 * ## Features
 * - Multiple variants (default, success, error, warning, info)
 * - Auto-dismiss with configurable duration
 * - Close button for manual dismissal
 * - Optional action buttons
 * - Swipe to dismiss (via CSS)
 * - Accessible announcements
 *
 * ## Accessibility
 * - Uses `role="status"` for screen reader announcements
 * - `aria-atomic="true"` ensures full content is read
 * - Close button with accessible label
 * - Focus management on action buttons
 *
 * ## Data Attributes
 * | Attribute | Values |
 * |-----------|--------|
 * | `data-state` | `"open"` \| `"closed"` |
 * | `data-swipe` | `"start"` \| `"move"` \| `"cancel"` \| `"end"` |
 *
 * ## CSS Variables
 * - `--radix-toast-swipe-move-x` - Swipe position during drag
 * - `--radix-toast-swipe-end-x` - Final swipe position
 *
 * @example Basic usage
 * ```html
 * <Toast variant="success" (onClose)="dismiss()">
 *   <ToastTitle>Success!</ToastTitle>
 *   <ToastDescription>Your changes have been saved.</ToastDescription>
 * </Toast>
 * ```
 *
 * @example With action
 * ```html
 * <Toast variant="error">
 *   <ToastTitle>Error</ToastTitle>
 *   <ToastDescription>Failed to save changes.</ToastDescription>
 *   <ToastAction (onClick)="retry()">Retry</ToastAction>
 * </Toast>
 * ```
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
                <lucide-icon [img]="CheckCircleIcon" class="h-5 w-5 text-success" />
              }
              @case ('error') {
                <lucide-icon [img]="AlertCircleIcon" class="h-5 w-5 text-destructive" />
              }
              @case ('warning') {
                <lucide-icon [img]="AlertTriangleIcon" class="h-5 w-5 text-warning" />
              }
              @case ('info') {
                <lucide-icon [img]="InfoIcon" class="h-5 w-5 text-info" />
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
        class="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:text-destructive-foreground/80 group-[.destructive]:focus:ring-destructive"
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

  /** Visual variant of the toast */
  readonly variant = input<ToastType>('default');

  /** Whether to display the variant icon */
  readonly showIcon = input<boolean>(true);

  /** Whether the toast is visible (controls animation state) */
  readonly isVisible = input<boolean>(true);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Event emitted when close button is clicked */
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
