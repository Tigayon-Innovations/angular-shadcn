import { ComponentRegistry, type ComponentCategory } from '@/services/component-registry.service';
import { Badge } from '@/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
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
    Input,
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
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Components</h1>
        <p class="text-lg text-muted-foreground mt-2">
          Beautifully designed components built with Angular and Tailwind CSS.
        </p>
      </div>

      <Separator />

      <!-- Search -->
      <div class="relative">
        <lucide-icon [img]="icons.Search" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search components..."
          class="pl-10"
          [value]="searchQuery()"
          (input)="onSearch($event)"
        />
      </div>

      <!-- Category Tabs -->
      <Tabs defaultValue="all" class="w-full">
        <TabsList class="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="all" (click)="setCategory(null)">
            All
            <Badge variant="secondary" class="ml-1.5">{{ allComponents().length }}</Badge>
          </TabsTrigger>
          @for (category of categories(); track category.category) {
            <TabsTrigger [value]="category.category" (click)="setCategory(category.category)">
              {{ category.label }}
              <Badge variant="secondary" class="ml-1.5">{{ category.components.length }}</Badge>
            </TabsTrigger>
          }
        </TabsList>

        <TabsContent value="all" class="mt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (component of filteredComponents(); track component.slug) {
              <a [routerLink]="['/docs/components', component.slug]" class="block group">
                <Card class="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle class="flex items-center justify-between">
                      {{ component.name }}
                      <lucide-icon
                        [img]="icons.ArrowRight"
                        class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </CardTitle>
                    <CardDescription>{{ component.description }}</CardDescription>
                  </CardHeader>
                </Card>
              </a>
            } @empty {
              <div class="col-span-full text-center py-12">
                <p class="text-muted-foreground">No components found matching "{{ searchQuery() }}"</p>
              </div>
            }
          </div>
        </TabsContent>

        @for (category of categories(); track category.category) {
          <TabsContent [value]="category.category" class="mt-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              @for (component of getCategoryComponents(category.category); track component.slug) {
                <a [routerLink]="['/docs/components', component.slug]" class="block group">
                  <Card class="h-full transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle class="flex items-center justify-between">
                        {{ component.name }}
                        <lucide-icon
                          [img]="icons.ArrowRight"
                          class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </CardTitle>
                      <CardDescription>{{ component.description }}</CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              }
            </div>
          </TabsContent>
        }
      </Tabs>
    </div>
  `,
})
export class ComponentsListPage {
  private readonly registry = inject(ComponentRegistry);

  protected readonly icons = { Search, ArrowRight };
  protected readonly searchQuery = signal('');
  protected readonly selectedCategory = signal<ComponentCategory | null>(null);

  protected readonly allComponents = computed(() => this.registry.getAll());
  protected readonly categories = computed(() => this.registry.getCategories());

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
