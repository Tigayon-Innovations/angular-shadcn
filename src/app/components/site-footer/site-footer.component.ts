import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Github, Heart, LucideAngularModule, Twitter } from 'lucide-angular';

/**
 * Site footer component with links and credits.
 */
@Component({
  selector: 'SiteFooter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <footer class="border-t border-border/40 py-6 md:py-0">
      <div class="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row">
        <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with
          <lucide-icon [img]="icons.Heart" class="inline h-4 w-4 mx-1 text-red-500" />
          by the community. Inspired by
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4 hover:text-foreground"
          >
            shadcn/ui
          </a>
          .
        </p>
        <div class="flex items-center gap-4">
          <a
            href="https://github.com/example/shadcn-angular"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-foreground"
          >
            <lucide-icon [img]="icons.Github" class="h-5 w-5" />
            <span class="sr-only">GitHub</span>
          </a>
          <a
            href="https://twitter.com/shadcn"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-foreground"
          >
            <lucide-icon [img]="icons.Twitter" class="h-5 w-5" />
            <span class="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly icons = { Github, Twitter, Heart };
}
