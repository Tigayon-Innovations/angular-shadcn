import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * InputOTPSeparator component - separator between OTP groups.
 * Matches shadcn/ui React InputOTPSeparator exactly.
 */
@Component({
  selector: 'InputOTPSeparator',
  template: `
    <div role="separator">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus">
        <path d="M5 12h14"/>
      </svg>
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTPSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center justify-center', this.class())
  );
}
