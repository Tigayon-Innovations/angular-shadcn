import { cn } from '@/lib/utils'
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { COMBOBOX_CONTEXT } from './combobox-context'

import { LucideAngularModule } from 'lucide-angular'

/**
 * ComboboxValue component - displays the selected value or placeholder.
 */
@Component({
    selector: 'ComboboxValue',
    imports: [LucideAngularModule],
    template: ` @if (selectedOption(); as option) {
            <span class="flex items-center gap-2 text-foreground">
                @if (option.icon && iconPosition() === 'left') {
                    <lucide-icon [img]="option.icon" class="h-4 w-4 shrink-0" />
                }

                <span class="truncate">{{ option.label }}</span>

                @if (option.icon && iconPosition() === 'right') {
                    <lucide-icon [img]="option.icon" class="h-4 w-4 shrink-0 ms-auto" />
                }
            </span>
        } @else {
            <span class="text-neutral-500">{{ placeholder() }}</span>
        }`,
    host: {
        '[class]': 'computedClass()',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxValue {
    protected readonly context = inject(COMBOBOX_CONTEXT)

    /** icon position either left or right text */
    readonly iconPosition = computed(() => this.context.iconPosition())

    /** Placeholder text */
    readonly placeholder = input<string>('Select...')

    /** Additional CSS classes */
    readonly class = input<string>('')

    // protected readonly selectedLabel = computed(() => {
    //   const value = this.context.value();
    //   const options = this.context.options();
    //   const option = options.find((o) => o.value === value);
    //   return option?.label || '';
    // });

    protected readonly selectedOption = computed(() => {
        const value = this.context.value()
        return this.context.options().find((option) => option.value === value)
    })

    protected readonly computedClass = computed(() =>
        cn('pointer-events-none flex-1 text-left', this.class()),
    )
}
