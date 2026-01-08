import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { buttonVariants } from '../button';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the ToastAction component
 */
export interface ToastActionProps {
  /** Alt text for close button within destructive toasts.
   * @default "Try again" */
  altText?: string;
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component ToastAction
 *
 * Action button displayed within a toast notification.
 *
 * @description
 * ToastAction provides an interactive button for users to take action
 * directly from the toast notification. It's styled to match the toast
 * variant and provides accessible interaction.
 *
 * ## Features
 * - Styled as outline button
 * - Adapts to destructive toast variants
 * - Focus ring for accessibility
 *
 * @example Basic usage
 * ```html
 * <Toast variant="error">
 *   <ToastTitle>Failed to save</ToastTitle>
 *   <ToastAction (onClick)="retry()">Retry</ToastAction>
 * </Toast>
 * ```
 */
@Component({
  selector: 'ToastAction',
  template: `
    <button
      type="button"
      [class]="computedClass()"
      (click)="onClick.emit()"
    >
      <ng-content />
    </button>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastAction {
  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Event emitted when the action button is clicked */
  readonly onClick = output<void>();

  protected readonly computedClass = computed(() =>
    cn(
      buttonVariants({ variant: 'outline', size: 'sm' }),
      'shrink-0 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      this.class()
    )
  );
}
