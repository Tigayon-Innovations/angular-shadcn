import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { ToggleVariants } from '../toggle/toggle-variants';
import {
  TOGGLE_GROUP_CONTEXT,
  type ToggleGroupContext,
  type ToggleGroupOrientation,
  type ToggleGroupType,
} from './toggle-group-context';

// ============================================================================
// Types
// ============================================================================

export type ToggleGroupProps = {
  /** Selection type: single or multiple */
  type?: ToggleGroupType;
  /** Current selected value(s) */
  value?: string | string[];
  /** Default value for uncontrolled mode */
  defaultValue?: string | string[];
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Visual variant for all items */
  variant?: ToggleVariants['variant'];
  /** Size for all items */
  size?: ToggleVariants['size'];
  /** Orientation for keyboard navigation */
  orientation?: ToggleGroupOrientation;
  /** Whether to loop focus at boundaries */
  loop?: boolean;
  /** Whether focus should follow selection */
  rovingFocus?: boolean;
  /** Additional CSS classes */
  class?: string;
};

// ============================================================================
// ToggleGroup Component
// ============================================================================

/**
 * ToggleGroup component - a set of toggle buttons where one or more can be pressed.
 * Based on Radix UI ToggleGroup primitive with shadcn/ui styling.
 * Implements keyboard navigation per WAI-ARIA toolbar pattern.
 *
 * ## Features
 * - Single selection (only one item pressed at a time)
 * - Multiple selection (any number of items can be pressed)
 * - Full keyboard navigation with arrow keys
 * - Roving tabindex for efficient keyboard navigation
 * - Configurable variants and sizes for all items
 * - Horizontal or vertical orientation
 *
 * ## Accessibility
 * - Uses `role="group"` for grouping semantics
 * - `aria-orientation` indicates layout direction
 * - Roving tabindex: only one item is in tab order
 * - Arrow keys navigate between items
 * - Home/End keys navigate to first/last item
 *
 * ## Keyboard Navigation
 * - **ArrowRight/ArrowDown**: Focus next item
 * - **ArrowLeft/ArrowUp**: Focus previous item
 * - **Home**: Focus first item
 * - **End**: Focus last item
 * - **Space/Enter**: Toggle focused item
 *
 * ## Data Attributes
 * - `data-orientation`: "horizontal" | "vertical"
 *
 * @example
 * <!-- Single selection -->
 * <ToggleGroup type="single" [(value)]="alignment">
 *   <ToggleGroupItem value="left" aria-label="Align left">
 *     <AlignLeftIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Align center">
 *     <AlignCenterIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="right" aria-label="Align right">
 *     <AlignRightIcon />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * <!-- Multiple selection -->
 * <ToggleGroup type="multiple" [(value)]="formats">
 *   <ToggleGroupItem value="bold" aria-label="Toggle bold">
 *     <BoldIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="italic" aria-label="Toggle italic">
 *     <ItalicIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="underline" aria-label="Toggle underline">
 *     <UnderlineIcon />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * <!-- With outline variant -->
 * <ToggleGroup type="single" variant="outline" [(value)]="view">
 *   <ToggleGroupItem value="list">List</ToggleGroupItem>
 *   <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * <!-- Vertical orientation -->
 * <ToggleGroup type="single" orientation="vertical" [(value)]="size">
 *   <ToggleGroupItem value="sm">Small</ToggleGroupItem>
 *   <ToggleGroupItem value="md">Medium</ToggleGroupItem>
 *   <ToggleGroupItem value="lg">Large</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/toggle-group Radix ToggleGroup}
 * @see {@link https://ui.shadcn.com/docs/components/toggle-group shadcn/ui ToggleGroup}
 */
@Component({
  selector: 'ToggleGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'group',
    '[attr.aria-orientation]': 'orientation()',
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** The current selected value(s) */
  readonly value = model<string | string[]>('');

  /** Default value for uncontrolled mode */
  readonly defaultValue = input<string | string[]>('');

  /** Selection type: single or multiple */
  readonly type = input<ToggleGroupType>('single');

  /** The visual style variant of the toggle items */
  readonly variant = input<ToggleVariants['variant']>('default');

  /** The size of the toggle items */
  readonly size = input<ToggleVariants['size']>('default');

  /** Whether the toggle group is disabled */
  readonly disabled = input<boolean>(false);

  /** The orientation of the toggle group */
  readonly orientation = input<ToggleGroupOrientation>('horizontal');

  /** Whether to loop focus at boundaries */
  readonly loop = input<boolean>(true);

  /** Whether focus should follow selection in single mode */
  readonly rovingFocus = input<boolean>(true);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Emitted when value changes */
  readonly valueChange = output<string | string[]>();

  /** Context for child ToggleGroupItem components */
  readonly context: ToggleGroupContext = {
    value: signal(this.value()),
    type: signal(this.type()),
    disabled: signal(this.disabled()),
    variant: signal(this.variant()),
    size: signal(this.size()),
    orientation: signal(this.orientation()),
    loop: signal(this.loop()),
    rovingFocus: signal(this.rovingFocus()),
    itemValues: signal<string[]>([]),
    focusedValue: signal<string | null>(null),
    toggle: (itemValue: string) => {
      const currentType = this.type();
      const currentValue = this.value();

      let newValue: string | string[];

      if (currentType === 'single') {
        // In single mode, toggle off if same value, otherwise set new value
        newValue = currentValue === itemValue ? '' : itemValue;
      } else {
        // In multiple mode, add or remove from array
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        newValue = currentArray.includes(itemValue)
          ? currentArray.filter((v) => v !== itemValue)
          : [...currentArray, itemValue];
      }

      this.value.set(newValue);
      this.context.value.set(newValue);
      this.valueChange.emit(newValue);
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
      this.class(),
    ),
  );

  ngOnChanges(): void {
    this.context.value.set(this.value());
    this.context.type.set(this.type());
    this.context.disabled.set(this.disabled());
    this.context.variant.set(this.variant());
    this.context.size.set(this.size());
    this.context.orientation.set(this.orientation());
    this.context.loop.set(this.loop());
    this.context.rovingFocus.set(this.rovingFocus());
  }

  /** Focus a toggle item relative to the current item */
  private focusItem(currentValue: string, direction: number): void {
    const values = this.context.itemValues();
    const currentIndex = values.indexOf(currentValue);
    if (currentIndex === -1) return;

    const shouldLoop = this.loop();
    let nextIndex = currentIndex + direction;

    if (shouldLoop) {
      // Wrap around
      if (nextIndex < 0) nextIndex = values.length - 1;
      if (nextIndex >= values.length) nextIndex = 0;
    } else {
      // Clamp to boundaries
      if (nextIndex < 0 || nextIndex >= values.length) return;
    }

    this.focusItemByIndex(nextIndex);
  }

  /** Focus a toggle item by index */
  private focusItemByIndex(index: number): void {
    const values = this.context.itemValues();
    if (index < 0 || index >= values.length) return;

    const value = values[index];
    this.context.focusedValue.set(value);

    const item = this.elementRef.nativeElement.querySelector(
      `[data-slot="toggle-group-item"][data-value="${value}"]`,
    ) as HTMLElement;

    if (item) {
      item.focus();
    }
  }
}
