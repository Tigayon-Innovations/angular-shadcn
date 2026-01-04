import { CodeBlock } from '@/components/code-block';
import { DynamicPreview } from '@/components/playground';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Textarea } from '@/ui/textarea';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertCircle, Code, Copy, Edit3, Eye, LucideAngularModule, Palette, Play, RotateCcw, Sparkles } from 'lucide-angular';

interface ComponentExample {
  id: string;
  name: string;
  description: string;
  code: string;
}

/**
 * Playground page for testing and previewing shadcn-angular components.
 * Supports both preset examples and custom template input for dynamic rendering.
 */
@Component({
  selector: 'PlaygroundPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CodeBlock,
    DynamicPreview,
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
    Textarea,
    RouterLink,
    LucideAngularModule,
    FormsModule,
  ],
  template: `
    <div class="container mx-auto max-w-6xl py-10">
      <!-- Hero Section -->
      <section class="mb-10">
        <div class="flex flex-col items-center text-center space-y-4">
          <Badge variant="secondary" class="gap-1">
            <lucide-icon [img]="icons.Sparkles" class="size-3" />
            Interactive
          </Badge>
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
            Component Playground
          </h1>
          <p class="max-w-[600px] text-lg text-muted-foreground">
            Explore shadcn-angular components with live previews.
            Select an example or paste your own template to see it rendered dynamically.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button routerLink="/theme-editor" variant="outline" class="gap-2">
              <lucide-icon [img]="icons.Palette" class="size-4" />
              Open Theme Editor
            </Button>
            <Button routerLink="/docs/components" variant="ghost" class="gap-2">
              Browse Components
            </Button>
          </div>
        </div>
      </section>

      <!-- Mode Toggle & Component Selector -->
      <section class="mb-6 space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <Button
              [variant]="mode() === 'examples' ? 'default' : 'outline'"
              size="sm"
              (click)="setMode('examples')"
              class="gap-2"
            >
              <lucide-icon [img]="icons.Sparkles" class="size-4" />
              Examples
            </Button>
            <Button
              [variant]="mode() === 'custom' ? 'default' : 'outline'"
              size="sm"
              (click)="setMode('custom')"
              class="gap-2"
            >
              <lucide-icon [img]="icons.Edit3" class="size-4" />
              Custom Template
            </Button>
          </div>
        </div>

        @if (mode() === 'examples') {
          <div class="flex flex-wrap items-center gap-2">
            @for (component of components; track component.id) {
              <Button
                [variant]="selectedComponent() === component.id ? 'default' : 'outline'"
                size="sm"
                (click)="selectComponent(component.id)"
              >
                {{ component.name }}
              </Button>
            }
          </div>
        }
      </section>

      <!-- Main Playground Section -->
      <section>
        <Card>
          <CardHeader class="border-b bg-muted/30">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                @if (mode() === 'custom') {
                  <lucide-icon [img]="icons.Edit3" class="size-5 text-primary" />
                  <CardTitle class="text-lg">Custom Template</CardTitle>
                } @else {
                  <lucide-icon [img]="icons.Sparkles" class="size-5 text-primary" />
                  <CardTitle class="text-lg">{{ getSelectedComponent()?.name }}</CardTitle>
                }
              </div>
              <div class="flex items-center gap-2">
                @if (mode() === 'custom') {
                  <Button variant="ghost" size="sm" class="h-8 gap-2" (click)="resetCustomTemplate()">
                    <lucide-icon [img]="icons.RotateCcw" class="size-3.5" />
                    Reset
                  </Button>
                }
                <Button variant="ghost" size="sm" class="h-8 gap-2" (click)="copyCode()">
                  <lucide-icon [img]="icons.Copy" class="size-3.5" />
                  {{ copied() ? 'Copied!' : 'Copy' }}
                </Button>
              </div>
            </div>
            <CardDescription>
              @if (mode() === 'custom') {
                Paste or type your Angular template below to see it rendered in real-time.
              } @else {
                {{ getSelectedComponent()?.description }}
              }
            </CardDescription>
          </CardHeader>

          <div class="grid lg:grid-cols-2">
            <!-- Code/Editor Panel -->
            <div class="border-r border-border">
              <div class="flex items-center gap-2 border-b bg-muted/20 px-4 py-2">
                @if (mode() === 'custom') {
                  <lucide-icon [img]="icons.Edit3" class="size-4 text-muted-foreground" />
                  <span class="text-sm font-medium text-muted-foreground">Editor</span>
                } @else {
                  <lucide-icon [img]="icons.Code" class="size-4 text-muted-foreground" />
                  <span class="text-sm font-medium text-muted-foreground">Code</span>
                }
              </div>

              @if (mode() === 'custom') {
                <div class="p-4">
                  <textarea
                    class="min-h-[450px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 font-mono text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Paste your Angular template here...

Example:
<div class=&quot;flex flex-wrap items-center gap-4&quot;>
  <Button>Default</Button>
  <Button variant=&quot;secondary&quot;>Secondary</Button>
  <Button variant=&quot;destructive&quot;>Destructive</Button>
</div>"
                    [ngModel]="customTemplate()"
                    (ngModelChange)="updateCustomTemplate($event)"
                  ></textarea>
                  <p class="mt-2 text-xs text-muted-foreground">
                    Supported components: Button, Card, Badge, Alert, Accordion, Tabs, Input, Label, Checkbox, and more.
                  </p>
                </div>
              } @else {
                <div class="max-h-[500px] overflow-auto">
                  <CodeBlock
                    [code]="getSelectedComponent()?.code ?? ''"
                    language="angular-ts"
                  />
                </div>
              }
            </div>

            <!-- Preview Panel -->
            <div class="flex flex-col">
              <div class="flex items-center gap-2 border-b bg-muted/20 px-4 py-2">
                <lucide-icon [img]="icons.Eye" class="size-4 text-muted-foreground" />
                <span class="text-sm font-medium text-muted-foreground">Preview</span>
                @if (mode() === 'custom') {
                  <Badge variant="outline" class="ml-auto text-xs">Live</Badge>
                }
              </div>
              <div class="flex-1 overflow-auto bg-background p-6 min-h-[400px]">
                @if (mode() === 'custom') {
                  <DynamicPreview [template]="customTemplate()" />
                } @else {
                  @switch (selectedComponent()) {
                    @case ('accordion') {
                      <Accordion type="single" collapsible class="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Is it accessible?</AccordionTrigger>
                          <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Is it styled?</AccordionTrigger>
                          <AccordionContent>
                            Yes. It comes with default styles that match the shadcn/ui aesthetic.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Is it animated?</AccordionTrigger>
                          <AccordionContent>
                            Yes. It's animated by default with smooth transitions.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    }
                    @case ('alert') {
                      <div class="space-y-4">
                        <Alert>
                          <lucide-icon [img]="icons.AlertCircle" class="size-4" />
                          <AlertTitle>Heads up!</AlertTitle>
                          <AlertDescription>
                            You can add components to your app using the CLI.
                          </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                          <lucide-icon [img]="icons.AlertCircle" class="size-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>
                            Your session has expired. Please log in again.
                          </AlertDescription>
                        </Alert>
                      </div>
                    }
                    @case ('badge') {
                      <div class="flex flex-wrap items-center gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    }
                    @case ('button') {
                      <div class="flex flex-wrap items-center gap-4">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    }
                    @case ('card') {
                      <Card class="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description goes here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p class="text-sm text-muted-foreground">
                            This is the card content area. You can put any content here.
                          </p>
                        </CardContent>
                        <CardFooter class="flex gap-2">
                          <Button>Action</Button>
                          <Button variant="outline">Cancel</Button>
                        </CardFooter>
                      </Card>
                    }
                    @case ('checkbox') {
                      <div class="space-y-4">
                        <div class="flex items-center space-x-2">
                          <Checkbox id="terms1" />
                          <Label htmlFor="terms1">Accept terms and conditions</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                          <Checkbox id="terms2" [checked]="true" />
                          <Label htmlFor="terms2">Send me marketing emails</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                          <Checkbox id="terms3" [disabled]="true" />
                          <Label htmlFor="terms3" class="opacity-50">Disabled option</Label>
                        </div>
                      </div>
                    }
                    @case ('input') {
                      <div class="space-y-4 max-w-sm">
                        <div class="grid gap-1.5">
                          <Label htmlFor="email">Email</Label>
                          <Input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div class="grid gap-1.5">
                          <Label htmlFor="password">Password</Label>
                          <Input type="password" id="password" placeholder="Enter your password" />
                        </div>
                        <div class="grid gap-1.5">
                          <Label htmlFor="disabled">Disabled</Label>
                          <Input id="disabled" placeholder="Disabled input" disabled />
                        </div>
                      </div>
                    }
                    @case ('tabs') {
                      <Tabs defaultValue="account" class="w-full max-w-md">
                        <TabsList class="grid w-full grid-cols-2">
                          <TabsTrigger value="account">Account</TabsTrigger>
                          <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                          <Card>
                            <CardHeader>
                              <CardTitle>Account</CardTitle>
                              <CardDescription>
                                Make changes to your account here. Click save when you're done.
                              </CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-2">
                              <div class="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value="John Doe" />
                              </div>
                              <div class="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value="@johndoe" />
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button>Save changes</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                        <TabsContent value="password">
                          <Card>
                            <CardHeader>
                              <CardTitle>Password</CardTitle>
                              <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                              </CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-2">
                              <div class="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                              </div>
                              <div class="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button>Save password</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    }
                  }
                }
              </div>
            </div>
          </div>
        </Card>
      </section>

      <!-- Tips Section for Custom Mode -->
      @if (mode() === 'custom') {
        <section class="mt-8">
          <Card>
            <CardHeader>
              <CardTitle class="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div class="space-y-1">
                  <p class="text-sm font-medium">Button Variants</p>
                  <code class="text-xs text-muted-foreground">variant="secondary|destructive|outline|ghost|link"</code>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Badge Variants</p>
                  <code class="text-xs text-muted-foreground">variant="secondary|destructive|outline"</code>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Alert Variants</p>
                  <code class="text-xs text-muted-foreground">variant="default|destructive"</code>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Card Structure</p>
                  <code class="text-xs text-muted-foreground">Card > CardHeader, CardContent, CardFooter</code>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Accordion</p>
                  <code class="text-xs text-muted-foreground">type="single|multiple" collapsible</code>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Tailwind Classes</p>
                  <code class="text-xs text-muted-foreground">class="flex gap-4 p-4"</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      }
    </div>
  `,
})
export class PlaygroundPage {
  protected readonly icons = { AlertCircle, Code, Copy, Edit3, Eye, Palette, Play, RotateCcw, Sparkles };
  protected readonly copied = signal(false);
  protected readonly selectedComponent = signal('accordion');
  protected readonly mode = signal<'examples' | 'custom'>('examples');
  protected readonly customTemplate = signal(`<div class="flex flex-wrap items-center gap-4">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`);

  private readonly defaultCustomTemplate = this.customTemplate();

  protected readonly components: ComponentExample[] = [
    {
      id: 'accordion',
      name: 'Accordion',
      description: 'A vertically stacked set of interactive headings.',
      code: `<Accordion type="single" collapsible class="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the shadcn/ui aesthetic.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It's animated by default with smooth transitions.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    },
    {
      id: 'alert',
      name: 'Alert',
      description: 'Displays a callout for user attention.',
      code: `<Alert>
  <lucide-icon [img]="AlertCircle" class="size-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <lucide-icon [img]="AlertCircle" class="size-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
    },
    {
      id: 'badge',
      name: 'Badge',
      description: 'Displays a badge or a component that looks like a badge.',
      code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
    },
    {
      id: 'button',
      name: 'Button',
      description: 'Displays a button or a component that looks like a button.',
      code: `<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
    },
    {
      id: 'card',
      name: 'Card',
      description: 'Displays a card with header, content, and footer.',
      code: `<Card class="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">
      This is the card content area.
    </p>
  </CardContent>
  <CardFooter class="flex gap-2">
    <Button>Action</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>`,
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      description: 'A control that allows the user to toggle between checked and not checked.',
      code: `<div class="flex items-center space-x-2">
  <Checkbox id="terms1" />
  <Label htmlFor="terms1">Accept terms and conditions</Label>
</div>

<div class="flex items-center space-x-2">
  <Checkbox id="terms2" checked />
  <Label htmlFor="terms2">Send me marketing emails</Label>
</div>

<div class="flex items-center space-x-2">
  <Checkbox id="terms3" disabled />
  <Label htmlFor="terms3">Disabled option</Label>
</div>`,
    },
    {
      id: 'input',
      name: 'Input',
      description: 'Displays a form input field.',
      code: `<div class="grid gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>

<div class="grid gap-1.5">
  <Label htmlFor="password">Password</Label>
  <Input type="password" id="password" placeholder="Enter your password" />
</div>

<div class="grid gap-1.5">
  <Label htmlFor="disabled">Disabled</Label>
  <Input id="disabled" placeholder="Disabled input" disabled />
</div>`,
    },
    {
      id: 'tabs',
      name: 'Tabs',
      description: 'A set of layered sections of content.',
      code: `<Tabs defaultValue="account" class="w-full max-w-md">
  <TabsList class="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value="John Doe" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  </TabsContent>
</Tabs>`,
    },
  ];

  protected selectComponent(id: string): void {
    this.selectedComponent.set(id);
  }

  protected getSelectedComponent(): ComponentExample | undefined {
    return this.components.find(c => c.id === this.selectedComponent());
  }

  protected setMode(mode: 'examples' | 'custom'): void {
    this.mode.set(mode);
  }

  protected updateCustomTemplate(value: string): void {
    this.customTemplate.set(value);
  }

  protected resetCustomTemplate(): void {
    this.customTemplate.set(this.defaultCustomTemplate);
  }

  protected copyCode(): void {
    const code = this.mode() === 'custom'
      ? this.customTemplate()
      : this.getSelectedComponent()?.code ?? '';

    if (code) {
      navigator.clipboard.writeText(code);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
