import { BlockThumbnail } from '@/components/block-thumbnail/block-thumbnail.component';
import { BlocksService } from '@/services/blocks.service';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blocks-list',
  imports: [RouterLink, BlockThumbnail],
  template: `
    <div class="container py-12 md:py-16">
      <div class="mx-auto max-w-5xl">
        <!-- Hero Section -->
        <div class="mb-12 space-y-4 text-center">
          <h1 class="text-4xl font-bold tracking-tight md:text-5xl">Building Blocks for the Web</h1>
          <p class="text-lg text-muted-foreground md:text-xl">
            Clean, modern building blocks. Copy and paste into your apps. Works with Angular. Open
            Source. Free forever.
          </p>
        </div>

        <!-- Featured Section -->
        @if (featuredBlocks().length > 0) {
          <section class="mb-16">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-2xl font-semibold">Featured</h2>
            </div>
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              @for (block of featuredBlocks(); track block.slug) {
                <a
                  [routerLink]="['/blocks', block.category, block.slug]"
                  class="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary"
                >
                  <div class="border-b bg-background">
                    <app-block-thumbnail [slug]="block.slug" />
                  </div>
                  <div class="p-4">
                    <h3 class="font-medium group-hover:text-primary">
                      {{ block.name }}
                    </h3>
                    <p class="mt-1 text-sm text-muted-foreground">
                      {{ block.description }}
                    </p>
                  </div>
                </a>
              }
            </div>
          </section>
        }

        <!-- Categories Section -->
        <section class="mb-16">
          <div class="mb-6">
            <h2 class="text-2xl font-semibold">Browse by Category</h2>
          </div>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (category of categories(); track category.slug) {
              <a
                [routerLink]="['/blocks', category.slug]"
                class="group rounded-lg border bg-card p-6 transition-colors hover:border-primary"
              >
                <h3 class="mb-2 text-lg font-medium group-hover:text-primary">
                  {{ category.name }}
                </h3>
                <p class="mb-3 text-sm text-muted-foreground">
                  {{ category.description }}
                </p>
                <span class="text-xs text-muted-foreground">
                  {{ category.count }}
                  {{ category.count === 1 ? 'block' : 'blocks' }}
                </span>
              </a>
            }
          </div>
        </section>

        <!-- All Blocks Section -->
        <section>
          <div class="mb-6">
            <h2 class="text-2xl font-semibold">All Blocks</h2>
          </div>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (block of blocks(); track block.slug) {
              <a
                [routerLink]="['/blocks', block.category, block.slug]"
                class="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary"
              >
                <div class="border-b bg-background">
                  <app-block-thumbnail [slug]="block.slug" />
                </div>
                <div class="p-4">
                  <h3 class="font-medium group-hover:text-primary">
                    {{ block.name }}
                  </h3>
                  <p class="mt-1 text-sm text-muted-foreground">
                    {{ block.description }}
                  </p>
                  <span class="mt-2 inline-block text-xs text-muted-foreground">
                    {{ block.category }}
                  </span>
                </div>
              </a>
            }
          </div>
        </section>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksListPage {
  private blocksService = inject(BlocksService);

  blocks = computed(() => this.blocksService.getBlocks());
  featuredBlocks = computed(() => this.blocksService.getFeaturedBlocks());
  categories = computed(() => this.blocksService.getCategories());
}
