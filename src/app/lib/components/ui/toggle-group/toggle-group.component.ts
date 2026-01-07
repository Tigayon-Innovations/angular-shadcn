import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    input,
    model,
    signal,
} from '@angular/core';
import type { ToggleVariants } from '../toggle/toggle-variants';
import { TOGGLE_GROUP_CONTEXT, type ToggleGroupContext } from './toggle-group-context';

/**
 * ToggleGroup component - a set of toggle buttons where one or more can be pressed.
 * Implements keyboard navigation per WAI-ARIA toolbar pattern.
 *
 * @example
 * <!-- Single selection -->
 * <ToggleGroup type="single" [(value)]="alignment">
 *   <ToggleGroupItem value="left" aria-label="Left aligned">
 *     <svg>...</svg>
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Center aligned">
 *     <svg>...</svg>
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="right" aria-label="Right aligned">
 *     <svg>...</svg>
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * <!-- Multiple selection -->
 * <ToggleGroup type="multiple" [(value)]="formats">
 *   <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
 * </ToggleGroup>
 */
@Component({
  selector: 'ToggleGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'role': 'group',
    '[attr.data-orientation]': 'orientation()',
    'data-slot': 'toggle-group',
  },
  providers: [
    {
      provide: TOGGLE_GROUP_CONTEXT,
      useFactory: (component: ToggleGroup) => component.context,
      deps: [forwardRef(() => ToggleGroup)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleGroup {
  private readonly elementRef: ElementRef<HTMLElement> = new ElementRef(document.createElement('div'));

  /** The current selected value(s) */
  readonly value = model<string | string[]>('');

  /** Selection type: single or multiple */
  readonly type = input<'single' | 'multiple'>('single');

  /** The visual style variant of the toggle items */
  readonly variant = input<ToggleVariants['variant']>('default');

  /** The size of the toggle items */
  readonly size = input<ToggleVariants['size']>('default');

  /** Whether the toggle group is disabled */
  readonly disabled = input<boolean>(false);

  /** The orientation of the toggle group */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.elementRef = elementRef;
  }

  /** Context for child ToggleGroupItem components */
  readonly context: ToggleGroupContext = {
    value: signal(this.value()),
    type: signal(this.type()),
    disabled: signal(this.disabled()),
    variant: signal(this.variant()),
    size: signal(this.size()),
    orientation: signal(this.orientation()),
    itemValues: signal<string[]>([]),
    toggle: (itemValue: string) => {
      const currentType = this.type();
      const currentValue = this.value();

      if (currentType === 'single') {
        const newValue = currentValue === itemValue ? '' : itemValue;
        this.value.set(newValue);
        this.context.value.set(newValue);
      } else {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        const newValue = currentArray.includes(itemValue)
          ? currentArray.filter((v) => v !== itemValue)
          : [...currentArray, itemValue];
        this.value.set(newValue);
        this.context.value.set(newValue);
      }
    },
    isPressed: (itemValue: string) => {
      const currentValue = this.context.value();
      if (Array.isArray(currentValue)) {
        return currentValue.includes(itemValue);
      }
      return currentValue === itemValue;
    },
    focusNext: (currentValue: string) => this.focusItem(currentValue, 1),
    focusPrevious: (currentValue: string) => this.focusItem(currentValue, -1),
    focusFirst: () => this.focusItemByIndex(0),
    focusLast: () => this.focusItemByIndex(this.context.itemValues().length - 1),
  };

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex items-center justify-center gap-1',
      this.orientation() === 'vertical' && 'flex-col',
      this.class()
    )
  );

  ngOnChanges() {
    this.context.value.set(this.value());
    this.context.type.set(this.type());
    this.context.disabled.set(this.disabled());
    this.context.variant.set(this.variant());
    this.context.size.set(this.size());
    this.context.orientation.set(this.orientation());
  }

  /** Focus a toggle item relative to the current item */
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

  /** Focus a toggle item by index */
  private focusItemByIndex(index: number): void {
    const values = this.context.itemValues();
    if (index < 0 || index >= values.length) return;

    const value = values[index];
    const item = this.elementRef.nativeElement.querySelector(
      `[data-slot="toggle-group-item"][data-value="${value}"]`
    ) as HTMLElement;
    if (item) {
      item.focus();
    }
  }
}
