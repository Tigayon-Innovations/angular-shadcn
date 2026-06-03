import { cn } from '@/lib/utils';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { COLLAPSIBLE_CONTEXT, CollapsibleContext } from './collapsible-context';

/**
 * Collapsible component - root container for collapsible content.
 * Matches shadcn/ui React Collapsible exactly.
 *
 * @example
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content here</CollapsibleContent>
 * </Collapsible>
 *
 * @example
 * <!-- With default open -->
 * <Collapsible [defaultOpen]="true">
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content here</CollapsibleContent>
 * </Collapsible>
 */
@Component({
  selector: 'Collapsible',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"collapsible"',
    '[class]': 'computedClass()',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
  providers: [
    {
      provide: COLLAPSIBLE_CONTEXT,
      useExisting: forwardRef(() => Collapsible),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Collapsible implements CollapsibleContext {
  constructor() {
    // Initialize with defaultOpen
    effect(() => {
      const defaultVal = this.defaultOpen();
      const controlled = this.open();

      if (controlled !== undefined) {
        this._isOpen.set(controlled);
      } else if (defaultVal && !this._isOpen()) {
        this._isOpen.set(defaultVal);
      }
    });
  }

  /** Event emitted when open state changes */
  readonly openChange = output<boolean>();

  /** Controlled open state - two-way binding supported */
  readonly open = model<boolean | undefined>(undefined);

  /** Whether the collapsible is open by default */
  readonly defaultOpen = input<boolean, unknown>(false, { transform: booleanAttribute });
  /** Whether the collapsible is disabled */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('', this.class()));

  /** Internal state for open/closed */
  private readonly _isOpen = signal<boolean>(false);

  /** Get the current open state */
  isOpen = () => this.open() ?? this._isOpen();
  /** Toggle the open state */
  toggle = () => {
    if (this.disabled()) return;

    const newState = !this.isOpen();

    if (this.open() === undefined) {
      this._isOpen.set(newState);
    }

    this.open.set(newState);
    this.openChange.emit(newState);
  };
}
