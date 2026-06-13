import { CodeBlock } from '@/components/code-block';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Component preview with Preview / Code tabs — matched to shadcn/ui v4's
 * ComponentPreview (rounded-xl border, top-left tabs, a clean centered
 * preview area; no device toolbar, dot-pattern, or interactive badge).
 */
@Component({
  selector: 'ComponentPreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabsContent, TabsList, TabsTrigger, CodeBlock],
  template: `
    <div [class]="computedClass()">
      <Tabs defaultValue="preview" class="relative w-full gap-0">
        <!-- Header: tabs top-left (shadcn) -->
        <div class="flex items-center border-b px-4">
          <TabsList class="h-11 justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="preview"
              class="h-11 rounded-none border-b-2 border-transparent bg-transparent px-3 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              class="h-11 rounded-none border-b-2 border-transparent bg-transparent px-3 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <!-- Preview Panel -->
        <TabsContent value="preview" class="mt-0">
          <div
            class="preview relative flex min-h-[350px] w-full items-center justify-center p-10"
          >
            <ng-content />
          </div>
        </TabsContent>

        <!-- Code Panel -->
        <TabsContent value="code" class="mt-0">
          <CodeBlock
            [code]="code()"
            [language]="language()"
            [filename]="filename()"
            class="rounded-none border-0 border-t"
          />
        </TabsContent>
      </Tabs>
    </div>
  `,
})
export class ComponentPreview {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly filename = input<string>('');
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly class = input<string>('');
  // Retained for API compatibility with existing callers (now no-ops to match
  // shadcn's chrome-free preview).
  readonly interactive = input<boolean>(false);
  readonly showViewportControls = input<boolean>(false);
  readonly showExpandButton = input<boolean>(true);

  protected readonly computedClass = computed(() =>
    cn(
      'group relative overflow-hidden rounded-xl border bg-background',
      this.class(),
    ),
  );
}
