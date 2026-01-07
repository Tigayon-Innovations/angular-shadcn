import { cn } from '@/lib/utils';
import { ClickOutsideDirective } from '@/lib/utils/accessibility';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectContent component - the dropdown content container.
 * Implements proper ARIA listbox pattern.
 *
 * @example
 * <SelectContent>
 *   <SelectItem value="option1">Option 1</SelectItem>
 *   <SelectItem value="option2">Option 2</SelectItem>
 * </SelectContent>
 */
@Component({
  selector: 'SelectContent',
  imports: [ClickOutsideDirective],
  template: `
    @if (context?.open()) {
      <div
        [class]="dropdownClass()"
        [attr.id]="context?.contentId"
        [attr.data-state]="context?.open() ? 'open' : 'closed'"
        [attr.data-side]="side()"
        [attr.data-align]="align()"
        role="listbox"
        aria-label="Options"
        (clickOutside)="onClickOutside()"
        (keydown.escape)="onEscape()"
      >
        <div [class]="viewportClass()">
          <ng-content />
        </div>
      </div>
    }
  `,
  host: {
    'class': 'contents',
    'data-slot': 'select-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectContent {
  protected readonly context = inject(SELECT_CONTEXT, { optional: true });

  /** The side of the trigger to show the content */
  readonly side = input<'top' | 'bottom'>('bottom');

  /** The alignment of the content */
  readonly align = input<'start' | 'center' | 'end'>('start');

  /** Position strategy */
  readonly position = input<'popper' | 'item-aligned'>('popper');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected onClickOutside(): void {
    this.context?.open.set(false);
  }

  protected onEscape(): void {
    this.context?.open.set(false);
    // Restore focus to trigger
    const trigger = this.context?.triggerElement();
    if (trigger) {
      setTimeout(() => trigger.focus());
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly dropdownClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground absolute z-50 mt-1 max-h-60 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
      this.position() === 'popper' &&
        'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
      this.class()
    )
  );

  /** Viewport class */
  protected readonly viewportClass = computed(() =>
    cn(
      'p-1 overflow-y-auto max-h-60',
      this.position() === 'popper' && 'w-full min-w-[var(--radix-select-trigger-width)]'
    )
  );
}
