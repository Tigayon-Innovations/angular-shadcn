import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/ui/resizable';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ResizableDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle],
  template: `
    <ResizablePanelGroup
      direction="horizontal"
      class="min-h-[300px] max-w-2xl w-full rounded-lg border bg-card"
    >
      <ResizablePanel [defaultSize]="25" [minSize]="15">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold text-sm">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle [withHandle]="true" />
      <ResizablePanel [defaultSize]="75" [minSize]="30">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel [defaultSize]="65" [minSize]="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold text-sm">Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle [withHandle]="true" />
          <ResizablePanel [defaultSize]="35" [minSize]="15">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold text-sm">Footer</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  `,
})
export class ResizableDemo {}
