import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { DRAWER_CONTEXT } from './drawer-context';

/**
 * DrawerContent component - the content of the drawer.
 * Matches shadcn/ui React DrawerContent exactly.
 */
@Component({
  selector: 'DrawerContent',
  template: `
    @if (context.open()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80"
        (click)="onOverlayClick($event)"
      ></div>
      <!-- Content -->
      <div
        [class]="computedClass()"
        role="dialog"
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
export class DrawerContent {
  protected readonly context = inject(DRAWER_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

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
}
