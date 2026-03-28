import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

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
  protected readonly computedClass = computed(() => cn('flex flex-col gap-2', this.class()));
}
