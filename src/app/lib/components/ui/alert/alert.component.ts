import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';
import { alertVariants, type AlertVariants } from './alert-variants';

/**
 * Alert container component.
 *
 * @example
 * <div Alert>
 *   <lucide-icon name="terminal" />
 *   <h5 AlertTitle>Heads up!</h5>
 *   <p AlertDescription>You can add components to your app using the CLI.</p>
 * </div>
 *
 * <!-- Destructive variant -->
 * <div Alert variant="destructive">
 *   <lucide-icon name="alert-circle" />
 *   <h5 AlertTitle>Error</h5>
 *   <p AlertDescription>Your session has expired.</p>
 * </div>
 */
@Component({
  selector: '[Alert]',
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
