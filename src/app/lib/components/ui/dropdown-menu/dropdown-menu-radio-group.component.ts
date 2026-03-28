import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  model,
  output,
  signal,
  type WritableSignal,
} from '@angular/core';

export interface DropdownMenuRadioGroupContext {
  value: WritableSignal<string>;
  setValue: (value: string) => void;
}

export const DROPDOWN_MENU_RADIO_GROUP_CONTEXT = new InjectionToken<DropdownMenuRadioGroupContext>(
  'DROPDOWN_MENU_RADIO_GROUP_CONTEXT',
);

/**
 * DropdownMenuRadioGroup component - a group of radio items in the dropdown.
 * Matches shadcn/ui React DropdownMenuRadioGroup exactly.
 */
@Component({
  selector: 'DropdownMenuRadioGroup',
  template: `<ng-content />`,
  providers: [
    {
      provide: DROPDOWN_MENU_RADIO_GROUP_CONTEXT,
      useFactory: () => {
        const internalValue = signal('');
        return {
          value: internalValue,
          setValue: (newValue: string) => internalValue.set(newValue),
        };
      },
    },
  ],
  host: {
    '[attr.role]': '"group"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuRadioGroup {
  /** Value change event */
  readonly onValueChange = output<string>();

  /** The current value */
  readonly value = model<string>('');
}
