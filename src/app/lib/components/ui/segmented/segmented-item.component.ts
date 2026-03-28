import { cn } from '@/lib/utils'
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { SEGMENTED_CONTEXT } from './segmented-context'
import { segmentedItemVariants } from './segmented-variants'

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
        '[attr.role]': 'itemRole()',
        '[attr.aria-selected]': 'itemRole() === "tab" ? isSelected() : null',
        '[attr.aria-pressed]': 'itemRole() === "button" ? isSelected() : null',
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
    /** The value of this item */
    readonly value = input.required<string>()

    /** Whether this item is disabled */
    readonly disabled = input<boolean>(false)
    /** ARIA role to apply on the segmented item */
    readonly role = input<'tab' | 'button'>('tab')
    /** Additional CSS classes to apply */
    readonly class = input<string>('')

    private readonly _context = inject(SEGMENTED_CONTEXT, { optional: true })

    /** Whether this item is selected */
    protected readonly isSelected = computed(() => this._context?.value() === this.value())
    /** Effective ARIA role for this item */
    protected readonly itemRole = computed(() => this.role())
    /** Whether this item is disabled */
    protected readonly isDisabled = computed(() => this.disabled() || this._context?.disabled())
    /** Computed class combining variants and custom classes */
    protected readonly computedClass = computed(() =>
        cn(
            segmentedItemVariants({
                size: 'default',
            }),
            this.class(),
        ),
    )

    /** Handle click */
    protected onClick(): void {
        if (!this.isDisabled()) {
            this._context?.onValueChange(this.value())
        }
    }
}
