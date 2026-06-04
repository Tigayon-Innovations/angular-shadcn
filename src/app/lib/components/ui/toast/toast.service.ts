import { computed, Injectable, signal } from '@angular/core';

/**
 * Toast variant types for different notification styles
 */
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Position options for toast placement
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Swipe direction for dismissing toasts
 */
export type ToastSwipeDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Toast data structure
 */
export interface Toast {
  /** Unique identifier for the toast */
  id: string;
  /** Title text displayed prominently */
  title?: string;
  /** Description text with more details */
  description?: string;
  /** Visual variant of the toast */
  type: ToastType;
  /** Duration in ms before auto-dismiss (0 = persistent) */
  duration?: number;
  /** Optional action button configuration */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
}

/**
 * Options for creating a toast
 */
export interface ToastOptions {
  /** Title text displayed prominently */
  title?: string;
  /** Description text with more details */
  description?: string;
  /** Duration in ms before auto-dismiss (0 = persistent)
   * @default 4000 */
  duration?: number;
  /** Optional action button configuration */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
}

/**
 * @service ToastService
 *
 * Service for managing toast notifications throughout the application.
 *
 * @description
 * ToastService provides a centralized way to display toast notifications.
 * It manages toast state, handles auto-dismissal, and supports multiple
 * toast variants for different notification types.
 *
 * ## Features
 * - Multiple toast variants (default, success, error, warning, info)
 * - Auto-dismiss with configurable duration
 * - Persistent toasts (duration = 0)
 * - Action buttons in toasts
 * - Dismiss callbacks
 * - Dismiss all functionality
 *
 * ## Usage
 * The service is provided at root level and can be injected anywhere.
 *
 * @example Basic usage
 * ```typescript
 * export class MyComponent {
 *   private readonly _toast = inject(ToastService);
 *
 *   showNotification() {
 *     this.toast.success({
 *       title: 'Saved!',
 *       description: 'Your changes have been saved.',
 *     });
 *   }
 * }
 * ```
 *
 * @example With action button
 * ```typescript
 * this.toast.error({
 *   title: 'Error occurred',
 *   description: 'Failed to save changes.',
 *   action: {
 *     label: 'Retry',
 *     onClick: () => this.save(),
 *   },
 * });
 * ```
 *
 * @example Persistent toast
 * ```typescript
 * const id = this.toast.info({
 *   title: 'Uploading...',
 *   description: 'Please wait while we upload your file.',
 *   duration: 0, // Won't auto-dismiss
 * });
 *
 * // Later, dismiss manually
 * this.toast.dismiss(id);
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  /** Reactive list of active toasts */
  readonly toasts = computed(() => this._toasts());

  private readonly _toasts = signal<Toast[]>([]);

  /** Show a default toast */
  toast(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'default' });
  }
  /** Show a success toast */
  success(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'success' });
  }
  /** Show an error toast */
  error(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'error' });
  }
  /** Show a warning toast */
  warning(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'warning' });
  }
  /** Show an info toast */
  info(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'info' });
  }
  /** Dismiss a specific toast by ID */
  dismiss(id: string): void {
    const toast = this._toasts().find((t) => t.id === id);
    if (toast?.onDismiss) {
      toast.onDismiss();
    }
    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
  /** Dismiss all active toasts */
  dismissAll(): void {
    this._toasts().forEach((toast) => {
      if (toast.onDismiss) {
        toast.onDismiss();
      }
    });
    this._toasts.set([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
  private addToast(toast: Omit<Toast, 'id'>): string {
    const id = this.generateId();
    const newToast: Toast = { ...toast, id };

    this._toasts.update((toasts) => [...toasts, newToast]);

    const duration = toast.duration ?? 4000;
    if (duration > 0 && typeof window !== 'undefined') {
      setTimeout(() => this.dismiss(id), duration);
    }

    return id;
  }
}
