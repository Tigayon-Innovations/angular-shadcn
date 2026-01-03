import { computed, Injectable, signal } from '@angular/core';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);

  readonly toasts = computed(() => this._toasts());

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private addToast(toast: Omit<Toast, 'id'>): string {
    const id = this.generateId();
    const newToast: Toast = { ...toast, id };

    this._toasts.update(toasts => [...toasts, newToast]);

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }

    return id;
  }

  toast(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'default' });
  }

  success(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'success' });
  }

  error(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'error' });
  }

  warning(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'warning' });
  }

  info(options: ToastOptions): string {
    return this.addToast({ ...options, type: 'info' });
  }

  dismiss(id: string): void {
    const toast = this._toasts().find(t => t.id === id);
    if (toast?.onDismiss) {
      toast.onDismiss();
    }
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  dismissAll(): void {
    this._toasts().forEach(toast => {
      if (toast.onDismiss) {
        toast.onDismiss();
      }
    });
    this._toasts.set([]);
  }
}
