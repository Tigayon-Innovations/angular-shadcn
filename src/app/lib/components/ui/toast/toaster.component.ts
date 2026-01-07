import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ToastAction } from './toast-action.component';
import { ToastDescription } from './toast-description.component';
import { ToastTitle } from './toast-title.component';
import { Toast } from './toast.component';
import { ToastService } from './toast.service';

/**
 * Toaster component - renders all active toasts.
 * Matches shadcn/ui React Toaster exactly.
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
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toaster {
  protected readonly toastService = inject(ToastService);

  /** Position of the toasts */
  readonly position = input<
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  >('bottom-right');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const positionClasses = {
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
