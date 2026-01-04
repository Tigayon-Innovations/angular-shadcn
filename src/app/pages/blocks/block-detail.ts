import { CodeBlock } from '@/components/code-block';
import { BlocksService } from '@/services/blocks.service';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
  ViewContainerRef,
  type Type,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-block-detail',
  imports: [RouterLink, CodeBlock],
  template: `
    <div class="container py-12 md:py-16">
      <div class="mx-auto max-w-5xl">
        @if (block(); as blockData) {
          <!-- Header -->
          <div class="mb-8">
            <a
              [routerLink]="['/blocks', blockData.category]"
              class="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to {{ blockData.category }}
            </a>
            <div class="flex items-start justify-between">
              <div>
                <h1 class="mb-2 text-4xl font-bold tracking-tight">
                  {{ blockData.name }}
                </h1>
                <p class="text-lg text-muted-foreground">
                  {{ blockData.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Preview -->
          <section class="mb-8">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-xl font-semibold">Preview</h2>
              <div class="flex gap-2">
                <button
                  (click)="viewMode.set('preview')"
                  [class.bg-muted]="viewMode() === 'preview'"
                  class="rounded-md px-3 py-1 text-sm hover:bg-muted"
                >
                  Preview
                </button>
                <button
                  (click)="viewMode.set('code')"
                  [class.bg-muted]="viewMode() === 'code'"
                  class="rounded-md px-3 py-1 text-sm hover:bg-muted"
                >
                  Code
                </button>
              </div>
            </div>

            @if (viewMode() === 'preview') {
              <div class="overflow-hidden rounded-lg border bg-background">
                <div class="min-h-[400px]">
                  @if (block()?.componentPath) {
                    <div #componentContainer></div>
                  } @else if (block()?.image) {
                    <div class="p-8">
                      <img
                        [src]="block()!.image"
                        [alt]="block()!.name"
                        class="w-full rounded-lg"
                      />
                    </div>
                  } @else {
                    <div class="flex h-[400px] items-center justify-center p-8">
                      <div class="text-center">
                        <p class="mb-4 text-lg font-medium">Block Preview</p>
                        <p class="text-sm text-muted-foreground">
                          The live preview will be displayed here
                        </p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            } @else {
              <CodeBlock
                [code]="exampleCode()"
                language="typescript"
                [showLineNumbers]="true"
              />
            }
          </section>

          <!-- Installation -->
          <section class="mb-8">
            <h2 class="mb-4 text-xl font-semibold">Installation</h2>
            <div class="space-y-4">
              <div>
                <p class="mb-2 text-sm text-muted-foreground">
                  Copy and paste the following code into your project.
                </p>
                <CodeBlock
                  [code]="installationCode()"
                  language="bash"
                />
              </div>
            </div>
          </section>

          <!-- Usage -->
          <section>
            <h2 class="mb-4 text-xl font-semibold">Usage</h2>
            <CodeBlock
              [code]="usageCode()"
              language="typescript"
              [showLineNumbers]="true"
            />
          </section>
        } @else {
          <div class="rounded-lg border border-dashed p-12 text-center">
            <p class="text-muted-foreground">Block not found.</p>
            <a
              routerLink="/blocks"
              class="mt-4 inline-block text-sm text-primary hover:underline"
            >
              Browse all blocks
            </a>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockDetailPage {
  private blocksService = inject(BlocksService);

  category = input.required<string>();
  slug = input.required<string>();
  viewMode = signal<'preview' | 'code'>('preview');

  componentContainer = viewChild<any, ViewContainerRef>('componentContainer', {
    read: ViewContainerRef,
  });

  block = computed(() => {
    return this.blocksService.getBlockBySlug(this.slug());
  });

  constructor() {
    effect(async () => {
      const block = this.block();
      const container = this.componentContainer();

      if (block?.componentPath && container) {
        container.clear();

        try {
          const componentModule = await import(
            /* @vite-ignore */ block.componentPath
          );
          const componentClass = Object.values(componentModule).find(
            (exp: any) => exp?.prototype?.constructor
          ) as Type<any>;

          if (componentClass) {
            container.createComponent(componentClass);
          }
        } catch (error) {
          console.error('Failed to load component:', error);
        }
      }
    });
  }

  installationCode = computed(() => {
    return `npx shadcn-angular add ${this.slug()}`;
  });

  exampleCode = computed(() => {
    const block = this.block();
    if (!block) return '';

    return `import { Component } from '@angular/core';
import { ${block.name.replace(/\s+/g, '')}Component } from '@/blocks/${block.slug}';

@Component({
  selector: 'app-example',
  imports: [${block.name.replace(/\s+/g, '')}Component],
  template: \`
    <${block.slug} />
  \`,
})
export class ExampleComponent {}`;
  });

  usageCode = computed(() => {
    const block = this.block();
    if (!block) return '';

    return `<${block.slug} />`;
  });
}
