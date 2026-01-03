import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { buttonVariants } from '../button';

/**
 * ToastAction component - action button in toast.
 * Matches shadcn/ui React ToastAction exactly.
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

  /** Click event */
  readonly onClick = output<void>();

  protected readonly computedClass = computed(() =>
    cn(
      buttonVariants({ variant: 'outline', size: 'sm' }),
      'shrink-0 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      this.class()
    )
  );
}
