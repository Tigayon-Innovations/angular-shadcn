import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Label component that applies shadcn label styles.
 * Associates with form controls for accessibility.
 *
 * @example
 * <!-- Basic label -->
 * <Label for="email">Email</Label>
 * <Input id="email" type="email" />
 *
 * <!-- Required field -->
 * <Label for="name">
 *   Name <span class="text-destructive">*</span>
 * </Label>
 */
@Component({
  selector: 'Label',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'label',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Label {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
      this.class()
    )
  );
}
