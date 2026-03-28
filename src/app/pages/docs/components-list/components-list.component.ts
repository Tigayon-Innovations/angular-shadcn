import { ComponentRegistry, type ComponentCategory } from '@/services/component-registry.service';
import { SeoService } from '@/services/seo.service';
import { Badge } from '@/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/card';

import { Separator } from '@/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule, Search } from 'lucide-angular';

/**
 * Components list page showing all available components.
 */
@Component({
  selector: 'ComponentsListPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Badge,
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    LucideAngularModule,
  ],
  template: `
    <article class="relative">
      <!-- Header -->
      <div class="space-y-4 pb-8 pt-6 md:pb-10">
        <div class="space-y-2">
          <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            Components
          </h1>
          <p class="text-xl text-muted-foreground leading-7">
            Beautifully designed components built with Angular and Tailwind CSS.
          </p>
        </div>
      </div>

      <Separator class="mb-10" />

      <!-- Search -->
      <div class="relative max-w-2xl mb-10">
        <lucide-icon [img]="icons.Search" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search components..."
          class="pl-12 h-12 text-base"
          [value]="searchQuery()"
          (input)="onSearch($event)"
        />
      </div>

      <!-- Category Tabs -->
      <Tabs defaultValue="all" class="w-full">
        <div class="mb-8">
          <TabsList class="inline-flex flex-wrap h-auto gap-2">
            <TabsTrigger value="all" (click)="setCategory(null)" class="gap-2">
              All
              <Badge variant="secondary" class="ml-1">{{ allComponents().length }}</Badge>
            </TabsTrigger>
            @for (category of categories(); track category.category) {
              <TabsTrigger [value]="category.category" (click)="setCategory(category.category)" class="gap-2">
                {{ category.label }}
                <Badge variant="secondary" class="ml-1">{{ category.components.length }}</Badge>
              </TabsTrigger>
            }
          </TabsList>
        </div>

        <TabsContent value="all" class="mt-0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (component of filteredComponents(); track component.slug) {
              <a [routerLink]="['/docs/components', component.slug]" class="block group">
                <Card class="h-full transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/50">
                  <CardHeader class="space-y-3">
                    <CardTitle class="flex items-center justify-between text-xl">
                      <span>{{ component.name }}</span>
                      <lucide-icon
                        [img]="icons.ArrowRight"
                        class="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                      />
                    </CardTitle>
                    <CardDescription class="leading-relaxed">{{ component.description }}</CardDescription>
                  </CardHeader>
                </Card>
              </a>
            } @empty {
              <div class="col-span-full">
                <div class="rounded-lg border bg-muted/50 p-12 text-center">
                  <div class="flex justify-center mb-4">
                    <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <lucide-icon [img]="icons.Search" class="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 class="text-lg font-semibold mb-2">No components found</h3>
                  <p class="text-muted-foreground">
                    No components match "{{ searchQuery() }}". Try a different search term.
                  </p>
                </div>
              </div>
            }
          </div>
        </TabsContent>

        @for (category of categories(); track category.category) {
          <TabsContent [value]="category.category" class="mt-0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (component of getCategoryComponents(category.category); track component.slug) {
                <a [routerLink]="['/docs/components', component.slug]" class="block group">
                  <Card class="h-full transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/50">
                    <CardHeader class="space-y-3">
                      <CardTitle class="flex items-center justify-between text-xl">
                        <span>{{ component.name }}</span>
                        <lucide-icon
                          [img]="icons.ArrowRight"
                          class="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                        />
                      </CardTitle>
                      <CardDescription class="leading-relaxed">{{ component.description }}</CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              } @empty {
                <div class="col-span-full">
                  <div class="rounded-lg border bg-muted/50 p-12 text-center">
                    <div class="flex justify-center mb-4">
                      <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <lucide-icon [img]="icons.Search" class="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">No components found</h3>
                    <p class="text-muted-foreground">
                      No components match "{{ searchQuery() }}". Try a different search term.
                    </p>
                  </div>
                </div>
              }
            </div>
          </TabsContent>
        }
      </Tabs>
    </article>
  `,
})
export class ComponentsListPage {
  private readonly registry = inject(ComponentRegistry);
  private readonly seo = inject(SeoService);

  protected readonly icons = { Search, ArrowRight };
  protected readonly searchQuery = signal('');
  protected readonly selectedCategory = signal<ComponentCategory | null>(null);

  protected readonly allComponents = computed(() => this.registry.getAll());
  protected readonly categories = computed(() => this.registry.getCategories());

  constructor() {
    this.seo.updateMetaTags({
      title: 'Components',
      description:
        'Browse 60+ beautifully designed Angular UI components. Buttons, cards, dialogs, forms, tables, and more. Built with Tailwind CSS and fully accessible.',
      keywords: [
        'angular components',
        'ui components',
        'shadcn',
        'tailwind css',
        'button',
        'card',
        'dialog',
        'form',
        'table',
        'tabs',
        'accessible components',
      ],
      canonicalUrl: '/docs/components',
      structuredData: this.seo.getBreadcrumbStructuredData([
        { name: 'Home', url: '/' },
        { name: 'Documentation', url: '/docs' },
        { name: 'Components', url: '/docs/components' },
      ]),
    });
  }

  protected readonly filteredComponents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();
    let components = this.allComponents();

    if (category) {
      components = components.filter((c) => c.category === category);
    }

    if (query) {
      components = components.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    return components;
  });

  protected onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  protected setCategory(category: ComponentCategory | null): void {
    this.selectedCategory.set(category);
  }

  protected getCategoryComponents(category: ComponentCategory) {
    const query = this.searchQuery().toLowerCase();
    let components = this.registry.getByCategory(category);

    if (query) {
      components = components.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    return components;
  }
}
