import { ApiReference } from '@/components/api-reference';
import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { ComponentDemos } from '@/services/component-demos.service';
import { ComponentRegistry } from '@/services/component-registry.service';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    Type,
    viewChild,
    ViewContainerRef
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, Check, Copy, LucideAngularModule } from 'lucide-angular';

/**
 * Component detail page showing documentation for a specific component.
 */
@Component({
  selector: 'ComponentDetailPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Button,
    Badge,
    Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    CodeBlock,
    ApiReference,
    ComponentPreview,
    LucideAngularModule,
  ],
  template: `
    @if (component(); as comp) {
      <article class="relative">
        <!-- Header -->
        <div class="space-y-4 pb-8 pt-6 md:pb-10">
          <div class="flex items-center gap-2">
            <Badge variant="outline" class="font-mono text-xs">{{ categoryLabel() }}</Badge>
          </div>
          <div class="space-y-2">
            <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              {{ comp.name }}
            </h1>
            <p class="text-lg text-muted-foreground leading-7">
              {{ comp.description }}
            </p>
          </div>
        </div>

        <Separator class="mb-10" />

        <div class="space-y-16">
          <!-- Preview Section -->
          <section class="scroll-mt-20" id="preview">
            <div class="space-y-6">
              <div class="space-y-2">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                  Preview
                </h2>
                <p class="text-muted-foreground">
                  A preview of the {{ comp.name }} component with interactive controls.
                </p>
              </div>
              <ComponentPreview
                [code]="previewCode()"
                language="html"
                [interactive]="hasDemo()"
                [showViewportControls]="true"
              >
                @if (hasDemo()) {
                  <div class="w-full flex items-center justify-center p-10">
                    <ng-container #demoContainer></ng-container>
                  </div>
                } @else {
                  <div class="flex items-center justify-center p-10">
                    <p class="text-muted-foreground text-sm">
                      Preview not available yet for this component.
                    </p>
                  </div>
                }
              </ComponentPreview>
            </div>
          </section>

          <!-- Installation Section -->
          <section class="scroll-mt-20" id="installation">
            <div class="space-y-6">
              <div class="space-y-2">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                  Installation
                </h2>
                <p class="text-muted-foreground">
                  Install the {{ comp.name }} component using the CLI or copy and paste the code.
                </p>
              </div>
              <Tabs defaultValue="cli">
                <TabsList class="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="cli">CLI</TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>
                <TabsContent value="cli" class="mt-6 space-y-4">
                  <div class="rounded-lg border bg-muted/50 p-4">
                    <p class="text-sm font-medium mb-3">Choose your package manager:</p>
                    <Tabs defaultValue="npx" class="w-full">
                      <TabsList class="grid w-full grid-cols-5">
                        <TabsTrigger value="npx">npx</TabsTrigger>
                        <TabsTrigger value="npm">npm</TabsTrigger>
                        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                        <TabsTrigger value="yarn">yarn</TabsTrigger>
                        <TabsTrigger value="bun">bun</TabsTrigger>
                      </TabsList>
                      <TabsContent value="npx" class="mt-3">
                        <CodeBlock
                          [code]="'npx shadcn-angular add ' + slug()"
                          language="bash"
                        />
                      </TabsContent>
                      <TabsContent value="npm" class="mt-3">
                        <CodeBlock
                          [code]="'npm install @shadcn-angular/' + slug()"
                          language="bash"
                        />
                      </TabsContent>
                      <TabsContent value="pnpm" class="mt-3">
                        <CodeBlock
                          [code]="'pnpm add @shadcn-angular/' + slug()"
                          language="bash"
                        />
                      </TabsContent>
                      <TabsContent value="yarn" class="mt-3">
                        <CodeBlock
                          [code]="'yarn add @shadcn-angular/' + slug()"
                          language="bash"
                        />
                      </TabsContent>
                      <TabsContent value="bun" class="mt-3">
                        <CodeBlock
                          [code]="'bun add @shadcn-angular/' + slug()"
                          language="bash"
                        />
                      </TabsContent>
                    </Tabs>
                    <div class="mt-4 pt-4 border-t">
                      <p class="text-sm font-medium mb-2">Angular CLI (ng add):</p>
                      <CodeBlock
                        [code]="'ng add @shadcn-angular/' + slug()"
                        language="bash"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="manual" class="mt-6 space-y-4">
                  <div class="rounded-lg border bg-muted/50 p-4 space-y-3">
                    <p class="text-sm font-medium">
                      Copy and paste the following code into your project.
                    </p>
                    <p class="text-sm text-muted-foreground">
                      Create a new file in your components directory and import the component.
                    </p>
                  </div>
                  <CodeBlock
                    [code]="importCode()"
                    language="typescript"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <!-- Usage Section -->
          <section class="scroll-mt-20" id="usage">
            <div class="space-y-6">
              <div class="space-y-2">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                  Usage
                </h2>
                <p class="text-muted-foreground">
                  Import and use the {{ comp.name }} component in your Angular application.
                </p>
              </div>
              <div class="space-y-6">
                <div class="space-y-3">
                  <h3 class="text-xl font-semibold">Import the component</h3>
                  <CodeBlock
                    [code]="usageCode()"
                    language="typescript"
                  />
                </div>
                <div class="space-y-3">
                  <h3 class="text-xl font-semibold">Use in your template</h3>
                  <CodeBlock
                    [code]="templateUsageCode()"
                    language="html"
                  />
                </div>
              </div>
            </div>
          </section>

          <!-- Examples Section -->
          <section class="scroll-mt-20" id="examples">
            <div class="space-y-6">
              <div class="space-y-2">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                  Examples
                </h2>
                <p class="text-muted-foreground">
                  Explore different variations and use cases for the {{ comp.name }} component.
                </p>
              </div>
              <div class="space-y-10">
                @for (example of comp.examples; track example.title) {
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <h3 class="text-xl font-semibold">{{ example.title }}</h3>
                      @if (example.description) {
                        <p class="text-sm text-muted-foreground leading-relaxed">
                          {{ example.description }}
                        </p>
                      }
                    </div>
                    <CodeBlock [code]="example.code" language="html" />
                  </div>
                }
              </div>
            </div>
          </section>

          <!-- API Reference Section -->
          @if (comp.props.length > 0) {
            <section class="scroll-mt-20" id="api">
              <ApiReference title="API Reference" [properties]="comp.props" />
            </section>
          }
        </div>

        <!-- Navigation Footer -->
        <div class="flex items-center justify-between pt-12 mt-12 border-t">
          @if (prevComponent(); as prev) {
            <Button [routerLink]="['/docs/components', prev.slug]" variant="outline" class="gap-2">
              <lucide-icon [img]="icons.ArrowLeft" class="h-4 w-4" />
              <span class="hidden sm:inline">{{ prev.name }}</span>
            </Button>
          } @else {
            <div></div>
          }
          @if (nextComponent(); as next) {
            <Button [routerLink]="['/docs/components', next.slug]" variant="outline" class="gap-2">
              <span class="hidden sm:inline">{{ next.name }}</span>
              <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
            </Button>
          } @else {
            <div></div>
          }
        </div>
      </article>
    } @else {
      <div class="text-center py-12">
        <h1 class="text-2xl font-bold mb-2">Component Not Found</h1>
        <p class="text-muted-foreground mb-4">
          The component "{{ slug() }}" doesn't exist.
        </p>
        <Button routerLink="/docs/components" variant="outline">
          View All Components
        </Button>
      </div>
    }
  `,
})
export class ComponentDetailPage {
  private readonly registry = inject(ComponentRegistry);
  private readonly demos = inject(ComponentDemos);
  private readonly router = inject(Router);

  readonly slug = input.required<string>();

  protected readonly demoContainer = viewChild('demoContainer', { read: ViewContainerRef });

  protected readonly icons = { ArrowRight, ArrowLeft, Copy, Check };

  protected readonly component = computed(() => {
    return this.registry.getBySlug(this.slug());
  });

  protected readonly hasDemo = computed(() => {
    return this.demos.hasDemo(this.slug());
  });

  protected readonly categoryLabel = computed(() => {
    const comp = this.component();
    if (!comp) return '';
    const labels: Record<string, string> = {
      layout: 'Layout',
      navigation: 'Navigation',
      forms: 'Forms',
      feedback: 'Feedback',
      'data-display': 'Data Display',
      extended: 'Extended',
    };
    return labels[comp.category] || comp.category;
  });

  protected readonly importCode = computed(() => {
    const comp = this.component();
    if (!comp) return '';
    return `import { ${comp.imports.join(', ')} } from '@/ui/${comp.slug}';`;
  });

  protected readonly usageCode = computed(() => {
    const comp = this.component();
    if (!comp) return '';
    return `import { ${comp.imports.join(', ')} } from '@/ui/${comp.slug}';

@Component({
  // ...
  imports: [${comp.imports.join(', ')}],
})
export class MyComponent { }`;
  });

  protected readonly templateUsageCode = computed(() => {
    const comp = this.component();
    if (!comp || comp.examples.length === 0) return '';
    return comp.examples[0].code;
  });

  protected readonly previewCode = computed(() => {
    const comp = this.component();
    if (!comp || comp.examples.length === 0) return '';
    return comp.examples[0].code;
  });

  protected readonly prevComponent = computed(() => {
    const all = this.registry.getAll();
    const currentIndex = all.findIndex((c) => c.slug === this.slug());
    if (currentIndex > 0) {
      return all[currentIndex - 1];
    }
    return null;
  });

  protected readonly nextComponent = computed(() => {
    const all = this.registry.getAll();
    const currentIndex = all.findIndex((c) => c.slug === this.slug());
    if (currentIndex >= 0 && currentIndex < all.length - 1) {
      return all[currentIndex + 1];
    }
    return null;
  });

  constructor() {
    // Load demo component when slug changes
    effect(() => {
      const slug = this.slug();
      const container = this.demoContainer();

      if (container) {
        container.clear();

        if (this.demos.hasDemo(slug)) {
          this.demos.getDemo(slug).then((demo) => {
            if (demo) {
              container.createComponent(demo.component as Type<unknown>);
            }
          });
        }
      }
    });
  }
}
