import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectContent component - the dropdown content container.
 * Uses simple absolute positioning inside the Select root for reliable
 * full-width dropdown rendering in forms.
 */
@Component({
  selector: 'SelectContent',
  template: `
    <div
      [class]="dropdownClass()"
      [attr.id]="context?.contentId"
      [attr.data-state]="context?.open() ? 'open' : 'closed'"
      [attr.data-side]="side()"
      [attr.data-align]="align()"
      role="listbox"
      aria-label="Options"
      (keydown.escape)="onEscape()"
    >
      <div [class]="viewportClass()">
        <ng-content />
      </div>
    </div>
  `,
  host: {
    class: 'contents',
    'data-slot': 'select-content',
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
      'animate-in fade-in-0 zoom-in-95',
      !this.context?.open() && 'pointer-events-none invisible opacity-0',
      this.class(),
    ),
  );

  /** Viewport class */
  protected readonly viewportClass = computed(() => cn('max-h-60 overflow-y-auto p-1'));

  protected onEscape(): void {
    this.context?.setOpen(false);
    const trigger = this.context?.triggerElement();
    if (trigger) {
      setTimeout(() => trigger.focus());
    }
  }
}
