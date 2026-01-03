import { DocsSidebar } from '@/components/docs-sidebar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Documentation layout with sidebar and content area.
 */
@Component({
  selector: 'DocsLayout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, DocsSidebar],
  template: `
    <div class="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <DocsSidebar />
      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
        <div class="mx-auto w-full min-w-0">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
})
export class DocsLayout {}
