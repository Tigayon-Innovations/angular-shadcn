import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox-context';

/**
 * ComboboxValue component - displays the selected value or placeholder.
 */
@Component({
  selector: 'ComboboxValue',
  template: `
    @if (selectedLabel()) {
      {{ selectedLabel() }}
    } @else {
      <span class="text-muted-foreground">{{ placeholder() }}</span>
    }
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxValue {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** Placeholder text */
  readonly placeholder = input<string>('Select...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly selectedLabel = computed(() => {
    const value = this.context.value();
    const options = this.context.options();
    const option = options.find((o) => o.value === value);
    return option?.label || '';
  });

  protected readonly computedClass = computed(() =>
    cn('pointer-events-none flex-1 text-left', this.class())
  );
}
