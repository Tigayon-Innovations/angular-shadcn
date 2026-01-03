import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    HostListener,
    inject,
    input,
} from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectContent component - the dropdown content container.
 *
 * @example
 * <SelectContent>
 *   <SelectItem value="option1">Option 1</SelectItem>
 *   <SelectItem value="option2">Option 2</SelectItem>
 * </SelectContent>
 */
@Component({
  selector: 'SelectContent',
  template: `
    @if (context?.open()) {
      <div [class]="viewportClass()">
        <ng-content />
      </div>
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'context?.open() ? "open" : "closed"',
    '[attr.data-side]': 'side()',
    '[attr.data-align]': 'align()',
    'role': 'listbox',
    'data-slot': 'select-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectContent {
  protected readonly context = inject(SELECT_CONTEXT, { optional: true });
  private readonly elementRef = inject(ElementRef);

  /** The side of the trigger to show the content */
  readonly side = input<'top' | 'bottom'>('bottom');

  /** The alignment of the content */
  readonly align = input<'start' | 'center' | 'end'>('start');

  /** Position strategy */
  readonly position = input<'popper' | 'item-aligned'>('popper');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.context?.open()) {
      // Check if click was on the trigger
      const trigger = this.elementRef.nativeElement.parentElement?.querySelector('[data-slot="select-trigger"]');
      if (!trigger?.contains(event.target as Node)) {
        this.context.open.set(false);
      }
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.context?.open.set(false);
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
      this.position() === 'popper' &&
        'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
      !this.context?.open() && 'hidden',
      this.class()
    )
  );

  /** Viewport class */
  protected readonly viewportClass = computed(() =>
    cn(
      'p-1',
      this.position() === 'popper' &&
        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
    )
  );
}
