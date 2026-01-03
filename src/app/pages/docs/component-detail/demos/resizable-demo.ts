import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/ui/resizable';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ResizableDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle],
  template: `
    <ResizablePanelGroup direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
      <ResizablePanel [defaultSize]="50">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle [withHandle]="true" />
      <ResizablePanel [defaultSize]="50">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel [defaultSize]="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle [withHandle]="true" />
          <ResizablePanel [defaultSize]="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  `,
})
export class ResizableDemo {}
