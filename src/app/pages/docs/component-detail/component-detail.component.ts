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
      <div class="space-y-6">
        <!-- Header -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <Badge variant="outline">{{ categoryLabel() }}</Badge>
          </div>
          <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">{{ comp.name }}</h1>
          <p class="text-lg text-muted-foreground mt-2">
            {{ comp.description }}
          </p>
        </div>

        <Separator />

        <!-- Preview -->
        <section class="space-y-4">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Preview</h2>
          <ComponentPreview
            [code]="previewCode()"
            language="html"
            [interactive]="hasDemo()"
            [showViewportControls]="true"
          >
            @if (hasDemo()) {
              <div class="w-full flex items-center justify-center">
                <ng-container #demoContainer></ng-container>
              </div>
            } @else {
              <p class="text-muted-foreground text-sm">
                Preview not available yet for this component.
              </p>
            }
          </ComponentPreview>
        </section>

        <!-- Installation -->
        <section class="space-y-4">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
          <Tabs defaultValue="cli">
            <TabsList>
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli" class="mt-4">
              <CodeBlock
                [code]="'npx shadcn-angular add ' + slug()"
                language="bash"
              />
            </TabsContent>
            <TabsContent value="manual" class="mt-4">
              <p class="text-sm text-muted-foreground mb-4">
                Copy and paste the component code into your project.
              </p>
              <CodeBlock
                [code]="importCode()"
                language="typescript"
              />
            </TabsContent>
          </Tabs>
        </section>

        <!-- Usage -->
        <section class="space-y-4">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
          <CodeBlock
            [code]="usageCode()"
            language="typescript"
          />
          <CodeBlock
            [code]="templateUsageCode()"
            language="html"
          />
        </section>

        <!-- Examples -->
        <section class="space-y-4">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
          @for (example of comp.examples; track example.title) {
            <div class="space-y-2">
              <h3 class="font-semibold">{{ example.title }}</h3>
              @if (example.description) {
                <p class="text-sm text-muted-foreground">{{ example.description }}</p>
              }
              <CodeBlock [code]="example.code" language="html" />
            </div>
          }
        </section>

        <!-- API Reference -->
        @if (comp.props.length > 0) {
          <ApiReference title="Props" [properties]="comp.props" />
        }

        <!-- Navigation -->
        <div class="flex items-center justify-between pt-8 border-t">
          @if (prevComponent(); as prev) {
            <Button [routerLink]="['/docs/components', prev.slug]" variant="outline" class="gap-2">
              <lucide-icon [img]="icons.ArrowLeft" class="h-4 w-4" />
              {{ prev.name }}
            </Button>
          } @else {
            <div></div>
          }
          @if (nextComponent(); as next) {
            <Button [routerLink]="['/docs/components', next.slug]" variant="outline" class="gap-2">
              {{ next.name }}
              <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
            </Button>
          } @else {
            <div></div>
          }
        </div>
      </div>
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
