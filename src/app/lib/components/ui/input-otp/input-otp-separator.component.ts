import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideAngularModule, Minus } from 'lucide-angular';

/**
 * InputOTPSeparator component - separator between OTP groups.
 * Matches shadcn/ui React InputOTPSeparator exactly.
 */
@Component({
  selector: 'InputOTPSeparator',
  imports: [LucideAngularModule],
  template: `
    <div role="separator">
      <lucide-icon [img]="icons.Minus" />
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTPSeparator {
  protected readonly icons = { Minus };

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center justify-center', this.class()),
  );
}
