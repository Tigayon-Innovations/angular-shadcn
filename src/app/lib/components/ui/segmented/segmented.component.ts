import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { SEGMENTED_CONTEXT, type SegmentedContext } from './segmented-context';
import { segmentedVariants, type SegmentedVariants } from './segmented-variants';

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
    'attr.data-slot': '"segmented"',
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

  /** The current selected value */
  readonly value = model<string>('');

  /** The size of the segmented control */
  readonly size = input<SegmentedVariants['size']>('default');
  /** Whether the segmented control is disabled */
  readonly disabled = input<boolean>(false);
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      segmentedVariants({
        size: this.size(),
      }),
      this.class(),
    ),
  );

  /** Context for child SegmentedItem components */
  readonly context: SegmentedContext = {
    value: signal(this.value()),
    disabled: signal(this.disabled()),
    onValueChange: (newValue: string) => {
      this.value.set(newValue);
      this.context.value.set(newValue);
    },
  };
}
