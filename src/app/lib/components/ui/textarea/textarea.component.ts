import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Textarea component that applies shadcn textarea styles.
 *
 * @example
 * <!-- Basic textarea -->
 * <textarea Textarea placeholder="Enter your message"></textarea>
 *
 * <!-- With rows -->
 * <textarea Textarea rows="5" placeholder="Description"></textarea>
 *
 * <!-- Disabled -->
 * <textarea Textarea disabled placeholder="Disabled"></textarea>
 */
@Component({
  selector: '[Textarea]',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'textarea',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Textarea {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      this.class()
    )
  );
}
