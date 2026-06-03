import { cn, Presence } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectContent component - the dropdown content container.
 * Uses simple absolute positioning inside the Select root for reliable
 * full-width dropdown rendering in forms.
 */
@Component({
  selector: 'SelectContent',
  imports: [Presence],
  template: `
    <Presence [present]="context?.open() ?? false">
      <div
        [class]="dropdownClass()"
        [attr.id]="context?.contentId"
        [attr.data-state]="context?.open() ? 'open' : 'closed'"
        [attr.data-side]="side()"
        [attr.data-align]="align()"
        [attr.aria-activedescendant]="focusedItemId()"
        role="listbox"
        (keydown.escape)="onEscape()"
        (keydown)="onKeydown($event)"
      >
        <div [class]="viewportClass()">
          <ng-content />
        </div>
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
    'attr.data-slot': '"select-content"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectContent {
  /** The side of the trigger to show the content */
  readonly side = input<'top' | 'bottom'>('bottom');

  /** The alignment of the content */
  readonly align = input<'start' | 'center' | 'end'>('start');
  /** Position strategy */
  readonly position = input<'popper' | 'item-aligned'>('popper');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly context = inject(SELECT_CONTEXT, { optional: true });

  /** Computed class combining base styles and custom classes */
  protected readonly dropdownClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-md border shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[state=closed]:pointer-events-none',
      this.class(),
    ),
  );

  /** Viewport class */
  protected readonly viewportClass = computed(() => cn('max-h-60 overflow-y-auto p-1'));

  /** ID of the currently focused item for aria-activedescendant */
  protected readonly focusedItemId = computed(() => {
    if (!this.context) return null;
    const values = this.context.itemValues();
    const focusedIndex = this.context.focusedIndex();
    const focusedValue = values[focusedIndex];
    return focusedValue ? `select-item-${focusedValue}` : null;
  });

  protected onEscape(): void {
    this.context?.setOpen(false);
    const trigger = this.context?.triggerElement();
    if (trigger) {
      setTimeout(() => trigger.focus());
    }
  }

  /** Handle printable character keys for typeahead search */
  onKeydown(event: KeyboardEvent): void {
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      this.context?.handleTypeahead(event.key);
    }
  }
}
