import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { SELECT_CONTEXT, type SelectContext } from './select-context';

/**
 * Select component - a dropdown selection input.
 *
 * @example
 * <Select [(value)]="selectedFruit">
 *   <SelectTrigger class="w-[180px]">
 *     <SelectValue placeholder="Select a fruit" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *     <SelectItem value="orange">Orange</SelectItem>
 *   </SelectContent>
 * </Select>
 */
@Component({
  selector: 'Select',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    'data-slot': 'select',
  },
  providers: [
    {
      provide: SELECT_CONTEXT,
      useFactory: (component: Select) => component.context,
      deps: [forwardRef(() => Select)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select {
  /** The current selected value */
  readonly value = model<string>('');

  /** Whether the select is open */
  readonly open = model<boolean>(false);

  /** Whether the select is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Context for child components */
  readonly context: SelectContext = {
    value: signal(this.value()),
    open: signal(this.open()),
    disabled: signal(this.disabled()),
    placeholder: signal(''),
    selectedLabel: signal(''),
    setValue: (value: string, label?: string) => {
      this.value.set(value);
      this.context.value.set(value);
      if (label) {
        this.context.selectedLabel.set(label);
      }
      this.open.set(false);
      this.context.open.set(false);
    },
  };

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('relative inline-block', this.class())
  );

  ngOnChanges() {
    this.context.value.set(this.value());
    this.context.open.set(this.open());
    this.context.disabled.set(this.disabled());
  }
}
