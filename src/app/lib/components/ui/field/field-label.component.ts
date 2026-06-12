import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldLabel component - label for a form control inside a Field.
 * Renders a native label element for accessibility.
 *
 * @example
 * <FieldLabel htmlFor="username">Username</FieldLabel>
 * <input Input id="username" />
 */
@Component({
  selector: 'FieldLabel',
  template: `
    <label class="contents" [attr.for]="forId()">
      <ng-content />
    </label>
  `,
  host: {
    'attr.data-slot': '"field-label"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLabel {
  /** ID of the form element this label is for */
  readonly for = input<string>();

  /** Alternative binding for 'for' attribute (React-style) */
  readonly htmlFor = input<string>();

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed ID - prefers 'for' over 'htmlFor' */
  protected readonly forId = computed(() => this.for() || this.htmlFor());

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
      'text-sm font-medium',
      this.class(),
    ),
  );
}
