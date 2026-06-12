import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldSeparator component - visual divider between fields,
 * with optional centered content text (e.g. "Or continue with").
 *
 * @example
 * <!-- Plain separator -->
 * <FieldSeparator />
 *
 * <!-- With centered content -->
 * <FieldSeparator content="Or continue with" />
 */
@Component({
  selector: 'FieldSeparator',
  template: `
    <div class="bg-border absolute inset-0 top-1/2 h-px w-full" aria-hidden="true"></div>
    @if (content()) {
      <span
        class="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
        data-slot="field-separator-content"
      >
        {{ content() }}
      </span>
    }
  `,
  host: {
    'attr.data-slot': '"field-separator"',
    '[attr.data-content]': 'hasContent()',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSeparator {
  /** Optional content text rendered centered on the separator line */
  readonly content = input<string>('');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether content text is present */
  protected readonly hasContent = computed(() => !!this.content());

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('relative -my-2 h-5 text-sm', this.class()),
  );
}
