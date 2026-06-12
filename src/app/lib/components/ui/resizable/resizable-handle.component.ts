import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RESIZABLE_CONTEXT } from './resizable-context';

let handleIdCounter = 0;

/**
 * ResizableHandle component - the draggable divider between panels.
 * Matches shadcn/ui React ResizableHandle exactly.
 *
 * ACCESSIBILITY: Fully keyboard accessible with arrow keys.
 * - Arrow keys resize in the direction of the handle
 * - Shift+Arrow keys for larger resize steps
 * - Home/End to set minimum/maximum sizes
 *
 * @example
 * <ResizableHandle />
 * <ResizableHandle withHandle />
 */
@Component({
  selector: 'ResizableHandle',
  template: `
    @if (withHandle()) {
      <div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-2.5 w-2.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </div>
    }
  `,
  host: {
    'attr.data-slot': '"resizable-handle"',
    '[class]': 'computedClass()',
    '[attr.data-panel-resize-handle]': 'true',
    '[attr.data-panel-resize-handle-id]': 'handleId',
    '[attr.role]': '"separator"',
    '[attr.aria-valuenow]': 'ariaValueNow()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
    '[attr.aria-orientation]': 'context.direction() === "horizontal" ? "vertical" : "horizontal"',
    '[attr.aria-label]': '"Resize handle. Use arrow keys to resize."',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
    '(keydown)': 'onKeyDown($event)',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizableHandle {
  /** Show a visible handle grip */
  readonly withHandle = input<boolean>(false);
  /** Whether the handle is disabled */
  readonly disabled = input<boolean>(false);
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(RESIZABLE_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      this.context.direction() === 'vertical' &&
        'h-px w-full after:left-0 after:h-1 after:w-full after:-translate-y-1/2 after:translate-x-0',
      '[&[data-panel-group-direction=vertical]>div]:rotate-90',
      this.isFocused() && 'ring-2 ring-ring',
      this.class(),
    ),
  );

  /** Whether dragging */
  private isDragging = signal(false);
  /** Whether focused for keyboard interaction */
  private isFocused = signal(false);
  /** ARIA value (approximate percentage) */
  protected readonly ariaValueNow = signal(50);

  /** Starting position */
  private startPosition = 0;
  /** Unique handle ID */
  readonly handleId = `handle-${handleIdCounter++}`;

  onFocus(): void {
    this.isFocused.set(true);
  }
  onBlur(): void {
    this.isFocused.set(false);
  }
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const isHorizontal = this.context.direction() === 'horizontal';
    const step = event.shiftKey ? 5 : 1; // Larger steps with Shift

    let delta = 0;

    switch (event.key) {
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          delta = -step;
        }
        break;
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          delta = step;
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          delta = -step;
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          delta = step;
        }
        break;
      case 'Home':
        event.preventDefault();
        delta = -100; // Go to minimum
        break;
      case 'End':
        event.preventDefault();
        delta = 100; // Go to maximum
        break;
      default:
        return;
    }

    if (delta !== 0) {
      this.context.startResize(this.handleId);
      this.context.onResize(delta);
      this.context.endResize();
      this.updateAriaValue(delta);
    }
  }
  onMouseDown(event: MouseEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    this.isDragging.set(true);
    this.startPosition = this.context.direction() === 'horizontal' ? event.clientX : event.clientY;
    this.context.startResize(this.handleId);

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging()) return;

      const currentPosition = this.context.direction() === 'horizontal' ? e.clientX : e.clientY;
      const delta = ((currentPosition - this.startPosition) / (typeof window !== 'undefined' ? window.innerWidth : 1000)) * 100;
      this.context.onResize(delta);
      this.startPosition = currentPosition;
    };

    const onMouseUp = () => {
      this.isDragging.set(false);
      this.context.endResize();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  onTouchStart(event: TouchEvent): void {
    if (this.disabled()) return;

    const touch = event.touches[0];
    this.isDragging.set(true);
    this.startPosition = this.context.direction() === 'horizontal' ? touch.clientX : touch.clientY;
    this.context.startResize(this.handleId);

    const onTouchMove = (e: TouchEvent) => {
      if (!this.isDragging()) return;

      const currentTouch = e.touches[0];
      const currentPosition =
        this.context.direction() === 'horizontal' ? currentTouch.clientX : currentTouch.clientY;
      const delta = ((currentPosition - this.startPosition) / (typeof window !== 'undefined' ? window.innerWidth : 1000)) * 100;
      this.context.onResize(delta);
      this.startPosition = currentPosition;
    };

    const onTouchEnd = () => {
      this.isDragging.set(false);
      this.context.endResize();
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }

  private updateAriaValue(delta: number): void {
    const current = this.ariaValueNow();
    const newValue = Math.max(0, Math.min(100, current + delta));
    this.ariaValueNow.set(newValue);
  }
}
