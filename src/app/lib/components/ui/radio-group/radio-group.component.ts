import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    input,
    model,
    signal
} from '@angular/core';
import { RADIO_GROUP_CONTEXT, type RadioGroupContext } from './radio-group-context';

/**
 * RadioGroup component for single selection from multiple options.
 * Implements roving tabindex and arrow key navigation per WAI-ARIA radiogroup pattern.
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
  private readonly elementRef: ElementRef<HTMLElement> = new ElementRef(document.createElement('div'));

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

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.elementRef = elementRef;
  }

  /** Context for child RadioGroupItem components */
  readonly context: RadioGroupContext = {
    value: signal(this.value()),
    disabled: signal(this.disabled()),
    name: signal(this.name()),
    orientation: signal(this.orientation()),
    itemValues: signal<string[]>([]),
    setValue: (value: string) => {
      this.value.set(value);
      this.context.value.set(value);
    },
    focusNext: (currentValue: string) => this.focusItem(currentValue, 1),
    focusPrevious: (currentValue: string) => this.focusItem(currentValue, -1),
    focusFirst: () => this.focusItemByIndex(0),
    focusLast: () => this.focusItemByIndex(this.context.itemValues().length - 1),
  };

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
    this.context.orientation.set(this.orientation());
  }

  /** Focus a radio item relative to the current item */
  private focusItem(currentValue: string, direction: number): void {
    const values = this.context.itemValues();
    const currentIndex = values.indexOf(currentValue);
    if (currentIndex === -1) return;

    // Wrap around
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = values.length - 1;
    if (nextIndex >= values.length) nextIndex = 0;

    this.focusItemByIndex(nextIndex);
  }

  /** Focus a radio item by index */
  private focusItemByIndex(index: number): void {
    const values = this.context.itemValues();
    if (index < 0 || index >= values.length) return;

    const value = values[index];
    const item = this.elementRef.nativeElement.querySelector(
      `[data-slot="radio-group-item"][data-value="${value}"]`
    ) as HTMLElement;
    if (item) {
      item.focus();
      // Also select the item on focus (per ARIA spec)
      this.context.setValue(value);
    }
  }
}
