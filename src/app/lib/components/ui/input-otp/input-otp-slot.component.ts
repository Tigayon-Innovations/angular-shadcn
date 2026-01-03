import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * InputOTPSlot component - individual OTP digit slot.
 * Matches shadcn/ui React InputOTPSlot exactly.
 */
@Component({
  selector: 'InputOTPSlot',
  template: `
    @if (char()) {
      {{ char() }}
    }
    @if (isActive() && !char()) {
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000"></div>
      </div>
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-active]': 'isActive() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTPSlot {
  /** Index of this slot */
  readonly index = input.required<number>();

  /** Character to display */
  readonly char = input<string>('');

  /** Whether this slot is active */
  readonly isActive = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
      this.isActive() && 'z-10 ring-1 ring-ring',
      this.class()
    )
  );
}
