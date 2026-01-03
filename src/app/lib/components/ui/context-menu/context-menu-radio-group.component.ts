import { ChangeDetectionStrategy, Component, InjectionToken, signal, type WritableSignal } from '@angular/core';

export interface ContextMenuRadioGroupContext {
  value: WritableSignal<string>;
  setValue: (value: string) => void;
}

export const CONTEXT_MENU_RADIO_GROUP_CONTEXT = new InjectionToken<ContextMenuRadioGroupContext>(
  'CONTEXT_MENU_RADIO_GROUP_CONTEXT'
);

/**
 * ContextMenuRadioGroup component - a group of radio items.
 * Matches shadcn/ui React ContextMenuRadioGroup exactly.
 */
@Component({
  selector: 'ContextMenuRadioGroup',
  template: `<ng-content />`,
  providers: [
    {
      provide: CONTEXT_MENU_RADIO_GROUP_CONTEXT,
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
export class ContextMenuRadioGroup {}
