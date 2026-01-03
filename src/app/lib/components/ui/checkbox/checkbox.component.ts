import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    model
} from '@angular/core';

/**
 * Checkbox component for boolean selection.
 *
 * @example
 * <!-- Basic checkbox -->
 * <Checkbox id="terms" />
 *
 * <!-- Controlled checkbox -->
 * <Checkbox [(checked)]="isChecked" />
 *
 * <!-- Disabled checkbox -->
 * <Checkbox [disabled]="true" />
 *
 * <!-- With label -->
 * <div class="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <Label for="terms">Accept terms</Label>
 * </div>
 */
@Component({
  selector: 'Checkbox',
  template: `
    <span
      data-slot="checkbox-indicator"
      class="flex items-center justify-center text-current transition-none"
    >
      @if (checked()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-3.5"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      }
    </span>
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"checkbox"',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
    '(keydown.enter)': 'toggle(); $event.preventDefault()',
    'data-slot': 'checkbox',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {
  /** Whether the checkbox is checked */
  readonly checked = model<boolean>(false);

  /** Whether the checkbox is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Toggle the checkbox state */
  toggle() {
    if (!this.disabled()) {
      this.checked.update((v) => !v);
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      'inline-flex items-center justify-center cursor-pointer',
      this.disabled() && 'cursor-not-allowed opacity-50',
      this.class()
    )
  );
}
