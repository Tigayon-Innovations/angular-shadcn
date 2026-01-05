import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/ui/resizable';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ResizableDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle],
  template: `
    <ResizablePanelGroup direction="horizontal" class="min-h-[350px] w-full max-w-2xl rounded-lg border">
      <ResizablePanel [defaultSize]="50">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold text-lg">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle [withHandle]="true" />
      <ResizablePanel [defaultSize]="50">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel [defaultSize]="50">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold text-lg">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle [withHandle]="true" />
          <ResizablePanel [defaultSize]="50">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold text-lg">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  `,
})
export class ResizableDemo {}
