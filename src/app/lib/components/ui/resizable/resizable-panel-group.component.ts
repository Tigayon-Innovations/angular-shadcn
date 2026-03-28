import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { RESIZABLE_CONTEXT, type ResizableContextValue } from './resizable-context';

/**
 * ResizablePanelGroup component - container for resizable panels.
 * Matches shadcn/ui React ResizablePanelGroup exactly.
 *
 * @example
 * <ResizablePanelGroup direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
 *   <ResizablePanel defaultSize={50}>
 *     <div class="p-6">One</div>
 *   </ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel defaultSize={50}>
 *     <div class="p-6">Two</div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 */
@Component({
  selector: 'ResizablePanelGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-panel-group]': 'true',
    '[attr.data-panel-group-direction]': 'direction()',
  },
  providers: [
    {
      provide: RESIZABLE_CONTEXT,
      useExisting: forwardRef(() => ResizablePanelGroup),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizablePanelGroup implements ResizableContextValue {
  /** Direction of the panel group */
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Whether keyboard resize is disabled */
  readonly keyboardResizeBy = input<number>(10);

  /** Auto-save ID for persisting layout */
  readonly autoSaveId = input<string | null>(null);

  /** Panel sizes state */
  readonly panelSizes = signal<Map<string, number>>(new Map());

  /** Currently active resize handle */
  private activeHandleId: string | null = null;

  /** Panels metadata */
  private panels = new Map<string, { minSize: number; maxSize: number; order: number }>();

  /** Panel order counter */
  private panelOrderCounter = 0;

  protected readonly computedClass = computed(() =>
    cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', this.class()),
  );

  registerPanel(id: string, minSize = 0, maxSize = 100, defaultSize?: number): void {
    this.panels.set(id, { minSize, maxSize, order: this.panelOrderCounter++ });
    if (defaultSize !== undefined) {
      this.panelSizes.update((sizes) => {
        const newSizes = new Map(sizes);
        newSizes.set(id, defaultSize);
        return newSizes;
      });
    }
  }

  getPanelSize(id: string): number {
    return this.panelSizes().get(id) ?? 50;
  }

  setPanelSize(id: string, size: number): void {
    const panel = this.panels.get(id);
    if (panel) {
      const clampedSize = Math.max(panel.minSize, Math.min(panel.maxSize, size));
      this.panelSizes.update((sizes) => {
        const newSizes = new Map(sizes);
        newSizes.set(id, clampedSize);
        return newSizes;
      });
    }
  }

  startResize(handleId: string): void {
    this.activeHandleId = handleId;
  }

  onResize(delta: number): void {
    if (!this.activeHandleId) return;

    // Get panels on either side of the handle
    const panelIds = Array.from(this.panels.entries())
      .sort((a, b) => a[1].order - b[1].order)
      .map(([id]) => id);

    // Find the handle index (handles are between panels)
    const handleIndex = parseInt(this.activeHandleId.replace('handle-', ''), 10);
    const leftPanelId = panelIds[handleIndex];
    const rightPanelId = panelIds[handleIndex + 1];

    if (leftPanelId && rightPanelId) {
      const leftSize = this.getPanelSize(leftPanelId);
      const rightSize = this.getPanelSize(rightPanelId);

      const leftPanel = this.panels.get(leftPanelId)!;
      const rightPanel = this.panels.get(rightPanelId)!;

      const newLeftSize = Math.max(
        leftPanel.minSize,
        Math.min(leftPanel.maxSize, leftSize + delta),
      );
      const newRightSize = Math.max(
        rightPanel.minSize,
        Math.min(rightPanel.maxSize, rightSize - delta),
      );

      // Only update if both constraints are satisfied
      if (newLeftSize + newRightSize === leftSize + rightSize) {
        this.setPanelSize(leftPanelId, newLeftSize);
        this.setPanelSize(rightPanelId, newRightSize);
      }
    }
  }

  endResize(): void {
    this.activeHandleId = null;
  }
}
