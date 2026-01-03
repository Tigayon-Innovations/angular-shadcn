import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * InputOTPGroup component - groups OTP slots.
 * Matches shadcn/ui React InputOTPGroup exactly.
 */
@Component({
  selector: 'InputOTPGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTPGroup {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center', this.class())
  );
}
