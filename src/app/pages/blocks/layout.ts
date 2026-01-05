import { BlocksSidebar } from '@/components/blocks-sidebar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Blocks layout with sidebar and content area.
 * Both sidebar and content have independent scrolling.
 */
@Component({
  selector: 'app-blocks-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, BlocksSidebar],
  template: `
    <div class="flex h-[calc(100vh-3.5rem)]">
      <!-- Sidebar with its own scroll -->
      <BlocksSidebar class="hidden md:block w-[220px] lg:w-[240px] shrink-0" />

      <!-- Main content with its own scroll -->
      <main class="flex-1 overflow-y-auto">
        <router-outlet />
      </main>
    </div>
  `,
})
export class BlocksLayout {}
