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
    package: '@ng-cn/aspect-ratio',
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
    description:
      'Displays a card with header, content, and footer. Perfect for displaying grouped information, forms, or media.',
    category: 'layout',
    package: '@ng-cn/card',
    imports: [
      'Card',
      'CardHeader',
      'CardTitle',
      'CardDescription',
      'CardContent',
      'CardFooter',
      'CardAction',
    ],
    examples: [
      {
        title: 'Basic',
        description: 'A simple card with all sections.',
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
        description: 'Card containing a form for user input.',
        code: `<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form class="grid w-full items-center gap-4">
      <div class="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Name of your project" />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label htmlFor="framework">Framework</Label>
        <Select>
          <SelectTrigger id="framework">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="sveltekit">SvelteKit</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  </CardContent>
  <CardFooter class="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`,
      },
      {
        title: 'With Action Button',
        description: 'Card header with an action button.',
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
      {
        title: 'Interactive Card',
        description: 'Card that acts as a clickable element.',
        code: `<Card
  class="w-[350px] cursor-pointer transition-colors hover:bg-accent"
  tabindex="0"
  role="button"
  (click)="handleCardClick()"
  (keydown.enter)="handleCardClick()"
>
  <CardHeader>
    <CardTitle>Click me</CardTitle>
    <CardDescription>This entire card is interactive.</CardDescription>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">
      Cards can be made clickable for navigation or actions.
    </p>
  </CardContent>
</Card>`,
      },
      {
        title: 'With Image',
        description: 'Card with featured image at the top.',
        code: `<Card class="w-[350px] overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
    alt="Featured image"
    class="w-full h-48 object-cover"
  />
  <CardHeader>
    <CardTitle>Beautiful Landscape</CardTitle>
    <CardDescription>Photography by Drew Beamer</CardDescription>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">
      A stunning capture of natural beauty.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" class="w-full">View Gallery</Button>
  </CardFooter>
</Card>`,
      },
      {
        title: 'Card Grid Layout',
        description: 'Multiple cards in a responsive grid.',
        code: `<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  @for (item of items; track item.id) {
    <Card>
      <CardHeader>
        <CardTitle>{{ item.title }}</CardTitle>
        <CardDescription>{{ item.description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">{{ item.content }}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Learn more</Button>
      </CardFooter>
    </Card>
  }
</div>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes.', component: 'Card' },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes.',
        component: 'CardHeader',
      },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes.',
        component: 'CardTitle',
      },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes.',
        component: 'CardDescription',
      },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes.',
        component: 'CardContent',
      },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes.',
        component: 'CardFooter',
      },
    ],
  },
  {
    name: 'Collapsible',
    slug: 'collapsible',
    description: 'An interactive component which expands/collapses a panel.',
    category: 'layout',
    package: '@ng-cn/collapsible',
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
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Whether the collapsible is open.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Resizable',
    slug: 'resizable',
    description: 'Resizable panel groups and panels.',
    category: 'layout',
    package: '@ng-cn/resizable',
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
      {
        name: 'direction',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The direction of the panels.',
      },
      {
        name: 'defaultSize',
        type: 'number',
        description: 'The default size of the panel as a percentage.',
      },
      {
        name: 'withHandle',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show a drag handle.',
      },
    ],
  },
  {
    name: 'Scroll Area',
    slug: 'scroll-area',
    description: 'Augments native scroll functionality for custom styling.',
    category: 'layout',
    package: '@ng-cn/scroll-area',
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
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'vertical'",
        description: 'The orientation of the scroll area.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Separator',
    slug: 'separator',
    description:
      'Visually or semantically separates content. Renders as an hr element with proper accessibility.',
    category: 'layout',
    package: '@ng-cn/separator',
    imports: ['Separator'],
    examples: [
      {
        title: 'Horizontal',
        description: 'Default horizontal separator between content sections.',
        code: `<div class="w-full max-w-md">
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
    <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
  </div>
  <Separator class="my-4" />
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">Installation</h4>
    <p class="text-sm text-muted-foreground">How to install dependencies and structure your app.</p>
  </div>
</div>`,
      },
      {
        title: 'Vertical',
        description: 'Vertical separator between inline elements.',
        code: `<div class="flex h-5 items-center space-x-4 text-sm">
  <div>Blog</div>
  <Separator orientation="vertical" />
  <div>Docs</div>
  <Separator orientation="vertical" />
  <div>Source</div>
</div>`,
      },
      {
        title: 'In Navigation',
        description: 'Separator used in navigation menus.',
        code: `<nav class="flex items-center space-x-4">
  <a href="#" class="text-sm font-medium">Home</a>
  <a href="#" class="text-sm font-medium">Products</a>
  <a href="#" class="text-sm font-medium">About</a>
  <Separator orientation="vertical" class="h-6" />
  <Button variant="outline" size="sm">Sign In</Button>
  <Button size="sm">Sign Up</Button>
</nav>`,
      },
      {
        title: 'With Text Label',
        description: 'Separator with centered text label.',
        code: `<div class="relative">
  <div class="absolute inset-0 flex items-center">
    <Separator class="w-full" />
  </div>
  <div class="relative flex justify-center text-xs uppercase">
    <span class="bg-background px-2 text-muted-foreground">
      Or continue with
    </span>
  </div>
</div>`,
      },
      {
        title: 'In Card Layout',
        description: 'Separator between card sections.',
        code: `<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Account Settings</CardTitle>
    <CardDescription>Manage your account preferences.</CardDescription>
  </CardHeader>
  <Separator />
  <CardContent class="pt-4">
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Email notifications</span>
        <Switch />
      </div>
      <Separator />
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Push notifications</span>
        <Switch />
      </div>
    </div>
  </CardContent>
</Card>`,
      },
    ],
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The orientation of the separator.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'true',
        description: 'Whether the separator is decorative (aria-hidden).',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
];
