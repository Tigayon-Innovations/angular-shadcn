import { cn } from '@/lib/utils';
import { FocusTrapDirective } from '@/lib/utils/accessibility';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    OnDestroy,
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
  imports: [FocusTrapDirective],
  template: `
    @if (context.open()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80"
        (click)="onOverlayClick($event)"
      ></div>
      <!-- Content -->
      <div
        #contentEl
        [class]="computedClass()"
        role="dialog"
        aria-modal="true"
        [attr.id]="context.contentId"
        [attr.aria-labelledby]="context.titleId"
        [attr.aria-describedby]="context.descriptionId"
        hlmFocusTrap
        [trapFocus]="context.open()"
        (keydown.escape)="onEscapeKey()"
      >
        <!-- Handle -->
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div>
        <ng-content />
      </div>
    }
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContent implements AfterViewInit, OnDestroy {
  protected readonly context = inject(DRAWER_CONTEXT);
  private readonly contentEl = viewChild<ElementRef<HTMLElement>>('contentEl');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Previous body overflow style for restoration */
  private previousBodyOverflow = '';

  constructor() {
    // Handle body scroll lock and focus restoration
    effect(() => {
      if (this.context.open()) {
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
        this.restoreFocus();
      }
    });
  }

  ngAfterViewInit(): void {
    // Focus first focusable element when opened
    if (this.context.open()) {
      this.focusFirstElement();
    }
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  protected readonly computedClass = computed(() => {
    const directionClasses = {
      top: 'inset-x-0 top-0 mb-24 rounded-b-[10px] border-b',
      bottom: 'inset-x-0 bottom-0 mt-24 rounded-t-[10px] border-t',
      left: 'inset-y-0 left-0 mr-24 w-auto rounded-r-[10px] border-r',
      right: 'inset-y-0 right-0 ml-24 w-auto rounded-l-[10px] border-l',
    };

    return cn(
      'fixed z-50 flex flex-col bg-background',
      directionClasses[this.context.direction],
      this.class()
    );
  });

  onOverlayClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }

  onEscapeKey(): void {
    this.context.setOpen(false);
  }

  private focusFirstElement(): void {
    setTimeout(() => {
      const content = this.contentEl()?.nativeElement;
      if (content) {
        const focusable = content.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
