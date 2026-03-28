import { BlocksService } from '@/services/blocks.service';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

/**
 * Blocks sidebar navigation component.
 */
@Component({
  selector: 'BlocksSidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    LucideAngularModule,
  ],
  template: `
    <aside class="h-full border-r border-border/40 overflow-y-auto">
      <div class="py-6 pr-6 pl-4 lg:py-8">
        <nav class="flex flex-col gap-4">
          @for (section of navigation(); track section.title) {
            <div class="flex flex-col gap-1">
              <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {{ section.title }}
              </h4>
              @if (section.items) {
                @for (item of section.items; track item.title) {
                  @if (item.items) {
                    <!-- Collapsible section -->
                    <Collapsible [open]="true">
                      <CollapsibleTrigger
                        class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {{ item.title }}
                        <lucide-icon
                          [img]="icons.ChevronRight"
                          class="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90"
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div class="ml-4 flex flex-col gap-1 border-l pl-2">
                          @for (subItem of item.items; track subItem.title) {
                            <a
                              [routerLink]="subItem.href"
                              routerLinkActive="font-medium text-foreground"
                              class="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {{ subItem.title }}
                            </a>
                          }
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  } @else {
                    <!-- Simple link -->
                    <a
                      [routerLink]="item.href"
                      routerLinkActive="font-medium text-foreground"
                      class="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {{ item.title }}
                    </a>
                  }
                }
              }
            </div>
          }
        </nav>
      </div>
    </aside>
  `,
})
export class BlocksSidebar {
  private blocksService = inject(BlocksService);
  protected readonly icons = { ChevronRight };

  protected readonly navigation = computed<NavItem[]>(() => {
    const categories = this.blocksService.getCategories();
    const blocks = this.blocksService.getBlocks();

    const categoryItems: NavItem[] = categories.map((category) => {
      const categoryBlocks = blocks.filter((block) => block.category === category.slug);
      return {
        title: category.name,
        items: categoryBlocks.map((block) => ({
          title: block.name,
          href: `/blocks/${block.category}/${block.slug}`,
        })),
      };
    });

    return [
      {
        title: 'Building Blocks',
        items: [{ title: 'All Blocks', href: '/blocks' }, ...categoryItems],
      },
    ];
  });
}
