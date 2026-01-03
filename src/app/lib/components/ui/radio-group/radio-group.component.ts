import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    input,
    model,
    signal
} from '@angular/core';
import { RADIO_GROUP_CONTEXT, type RadioGroupContext } from './radio-group-context';

/**
 * RadioGroup component for single selection from multiple options.
 *
 * @example
 * <RadioGroup [(value)]="selectedValue">
 *   <div class="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="option1" />
 *     <Label for="option1">Option 1</Label>
 *   </div>
 *   <div class="flex items-center space-x-2">
 *     <RadioGroupItem value="option2" id="option2" />
 *     <Label for="option2">Option 2</Label>
 *   </div>
 * </RadioGroup>
 */
@Component({
  selector: 'RadioGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'role': 'radiogroup',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    'data-slot': 'radio-group',
  },
  providers: [
    {
      provide: RADIO_GROUP_CONTEXT,
      useFactory: (component: RadioGroup) => component.context,
      deps: [forwardRef(() => RadioGroup)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroup {
  /** The current selected value */
  readonly value = model<string>('');

  /** Whether the radio group is disabled */
  readonly disabled = input<boolean>(false);

  /** The orientation of the radio group */
  readonly orientation = input<'horizontal' | 'vertical'>('vertical');

  /** The name attribute for the radio inputs */
  readonly name = input<string>(`radio-group-${Math.random().toString(36).substring(7)}`);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Context for child RadioGroupItem components */
  readonly context: RadioGroupContext = {
    value: signal(this.value()),
    disabled: signal(this.disabled()),
    name: signal(this.name()),
    setValue: (value: string) => {
      this.value.set(value);
      this.context.value.set(value);
    },
  };

  constructor() {
    // Keep context in sync with inputs
    // Using computed effects would be cleaner but this works for now
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'grid gap-3',
      this.orientation() === 'horizontal' && 'flex flex-row',
      this.class()
    )
  );

  ngOnChanges() {
    this.context.value.set(this.value());
    this.context.disabled.set(this.disabled());
    this.context.name.set(this.name());
  }
}
