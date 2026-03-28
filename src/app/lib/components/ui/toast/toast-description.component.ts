import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the ToastDescription component
 */
export interface ToastDescriptionProps {
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component ToastDescription
 *
 * Description text for a toast notification.
 *
 * @description
 * ToastDescription displays supplementary information in a toast notification.
 * It's styled with reduced opacity for visual hierarchy.
 *
 * @example Basic usage
 * ```html
 * <Toast>
 *   <ToastTitle>Settings updated</ToastTitle>
 *   <ToastDescription>Your preferences have been saved.</ToastDescription>
 * </Toast>
 * ```
 */
@Component({
  selector: 'ToastDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDescription {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('text-sm opacity-90', this.class()));
}
