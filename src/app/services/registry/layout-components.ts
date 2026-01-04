import type { ComponentInfo } from './types';

/**
 * Layout components: cards, aspect ratios, separators, scroll areas, collapsibles
 */
export const LAYOUT_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Aspect Ratio',
    slug: 'aspect-ratio',
    description: 'Displays content within a desired ratio.',
    category: 'layout',
    package: '@jamelyassin/aspect-ratio',
    imports: ['AspectRatio'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="w-full max-w-md">
  <AspectRatio [ratio]="16 / 9" class="bg-muted rounded-lg overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Photo by Drew Beamer"
      class="h-full w-full object-cover"
    />
  </AspectRatio>
</div>`,
      },
      {
        title: 'Square',
        code: `<div class="w-48">
  <AspectRatio [ratio]="1" class="bg-muted rounded-lg overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Photo"
      class="h-full w-full object-cover"
    />
  </AspectRatio>
</div>`,
      },
    ],
    props: [
      { name: 'ratio', type: 'number', default: '1', description: 'The desired aspect ratio.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Card',
    slug: 'card',
    description: 'Displays a card with header, content, and footer.',
    category: 'layout',
    package: '@jamelyassin/card',
    imports: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter', 'CardAction'],
    examples: [
      {
        title: 'Basic',
        code: `<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`,
      },
      {
        title: 'With Form',
        code: `<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <div class="grid w-full items-center gap-4">
      <div class="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Name of your project" />
      </div>
    </div>
  </CardContent>
  <CardFooter class="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`,
      },
      {
        title: 'With Action',
        code: `<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon">
        <lucide-icon name="settings" class="h-4 w-4" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">
      Configure your notification preferences.
    </p>
  </CardContent>
</Card>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Collapsible',
    slug: 'collapsible',
    description: 'An interactive component which expands/collapses a panel.',
    category: 'layout',
    package: '@jamelyassin/collapsible',
    imports: ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'],
    examples: [
      {
        title: 'Basic',
        code: `<Collapsible [(open)]="isOpen" class="w-full max-w-md space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4">
    <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
    <CollapsibleTrigger>
      <Button variant="ghost" size="sm" class="w-9 p-0">
        <lucide-icon name="chevrons-up-down" class="h-4 w-4" />
        <span class="sr-only">Toggle</span>
      </Button>
    </CollapsibleTrigger>
  </div>
  <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
  <CollapsibleContent class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
  </CollapsibleContent>
</Collapsible>`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Whether the collapsible is open.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Resizable',
    slug: 'resizable',
    description: 'Resizable panel groups and panels.',
    category: 'layout',
    package: '@jamelyassin/resizable',
    imports: ['ResizablePanelGroup', 'ResizablePanel', 'ResizableHandle'],
    examples: [
      {
        title: 'Basic',
        code: `<ResizablePanelGroup direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
  <ResizablePanel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel [defaultSize]="50">
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`,
      },
    ],
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The direction of the panels.' },
      { name: 'defaultSize', type: 'number', description: 'The default size of the panel as a percentage.' },
      { name: 'withHandle', type: 'boolean', default: 'false', description: 'Whether to show a drag handle.' },
    ],
  },
  {
    name: 'Scroll Area',
    slug: 'scroll-area',
    description: 'Augments native scroll functionality for custom styling.',
    category: 'layout',
    package: '@jamelyassin/scroll-area',
    imports: ['ScrollArea', 'ScrollBar'],
    examples: [
      {
        title: 'Basic',
        code: `<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
    @for (tag of tags; track tag) {
      <div class="text-sm">{{ tag }}</div>
      <Separator class="my-2" />
    }
  </div>
</ScrollArea>`,
      },
      {
        title: 'Horizontal',
        code: `<ScrollArea class="w-96 whitespace-nowrap rounded-md border">
  <div class="flex w-max space-x-4 p-4">
    @for (artwork of artworks; track artwork.artist) {
      <figure class="shrink-0">
        <div class="overflow-hidden rounded-md">
          <img [src]="artwork.art" [alt]="artwork.artist" class="aspect-[3/4] h-[150px] object-cover" />
        </div>
        <figcaption class="pt-2 text-xs text-muted-foreground">
          Photo by <span class="font-semibold text-foreground">{{ artwork.artist }}</span>
        </figcaption>
      </figure>
    }
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
      },
    ],
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'The orientation of the scroll area.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Separator',
    slug: 'separator',
    description: 'Visually or semantically separates content.',
    category: 'layout',
    package: '@jamelyassin/separator',
    imports: ['Separator'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="w-full max-w-md">
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
    <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
  </div>
  <Separator class="my-4" />
  <div class="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>`,
      },
    ],
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The orientation of the separator.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
];
