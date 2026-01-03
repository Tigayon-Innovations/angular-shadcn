import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import {
  SEGMENTED_CONTEXT,
  type SegmentedContext,
} from './segmented-context';
import {
  segmentedItemVariants,
  segmentedVariants,
  type SegmentedVariants,
} from './segmented-variants';

/**
 * Segmented component - iOS-style segmented control buttons.
 *
 * @example
 * <!-- Basic usage -->
 * <Segmented [(value)]="selected">
 *   <SegmentedItem value="all">All</SegmentedItem>
 *   <SegmentedItem value="unread">Unread</SegmentedItem>
 *   <SegmentedItem value="archived">Archived</SegmentedItem>
 * </Segmented>
 *
 * <!-- With size -->
 * <Segmented size="lg" [(value)]="view">
 *   <SegmentedItem value="grid">Grid</SegmentedItem>
 *   <SegmentedItem value="list">List</SegmentedItem>
 * </Segmented>
 */
@Component({
  selector: 'Segmented',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'tablist',
    '[attr.aria-orientation]': '"horizontal"',
  },
  providers: [
    {
      provide: SEGMENTED_CONTEXT,
      useFactory: (component: Segmented) => component.context,
      deps: [forwardRef(() => Segmented)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Segmented {
  /** The current selected value */
  readonly value = model<string>('');

  /** The size of the segmented control */
  readonly size = input<SegmentedVariants['size']>('default');

  /** Whether the segmented control is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Context for child SegmentedItem components */
  readonly context: SegmentedContext = {
    value: signal(this.value()),
    disabled: signal(this.disabled()),
    onValueChange: (newValue: string) => {
      this.value.set(newValue);
      this.context.value.set(newValue);
    },
  };

  constructor() {
    // Sync value changes to context
    effect(() => {
      this.context.value.set(this.value());
    });

    // Sync disabled changes to context
    effect(() => {
      this.context.disabled.set(this.disabled());
    });
  }

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      segmentedVariants({
        size: this.size(),
      }),
      this.class()
    )
  );
}

/**
 * SegmentedItem component - individual item in a segmented control.
 *
 * @example
 * <SegmentedItem value="option1">Option 1</SegmentedItem>
 */
@Component({
  selector: 'SegmentedItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'tab',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.data-state]': 'isSelected() ? "active" : "inactive"',
    '[attr.disabled]': 'isDisabled() || null',
    '[tabindex]': 'isDisabled() ? -1 : 0',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onClick(); $event.preventDefault()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedItem {
  private readonly context = inject(SEGMENTED_CONTEXT, { optional: true });

  /** The value of this item */
  readonly value = input.required<string>();

  /** Whether this item is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether this item is selected */
  protected readonly isSelected = computed(
    () => this.context?.value() === this.value()
  );

  /** Whether this item is disabled */
  protected readonly isDisabled = computed(
    () => this.disabled() || this.context?.disabled()
  );

  /** Handle click */
  protected onClick(): void {
    if (!this.isDisabled()) {
      this.context?.onValueChange(this.value());
    }
  }

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      segmentedItemVariants({
        size: 'default',
      }),
      this.class()
    )
  );
}
