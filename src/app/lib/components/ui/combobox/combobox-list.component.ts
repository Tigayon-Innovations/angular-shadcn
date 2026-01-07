import {
    ChangeDetectionStrategy,
    Component,
    inject
} from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox-context';
import { ComboboxItem } from './combobox-item.component';

/**
 * ComboboxList component - renders filtered combobox items.
 * Automatically handles filtering and index assignment.
 *
 * @example
 * <ComboboxContent>
 *   <ComboboxInput placeholder="Search..." />
 *   <ComboboxEmpty>No options found.</ComboboxEmpty>
 *   <ComboboxGroup>
 *     <ComboboxList />
 *   </ComboboxGroup>
 * </ComboboxContent>
 */
@Component({
  selector: 'ComboboxList',
  imports: [ComboboxItem],
  template: `
    @for (option of context.filteredOptions(); track option.value; let i = $index) {
      <ComboboxItem [value]="option.value" [index]="i" [disabled]="option.disabled ?? false">
        {{ option.label }}
      </ComboboxItem>
    }
  `,
  host: {
    'class': 'contents',
    'data-slot': 'combobox-list',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxList {
  protected readonly context = inject(COMBOBOX_CONTEXT);
}
