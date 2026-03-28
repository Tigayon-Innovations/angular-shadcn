import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nativeSelectVariants, type NativeSelectVariants } from './native-select-variants';

/**
 * NativeSelect component - styled HTML native select element.
 * Use as a host element selector on a native <select> element.
 *
 * @example
 * <!-- Basic usage -->
 * <select NativeSelect>
 *   <option value="">Select an option</option>
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 *   <option value="3">Option 3</option>
 * </select>
 *
 * <!-- With size -->
 * <select NativeSelect size="lg">
 *   <option value="">Select size</option>
 *   <option value="sm">Small</option>
 *   <option value="md">Medium</option>
 *   <option value="lg">Large</option>
 * </select>
 *
 * <!-- Disabled -->
 * <select NativeSelect disabled>
 *   <option value="">Disabled select</option>
 * </select>
 *
 * <!-- With Label for accessibility -->
 * <Label for="framework">Framework</Label>
 * <select NativeSelect id="framework">
 *   <option value="">Select a framework</option>
 *   <option value="angular">Angular</option>
 * </select>
 */
@Component({
  // Use attribute selector to apply to native select elements
  selector: 'select[NativeSelect], NativeSelect',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'native-select',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeSelect {
  /** The size of the select */
  readonly size = input<NativeSelectVariants['size']>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      nativeSelectVariants({
        size: this.size(),
      }),
      // Chevron arrow — light mode (gray-700 stroke, visible on light backgrounds)
      "bg-[image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
      // Chevron arrow — dark mode (neutral-400 stroke, visible on dark backgrounds)
      "dark:bg-[image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
      'bg-[size:16px_16px]',
      'bg-[position:right_0.5rem_center]',
      'bg-no-repeat',
      'pr-8',
      this.class(),
    ),
  );
}
