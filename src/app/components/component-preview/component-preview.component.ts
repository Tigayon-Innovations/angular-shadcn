import { CodeBlock } from '@/components/code-block';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

/**
 * Component preview with tabs for Preview and Code views.
 */
@Component({
  selector: 'ComponentPreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabsContent, TabsList, TabsTrigger, Button, CodeBlock, LucideAngularModule],
  template: `
    <div [class]="computedClass()">
      <Tabs defaultValue="preview" class="relative w-full">
        <div class="flex items-center justify-between pb-3">
          <TabsList class="w-auto">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" class="relative rounded-md border">
          <div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
            <ng-content />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock [code]="code()" [language]="language()" />
        </TabsContent>
      </Tabs>
    </div>
  `,
})
export class ComponentPreview {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('relative my-4', this.class())
  );
}
