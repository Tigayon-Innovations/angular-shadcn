import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    signal,
} from '@angular/core';
import { RESIZABLE_CONTEXT } from './resizable-context';

let handleIdCounter = 0;

/**
 * ResizableHandle component - the draggable divider between panels.
 * Matches shadcn/ui React ResizableHandle exactly.
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
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </div>
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-panel-resize-handle]': 'true',
    '[attr.data-panel-resize-handle-id]': 'handleId',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizableHandle {
  private readonly context = inject(RESIZABLE_CONTEXT);

  /** Show a visible handle grip */
  readonly withHandle = input<boolean>(false);

  /** Whether the handle is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Unique handle ID */
  readonly handleId = `handle-${handleIdCounter++}`;

  /** Whether dragging */
  private isDragging = signal(false);

  /** Starting position */
  private startPosition = 0;

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      this.context.direction() === 'vertical' &&
        'h-px w-full after:left-0 after:h-1 after:w-full after:-translate-y-1/2 after:translate-x-0',
      '[&[data-panel-group-direction=vertical]>div]:rotate-90',
      this.class()
    )
  );

  onMouseDown(event: MouseEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    this.isDragging.set(true);
    this.startPosition = this.context.direction() === 'horizontal' ? event.clientX : event.clientY;
    this.context.startResize(this.handleId);

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging()) return;

      const currentPosition = this.context.direction() === 'horizontal' ? e.clientX : e.clientY;
      const delta = ((currentPosition - this.startPosition) / window.innerWidth) * 100;
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
      const currentPosition = this.context.direction() === 'horizontal' ? currentTouch.clientX : currentTouch.clientY;
      const delta = ((currentPosition - this.startPosition) / window.innerWidth) * 100;
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
}
