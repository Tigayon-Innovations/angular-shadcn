import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { SELECT_GROUP_CONTEXT, type SelectGroupContext } from './select-context';

/**
 * SelectGroup component - groups related select items.
 *
 * @example
 * <SelectGroup>
 *   <SelectLabel>Fruits</SelectLabel>
 *   <SelectItem value="apple">Apple</SelectItem>
 *   <SelectItem value="banana">Banana</SelectItem>
 * </SelectGroup>
 */
@Component({
  selector: 'SelectGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'role': 'group',
    '[attr.aria-labelledby]': 'labelId()',
    'data-slot': 'select-group',
  },
  providers: [
    {
      provide: SELECT_GROUP_CONTEXT,
      useFactory: (component: SelectGroup) => component.context,
      deps: [forwardRef(() => SelectGroup)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGroup {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Label ID for accessibility */
  readonly labelId = input<string>();

  /** Context for child components */
  readonly context: SelectGroupContext = {
    label: signal(''),
  };

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('overflow-hidden p-1 text-foreground', this.class())
  );
}
