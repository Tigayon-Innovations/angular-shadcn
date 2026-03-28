import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  signal,
  type WritableSignal,
} from '@angular/core';

export interface MenubarRadioGroupContext {
  value: WritableSignal<string>;
  setValue: (value: string) => void;
}

export const MENUBAR_RADIO_GROUP_CONTEXT = new InjectionToken<MenubarRadioGroupContext>(
  'MENUBAR_RADIO_GROUP_CONTEXT',
);

/**
 * MenubarRadioGroup component - group of radio items.
 * Matches shadcn/ui React MenubarRadioGroup exactly.
 */
@Component({
  selector: 'MenubarRadioGroup',
  template: `<ng-content />`,
  providers: [
    {
      provide: MENUBAR_RADIO_GROUP_CONTEXT,
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
export class MenubarRadioGroup {}
