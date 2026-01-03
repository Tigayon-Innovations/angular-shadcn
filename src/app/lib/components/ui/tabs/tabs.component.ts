import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    forwardRef,
    input,
    signal,
} from '@angular/core';
import { TABS_CONTEXT, TabsContext } from './tabs-context';

/**
 * Tabs component - root container for tabbed interface.
 * Matches shadcn/ui React Tabs exactly.
 *
 * @example
 * <Tabs defaultValue="account" class="w-[400px]">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account content</TabsContent>
 *   <TabsContent value="password">Password content</TabsContent>
 * </Tabs>
 */
@Component({
  selector: 'Tabs',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-orientation]': '"horizontal"',
  },
  providers: [
    {
      provide: TABS_CONTEXT,
      useExisting: forwardRef(() => Tabs),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs implements TabsContext {
  /** Default value - the tab that should be open initially */
  readonly defaultValue = input<string>('');

  /** Controlled value - external control of active tab */
  readonly controlledValue = input<string | undefined>(undefined, { alias: 'value' });

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Internal state for the active tab value */
  private readonly _value = signal<string>('');

  constructor() {
    // Initialize with defaultValue
    effect(() => {
      const defaultVal = this.defaultValue();
      const controlled = this.controlledValue();

      // Controlled takes precedence
      if (controlled !== undefined) {
        this._value.set(controlled);
      } else if (defaultVal && !this._value()) {
        this._value.set(defaultVal);
      }
    });
  }

  /** Get the current active tab value */
  value = () => this.controlledValue() ?? this._value();

  /** Handle tab change */
  onValueChange = (newValue: string) => {
    if (this.controlledValue() === undefined) {
      this._value.set(newValue);
    }
  };

  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-2', this.class())
  );
}
