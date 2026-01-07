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
 * Uses a native <label> element for proper accessibility.
 *
 * @example
 * <!-- Basic label - clicking focuses the input -->
 * <Label for="email">Email</Label>
 * <input id="email" type="email" />
 *
 * <!-- Required field -->
 * <Label for="name">
 *   Name <span class="text-destructive">*</span>
 * </Label>
 */
@Component({
  selector: 'Label',
  template: `<label [attr.for]="forId()" [class]="computedClass()"><ng-content /></label>`,
  host: {
    'data-slot': 'label',
    'class': 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Label {
  /** ID of the form element this label is for */
  readonly for = input<string>();

  /** Alternative binding for 'for' attribute (React-style) */
  readonly htmlFor = input<string>();

  /** Computed ID - prefers 'for' over 'htmlFor' */
  protected readonly forId = computed(() => this.for() || this.htmlFor());

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex items-center gap-2 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
      this.class()
    )
  );
}
