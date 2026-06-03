import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Props for the ToastTitle component
 */
export interface ToastTitleProps {
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component ToastTitle
 *
 * Title text for a toast notification.
 *
 * @description
 * ToastTitle displays the primary message of a toast notification.
 * It's styled as semibold text and adjusts sibling description text size.
 *
 * @example Basic usage
 * ```html
 * <Toast>
 *   <ToastTitle>Scheduled: Catch up</ToastTitle>
 *   <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
 * </Toast>
 * ```
 */
@Component({
  selector: 'ToastTitle',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"toast-title"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastTitle {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm font-semibold [&+div]:text-xs', this.class()),
  );
}
