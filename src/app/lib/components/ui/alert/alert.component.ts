import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { alertVariants, type AlertVariants } from './alert-variants';

/**
 * Alert container component.
 *
 * @example
 * <Alert>
 *   <lucide-icon name="terminal" />
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
 * </Alert>
 *
 * <!-- Destructive variant -->
 * <Alert variant="destructive">
 *   <lucide-icon name="alert-circle" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Your session has expired.</AlertDescription>
 * </Alert>
 */
@Component({
  selector: 'Alert',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'alert',
    'data-slot': 'alert',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alert {
  /** The visual style variant */
  readonly variant = input<AlertVariants['variant']>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      alertVariants({ variant: this.variant() }),
      this.class()
    )
  );
}
