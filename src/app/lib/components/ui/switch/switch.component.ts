import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';

/**
 * Switch component for toggling between on/off states.
 *
 * @example
 * <!-- Basic switch -->
 * <Switch id="airplane-mode" />
 *
 * <!-- Controlled switch -->
 * <Switch [(checked)]="isEnabled" />
 *
 * <!-- Disabled switch -->
 * <Switch [disabled]="true" />
 *
 * <!-- With label -->
 * <div class="flex items-center gap-2">
 *   <Switch id="notifications" />
 *   <Label for="notifications">Enable notifications</Label>
 * </div>
 */
@Component({
  selector: 'Switch',
  template: `
    <span
      data-slot="switch-thumb"
      [class]="thumbClass()"
    ></span>
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"switch"',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
    '(keydown.enter)': 'toggle(); $event.preventDefault()',
    'data-slot': 'switch',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Switch {
  /** Whether the switch is checked/on */
  readonly checked = model<boolean>(false);

  /** Whether the switch is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Toggle the switch state */
  toggle() {
    if (!this.disabled()) {
      this.checked.update((v) => !v);
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
      this.disabled() && 'cursor-not-allowed opacity-50',
      this.class()
    )
  );

  /** Computed thumb class */
  protected readonly thumbClass = computed(() =>
    cn(
      'bg-background pointer-events-none block size-4 rounded-full shadow-lg ring-0 transition-transform',
      this.checked() ? 'translate-x-4' : 'translate-x-0'
    )
  );
}
