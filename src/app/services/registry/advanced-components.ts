import type { ComponentInfo } from './types';

/**
 * Advanced components: sidebars, spinners, typography, extended UI patterns
 */
export const ADVANCED_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Button Group',
    slug: 'button-group',
    description: 'Groups multiple buttons together.',
    category: 'advanced',
    package: '@jamelyassin/button-group',
    imports: ['ButtonGroup'],
    examples: [
      {
        title: 'Basic',
        code: `<ButtonGroup>
  <Button variant="outline" size="icon">
    <lucide-icon name="align-left" class="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon">
    <lucide-icon name="align-center" class="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon">
    <lucide-icon name="align-right" class="h-4 w-4" />
  </Button>
</ButtonGroup>`,
      },
    ],
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The orientation of the button group.' },
    ],
  },
  {
    name: 'Empty',
    slug: 'empty',
    description: 'Empty state placeholder component.',
    category: 'advanced',
    package: '@jamelyassin/empty',
    imports: ['Empty', 'EmptyIcon', 'EmptyTitle', 'EmptyDescription'],
    examples: [
      {
        title: 'Basic',
        code: `<Empty class="py-12">
  <EmptyIcon>
    <lucide-icon name="inbox" class="h-12 w-12 text-muted-foreground" />
  </EmptyIcon>
  <EmptyTitle>No items found</EmptyTitle>
  <EmptyDescription>
    You haven't added any items yet. Start by creating a new item.
  </EmptyDescription>
</Empty>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
  {
    name: 'Input Group',
    slug: 'input-group',
    description: 'Input with prefix/suffix addons.',
    category: 'advanced',
    package: '@jamelyassin/input-group',
    imports: ['InputGroup', 'InputGroupAddon'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="space-y-4 w-full max-w-sm">
  <InputGroup>
    <InputGroupAddon>
      <lucide-icon name="search" class="h-4 w-4 text-muted-foreground" />
    </InputGroupAddon>
    <Input placeholder="Search..." />
  </InputGroup>

  <InputGroup>
    <InputGroupAddon>https://</InputGroupAddon>
    <Input placeholder="example.com" />
  </InputGroup>

  <InputGroup>
    <InputGroupAddon>
      <lucide-icon name="at-sign" class="h-4 w-4 text-muted-foreground" />
    </InputGroupAddon>
    <Input placeholder="username" />
  </InputGroup>
</div>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
  {
    name: 'Kbd',
    slug: 'kbd',
    description: 'Keyboard key indicator component.',
    category: 'advanced',
    package: '@jamelyassin/kbd',
    imports: ['Kbd'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="flex flex-wrap items-center gap-4">
  <div class="flex items-center gap-1">
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </div>
  <div class="flex items-center gap-1">
    <Kbd>Ctrl</Kbd>
    <span class="text-muted-foreground">+</span>
    <Kbd>C</Kbd>
  </div>
  <div class="flex items-center gap-1">
    <Kbd>⇧</Kbd>
    <Kbd>⌘</Kbd>
    <Kbd>P</Kbd>
  </div>
  <Kbd>Enter</Kbd>
  <Kbd>Esc</Kbd>
</div>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
  {
    name: 'Native Select',
    slug: 'native-select',
    description: 'HTML native select with styling.',
    category: 'advanced',
    package: '@jamelyassin/native-select',
    imports: ['NativeSelect'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="grid w-full max-w-sm gap-1.5">
  <Label for="framework">Framework</Label>
  <NativeSelect id="framework">
    <option value="">Select a framework</option>
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
  </NativeSelect>
</div>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
  {
    name: 'Segmented',
    slug: 'segmented',
    description: 'iOS-style segmented control buttons.',
    category: 'advanced',
    package: '@jamelyassin/segmented',
    imports: ['Segmented', 'SegmentedItem'],
    examples: [
      {
        title: 'Basic',
        code: `<Segmented [(ngModel)]="value">
  <SegmentedItem value="all">All</SegmentedItem>
  <SegmentedItem value="active">Active</SegmentedItem>
  <SegmentedItem value="draft">Draft</SegmentedItem>
  <SegmentedItem value="archived">Archived</SegmentedItem>
</Segmented>`,
      },
    ],
    props: [
      { name: 'defaultValue', type: 'string', description: 'The default selected value.' },
      { name: 'value', type: 'string', description: 'The controlled value.' },
    ],
  },
  {
    name: 'Sidebar',
    slug: 'sidebar',
    description: 'A composable, themeable and customizable sidebar component.',
    category: 'advanced',
    package: '@jamelyassin/sidebar',
    imports: ['SidebarProvider', 'Sidebar', 'SidebarHeader', 'SidebarContent', 'SidebarFooter', 'SidebarGroup', 'SidebarMenu', 'SidebarMenuItem', 'SidebarMenuButton', 'SidebarTrigger'],
    examples: [
      {
        title: 'Basic',
        code: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <span class="font-semibold">Logo</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <lucide-icon name="home" class="h-4 w-4" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <lucide-icon name="inbox" class="h-4 w-4" />
              <span>Inbox</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <lucide-icon name="settings" class="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <span class="text-sm text-muted-foreground">Footer</span>
    </SidebarFooter>
  </Sidebar>
  <main class="flex-1 p-4">
    <SidebarTrigger>
      <Button variant="outline" size="icon">
        <lucide-icon name="panel-left" class="h-4 w-4" />
      </Button>
    </SidebarTrigger>
    <div class="mt-4">Main content area</div>
  </main>
</SidebarProvider>`,
      },
    ],
    props: [
      { name: 'side', type: "'left' | 'right'", default: "'left'", description: 'The side the sidebar appears on.' },
      { name: 'collapsible', type: "'offcanvas' | 'icon' | 'none'", default: "'offcanvas'", description: 'The collapsible behavior.' },
    ],
  },
  {
    name: 'Spinner',
    slug: 'spinner',
    description: 'Loading indicator animations.',
    category: 'advanced',
    package: '@jamelyassin/spinner',
    imports: ['Spinner'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="flex items-center gap-8">
  <Spinner size="sm" />
  <Spinner size="default" />
  <Spinner size="lg" />
</div>`,
      },
      {
        title: 'With Button',
        code: `<Button disabled>
  <Spinner size="sm" class="mr-2" />
  Loading...
</Button>`,
      },
    ],
    props: [
      { name: 'size', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'The size of the spinner.' },
    ],
  },
  {
    name: 'Typography',
    slug: 'typography',
    description: 'Text styling components.',
    category: 'advanced',
    package: '@jamelyassin/typography',
    imports: ['TypographyH1', 'TypographyH2', 'TypographyH3', 'TypographyH4', 'TypographyP', 'TypographyLead', 'TypographyLarge', 'TypographySmall', 'TypographyMuted', 'TypographyBlockquote', 'TypographyInlineCode'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="space-y-6">
  <TypographyH1>The Joke Tax Chronicles</TypographyH1>
  <TypographyLead>
    Once upon a time, in a far-off land, there was a very lazy king.
  </TypographyLead>
  <TypographyH2>The King's Plan</TypographyH2>
  <TypographyP>
    The king thought it was a brilliant idea to tax jokes.
    <TypographyInlineCode>const tax = 0.1</TypographyInlineCode>
  </TypographyP>
  <TypographyBlockquote>
    "After all," he said, "everyone enjoys a good joke, so it's only fair."
  </TypographyBlockquote>
  <TypographyH3>The Consequences</TypographyH3>
  <TypographySmall>Note: This is a fictional story.</TypographySmall>
  <TypographyMuted>Last updated: 3 days ago</TypographyMuted>
</div>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
];
