import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * FormItem component - container for form field elements.
 *
 * @example
 * <FormItem>
 *   <FormLabel>Email</FormLabel>
 *   <FormControl>
 *     <Input type="email" />
 *   </FormControl>
 *   <FormDescription>Enter your email</FormDescription>
 *   <FormMessage />
 * </FormItem>
 */
@Component({
  selector: 'FormItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'form-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormItem {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'grid gap-2 [&_[data-slot=form-control]]:col-start-1 [&_[data-slot=form-control]]:row-start-2 [&_[data-slot=form-description]:not(:first-child)]:row-start-3 [&_[data-slot=form-message]:not(:first-child)]:row-start-4 has-[[aria-invalid=true]]:text-destructive',
      this.class()
    )
  );
}
