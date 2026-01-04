import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
  component?: string; // Optional component name for grouping (e.g., 'AccordionItem')
}

export interface ComponentApiSection {
  component: string;
  props: ApiProperty[];
}

/**
 * API reference table component for documenting component props.
 * Styled like shadcn/ui documentation with clean borders and proper spacing.
 * Supports grouping props by component with section headers.
 */
@Component({
  selector: 'ApiReference',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    /* Syntax highlighting for default values */
    .default-string {
      color: oklch(0.7 0.15 145); /* Green for strings */
    }
    .default-boolean {
      color: oklch(0.7 0.15 250); /* Blue for booleans */
    }
    .default-number {
      color: oklch(0.75 0.15 80); /* Orange for numbers */
    }
    .default-undefined {
      color: oklch(0.6 0.1 280); /* Purple for undefined/null */
    }
  `,
  template: `
    <div class="my-8">
      <div class="space-y-2 mb-6">
        <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
          {{ title() }}
        </h2>
      </div>

      @for (section of groupedProperties(); track section.component) {
        <div class="mb-8">
          <!-- Component Section Header -->
          <div class="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
            <code class="relative rounded-md bg-primary/10 px-2 py-1 font-mono text-sm font-semibold text-primary">
              {{ section.component }}
            </code>
          </div>

          <!-- Props Table -->
          <div class="relative w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
              <thead class="[&_tr]:border-b">
                <tr class="border-b transition-colors">
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[150px]">
                    Prop
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[200px]">
                    Type
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[120px]">
                    Default
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="[&_tr:last-child]:border-0">
                @for (prop of section.props; track prop.name) {
                  <tr class="border-b transition-colors hover:bg-muted/50">
                    <td class="p-4 align-middle">
                      <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {{ prop.name }}
                      </code>
                    </td>
                    <td class="p-4 align-middle">
                      <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-muted-foreground">
                        {{ prop.type }}
                      </code>
                    </td>
                    <td class="p-4 align-middle">
                      @if (prop.default) {
                        <code
                          class="relative rounded bg-zinc-900 border border-zinc-800 px-2 py-1 font-mono text-sm"
                          [class]="getDefaultValueClass(prop.default)"
                        >
                          {{ prop.default }}
                        </code>
                      } @else {
                        <span class="text-muted-foreground">—</span>
                      }
                    </td>
                    <td class="p-4 align-middle text-muted-foreground">
                      {{ prop.description }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
})
export class ApiReference {
  readonly title = input<string>('API Reference');
  readonly properties = input<ApiProperty[]>([]);

  /**
   * Group properties by component name.
   * Props without a component field go under a default 'Props' group.
   */
  protected readonly groupedProperties = computed((): ComponentApiSection[] => {
    const props = this.properties();
    const grouped = new Map<string, ApiProperty[]>();

    for (const prop of props) {
      const component = prop.component || 'Props';
      if (!grouped.has(component)) {
        grouped.set(component, []);
      }
      grouped.get(component)!.push(prop);
    }

    // Sort to ensure consistent ordering - main component first, then alphabetically
    return Array.from(grouped.entries())
      .sort(([a], [b]) => {
        if (a === 'Props') return -1;
        if (b === 'Props') return 1;
        return a.localeCompare(b);
      })
      .map(([component, props]) => ({ component, props }));
  });

  /**
   * Determine the CSS class for syntax highlighting based on the default value.
   */
  protected getDefaultValueClass(value: string): string {
    if (!value) return '';

    // String values (wrapped in quotes)
    if (value.startsWith("'") || value.startsWith('"')) {
      return 'default-string';
    }

    // Boolean values
    if (value === 'true' || value === 'false') {
      return 'default-boolean';
    }

    // Undefined/null values
    if (value === 'undefined' || value === 'null') {
      return 'default-undefined';
    }

    // Number values
    if (!isNaN(Number(value))) {
      return 'default-number';
    }

    // Default to string style for other values
    return 'default-string';
  }
}
