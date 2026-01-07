import { ApiReference } from '@/components/api-reference';
import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { ComponentDemos } from '@/services/component-demos.service';
import { ComponentRegistry } from '@/services/component-registry.service';
import { SeoService } from '@/services/seo.service';
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
    signal,
    Type,
    viewChild,
    ViewContainerRef
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, Check, Code2, Copy, Eye, LucideAngularModule } from 'lucide-angular';

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
      <article class="relative max-w-4xl">
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
                    <ng-container #demoContainer />
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
                  Add the {{ comp.name }} component to your project.
                </p>
              </div>
              <CodeBlock
                [code]="'ng g @ng-cn/core:c ' + slug()"
                language="bash"
              />
            </div>
          </section>

          <!-- Usage Section with Segmented Tabs -->
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

              <!-- Segmented Tabs for TypeScript/Template -->
              <Tabs [value]="usageTab()" (valueChange)="usageTab.set($event)" class="w-full">
                <TabsList class="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-auto">
                  <TabsTrigger value="template">
                    Template
                  </TabsTrigger>

                  <TabsTrigger value="typescript">
                    TypeScript
                  </TabsTrigger>

                </TabsList>

                <TabsContent value="typescript" class="mt-4">
                  <CodeBlock
                    [code]="usageCode()"
                    language="typescript"
                    filename="component.ts"
                  />
                </TabsContent>

                <TabsContent value="template" class="mt-4">
                  <CodeBlock
                    [code]="templateUsageCode()"
                    language="html"
                    filename="template.html"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <!-- Examples Section with Preview/Code Toggle -->
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
                @for (example of comp.examples; track example.title; let i = $index) {
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <h3 class="text-xl font-semibold">{{ example.title }}</h3>
                      @if (example.description) {
                        <p class="text-sm text-muted-foreground leading-relaxed">
                          {{ example.description }}
                        </p>
                      }
                    </div>

                    <!-- Example Preview with ComponentPreview -->
                    <ComponentPreview
                      [code]="example.code"
                      language="html"
                      [interactive]="hasDemo()"
                    >
                      @if (hasDemo()) {
                        <div class="w-full flex items-center justify-center p-10">
                          <ng-container #exampleContainer />
                        </div>
                      } @else {
                        <div class="flex items-center justify-center p-10 min-h-[200px]">
                          <p class="text-muted-foreground text-sm">
                            Interactive preview available when demo component is registered.
                          </p>
                        </div>
                      }
                    </ComponentPreview>
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
  private readonly seo = inject(SeoService);

  readonly slug = input.required<string>();

  protected readonly demoContainer = viewChild('demoContainer', { read: ViewContainerRef });

  protected readonly icons = { ArrowRight, ArrowLeft, Copy, Check, Eye, Code2 };

  // Signal for usage tab state
  protected readonly usageTab = signal<string>('template');

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
    return `import { ${comp.imports.join(', ')} } from '@ng-cn/${comp.slug}';

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

    // Update SEO meta tags when component changes
    effect(() => {
      const comp = this.component();
      if (comp) {
        this.seo.updateMetaTags({
          title: `${comp.name} - Components`,
          description: `${comp.description} Learn how to install and use the ${comp.name} component in your Angular application with shadcn-angular.`,
          keywords: [
            'angular',
            comp.name.toLowerCase(),
            'component',
            'shadcn',
            'ui',
            'tailwind css',
            comp.category,
            ...comp.imports.map((i) => i.toLowerCase()),
          ],
          ogType: 'article',
          canonicalUrl: `/docs/components/${comp.slug}`,
          structuredData: this.seo.getBreadcrumbStructuredData([
            { name: 'Home', url: '/' },
            { name: 'Documentation', url: '/docs' },
            { name: 'Components', url: '/docs/components' },
            { name: comp.name, url: `/docs/components/${comp.slug}` },
          ]),
        });
      }
    });
  }
}
