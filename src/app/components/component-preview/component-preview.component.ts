import { CodeBlock } from '@/components/code-block';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    signal
} from '@angular/core';
import {
    Code2,
    Copy,
    Eye,
    Fullscreen,
    LucideAngularModule,
    Maximize2,
    Monitor,
    Smartphone,
    Tablet
} from 'lucide-angular';

type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'full';

/**
 * Component preview with tabs for Preview and Code views.
 * Features interactive viewport controls and improved visual hierarchy.
 */
@Component({
  selector: 'ComponentPreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabsContent, TabsList, TabsTrigger, Button, CodeBlock, LucideAngularModule],
  template: `
    <div [class]="computedClass()">
      <Tabs defaultValue="preview" class="relative w-full">
        <!-- Header with improved visual hierarchy -->
        <div class="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
          <!-- Left: Title and Description -->
          <div class="flex items-center gap-4">
            @if (title()) {
              <div class="flex flex-col">
                <h3 class="text-sm font-semibold text-foreground">{{ title() }}</h3>
                @if (description()) {
                  <p class="text-xs text-muted-foreground">{{ description() }}</p>
                }
              </div>
            }
          </div>

          <!-- Center: Tabs -->
          <TabsList class="h-9 rounded-lg bg-muted p-1">
            <TabsTrigger value="preview" class="gap-2 text-xs px-3">
              <lucide-icon [img]="icons.Eye" class="h-3.5 w-3.5" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" class="gap-2 text-xs px-3">
              <lucide-icon [img]="icons.Code2" class="h-3.5 w-3.5" />
              Code
            </TabsTrigger>
          </TabsList>

          <!-- Right: Viewport Controls -->
          <div class="flex items-center gap-1">
            @if (showViewportControls()) {
              <div class="hidden sm:flex items-center gap-1 mr-2 border-r border-border pr-2">
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-7 w-7"
                  [class.bg-accent]="viewport() === 'mobile'"
                  (click)="setViewport('mobile')"
                >
                  <lucide-icon [img]="icons.Smartphone" class="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-7 w-7"
                  [class.bg-accent]="viewport() === 'tablet'"
                  (click)="setViewport('tablet')"
                >
                  <lucide-icon [img]="icons.Tablet" class="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-7 w-7"
                  [class.bg-accent]="viewport() === 'desktop'"
                  (click)="setViewport('desktop')"
                >
                  <lucide-icon [img]="icons.Monitor" class="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-7 w-7"
                  [class.bg-accent]="viewport() === 'full'"
                  (click)="setViewport('full')"
                >
                  <lucide-icon [img]="icons.Maximize2" class="h-3.5 w-3.5" />
                </Button>
              </div>
            }
            @if (showExpandButton()) {
              <Button variant="ghost" size="icon" class="h-7 w-7" (click)="toggleExpand()">
                <lucide-icon [img]="icons.Fullscreen" class="h-3.5 w-3.5" />
              </Button>
            }
          </div>
        </div>

        <!-- Preview Panel -->
        <TabsContent value="preview" class="mt-0">
          <div [class]="previewContainerClass()">
            <!-- Viewport wrapper for responsive preview -->
            <div [class]="viewportWrapperClass()">
              <!-- Grid background pattern -->
              <div class="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)] opacity-50"></div>

              <!-- Component content -->
              <div [class]="previewContentClass()">
                <ng-content />
              </div>
            </div>

            <!-- Interactive badge -->
            @if (interactive()) {
              <div class="absolute bottom-3 right-3">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary ring-1 ring-primary/20">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
                  </span>
                  Interactive
                </span>
              </div>
            }
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
  readonly interactive = input<boolean>(false);
  readonly showViewportControls = input<boolean>(false);
  readonly showExpandButton = input<boolean>(true);

  protected readonly viewport = signal<ViewportSize>('full');
  protected readonly expanded = signal(false);

  protected readonly icons = {
    Eye,
    Code2,
    Copy,
    Smartphone,
    Tablet,
    Monitor,
    Maximize2,
    Fullscreen,
  };

  protected readonly computedClass = computed(() =>
    cn(
      'relative overflow-hidden rounded-xl border border-border bg-background shadow-sm',
      this.expanded() && 'fixed inset-4 z-50',
      this.class()
    )
  );

  protected readonly previewContainerClass = computed(() =>
    cn(
      'relative overflow-hidden bg-background',
      this.expanded() ? 'h-[calc(100vh-12rem)]' : 'min-h-[350px]'
    )
  );

  protected readonly viewportWrapperClass = computed(() => {
    const vp = this.viewport();
    return cn(
      'relative mx-auto h-full transition-all duration-300 ease-in-out',
      vp === 'mobile' && 'max-w-[375px]',
      vp === 'tablet' && 'max-w-[768px]',
      vp === 'desktop' && 'max-w-[1024px]',
      vp === 'full' && 'max-w-full'
    );
  });

  protected readonly previewContentClass = computed(() =>
    cn(
      'relative flex min-h-[350px] w-full items-center justify-center p-10',
      this.expanded() && 'min-h-full'
    )
  );

  protected setViewport(size: ViewportSize): void {
    this.viewport.set(size);
  }

  protected toggleExpand(): void {
    this.expanded.update((v) => !v);
  }
}
