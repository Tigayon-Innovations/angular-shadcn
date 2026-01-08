import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ToastAction } from './toast-action.component';
import { ToastDescription } from './toast-description.component';
import { ToastTitle } from './toast-title.component';
import { Toast } from './toast.component';
import { ToastService, type ToastPosition } from './toast.service';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the Toaster component
 */
export interface ToasterProps {
  /** Position of the toast container.
   * @default "bottom-right" */
  position?: ToastPosition;
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component Toaster
 *
 * Container component that renders all active toasts from ToastService.
 *
 * @description
 * Toaster is a viewport component that displays all active toasts. It should
 * be placed once in your app layout (typically in app.component) and will
 * automatically render toasts created via ToastService.
 *
 * ## Features
 * - Multiple position options
 * - Automatic toast rendering
 * - Stacking animations
 * - Responsive design
 * - Live region for accessibility
 *
 * ## Accessibility
 * - Uses `role="region"` for landmark navigation
 * - `aria-live="polite"` for screen reader announcements
 * - `aria-relevant="additions"` to announce new toasts
 *
 * @example Basic usage
 * ```html
 * <!-- In your app.component.html -->
 * <Toaster />
 * ```
 *
 * @example Custom position
 * ```html
 * <Toaster position="top-center" />
 * ```
 *
 * @example With custom styling
 * ```html
 * <Toaster position="bottom-left" class="md:max-w-[350px]" />
 * ```
 */
@Component({
  selector: 'Toaster',
  imports: [Toast, ToastTitle, ToastDescription, ToastAction],
  template: `
    <div
      [class]="computedClass()"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-relevant="additions"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <Toast
          [variant]="toast.type"
          (onClose)="toastService.dismiss(toast.id)"
        >
          @if (toast.title) {
            <ToastTitle>{{ toast.title }}</ToastTitle>
          }
          @if (toast.description) {
            <ToastDescription>{{ toast.description }}</ToastDescription>
          }
          @if (toast.action) {
            <ToastAction (onClick)="toast.action.onClick()">
              {{ toast.action.label }}
            </ToastAction>
          }
        </Toast>
      }
    </div>
  `,
  host: {
    class: 'contents',
    'ngSkipHydration': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toaster {
  protected readonly toastService = inject(ToastService);

  /** Position of the toast container */
  readonly position = input<ToastPosition>('bottom-right');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const positionClasses: Record<ToastPosition, string> = {
      'top-left': 'top-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-0 right-0',
    };

    return cn(
      'fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:flex-col md:max-w-[420px]',
      positionClasses[this.position()],
      this.class()
    );
  });
}
