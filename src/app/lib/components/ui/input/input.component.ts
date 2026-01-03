import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Input component that applies shadcn input styles.
 *
 * @example
 * <!-- Basic input -->
 * <Input type="text" placeholder="Enter your name" />
 *
 * <!-- With file type -->
 * <Input type="file" />
 *
 * <!-- Disabled -->
 * <Input type="email" disabled placeholder="Disabled input" />
 */
@Component({
  selector: 'Input',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'input',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      this.class()
    )
  );
}
