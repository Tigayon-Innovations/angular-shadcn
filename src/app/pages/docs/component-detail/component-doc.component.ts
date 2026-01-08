import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { ComponentDemos } from '@/services/component-demos.service';
import { ComponentDocsRegistry } from '@/services/component-docs';
import { ComponentRegistry } from '@/services/component-registry.service';
import { SeoService } from '@/services/seo.service';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
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
  ViewContainerRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  FileCode,
  GitBranch,
  Keyboard,
  LucideAngularModule,
} from 'lucide-angular';

/**
 * Radix-style component documentation page.
 * Displays comprehensive documentation following Radix UI patterns:
 * - Features list
 * - Installation
 * - Anatomy
 * - API Reference (per sub-component)
 * - Examples
 * - Accessibility (keyboard interactions)
 */
@Component({
  selector: 'ComponentDocPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'ngSkipHydration': 'true',
  },
  imports: [
    RouterLink,
    Button,
    Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    CodeBlock,
    ComponentPreview,
    LucideAngularModule,
  ],
  template: `
    @if (docs(); as doc) {
      <article class="relative max-w-4xl">
        <!-- Header -->
        <header class="space-y-4 pb-8 pt-6 md:pb-10">
          <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            {{ doc.name }}
          </h1>
          <p class="text-xl text-muted-foreground leading-7 max-w-[700px]">
            {{ doc.description }}
          </p>
        </header>

        <!-- Demo Preview -->
        @if (hasDemo()) {
          <section class="mb-12">
            <ComponentPreview
              [code]="doc.examples[0]?.code || ''"
              language="html"
              [interactive]="true"
              [showViewportControls]="true"
            >
              <div class="w-full flex items-center justify-center p-10">
                <ng-container #demoContainer />
              </div>
            </ComponentPreview>
          </section>
        }

        <Separator class="mb-10" />

        <!-- Features Section -->
        <section class="scroll-mt-20 mb-16" id="features">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
            Features
          </h2>
          <ul class="grid gap-3">
            @for (feature of doc.features; track feature.text) {
              <li class="flex items-start gap-3">
                <lucide-icon
                  [img]="icons.CheckCircle"
                  class="h-5 w-5 text-green-500 mt-0.5 shrink-0"
                />
                <span [class.font-medium]="feature.highlight">{{ feature.text }}</span>
              </li>
            }
          </ul>
        </section>

        <!-- Installation Section -->
        <section class="scroll-mt-20 mb-16" id="installation">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
            Installation
          </h2>
          <p class="text-muted-foreground mb-4">
            Install the component from your command line.
          </p>
          <Tabs [value]="installTab()" (valueChange)="installTab.set($event)" class="w-full">
            <TabsList class="mb-4">
              @if (doc.installation.ngAdd) {
                <TabsTrigger value="ng-add">Angular CLI</TabsTrigger>
              }
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            @if (doc.installation.ngAdd) {
              <TabsContent value="ng-add">
                <CodeBlock [code]="doc.installation.ngAdd" language="bash" />
              </TabsContent>
            }
            <TabsContent value="npm">
              <CodeBlock [code]="doc.installation.packageManager.npm" language="bash" />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock [code]="doc.installation.packageManager.pnpm" language="bash" />
            </TabsContent>
            <TabsContent value="yarn">
              <CodeBlock [code]="doc.installation.packageManager.yarn" language="bash" />
            </TabsContent>
            <TabsContent value="bun">
              <CodeBlock [code]="doc.installation.packageManager.bun" language="bash" />
            </TabsContent>
          </Tabs>
        </section>

        <!-- Anatomy Section -->
        <section class="scroll-mt-20 mb-16" id="anatomy">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
            Anatomy
          </h2>
          <p class="text-muted-foreground mb-4">
            Import all parts and piece them together.
          </p>
          <div class="space-y-4">
            <CodeBlock [code]="doc.anatomy.importStatement" language="typescript" />
            <CodeBlock [code]="doc.anatomy.structure" language="html" />
          </div>
        </section>

        <!-- API Reference Section -->
        <section class="scroll-mt-20 mb-16" id="api">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
            API Reference
          </h2>
          <div class="space-y-12">
            @for (api of doc.apiReference; track api.name) {
              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold">{{ api.name }}</h3>
                  <p class="text-muted-foreground mt-1">{{ api.description }}</p>
                </div>

                <!-- Props Table -->
                @if (api.props.length > 0) {
                  <div class="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow class="bg-muted/50">
                          <TableHead class="w-[180px]">Prop</TableHead>
                          <TableHead class="w-[200px]">Type</TableHead>
                          <TableHead class="w-[120px]">Default</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        @for (prop of api.props; track prop.name) {
                          <TableRow>
                            <TableCell class="font-mono text-sm">
                              {{ prop.name }}
                              @if (prop.required) {
                                <span class="text-red-500">*</span>
                              }
                            </TableCell>
                            <TableCell>
                              <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{{ prop.type }}</code>
                            </TableCell>
                            <TableCell class="text-muted-foreground">
                              {{ prop.default || '—' }}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colspan="3" class="text-sm text-muted-foreground pt-0 pb-4">
                              {{ prop.description }}
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </div>
                }

                <!-- Data Attributes Table -->
                @if (api.dataAttributes && api.dataAttributes.length > 0) {
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-muted-foreground">Data Attributes</h4>
                    <div class="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow class="bg-muted/50">
                            <TableHead class="w-[200px]">Attribute</TableHead>
                            <TableHead>Values</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          @for (attr of api.dataAttributes; track attr.name) {
                            <TableRow>
                              <TableCell class="font-mono text-sm">{{ attr.name }}</TableCell>
                              <TableCell>
                                <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{{ attr.values }}</code>
                              </TableCell>
                            </TableRow>
                          }
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                }

                <!-- CSS Variables Table -->
                @if (api.cssVariables && api.cssVariables.length > 0) {
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-muted-foreground">CSS Variables</h4>
                    <div class="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow class="bg-muted/50">
                            <TableHead class="w-[280px]">Variable</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          @for (cssVar of api.cssVariables; track cssVar.name) {
                            <TableRow>
                              <TableCell class="font-mono text-sm">{{ cssVar.name }}</TableCell>
                              <TableCell class="text-muted-foreground">{{ cssVar.description }}</TableCell>
                            </TableRow>
                          }
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </section>

        <!-- Examples Section -->
        <section class="scroll-mt-20 mb-16" id="examples">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
            Examples
          </h2>
          <div class="space-y-12">
            @for (example of doc.examples; track example.title; let i = $index) {
              <div class="space-y-4">
                <div>
                  <h3 class="text-lg font-semibold">{{ example.title }}</h3>
                  @if (example.description) {
                    <p class="text-sm text-muted-foreground mt-1">{{ example.description }}</p>
                  }
                </div>

                <CodeBlock [code]="example.code" language="html" />

                @if (example.css) {
                  <CodeBlock [code]="example.css" language="css" />
                }
              </div>
            }
          </div>
        </section>

        <!-- Accessibility Section -->
        <section class="scroll-mt-20 mb-16" id="accessibility">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
            Accessibility
          </h2>

          @if (doc.accessibility.ariaPattern) {
            <p class="text-muted-foreground mb-6">
              Adheres to the
              <a
                [href]="doc.accessibility.ariaPatternUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {{ doc.accessibility.ariaPattern }}
              </a>.
            </p>
          }

          <!-- Keyboard Interactions -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <lucide-icon [img]="icons.Keyboard" class="h-5 w-5" />
              Keyboard Interactions
            </h3>
            <div class="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow class="bg-muted/50">
                    <TableHead class="w-[180px]">Key</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  @for (interaction of doc.accessibility.keyboardInteractions; track interaction.key) {
                    <TableRow>
                      <TableCell>
                        <kbd class="inline-flex items-center gap-1 rounded border bg-muted px-2 py-1 font-mono text-sm">
                          {{ interaction.key }}
                        </kbd>
                      </TableCell>
                      <TableCell class="text-muted-foreground">
                        {{ interaction.description }}
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <!-- Additional Links -->
        @if (doc.links.length > 0) {
          <section class="scroll-mt-20 mb-16" id="links">
            <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
              Additional Links
            </h2>
            <ul class="space-y-3">
              @for (link of doc.links; track link.url) {
                <li>
                  <a
                    [href]="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
                  >
                    @switch (link.icon) {
                      @case ('source') {
                        <lucide-icon [img]="icons.FileCode" class="h-4 w-4" />
                      }
                      @case ('issue') {
                        <lucide-icon [img]="icons.GitBranch" class="h-4 w-4" />
                      }
                      @default {
                        <lucide-icon [img]="icons.ExternalLink" class="h-4 w-4" />
                      }
                    }
                    {{ link.text }}
                  </a>
                </li>
              }
            </ul>
          </section>
        }

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
        <h1 class="text-2xl font-bold mb-2">Documentation Not Found</h1>
        <p class="text-muted-foreground mb-4">
          The documentation for "{{ slug() }}" is not available yet.
        </p>
        <Button routerLink="/docs/components" variant="outline">
          View All Components
        </Button>
      </div>
    }
  `,
})
export class ComponentDocPage {
  private readonly docsRegistry = inject(ComponentDocsRegistry);
  private readonly registry = inject(ComponentRegistry);
  private readonly demos = inject(ComponentDemos);
  private readonly seo = inject(SeoService);

  readonly slug = input.required<string>();

  protected readonly demoContainer = viewChild('demoContainer', { read: ViewContainerRef });

  protected readonly icons = {
    ArrowRight,
    ArrowLeft,
    Copy,
    Check,
    Eye,
    Code2,
    CheckCircle,
    Keyboard,
    ExternalLink,
    FileCode,
    GitBranch,
  };

  // Signal for installation tab state
  protected readonly installTab = signal<string>('ng-add');

  protected readonly docs = computed(() => {
    return this.docsRegistry.getBySlug(this.slug());
  });

  protected readonly hasDemo = computed(() => {
    return this.demos.hasDemo(this.slug());
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

    // Update SEO meta tags when docs change
    effect(() => {
      const doc = this.docs();
      if (doc) {
        this.seo.updateMetaTags({
          title: `${doc.name} - Components`,
          description: `${doc.description} Learn how to install and use the ${doc.name} component in your Angular application with ng-cn.`,
          keywords: [
            'angular',
            doc.name.toLowerCase(),
            'component',
            'shadcn',
            'ui',
            'tailwind css',
            'accessibility',
            'aria',
          ],
          ogType: 'article',
          canonicalUrl: `/docs/components/${doc.slug}`,
          structuredData: this.seo.getBreadcrumbStructuredData([
            { name: 'Home', url: '/' },
            { name: 'Documentation', url: '/docs' },
            { name: 'Components', url: '/docs/components' },
            { name: doc.name, url: `/docs/components/${doc.slug}` },
          ]),
        });
      }
    });
  }
}
