import { NgComponentOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    signal,
} from '@angular/core';
import { DynamicRendererService, RenderableNode } from './dynamic-renderer.service';

// Import all UI components for dynamic rendering
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Progress } from '@/ui/progress';
import { Separator } from '@/ui/separator';
import { Skeleton } from '@/ui/skeleton';
import { Switch } from '@/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Textarea } from '@/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';

/**
 * Recursive component that renders a tree of parsed nodes.
 */
@Component({
  selector: 'DynamicNode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgComponentOutlet,
    // Import all UI components for template usage
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Alert,
    AlertDescription,
    AlertTitle,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Input,
    Label,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Separator,
    Switch,
    Textarea,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    Progress,
    Skeleton,
  ],
  template: `
    @if (node().isTextNode) {
      {{ node().textContent }}
    } @else {
      @switch (node().tagName) {
        @case ('Switch') {
          <Switch
            [id]="getInput('id')"
            [checked]="getInput('checked')"
            [disabled]="getInput('disabled')"
            [class]="getInput('class')"
          />
        }
        @case ('Label') {
          <Label
            [htmlFor]="getInput('htmlFor')"
            [class]="getInput('class')"
          >
            @for (child of node().children; track child.id) {
              <DynamicNode [node]="child" />
            }
          </Label>
        }
        @case ('div') {
          <div [class]="getInput('class')">
            @for (child of node().children; track child.id) {
              <DynamicNode [node]="child" />
            }
          </div>
        }
        @case ('Button') {
            <Button [variant]="getInput('variant')" [size]="getInput('size')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Button>
        }
        @case ('Card') {
            <Card [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Card>
        }
        @case ('CardHeader') {
            <CardHeader [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </CardHeader>
        }
        @case ('CardTitle') {
            <CardTitle [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </CardTitle>
        }
        @case ('CardDescription') {
            <CardDescription [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </CardDescription>
        }
        @case ('CardContent') {
            <CardContent [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </CardContent>
        }
        @case ('CardFooter') {
            <CardFooter [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </CardFooter>
        }
        @case ('Accordion') {
            <Accordion [type]="getInput('type')" [collapsible]="getInput('collapsible')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Accordion>
        }
        @case ('AccordionItem') {
            <AccordionItem [value]="getInput('value')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </AccordionItem>
        }
        @case ('AccordionTrigger') {
            <AccordionTrigger [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </AccordionTrigger>
        }
        @case ('AccordionContent') {
            <AccordionContent [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </AccordionContent>
        }
        @case ('Badge') {
            <Badge [variant]="getInput('variant')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Badge>
        }
        @case ('Alert') {
            <Alert [variant]="getInput('variant')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Alert>
        }
        @case ('AlertTitle') {
            <AlertTitle [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </AlertTitle>
        }
        @case ('AlertDescription') {
            <AlertDescription [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </AlertDescription>
        }
        @case ('Tabs') {
            <Tabs [defaultValue]="getInput('defaultValue')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Tabs>
        }
        @case ('TabsList') {
            <TabsList [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </TabsList>
        }
        @case ('TabsTrigger') {
            <TabsTrigger [value]="getInput('value')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </TabsTrigger>
        }
        @case ('TabsContent') {
            <TabsContent [value]="getInput('value')" [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </TabsContent>
        }
        @case ('Avatar') {
            <Avatar [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Avatar>
        }
        @case ('AvatarImage') {
            <img AvatarImage [src]="getInput('src')" [alt]="getInput('alt')" [class]="getInput('class')" />
        }
        @case ('AvatarFallback') {
            <AvatarFallback [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </AvatarFallback>
        }
        @case ('Input') {
            <Input [type]="getInput('type')" [placeholder]="getInput('placeholder')" [class]="getInput('class')" [disabled]="getInput('disabled')" />
        }
        @case ('Checkbox') {
            <Checkbox [id]="getInput('id')" [checked]="getInput('checked')" [disabled]="getInput('disabled')" [class]="getInput('class')" />
        }
        @case ('Textarea') {
            <Textarea [placeholder]="getInput('placeholder')" [class]="getInput('class')" [disabled]="getInput('disabled')"></Textarea>
        }
        @case ('Separator') {
            <Separator [orientation]="getInput('orientation')" [class]="getInput('class')" />
        }
        @case ('Skeleton') {
            <Skeleton [class]="getInput('class')" />
        }
        @case ('Dialog') {
            <Dialog [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Dialog>
        }
        @case ('DialogTrigger') {
            <DialogTrigger [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </DialogTrigger>
        }
        @case ('DialogContent') {
            <DialogContent [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </DialogContent>
        }
        @case ('DialogHeader') {
            <DialogHeader [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </DialogHeader>
        }
        @case ('DialogTitle') {
            <DialogTitle [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </DialogTitle>
        }
        @case ('DialogDescription') {
            <DialogDescription [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </DialogDescription>
        }
        @case ('DialogFooter') {
            <DialogFooter [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </DialogFooter>
        }
        @case ('Tooltip') {
            <Tooltip [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </Tooltip>
        }
        @case ('TooltipTrigger') {
            <TooltipTrigger [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </TooltipTrigger>
        }
        @case ('TooltipContent') {
            <TooltipContent [class]="getInput('class')">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </TooltipContent>
        }
        @case ('Progress') {
            <Progress [value]="getInput('value')" [class]="getInput('class')"></Progress>
        }
        @default {
            <!-- Fallback for unknown tags or unhandled components -->
             <div [class]="getInput('class')" [attr.data-tag]="node().tagName">
                @for (child of node().children; track child.id) {
                    <DynamicNode [node]="child" />
                }
            </div>
        }
      }
    }
  `,
})
export class DynamicNode {
  readonly node = input.required<RenderableNode>();

  protected getInput(name: string): any {
    return this.node().inputs[name];
  }

  protected getNodeClass(node: RenderableNode): string {
    return (node.inputs['class'] as string) ?? '';
  }
}

/**
 * Container component for dynamically rendering parsed template trees.
 * Handles template parsing and creates the node tree for rendering.
 */
@Component({
  selector: 'DynamicPreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DynamicNode,
  ],
  template: `
    @if (error()) {
      <div class="rounded-md border border-destructive bg-destructive/10 p-4">
        <p class="text-sm font-medium text-destructive">Parse Error</p>
        <p class="text-sm text-muted-foreground">{{ error() }}</p>
      </div>
    } @else if (nodes().length === 0 && template()) {
      <div class="flex items-center justify-center p-8 text-muted-foreground">
        <p class="text-sm">Parsing template...</p>
      </div>
    } @else if (nodes().length === 0) {
      <div class="flex items-center justify-center p-8 text-muted-foreground">
        <p class="text-sm">Enter a template to preview</p>
      </div>
    } @else {
      <div class="dynamic-preview-container">
        @for (node of nodes(); track node.id) {
          <DynamicNode [node]="node" />
        }
      </div>
    }
  `,
  styles: `
    .dynamic-preview-container {
      display: contents;
    }
  `,
})
export class DynamicPreview {
  private readonly renderer = inject(DynamicRendererService);

  /** The template string to parse and render */
  readonly template = input<string>('');

  /** Parsed nodes from the template */
  readonly nodes = signal<RenderableNode[]>([]);

  /** Error message if parsing fails */
  readonly error = signal<string | null>(null);

  constructor() {
    // Effect to parse template when it changes
    effect(() => {
      const template = this.template();
      this.parseTemplate(template);
    });
  }

  private parseTemplate(template: string): void {
    if (!template.trim()) {
      this.nodes.set([]);
      this.error.set(null);
      return;
    }

    try {
      const parsed = this.renderer.parse(template);
      this.nodes.set(parsed);
      this.error.set(null);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Failed to parse template');
      this.nodes.set([]);
    }
  }
}
