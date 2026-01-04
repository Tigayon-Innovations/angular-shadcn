import type { ComponentInfo } from './types';

/**
 * Basic components: navigation patterns, accordions, breadcrumbs, tabs, menus
 */
export const BASIC_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Accordion',
    slug: 'accordion',
    description: 'A vertically stacked set of interactive headings.',
    category: 'basic',
    package: '@shadcn-angular/accordion',
    imports: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
    examples: [
      {
        title: 'Basic',
        code: `<Accordion type="single" collapsible class="w-full max-w-md">
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
    ],
    props: [
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Determines whether one or multiple items can be opened at the same time.', component: 'Accordion' },
      { name: 'collapsible', type: 'boolean', default: 'false', description: 'When type is single, allows closing content when clicking trigger of an open item.', component: 'Accordion' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.', component: 'Accordion' },
      { name: 'value', type: 'string', description: 'A unique value for the accordion item.', component: 'AccordionItem' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the accordion item is disabled.', component: 'AccordionItem' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.', component: 'AccordionItem' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.', component: 'AccordionTrigger' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.', component: 'AccordionContent' },
    ],
  },
  {
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    description: 'Displays the path to the current resource.',
    category: 'basic',
    package: '@shadcn-angular/breadcrumb',
    imports: ['Breadcrumb', 'BreadcrumbList', 'BreadcrumbItem', 'BreadcrumbLink', 'BreadcrumbPage', 'BreadcrumbSeparator', 'BreadcrumbEllipsis'],
    examples: [
      {
        title: 'Basic',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
      {
        title: 'With Ellipsis',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Context Menu',
    slug: 'context-menu',
    description: 'Displays a menu to the user on right click.',
    category: 'basic',
    package: '@shadcn-angular/context-menu',
    imports: ['ContextMenu', 'ContextMenuTrigger', 'ContextMenuContent', 'ContextMenuItem', 'ContextMenuSeparator', 'ContextMenuShortcut'],
    examples: [
      {
        title: 'Basic',
        code: `<ContextMenu>
  <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent class="w-64">
    <ContextMenuItem>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem disabled>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Reload
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Save Page As...</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
      },
    ],
    props: [
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the menu item is disabled.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Dropdown Menu',
    slug: 'dropdown-menu',
    description: 'Displays a menu when triggered.',
    category: 'basic',
    package: '@shadcn-angular/dropdown-menu',
    imports: ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuLabel', 'DropdownMenuSeparator', 'DropdownMenuShortcut', 'DropdownMenuGroup'],
    examples: [
      {
        title: 'Basic',
        code: `<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    ],
    props: [
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the menu item is disabled.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Menubar',
    slug: 'menubar',
    description: 'A visually persistent menu common in desktop applications.',
    category: 'basic',
    package: '@shadcn-angular/menubar',
    imports: ['Menubar', 'MenubarMenu', 'MenubarTrigger', 'MenubarContent', 'MenubarItem', 'MenubarSeparator', 'MenubarShortcut'],
    examples: [
      {
        title: 'Basic',
        code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab
        <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        Print...
        <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo
        <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Redo
        <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Navigation Menu',
    slug: 'navigation-menu',
    description: 'A collection of links for navigating websites.',
    category: 'basic',
    package: '@shadcn-angular/navigation-menu',
    imports: ['NavigationMenu', 'NavigationMenuList', 'NavigationMenuItem', 'NavigationMenuTrigger', 'NavigationMenuContent', 'NavigationMenuLink'],
    examples: [
      {
        title: 'Basic',
        code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Pagination',
    slug: 'pagination',
    description: 'Pagination with page navigation, next and previous links.',
    category: 'basic',
    package: '@shadcn-angular/pagination',
    imports: ['Pagination', 'PaginationContent', 'PaginationItem', 'PaginationLink', 'PaginationPrevious', 'PaginationNext', 'PaginationEllipsis'],
    examples: [
      {
        title: 'Basic',
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      },
    ],
    props: [
      { name: 'isActive', type: 'boolean', default: 'false', description: 'Whether the pagination link is active.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Tabs',
    slug: 'tabs',
    description: 'A set of layered sections of content.',
    category: 'basic',
    package: '@shadcn-angular/tabs',
    imports: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    examples: [
      {
        title: 'Basic',
        code: `<Tabs defaultValue="account" class="w-[400px]">
  <TabsList class="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account" class="p-4 border rounded-lg mt-2">
    <h3 class="font-semibold mb-2">Account</h3>
    <p class="text-sm text-muted-foreground">
      Make changes to your account here. Click save when you're done.
    </p>
  </TabsContent>
  <TabsContent value="password" class="p-4 border rounded-lg mt-2">
    <h3 class="font-semibold mb-2">Password</h3>
    <p class="text-sm text-muted-foreground">
      Change your password here. After saving, you'll be logged out.
    </p>
  </TabsContent>
</Tabs>`,
      },
    ],
    props: [
      { name: 'defaultValue', type: 'string', description: 'The value of the tab that should be active by default.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
];
