import { cn, Presence } from '@/lib/utils';
import { FocusTrapDirective } from '@/lib/utils/accessibility';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { DRAWER_CONTEXT } from './drawer-context';

/**
 * DrawerContent component - the content of the drawer.
 * Matches shadcn/ui React DrawerContent exactly with enhanced accessibility.
 * Includes focus trap, ARIA relationships, and focus restoration.
 */
@Component({
  selector: 'DrawerContent',
  imports: [FocusTrapDirective, Presence],
  template: `
    <Presence [present]="context.open()">
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        (click)="onOverlayClick($event)"
      ></div>
      <!-- Content -->
      <div
        #contentEl
        [class]="computedClass()"
        [style]="swipeStyle()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        role="dialog"
        aria-modal="true"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="context.titleId"
        [attr.aria-describedby]="context.descriptionId"
        hlmFocusTrap
        [trapFocus]="context.open()"
        (keydown.escape)="onEscapeKey()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
      >
        <!-- Handle -->
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div>
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    'attr.data-slot': '"drawer-content"',
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContent implements OnDestroy {
  constructor() {
    // Handle body scroll lock and focus restoration
    effect(() => {
      if (this.context.open()) {
        this.lockBodyScroll();
        // Focus first element when opened (browser-only, deferred)
        afterNextRender(
          () => {
            this.focusFirstElement();
          },
          { injector: this._injector },
        );
      } else {
        this.unlockBodyScroll();
        this.restoreFocus();
      }
    });
  }

  private readonly contentEl = viewChild<ElementRef<HTMLElement>>('contentEl');

  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _injector = inject(Injector);

  protected readonly context = inject(DRAWER_CONTEXT);

  protected readonly computedClass = computed(() => {
    const directionClasses = {
      top: 'inset-x-0 top-0 mb-24 rounded-b-[10px] border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
      bottom:
        'inset-x-0 bottom-0 mt-24 rounded-t-[10px] border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
      left: 'inset-y-0 left-0 mr-24 w-auto rounded-r-[10px] border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
      right:
        'inset-y-0 right-0 ml-24 w-auto rounded-l-[10px] border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
    };

    return cn(
      'fixed z-50 flex flex-col bg-background text-foreground',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=open]:duration-500 data-[state=closed]:duration-300',
      directionClasses[this.context.direction],
      this.class(),
    );
  });

  protected readonly swipeDelta = signal(0);
  private touchStartCoord = 0;

  protected readonly swipeStyle = computed(() => {
    const delta = this.swipeDelta();
    if (delta === 0) return '';
    const dir = this.context.direction;
    if (dir === 'bottom' || dir === 'top') return { transform: `translateY(${delta}px)` };
    return { transform: `translateX(${delta}px)` };
  });

  /** Previous body overflow style for restoration */
  private previousBodyOverflow = '';

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  onOverlayClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }
  onEscapeKey(): void {
    this.context.setOpen(false);
  }
  onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    const dir = this.context.direction;
    this.touchStartCoord = dir === 'bottom' || dir === 'top' ? touch.clientY : touch.clientX;
  }
  onTouchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    const dir = this.context.direction;
    const coord = dir === 'bottom' || dir === 'top' ? touch.clientY : touch.clientX;
    const rawDelta = coord - this.touchStartCoord;
    // Only allow dragging in the "away" direction
    const isAway =
      (dir === 'bottom' && rawDelta > 0) ||
      (dir === 'top' && rawDelta < 0) ||
      (dir === 'right' && rawDelta > 0) ||
      (dir === 'left' && rawDelta < 0);
    this.swipeDelta.set(isAway ? rawDelta : 0);
  }
  onTouchEnd(): void {
    const threshold = 80;
    if (Math.abs(this.swipeDelta()) >= threshold) {
      this.swipeDelta.set(0);
      this.context.setOpen(false);
    } else {
      this.swipeDelta.set(0);
    }
    this.touchStartCoord = 0;
  }

  private focusFirstElement(): void {
    setTimeout(() => {
      const content = this.contentEl()?.nativeElement;
      if (content) {
        const focusable = content.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) as HTMLElement;
        focusable?.focus();
      }
    });
  }
  private restoreFocus(): void {
    const trigger = this.context.triggerElement();
    if (trigger) {
      setTimeout(() => trigger.focus());
    }
  }
  private lockBodyScroll(): void {
    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  private unlockBodyScroll(): void {
    document.body.style.overflow = this.previousBodyOverflow;
  }
}
