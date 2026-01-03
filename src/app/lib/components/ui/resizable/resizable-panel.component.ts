import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input
} from '@angular/core';
import { RESIZABLE_CONTEXT } from './resizable-context';

let panelIdCounter = 0;

/**
 * ResizablePanel component - a resizable panel within a group.
 * Matches shadcn/ui React ResizablePanel exactly.
 *
 * @example
 * <ResizablePanel [defaultSize]="50" [minSize]="25">
 *   <div class="p-6">Content</div>
 * </ResizablePanel>
 */
@Component({
  selector: 'ResizablePanel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[style.flex-basis.%]': 'currentSize()',
    '[attr.data-panel]': 'true',
    '[attr.data-panel-id]': 'panelId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizablePanel {
  private readonly context = inject(RESIZABLE_CONTEXT);

  /** Default size as percentage */
  readonly defaultSize = input<number>(50);

  /** Minimum size as percentage */
  readonly minSize = input<number>(0);

  /** Maximum size as percentage */
  readonly maxSize = input<number>(100);

  /** Collapsible */
  readonly collapsible = input<boolean>(false);

  /** Collapsed size when collapsible */
  readonly collapsedSize = input<number>(0);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Unique panel ID */
  readonly panelId = `panel-${panelIdCounter++}`;

  /** Current panel size */
  readonly currentSize = computed(() => {
    return this.context.getPanelSize(this.panelId);
  });

  constructor() {
    effect(() => {
      this.context.registerPanel(
        this.panelId,
        this.minSize(),
        this.maxSize(),
        this.defaultSize()
      );
    });
  }

  protected readonly computedClass = computed(() =>
    cn('flex-shrink-0 flex-grow-0', this.class())
  );
}
