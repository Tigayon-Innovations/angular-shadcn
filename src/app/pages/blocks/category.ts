import { BlocksService } from '@/services/blocks.service';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blocks-category',
  imports: [RouterLink],
  template: `
    <div class="container py-12 md:py-16">
      <div class="mx-auto max-w-5xl">
        <!-- Header -->
        <div class="mb-12">
          <a
            routerLink="/blocks"
            class="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to all blocks
          </a>
          @if (category(); as cat) {
            <h1 class="mb-2 text-4xl font-bold tracking-tight">
              {{ cat.name }}
            </h1>
            <p class="text-lg text-muted-foreground">{{ cat.description }}</p>
          }
        </div>

        <!-- Blocks Grid -->
        @if (blocks().length > 0) {
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (block of blocks(); track block.slug) {
              <a
                [routerLink]="['/blocks', block.category, block.slug]"
                class="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary"
              >
                <div class="aspect-video bg-muted">
                  @if (block.image) {
                    <img
                      [src]="block.image"
                      [alt]="block.name"
                      class="h-full w-full object-cover"
                    />
                  } @else {
                    <div
                      class="flex h-full w-full items-center justify-center text-muted-foreground"
                    >
                      <span class="text-sm">Preview</span>
                    </div>
                  }
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
        } @else {
          <div class="rounded-lg border border-dashed p-12 text-center">
            <p class="text-muted-foreground">No blocks found in this category.</p>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksCategoryPage {
  private blocksService = inject(BlocksService);

  slug = input.required<string>();

  category = computed(() => {
    return this.blocksService.getCategoryBySlug(this.slug());
  });

  blocks = computed(() => {
    return this.blocksService.getBlocksByCategory(this.slug());
  });
}
