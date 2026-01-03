import { DocsSidebar } from '@/components/docs-sidebar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Documentation layout with sidebar and content area.
 * Both sidebar and content have independent scrolling.
 */
@Component({
  selector: 'DocsLayout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, DocsSidebar],
  template: `
    <div class="flex h-[calc(100vh-3.5rem)]">
      <!-- Sidebar with its own scroll -->
      <DocsSidebar class="hidden md:block w-[220px] lg:w-[240px] shrink-0" />

      <!-- Main content with its own scroll -->
      <main class="flex-1 overflow-y-auto">
        <div class="container mx-auto py-6 px-4 lg:py-8 lg:px-6 xl:grid xl:grid-cols-[1fr_200px] xl:gap-10">
          <div class="mx-auto w-full min-w-0 max-w-4xl">
            <router-outlet />
          </div>
        </div>
      </main>
    </div>
  `,
})
export class DocsLayout {}
