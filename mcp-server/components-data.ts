/**
 * Component metadata for ng-cn MCP Server
 * Automatically generated from ComponentRegistry
 */

import { ComponentMetadata } from './types.js';

export const componentsData: ComponentMetadata[] = [
  {
    "name": "Aspect Ratio",
    "selector": "AspectRatio",
    "package": "@ng-cn/aspect-ratio",
    "description": "Displays content within a desired ratio.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "ratio",
        "type": "number",
        "default": "1",
        "description": "The desired aspect ratio.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "16:9 Aspect Ratio",
        "description": "Image with 16:9 aspect ratio",
        "code": "<AspectRatio [ratio]='16/9'>\n  <img src='image.jpg' alt='Image' class='object-cover w-full h-full' />\n</AspectRatio>"
      },
      {
        "title": "Square Aspect Ratio",
        "description": "Square container for profile images",
        "code": "<AspectRatio [ratio]='1'>\n  <img src='avatar.jpg' alt='Avatar' class='rounded-full object-cover' />\n</AspectRatio>"
      },
      {
        "title": "Video Embed",
        "description": "Responsive video container",
        "code": "<AspectRatio [ratio]='16/9' class='bg-muted'>\n  <iframe src='https://www.youtube.com/embed/...' class='w-full h-full'></iframe>\n</AspectRatio>"
      }
    ],
    "relatedComponents": ["Card", "Avatar"],
    "installation": {
      "npm": "npm install @ng-cn/aspect-ratio",
      "pnpm": "pnpm add @ng-cn/aspect-ratio",
      "yarn": "yarn add @ng-cn/aspect-ratio",
      "bun": "bun add @ng-cn/aspect-ratio",
      "ngAdd": "ng g @ng-cn/core:c aspect-ratio",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/aspect-ratio directory",
          "Copy component files from the library",
          "Import AspectRatio in your component"
        ],
        "files": [
          "src/app/lib/components/ui/aspect-ratio/aspect-ratio.component.ts"
        ]
      }
    },
    "usage": "import { AspectRatio } from '@/lib/components/ui/aspect-ratio';\n\n"
  },
  {
    "name": "Card",
    "selector": "Card",
    "package": "@ng-cn/card",
    "description": "Displays a card with header, content, and footer.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Card",
        "description": "Simple card with header and content",
        "code": "<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card description goes here</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card content goes here.</p>\n  </CardContent>\n</Card>"
      },
      {
        "title": "Card with Footer",
        "description": "Card with actions in footer",
        "code": "<Card>\n  <CardHeader>\n    <CardTitle>Confirm Action</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <p>Are you sure you want to proceed?</p>\n  </CardContent>\n  <CardFooter class='flex justify-between'>\n    <Button variant='outline'>Cancel</Button>\n    <Button>Confirm</Button>\n  </CardFooter>\n</Card>"
      },
      {
        "title": "Interactive Card",
        "description": "Card with form elements",
        "code": "<Card class='w-[350px]'>\n  <CardHeader>\n    <CardTitle>Create Account</CardTitle>\n    <CardDescription>Enter your details below</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <div class='grid gap-4'>\n      <div class='grid gap-2'>\n        <Label for='email'>Email</Label>\n        <Input id='email' type='email' placeholder='m@example.com' />\n      </div>\n      <div class='grid gap-2'>\n        <Label for='password'>Password</Label>\n        <Input id='password' type='password' />\n      </div>\n    </div>\n  </CardContent>\n  <CardFooter>\n    <Button class='w-full'>Sign Up</Button>\n  </CardFooter>\n</Card>"
      }
    ],
    "relatedComponents": ["Aspect Ratio", "Separator", "Avatar"],
    "installation": {
      "npm": "npm install @ng-cn/card",
      "pnpm": "pnpm add @ng-cn/card",
      "yarn": "yarn add @ng-cn/card",
      "bun": "bun add @ng-cn/card",
      "ngAdd": "ng g @ng-cn/core:c card",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/card directory",
          "Copy component files from the library",
          "Import Card in your component"
        ],
        "files": [
          "src/app/lib/components/ui/card/card.component.ts"
        ]
      }
    },
    "usage": "import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/lib/components/ui/card';\n\n"
  },
  {
    "name": "Collapsible",
    "selector": "Collapsible",
    "package": "@ng-cn/collapsible",
    "description": "An interactive component which expands/collapses a panel.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the collapsible is open.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the collapsible open state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Collapsible",
        "description": "Simple collapsible panel",
        "code": "<Collapsible>\n  <CollapsibleTrigger>\n    <Button variant='ghost'>Toggle</Button>\n  </CollapsibleTrigger>\n  <CollapsibleContent>\n    <p>Collapsible content goes here.</p>\n  </CollapsibleContent>\n</Collapsible>"
      },
      {
        "title": "Controlled Collapsible",
        "description": "Collapsible with controlled state",
        "code": "<Collapsible [(open)]='isOpen'>\n  <div class='flex items-center justify-between'>\n    <h4>@peduarte starred 3 repositories</h4>\n    <CollapsibleTrigger>\n      <Button variant='ghost' size='sm'>\n        <ChevronsUpDown class='h-4 w-4' />\n      </Button>\n    </CollapsibleTrigger>\n  </div>\n  <div class='rounded-md border px-4 py-3 font-mono text-sm'>\n    @radix-ui/primitives\n  </div>\n  <CollapsibleContent class='space-y-2'>\n    <div class='rounded-md border px-4 py-3 font-mono text-sm'>\n      @radix-ui/colors\n    </div>\n    <div class='rounded-md border px-4 py-3 font-mono text-sm'>\n      @stitches/react\n    </div>\n  </CollapsibleContent>\n</Collapsible>"
      }
    ],
    "relatedComponents": ["Accordion", "Sheet", "Drawer"],
    "installation": {
      "npm": "npm install @ng-cn/collapsible",
      "pnpm": "pnpm add @ng-cn/collapsible",
      "yarn": "yarn add @ng-cn/collapsible",
      "bun": "bun add @ng-cn/collapsible",
      "ngAdd": "ng g @ng-cn/core:c collapsible",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/collapsible directory",
          "Copy component files from the library",
          "Import Collapsible in your component"
        ],
        "files": [
          "src/app/lib/components/ui/collapsible/collapsible.component.ts"
        ]
      }
    },
    "usage": "import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/lib/components/ui/collapsible';\n\n"
  },
  {
    "name": "Resizable",
    "selector": "Resizable",
    "package": "@ng-cn/resizable",
    "description": "Resizable panel groups and panels.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "direction",
        "type": "string",
        "default": "horizontal",
        "description": "Direction of the panels: horizontal | vertical",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "layoutChange",
        "type": "EventEmitter<number[]>",
        "description": "Emitted when panel sizes change."
      }
    ],
    "examples": [
      {
        "title": "Horizontal Resizable",
        "description": "Two horizontal resizable panels",
        "code": "<ResizablePanelGroup direction='horizontal' class='min-h-[200px] max-w-md rounded-lg border'>\n  <ResizablePanel [defaultSize]='50'>\n    <div class='flex h-full items-center justify-center p-6'>\n      <span class='font-semibold'>One</span>\n    </div>\n  </ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel [defaultSize]='50'>\n    <div class='flex h-full items-center justify-center p-6'>\n      <span class='font-semibold'>Two</span>\n    </div>\n  </ResizablePanel>\n</ResizablePanelGroup>"
      },
      {
        "title": "Vertical Resizable",
        "description": "Vertical resizable panels",
        "code": "<ResizablePanelGroup direction='vertical' class='min-h-[200px] max-w-md rounded-lg border'>\n  <ResizablePanel [defaultSize]='25'>\n    <div class='flex h-full items-center justify-center p-6'>\n      <span class='font-semibold'>Header</span>\n    </div>\n  </ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel [defaultSize]='75'>\n    <div class='flex h-full items-center justify-center p-6'>\n      <span class='font-semibold'>Content</span>\n    </div>\n  </ResizablePanel>\n</ResizablePanelGroup>"
      },
      {
        "title": "Three Panel Layout",
        "description": "Complex layout with nested panels",
        "code": "<ResizablePanelGroup direction='horizontal' class='min-h-[400px] rounded-lg border'>\n  <ResizablePanel [defaultSize]='20'>\n    <div class='flex h-full items-center justify-center p-6'>\n      <span class='font-semibold'>Sidebar</span>\n    </div>\n  </ResizablePanel>\n  <ResizableHandle withHandle />\n  <ResizablePanel [defaultSize]='80'>\n    <ResizablePanelGroup direction='vertical'>\n      <ResizablePanel [defaultSize]='70'>\n        <div class='flex h-full items-center justify-center p-6'>\n          <span class='font-semibold'>Content</span>\n        </div>\n      </ResizablePanel>\n      <ResizableHandle withHandle />\n      <ResizablePanel [defaultSize]='30'>\n        <div class='flex h-full items-center justify-center p-6'>\n          <span class='font-semibold'>Footer</span>\n        </div>\n      </ResizablePanel>\n    </ResizablePanelGroup>\n  </ResizablePanel>\n</ResizablePanelGroup>"
      }
    ],
    "relatedComponents": ["Sidebar", "Card"],
    "installation": {
      "npm": "npm install @ng-cn/resizable",
      "pnpm": "pnpm add @ng-cn/resizable",
      "yarn": "yarn add @ng-cn/resizable",
      "bun": "bun add @ng-cn/resizable",
      "ngAdd": "ng g @ng-cn/core:c resizable",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/resizable directory",
          "Copy component files from the library",
          "Import ResizablePanelGroup in your component"
        ],
        "files": [
          "src/app/lib/components/ui/resizable/resizable.component.ts"
        ]
      }
    },
    "usage": "import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/lib/components/ui/resizable';\n\n"
  },
  {
    "name": "Scroll Area",
    "selector": "ScrollArea",
    "package": "@ng-cn/scroll-area",
    "description": "Augments native scroll functionality for custom styling.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      },
      {
        "name": "orientation",
        "type": "string",
        "default": "vertical",
        "description": "Scroll orientation: vertical | horizontal | both",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Vertical Scroll Area",
        "description": "Scrollable list of items",
        "code": "<ScrollArea class='h-72 w-48 rounded-md border'>\n  <div class='p-4'>\n    <h4 class='mb-4 text-sm font-medium leading-none'>Tags</h4>\n    @for (tag of tags; track tag) {\n      <div class='text-sm'>{{ tag }}</div>\n      <Separator class='my-2' />\n    }\n  </div>\n</ScrollArea>"
      },
      {
        "title": "Horizontal Scroll Area",
        "description": "Horizontal scrolling gallery",
        "code": "<ScrollArea class='w-96 whitespace-nowrap rounded-md border'>\n  <div class='flex w-max space-x-4 p-4'>\n    @for (artwork of artworks; track artwork.artist) {\n      <figure class='shrink-0'>\n        <div class='overflow-hidden rounded-md'>\n          <img [src]='artwork.art' [alt]='artwork.artist' class='aspect-[3/4] h-fit w-fit object-cover' />\n        </div>\n        <figcaption class='pt-2 text-xs text-muted-foreground'>\n          Photo by <span class='font-semibold text-foreground'>{{ artwork.artist }}</span>\n        </figcaption>\n      </figure>\n    }\n  </div>\n  <ScrollBar orientation='horizontal' />\n</ScrollArea>"
      }
    ],
    "relatedComponents": ["Table", "Card", "Command"],
    "installation": {
      "npm": "npm install @ng-cn/scroll-area",
      "pnpm": "pnpm add @ng-cn/scroll-area",
      "yarn": "yarn add @ng-cn/scroll-area",
      "bun": "bun add @ng-cn/scroll-area",
      "ngAdd": "ng g @ng-cn/core:c scroll-area",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/scroll-area directory",
          "Copy component files from the library",
          "Import ScrollArea in your component"
        ],
        "files": [
          "src/app/lib/components/ui/scroll-area/scroll-area.component.ts"
        ]
      }
    },
    "usage": "import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';\n\n"
  },
  {
    "name": "Separator",
    "selector": "Separator",
    "package": "@ng-cn/separator",
    "description": "Visually or semantically separates content.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "orientation",
        "type": "string",
        "default": "horizontal",
        "description": "Orientation of the separator: horizontal | vertical",
        "required": false
      },
      {
        "name": "decorative",
        "type": "boolean",
        "default": "true",
        "description": "Whether the separator is purely decorative.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Horizontal Separator",
        "description": "Basic horizontal divider",
        "code": "<div>\n  <div class='space-y-1'>\n    <h4 class='text-sm font-medium leading-none'>Radix Primitives</h4>\n    <p class='text-sm text-muted-foreground'>An open-source UI component library.</p>\n  </div>\n  <Separator class='my-4' />\n  <div class='flex h-5 items-center space-x-4 text-sm'>\n    <div>Blog</div>\n    <Separator orientation='vertical' />\n    <div>Docs</div>\n    <Separator orientation='vertical' />\n    <div>Source</div>\n  </div>\n</div>"
      },
      {
        "title": "Vertical Separator",
        "description": "Separator between inline elements",
        "code": "<div class='flex h-5 items-center space-x-4 text-sm'>\n  <div>Blog</div>\n  <Separator orientation='vertical' />\n  <div>Docs</div>\n  <Separator orientation='vertical' />\n  <div>Source</div>\n</div>"
      }
    ],
    "relatedComponents": ["Card", "Dropdown Menu", "Context Menu"],
    "installation": {
      "npm": "npm install @ng-cn/separator",
      "pnpm": "pnpm add @ng-cn/separator",
      "yarn": "yarn add @ng-cn/separator",
      "bun": "bun add @ng-cn/separator",
      "ngAdd": "ng g @ng-cn/core:c separator",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/separator directory",
          "Copy component files from the library",
          "Import Separator in your component"
        ],
        "files": [
          "src/app/lib/components/ui/separator/separator.component.ts"
        ]
      }
    },
    "usage": "import { Separator } from '@/lib/components/ui/separator';\n\n"
  },
  {
    "name": "Accordion",
    "selector": "Accordion",
    "package": "@ng-cn/accordion",
    "description": "A vertically stacked set of interactive headings.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "collapsible",
        "type": "boolean",
        "default": "false",
        "description": "When type is single, allows closing content when clicking trigger of an open item.",
        "required": false
      },
      {
        "name": "type",
        "type": "string",
        "default": "single",
        "description": "Whether only one or multiple items can be open: single | multiple",
        "required": false
      },
      {
        "name": "value",
        "type": "string | string[]",
        "description": "The controlled value of the open item(s).",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string | string[]>",
        "description": "Emitted when the open items change."
      }
    ],
    "examples": [
      {
        "title": "Basic Accordion",
        "description": "Single expandable accordion",
        "code": "<Accordion type='single' collapsible>\n  <AccordionItem value='item-1'>\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value='item-2'>\n    <AccordionTrigger>Is it styled?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It comes with default styles that matches the other components.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value='item-3'>\n    <AccordionTrigger>Is it animated?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It's animated by default, but you can disable it.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>"
      },
      {
        "title": "Multiple Accordion",
        "description": "Multiple items can be open simultaneously",
        "code": "<Accordion type='multiple'>\n  <AccordionItem value='item-1'>\n    <AccordionTrigger>Section 1</AccordionTrigger>\n    <AccordionContent>Content for section 1.</AccordionContent>\n  </AccordionItem>\n  <AccordionItem value='item-2'>\n    <AccordionTrigger>Section 2</AccordionTrigger>\n    <AccordionContent>Content for section 2.</AccordionContent>\n  </AccordionItem>\n</Accordion>"
      }
    ],
    "relatedComponents": ["Collapsible", "Tabs"],
    "installation": {
      "npm": "npm install @ng-cn/accordion",
      "pnpm": "pnpm add @ng-cn/accordion",
      "yarn": "yarn add @ng-cn/accordion",
      "bun": "bun add @ng-cn/accordion",
      "ngAdd": "ng g @ng-cn/core:c accordion",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/accordion directory",
          "Copy component files from the library",
          "Import Accordion in your component"
        ],
        "files": [
          "src/app/lib/components/ui/accordion/accordion.component.ts"
        ]
      }
    },
    "usage": "import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/lib/components/ui/accordion';\n\n"
  },
  {
    "name": "Breadcrumb",
    "selector": "Breadcrumb",
    "package": "@ng-cn/breadcrumb",
    "description": "Displays the path to the current resource.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      },
      {
        "name": "separator",
        "type": "TemplateRef",
        "description": "Custom separator template.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Breadcrumb",
        "description": "Simple navigation breadcrumb",
        "code": "<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href='/'>Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbLink href='/components'>Components</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>"
      },
      {
        "title": "Breadcrumb with Dropdown",
        "description": "Collapsed breadcrumb with dropdown",
        "code": "<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href='/'>Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <DropdownMenu>\n        <DropdownMenuTrigger class='flex items-center gap-1'>\n          <BreadcrumbEllipsis class='h-4 w-4' />\n        </DropdownMenuTrigger>\n        <DropdownMenuContent align='start'>\n          <DropdownMenuItem>Documentation</DropdownMenuItem>\n          <DropdownMenuItem>Themes</DropdownMenuItem>\n          <DropdownMenuItem>GitHub</DropdownMenuItem>\n        </DropdownMenuContent>\n      </DropdownMenu>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Current</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>"
      }
    ],
    "relatedComponents": ["Navigation Menu", "Dropdown Menu", "Pagination"],
    "installation": {
      "npm": "npm install @ng-cn/breadcrumb",
      "pnpm": "pnpm add @ng-cn/breadcrumb",
      "yarn": "yarn add @ng-cn/breadcrumb",
      "bun": "bun add @ng-cn/breadcrumb",
      "ngAdd": "ng g @ng-cn/core:c breadcrumb",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/breadcrumb directory",
          "Copy component files from the library",
          "Import Breadcrumb in your component"
        ],
        "files": [
          "src/app/lib/components/ui/breadcrumb/breadcrumb.component.ts"
        ]
      }
    },
    "usage": "import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/lib/components/ui/breadcrumb';\n\n"
  },
  {
    "name": "Context Menu",
    "selector": "ContextMenu",
    "package": "@ng-cn/context-menu",
    "description": "Displays a menu to the user on right click.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Context Menu",
        "description": "Right-click context menu",
        "code": "<ContextMenu>\n  <ContextMenuTrigger class='flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm'>\n    Right click here\n  </ContextMenuTrigger>\n  <ContextMenuContent class='w-64'>\n    <ContextMenuItem inset>\n      Back\n      <ContextMenuShortcut>⌘[</ContextMenuShortcut>\n    </ContextMenuItem>\n    <ContextMenuItem inset disabled>\n      Forward\n      <ContextMenuShortcut>⌘]</ContextMenuShortcut>\n    </ContextMenuItem>\n    <ContextMenuItem inset>\n      Reload\n      <ContextMenuShortcut>⌘R</ContextMenuShortcut>\n    </ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuCheckboxItem checked>\n      Show Bookmarks Bar\n      <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>\n    </ContextMenuCheckboxItem>\n    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>\n    <ContextMenuSeparator />\n    <ContextMenuRadioGroup value='pedro'>\n      <ContextMenuLabel inset>People</ContextMenuLabel>\n      <ContextMenuSeparator />\n      <ContextMenuRadioItem value='pedro'>Pedro Duarte</ContextMenuRadioItem>\n      <ContextMenuRadioItem value='colm'>Colm Tuite</ContextMenuRadioItem>\n    </ContextMenuRadioGroup>\n  </ContextMenuContent>\n</ContextMenu>"
      },
      {
        "title": "Context Menu with Sub Menu",
        "description": "Nested context menu",
        "code": "<ContextMenu>\n  <ContextMenuTrigger class='flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed'>\n    Right click here\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>New Tab</ContextMenuItem>\n    <ContextMenuItem>New Window</ContextMenuItem>\n    <ContextMenuSub>\n      <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>\n      <ContextMenuSubContent class='w-48'>\n        <ContextMenuItem>Save Page As...</ContextMenuItem>\n        <ContextMenuItem>Create Shortcut...</ContextMenuItem>\n        <ContextMenuItem>Name Window...</ContextMenuItem>\n        <ContextMenuSeparator />\n        <ContextMenuItem>Developer Tools</ContextMenuItem>\n      </ContextMenuSubContent>\n    </ContextMenuSub>\n  </ContextMenuContent>\n</ContextMenu>"
      }
    ],
    "relatedComponents": ["Dropdown Menu", "Menubar", "Separator"],
    "installation": {
      "npm": "npm install @ng-cn/context-menu",
      "pnpm": "pnpm add @ng-cn/context-menu",
      "yarn": "yarn add @ng-cn/context-menu",
      "bun": "bun add @ng-cn/context-menu",
      "ngAdd": "ng g @ng-cn/core:c context-menu",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/context-menu directory",
          "Copy component files from the library",
          "Import ContextMenu in your component"
        ],
        "files": [
          "src/app/lib/components/ui/context-menu/context-menu.component.ts"
        ]
      }
    },
    "usage": "import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/lib/components/ui/context-menu';\n\n"
  },
  {
    "name": "Dropdown Menu",
    "selector": "DropdownMenu",
    "package": "@ng-cn/dropdown-menu",
    "description": "Displays a menu when triggered.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      },
      {
        "name": "open",
        "type": "boolean",
        "description": "Whether the dropdown is open.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the dropdown open state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Dropdown Menu",
        "description": "Simple dropdown with items",
        "code": "<DropdownMenu>\n  <DropdownMenuTrigger>\n    <Button variant='outline'>Open</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent class='w-56'>\n    <DropdownMenuLabel>My Account</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuGroup>\n      <DropdownMenuItem>\n        <User class='mr-2 h-4 w-4' />\n        <span>Profile</span>\n        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>\n      </DropdownMenuItem>\n      <DropdownMenuItem>\n        <CreditCard class='mr-2 h-4 w-4' />\n        <span>Billing</span>\n        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>\n      </DropdownMenuItem>\n      <DropdownMenuItem>\n        <Settings class='mr-2 h-4 w-4' />\n        <span>Settings</span>\n        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>\n      </DropdownMenuItem>\n    </DropdownMenuGroup>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>\n      <LogOut class='mr-2 h-4 w-4' />\n      <span>Log out</span>\n      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>\n    </DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>"
      },
      {
        "title": "Dropdown with Checkboxes",
        "description": "Dropdown with checkbox items",
        "code": "<DropdownMenu>\n  <DropdownMenuTrigger>\n    <Button variant='outline'>Open</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent class='w-56'>\n    <DropdownMenuLabel>Appearance</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuCheckboxItem [(checked)]='showStatusBar'>\n      Status Bar\n    </DropdownMenuCheckboxItem>\n    <DropdownMenuCheckboxItem [(checked)]='showActivityBar' disabled>\n      Activity Bar\n    </DropdownMenuCheckboxItem>\n    <DropdownMenuCheckboxItem [(checked)]='showPanel'>\n      Panel\n    </DropdownMenuCheckboxItem>\n  </DropdownMenuContent>\n</DropdownMenu>"
      }
    ],
    "relatedComponents": ["Context Menu", "Menubar", "Select"],
    "installation": {
      "npm": "npm install @ng-cn/dropdown-menu",
      "pnpm": "pnpm add @ng-cn/dropdown-menu",
      "yarn": "yarn add @ng-cn/dropdown-menu",
      "bun": "bun add @ng-cn/dropdown-menu",
      "ngAdd": "ng g @ng-cn/core:c dropdown-menu",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/dropdown-menu directory",
          "Copy component files from the library",
          "Import DropdownMenu in your component"
        ],
        "files": [
          "src/app/lib/components/ui/dropdown-menu/dropdown-menu.component.ts"
        ]
      }
    },
    "usage": "import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/lib/components/ui/dropdown-menu';\n\n"
  },
  {
    "name": "Menubar",
    "selector": "Menubar",
    "package": "@ng-cn/menubar",
    "description": "A visually persistent menu common in desktop applications.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Menubar",
        "description": "Desktop-style menubar",
        "code": "<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>\n        New Tab <MenubarShortcut>⌘T</MenubarShortcut>\n      </MenubarItem>\n      <MenubarItem>\n        New Window <MenubarShortcut>⌘N</MenubarShortcut>\n      </MenubarItem>\n      <MenubarItem disabled>New Incognito Window</MenubarItem>\n      <MenubarSeparator />\n      <MenubarSub>\n        <MenubarSubTrigger>Share</MenubarSubTrigger>\n        <MenubarSubContent>\n          <MenubarItem>Email link</MenubarItem>\n          <MenubarItem>Messages</MenubarItem>\n          <MenubarItem>Notes</MenubarItem>\n        </MenubarSubContent>\n      </MenubarSub>\n      <MenubarSeparator />\n      <MenubarItem>\n        Print... <MenubarShortcut>⌘P</MenubarShortcut>\n      </MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n  <MenubarMenu>\n    <MenubarTrigger>Edit</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>\n        Undo <MenubarShortcut>⌘Z</MenubarShortcut>\n      </MenubarItem>\n      <MenubarItem>\n        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>\n      </MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>\n        Cut <MenubarShortcut>⌘X</MenubarShortcut>\n      </MenubarItem>\n      <MenubarItem>\n        Copy <MenubarShortcut>⌘C</MenubarShortcut>\n      </MenubarItem>\n      <MenubarItem>\n        Paste <MenubarShortcut>⌘V</MenubarShortcut>\n      </MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n  <MenubarMenu>\n    <MenubarTrigger>View</MenubarTrigger>\n    <MenubarContent>\n      <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>\n      <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>\n      <MenubarSeparator />\n      <MenubarItem inset>\n        Reload <MenubarShortcut>⌘R</MenubarShortcut>\n      </MenubarItem>\n      <MenubarItem disabled inset>\n        Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>\n      </MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>"
      }
    ],
    "relatedComponents": ["Dropdown Menu", "Context Menu", "Navigation Menu"],
    "installation": {
      "npm": "npm install @ng-cn/menubar",
      "pnpm": "pnpm add @ng-cn/menubar",
      "yarn": "yarn add @ng-cn/menubar",
      "bun": "bun add @ng-cn/menubar",
      "ngAdd": "ng g @ng-cn/core:c menubar",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/menubar directory",
          "Copy component files from the library",
          "Import Menubar in your component"
        ],
        "files": [
          "src/app/lib/components/ui/menubar/menubar.component.ts"
        ]
      }
    },
    "usage": "import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/lib/components/ui/menubar';\n\n"
  },
  {
    "name": "Navigation Menu",
    "selector": "NavigationMenu",
    "package": "@ng-cn/navigation-menu",
    "description": "A collection of links for navigating websites.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      },
      {
        "name": "orientation",
        "type": "string",
        "default": "horizontal",
        "description": "Orientation: horizontal | vertical",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Navigation Menu",
        "description": "Horizontal navigation with dropdowns",
        "code": "<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <ul class='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>\n          <li class='row-span-3'>\n            <NavigationMenuLink href='/'>\n              <div class='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'>\n                <div class='mb-2 mt-4 text-lg font-medium'>shadcn/ui</div>\n                <p class='text-sm leading-tight text-muted-foreground'>\n                  Beautifully designed components built with Radix UI and Tailwind CSS.\n                </p>\n              </div>\n            </NavigationMenuLink>\n          </li>\n          <li>\n            <NavigationMenuLink href='/docs'>Introduction</NavigationMenuLink>\n          </li>\n          <li>\n            <NavigationMenuLink href='/docs/installation'>Installation</NavigationMenuLink>\n          </li>\n        </ul>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Components</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <ul class='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>\n          <li>\n            <NavigationMenuLink href='/docs/components/button'>Button</NavigationMenuLink>\n          </li>\n          <li>\n            <NavigationMenuLink href='/docs/components/card'>Card</NavigationMenuLink>\n          </li>\n        </ul>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n    <NavigationMenuItem>\n      <NavigationMenuLink href='/docs'>Documentation</NavigationMenuLink>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>"
      }
    ],
    "relatedComponents": ["Menubar", "Breadcrumb", "Tabs"],
    "installation": {
      "npm": "npm install @ng-cn/navigation-menu",
      "pnpm": "pnpm add @ng-cn/navigation-menu",
      "yarn": "yarn add @ng-cn/navigation-menu",
      "bun": "bun add @ng-cn/navigation-menu",
      "ngAdd": "ng g @ng-cn/core:c navigation-menu",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/navigation-menu directory",
          "Copy component files from the library",
          "Import NavigationMenu in your component"
        ],
        "files": [
          "src/app/lib/components/ui/navigation-menu/navigation-menu.component.ts"
        ]
      }
    },
    "usage": "import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/lib/components/ui/navigation-menu';\n\n"
  },
  {
    "name": "Pagination",
    "selector": "Pagination",
    "package": "@ng-cn/pagination",
    "description": "Pagination with page navigation, next and previous links.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      },
      {
        "name": "currentPage",
        "type": "number",
        "description": "The current active page.",
        "required": false
      },
      {
        "name": "totalPages",
        "type": "number",
        "description": "Total number of pages.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "pageChange",
        "type": "EventEmitter<number>",
        "description": "Emitted when the page changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Pagination",
        "description": "Simple pagination with navigation",
        "code": "<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious href='#' />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href='#'>1</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href='#' isActive>2</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href='#'>3</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationEllipsis />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext href='#' />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>"
      },
      {
        "title": "Controlled Pagination",
        "description": "Pagination with bound page",
        "code": "<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious (click)='goToPage(currentPage - 1)' [disabled]='currentPage === 1' />\n    </PaginationItem>\n    @for (page of pages; track page) {\n      <PaginationItem>\n        <PaginationLink (click)='goToPage(page)' [isActive]='page === currentPage'>\n          {{ page }}\n        </PaginationLink>\n      </PaginationItem>\n    }\n    <PaginationItem>\n      <PaginationNext (click)='goToPage(currentPage + 1)' [disabled]='currentPage === totalPages' />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>"
      }
    ],
    "relatedComponents": ["Button", "Table", "Data Table"],
    "installation": {
      "npm": "npm install @ng-cn/pagination",
      "pnpm": "pnpm add @ng-cn/pagination",
      "yarn": "yarn add @ng-cn/pagination",
      "bun": "bun add @ng-cn/pagination",
      "ngAdd": "ng g @ng-cn/core:c pagination",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/pagination directory",
          "Copy component files from the library",
          "Import Pagination in your component"
        ],
        "files": [
          "src/app/lib/components/ui/pagination/pagination.component.ts"
        ]
      }
    },
    "usage": "import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/lib/components/ui/pagination';\n\n"
  },
  {
    "name": "Tabs",
    "selector": "Tabs",
    "package": "@ng-cn/tabs",
    "description": "A set of layered sections of content.",
    "category": "basic",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "defaultValue",
        "type": "string",
        "description": "The value of the tab that should be active by default.",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "description": "The controlled value of the active tab.",
        "required": false
      },
      {
        "name": "orientation",
        "type": "string",
        "default": "horizontal",
        "description": "The orientation: horizontal | vertical",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the active tab changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Tabs",
        "description": "Simple tabbed content",
        "code": "<Tabs defaultValue='account' class='w-[400px]'>\n  <TabsList>\n    <TabsTrigger value='account'>Account</TabsTrigger>\n    <TabsTrigger value='password'>Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value='account'>\n    <Card>\n      <CardHeader>\n        <CardTitle>Account</CardTitle>\n        <CardDescription>Make changes to your account here.</CardDescription>\n      </CardHeader>\n      <CardContent class='space-y-2'>\n        <div class='space-y-1'>\n          <Label for='name'>Name</Label>\n          <Input id='name' defaultValue='Pedro Duarte' />\n        </div>\n        <div class='space-y-1'>\n          <Label for='username'>Username</Label>\n          <Input id='username' defaultValue='@peduarte' />\n        </div>\n      </CardContent>\n      <CardFooter>\n        <Button>Save changes</Button>\n      </CardFooter>\n    </Card>\n  </TabsContent>\n  <TabsContent value='password'>\n    <Card>\n      <CardHeader>\n        <CardTitle>Password</CardTitle>\n        <CardDescription>Change your password here.</CardDescription>\n      </CardHeader>\n      <CardContent class='space-y-2'>\n        <div class='space-y-1'>\n          <Label for='current'>Current password</Label>\n          <Input id='current' type='password' />\n        </div>\n        <div class='space-y-1'>\n          <Label for='new'>New password</Label>\n          <Input id='new' type='password' />\n        </div>\n      </CardContent>\n      <CardFooter>\n        <Button>Save password</Button>\n      </CardFooter>\n    </Card>\n  </TabsContent>\n</Tabs>"
      },
      {
        "title": "Controlled Tabs",
        "description": "Tabs with controlled state",
        "code": "<Tabs [(value)]='activeTab'>\n  <TabsList class='grid w-full grid-cols-2'>\n    <TabsTrigger value='overview'>Overview</TabsTrigger>\n    <TabsTrigger value='analytics'>Analytics</TabsTrigger>\n  </TabsList>\n  <TabsContent value='overview'>Overview content</TabsContent>\n  <TabsContent value='analytics'>Analytics content</TabsContent>\n</Tabs>"
      }
    ],
    "relatedComponents": ["Accordion", "Card", "Navigation Menu"],
    "installation": {
      "npm": "npm install @ng-cn/tabs",
      "pnpm": "pnpm add @ng-cn/tabs",
      "yarn": "yarn add @ng-cn/tabs",
      "bun": "bun add @ng-cn/tabs",
      "ngAdd": "ng g @ng-cn/core:c tabs",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/tabs directory",
          "Copy component files from the library",
          "Import Tabs in your component"
        ],
        "files": [
          "src/app/lib/components/ui/tabs/tabs.component.ts"
        ]
      }
    },
    "usage": "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/lib/components/ui/tabs';\n\n"
  },
  {
    "name": "Button",
    "selector": "Button",
    "package": "@ng-cn/button",
    "description": "Displays a button or a component that looks like a button.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "variant",
        "type": "string",
        "default": "default",
        "description": "Visual style: default | destructive | outline | secondary | ghost | link",
        "required": false
      },
      {
        "name": "size",
        "type": "string",
        "default": "default",
        "description": "Button size: default | sm | lg | icon",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the button is disabled.",
        "required": false
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows loading spinner when true.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "variant",
        "values": ["default", "destructive", "outline", "secondary", "ghost", "link"],
        "default": "default"
      },
      {
        "name": "size",
        "values": ["default", "sm", "lg", "icon"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Button",
        "description": "Default button usage",
        "code": "<Button>Click me</Button>"
      },
      {
        "title": "Button Variants",
        "description": "Different visual styles",
        "code": "<Button variant=\"default\">Default</Button>\n<Button variant=\"destructive\">Delete</Button>\n<Button variant=\"outline\">Outline</Button>\n<Button variant=\"secondary\">Secondary</Button>\n<Button variant=\"ghost\">Ghost</Button>\n<Button variant=\"link\">Link</Button>"
      },
      {
        "title": "Button Sizes",
        "description": "Different sizes",
        "code": "<Button size=\"sm\">Small</Button>\n<Button size=\"default\">Default</Button>\n<Button size=\"lg\">Large</Button>\n<Button size=\"icon\"><Icon /></Button>"
      },
      {
        "title": "Loading State",
        "description": "Button with loading spinner",
        "code": "<Button [loading]=\"isLoading\">Submit</Button>"
      }
    ],
    "installation": {
      "npm": "npm install @ng-cn/button",
      "pnpm": "pnpm add @ng-cn/button",
      "yarn": "yarn add @ng-cn/button",
      "bun": "bun add @ng-cn/button",
      "ngAdd": "ng g @ng-cn/core:c button",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/button directory",
          "Copy component files from the library",
          "Import Button in your component"
        ],
        "files": [
          "src/app/lib/components/ui/button/button.component.ts",
          "src/app/lib/components/ui/button/button-variants.ts"
        ]
      }
    },
    "usage": "import { Button } from '@/lib/components/ui/button';\n\n@Component({\n  imports: [Button],\n  template: `<Button variant=\"outline\">Click me</Button>`\n})",
    "relatedComponents": ["Button Group", "Toggle", "Toggle Group"]
  },
  {
    "name": "Checkbox",
    "selector": "Checkbox",
    "package": "@ng-cn/checkbox",
    "description": "A control that allows the user to toggle between checked and not checked.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Whether the checkbox is checked.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the checkbox is disabled.",
        "required": false
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "Whether the checkbox is in an indeterminate state.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the checked state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Checkbox",
        "description": "Simple checkbox with label",
        "code": "<div class='flex items-center space-x-2'>\n  <Checkbox id='terms' />\n  <Label for='terms'>Accept terms and conditions</Label>\n</div>"
      },
      {
        "title": "Controlled Checkbox",
        "description": "Checkbox with two-way binding",
        "code": "<div class='flex items-center space-x-2'>\n  <Checkbox id='marketing' [(checked)]='acceptMarketing' />\n  <Label for='marketing'>Accept marketing emails</Label>\n</div>"
      },
      {
        "title": "Checkbox with Form",
        "description": "Checkbox in a form context",
        "code": "<div class='items-top flex space-x-2'>\n  <Checkbox id='terms2' />\n  <div class='grid gap-1.5 leading-none'>\n    <Label for='terms2'>Accept terms and conditions</Label>\n    <p class='text-sm text-muted-foreground'>\n      You agree to our Terms of Service and Privacy Policy.\n    </p>\n  </div>\n</div>"
      },
      {
        "title": "Disabled Checkbox",
        "description": "Checkbox in disabled state",
        "code": "<div class='flex items-center space-x-2'>\n  <Checkbox id='disabled' disabled />\n  <Label for='disabled'>Disabled checkbox</Label>\n</div>"
      }
    ],
    "relatedComponents": ["Switch", "Radio Group", "Label", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/checkbox",
      "pnpm": "pnpm add @ng-cn/checkbox",
      "yarn": "yarn add @ng-cn/checkbox",
      "bun": "bun add @ng-cn/checkbox",
      "ngAdd": "ng g @ng-cn/core:c checkbox",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/checkbox directory",
          "Copy component files from the library",
          "Import Checkbox in your component"
        ],
        "files": [
          "src/app/lib/components/ui/checkbox/checkbox.component.ts"
        ]
      }
    },
    "usage": "import { Checkbox } from '@/lib/components/ui/checkbox';\n\n"
  },
  {
    "name": "Combobox",
    "selector": "Combobox",
    "package": "@ng-cn/combobox",
    "description": "Autocomplete input and command palette with a list of suggestions.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "value",
        "type": "string",
        "description": "The selected value.",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Placeholder text when no value is selected.",
        "required": false
      },
      {
        "name": "options",
        "type": "Array<{value: string, label: string}>",
        "description": "The list of options to display.",
        "required": true
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the combobox is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the selected value changes."
      },
      {
        "name": "searchChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the search query changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Combobox",
        "description": "Simple combobox with search",
        "code": "<Popover [(open)]='open'>\n  <PopoverTrigger>\n    <Button variant='outline' role='combobox' [attr.aria-expanded]='open' class='w-[200px] justify-between'>\n      {{ value ? frameworks.find(f => f.value === value)?.label : 'Select framework...' }}\n      <ChevronsUpDown class='ml-2 h-4 w-4 shrink-0 opacity-50' />\n    </Button>\n  </PopoverTrigger>\n  <PopoverContent class='w-[200px] p-0'>\n    <Command>\n      <CommandInput placeholder='Search framework...' />\n      <CommandEmpty>No framework found.</CommandEmpty>\n      <CommandGroup>\n        @for (framework of frameworks; track framework.value) {\n          <CommandItem [value]='framework.value' (onSelect)='selectFramework(framework.value)'>\n            <Check class='mr-2 h-4 w-4' [class.opacity-100]='value === framework.value' [class.opacity-0]='value !== framework.value' />\n            {{ framework.label }}\n          </CommandItem>\n        }\n      </CommandGroup>\n    </Command>\n  </PopoverContent>\n</Popover>"
      },
      {
        "title": "Combobox with Groups",
        "description": "Combobox with grouped options",
        "code": "<Popover [(open)]='open'>\n  <PopoverTrigger>\n    <Button variant='outline' class='w-[200px] justify-between'>\n      {{ selectedStatus?.label ?? 'Select status...' }}\n    </Button>\n  </PopoverTrigger>\n  <PopoverContent class='w-[200px] p-0'>\n    <Command>\n      <CommandInput placeholder='Change status...' />\n      <CommandList>\n        <CommandEmpty>No results found.</CommandEmpty>\n        <CommandGroup heading='Suggestions'>\n          <CommandItem value='backlog'>Backlog</CommandItem>\n          <CommandItem value='todo'>Todo</CommandItem>\n          <CommandItem value='in-progress'>In Progress</CommandItem>\n        </CommandGroup>\n        <CommandSeparator />\n        <CommandGroup heading='Other'>\n          <CommandItem value='done'>Done</CommandItem>\n          <CommandItem value='cancelled'>Cancelled</CommandItem>\n        </CommandGroup>\n      </CommandList>\n    </Command>\n  </PopoverContent>\n</Popover>"
      }
    ],
    "relatedComponents": ["Command", "Popover", "Select", "Input"],
    "installation": {
      "npm": "npm install @ng-cn/combobox",
      "pnpm": "pnpm add @ng-cn/combobox",
      "yarn": "yarn add @ng-cn/combobox",
      "bun": "bun add @ng-cn/combobox",
      "ngAdd": "ng g @ng-cn/core:c combobox",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/combobox directory",
          "Copy component files from the library",
          "Import Combobox in your component"
        ],
        "files": [
          "src/app/lib/components/ui/combobox/combobox.component.ts"
        ]
      }
    },
    "usage": "import { Combobox } from '@/lib/components/ui/combobox';\n\n"
  },
  {
    "name": "Date Picker",
    "selector": "DatePicker",
    "package": "@ng-cn/date-picker",
    "description": "A date picker component with calendar popup.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "date",
        "type": "Date",
        "description": "The selected date.",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Pick a date",
        "description": "Placeholder text.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the date picker is disabled.",
        "required": false
      },
      {
        "name": "minDate",
        "type": "Date",
        "description": "Minimum selectable date.",
        "required": false
      },
      {
        "name": "maxDate",
        "type": "Date",
        "description": "Maximum selectable date.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "dateChange",
        "type": "EventEmitter<Date>",
        "description": "Emitted when the selected date changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Date Picker",
        "description": "Simple date picker with calendar",
        "code": "<Popover>\n  <PopoverTrigger>\n    <Button variant='outline' class='w-[280px] justify-start text-left font-normal' [class.text-muted-foreground]='!date'>\n      <CalendarIcon class='mr-2 h-4 w-4' />\n      {{ date ? (date | date:'PPP') : 'Pick a date' }}\n    </Button>\n  </PopoverTrigger>\n  <PopoverContent class='w-auto p-0'>\n    <Calendar mode='single' [(selected)]='date' initialFocus />\n  </PopoverContent>\n</Popover>"
      },
      {
        "title": "Date Picker with Range",
        "description": "Date range picker",
        "code": "<div class='grid gap-2'>\n  <Popover>\n    <PopoverTrigger>\n      <Button variant='outline' class='w-[300px] justify-start text-left font-normal'>\n        <CalendarIcon class='mr-2 h-4 w-4' />\n        @if (dateRange?.from) {\n          @if (dateRange.to) {\n            {{ dateRange.from | date:'LLL dd, y' }} - {{ dateRange.to | date:'LLL dd, y' }}\n          } @else {\n            {{ dateRange.from | date:'LLL dd, y' }}\n          }\n        } @else {\n          Pick a date range\n        }\n      </Button>\n    </PopoverTrigger>\n    <PopoverContent class='w-auto p-0' align='start'>\n      <Calendar mode='range' [(selected)]='dateRange' numberOfMonths='2' />\n    </PopoverContent>\n  </Popover>\n</div>"
      },
      {
        "title": "Date Picker with Presets",
        "description": "Date picker with preset options",
        "code": "<Popover>\n  <PopoverTrigger>\n    <Button variant='outline' class='w-[280px] justify-start text-left font-normal'>\n      <CalendarIcon class='mr-2 h-4 w-4' />\n      {{ date ? (date | date:'PPP') : 'Pick a date' }}\n    </Button>\n  </PopoverTrigger>\n  <PopoverContent class='flex w-auto flex-col space-y-2 p-2'>\n    <Select (valueChange)='setPreset($event)'>\n      <SelectTrigger>\n        <SelectValue placeholder='Select' />\n      </SelectTrigger>\n      <SelectContent position='popper'>\n        <SelectItem value='0'>Today</SelectItem>\n        <SelectItem value='1'>Tomorrow</SelectItem>\n        <SelectItem value='3'>In 3 days</SelectItem>\n        <SelectItem value='7'>In a week</SelectItem>\n      </SelectContent>\n    </Select>\n    <div class='rounded-md border'>\n      <Calendar mode='single' [(selected)]='date' />\n    </div>\n  </PopoverContent>\n</Popover>"
      }
    ],
    "relatedComponents": ["Calendar", "Popover", "Input", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/date-picker",
      "pnpm": "pnpm add @ng-cn/date-picker",
      "yarn": "yarn add @ng-cn/date-picker",
      "bun": "bun add @ng-cn/date-picker",
      "ngAdd": "ng g @ng-cn/core:c date-picker",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/date-picker directory",
          "Copy component files from the library",
          "Import DatePicker in your component"
        ],
        "files": [
          "src/app/lib/components/ui/date-picker/date-picker.component.ts"
        ]
      }
    },
    "usage": "import { DatePicker } from '@/lib/components/ui/date-picker';\n\n"
  },
  {
    "name": "Form",
    "selector": "Form",
    "package": "@ng-cn/form",
    "description": "Building forms with React Hook Form and Zod.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "formGroup",
        "type": "FormGroup",
        "description": "The reactive form group.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "ngSubmit",
        "type": "EventEmitter<void>",
        "description": "Emitted when the form is submitted."
      }
    ],
    "examples": [
      {
        "title": "Basic Form",
        "description": "Simple form with validation",
        "code": "<form [formGroup]='profileForm' (ngSubmit)='onSubmit()'>\n  <FormField name='username'>\n    <FormItem>\n      <FormLabel>Username</FormLabel>\n      <FormControl>\n        <Input placeholder='shadcn' formControlName='username' />\n      </FormControl>\n      <FormDescription>This is your public display name.</FormDescription>\n      <FormMessage />\n    </FormItem>\n  </FormField>\n  <Button type='submit'>Submit</Button>\n</form>"
      },
      {
        "title": "Form with Multiple Fields",
        "description": "Complete form with various field types",
        "code": "<form [formGroup]='form' (ngSubmit)='onSubmit()' class='space-y-8'>\n  <FormField name='email'>\n    <FormItem>\n      <FormLabel>Email</FormLabel>\n      <FormControl>\n        <Input type='email' placeholder='m@example.com' formControlName='email' />\n      </FormControl>\n      <FormMessage />\n    </FormItem>\n  </FormField>\n  <FormField name='bio'>\n    <FormItem>\n      <FormLabel>Bio</FormLabel>\n      <FormControl>\n        <Textarea placeholder='Tell us about yourself' formControlName='bio' />\n      </FormControl>\n      <FormDescription>You can @mention other users.</FormDescription>\n      <FormMessage />\n    </FormItem>\n  </FormField>\n  <FormField name='notifications'>\n    <FormItem class='flex flex-row items-start space-x-3 space-y-0'>\n      <FormControl>\n        <Checkbox formControlName='notifications' />\n      </FormControl>\n      <div class='space-y-1 leading-none'>\n        <FormLabel>Receive notifications</FormLabel>\n        <FormDescription>Get notified about new messages.</FormDescription>\n      </div>\n    </FormItem>\n  </FormField>\n  <Button type='submit'>Update profile</Button>\n</form>"
      }
    ],
    "relatedComponents": ["Input", "Label", "Checkbox", "Select", "Textarea", "Button"],
    "installation": {
      "npm": "npm install @ng-cn/form",
      "pnpm": "pnpm add @ng-cn/form",
      "yarn": "yarn add @ng-cn/form",
      "bun": "bun add @ng-cn/form",
      "ngAdd": "ng g @ng-cn/core:c form",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/form directory",
          "Copy component files from the library",
          "Import Form in your component"
        ],
        "files": [
          "src/app/lib/components/ui/form/form.component.ts"
        ]
      }
    },
    "usage": "import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/lib/components/ui/form';\n\n"
  },
  {
    "name": "Input",
    "selector": "Input",
    "package": "@ng-cn/input",
    "description": "Displays a form input field.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "type",
        "type": "string",
        "default": "text",
        "description": "Input type: text | email | password | number | tel | url | search",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Placeholder text.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the input is disabled.",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "description": "The input value.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the input value changes."
      },
      {
        "name": "blur",
        "type": "EventEmitter<FocusEvent>",
        "description": "Emitted when the input loses focus."
      }
    ],
    "examples": [
      {
        "title": "Basic Input",
        "description": "Simple text input",
        "code": "<Input type='text' placeholder='Enter text...' />"
      },
      {
        "title": "Input with Label",
        "description": "Input with associated label",
        "code": "<div class='grid w-full max-w-sm items-center gap-1.5'>\n  <Label for='email'>Email</Label>\n  <Input type='email' id='email' placeholder='Email' />\n</div>"
      },
      {
        "title": "Input with Button",
        "description": "Input with submit button",
        "code": "<div class='flex w-full max-w-sm items-center space-x-2'>\n  <Input type='email' placeholder='Email' />\n  <Button type='submit'>Subscribe</Button>\n</div>"
      },
      {
        "title": "File Input",
        "description": "File upload input",
        "code": "<div class='grid w-full max-w-sm items-center gap-1.5'>\n  <Label for='picture'>Picture</Label>\n  <Input id='picture' type='file' />\n</div>"
      },
      {
        "title": "Disabled Input",
        "description": "Input in disabled state",
        "code": "<Input disabled type='email' placeholder='Email' />"
      }
    ],
    "relatedComponents": ["Label", "Form", "Textarea", "Input Group", "Button"],
    "installation": {
      "npm": "npm install @ng-cn/input",
      "pnpm": "pnpm add @ng-cn/input",
      "yarn": "yarn add @ng-cn/input",
      "bun": "bun add @ng-cn/input",
      "ngAdd": "ng g @ng-cn/core:c input",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/input directory",
          "Copy component files from the library",
          "Import Input in your component"
        ],
        "files": [
          "src/app/lib/components/ui/input/input.component.ts"
        ]
      }
    },
    "usage": "import { Input } from '@/lib/components/ui/input';\n\n"
  },
  {
    "name": "Input OTP",
    "selector": "InputOTP",
    "package": "@ng-cn/input-otp",
    "description": "Accessible one-time password component with copy paste functionality.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "maxLength",
        "type": "number",
        "description": "Maximum number of characters.",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "description": "The OTP value.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the input is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the OTP value changes."
      },
      {
        "name": "complete",
        "type": "EventEmitter<string>",
        "description": "Emitted when all slots are filled."
      }
    ],
    "examples": [
      {
        "title": "Basic Input OTP",
        "description": "6-digit OTP input",
        "code": "<InputOTP [maxLength]='6'>\n  <InputOTPGroup>\n    <InputOTPSlot [index]='0' />\n    <InputOTPSlot [index]='1' />\n    <InputOTPSlot [index]='2' />\n  </InputOTPGroup>\n  <InputOTPSeparator />\n  <InputOTPGroup>\n    <InputOTPSlot [index]='3' />\n    <InputOTPSlot [index]='4' />\n    <InputOTPSlot [index]='5' />\n  </InputOTPGroup>\n</InputOTP>"
      },
      {
        "title": "Input OTP with Pattern",
        "description": "OTP with custom pattern",
        "code": "<InputOTP [maxLength]='6' pattern='^[0-9]+$'>\n  <InputOTPGroup>\n    @for (i of [0,1,2,3,4,5]; track i) {\n      <InputOTPSlot [index]='i' />\n    }\n  </InputOTPGroup>\n</InputOTP>\n<p class='text-center text-sm text-muted-foreground'>\n  Please enter the one-time password sent to your phone.\n</p>"
      },
      {
        "title": "Controlled Input OTP",
        "description": "OTP with two-way binding",
        "code": "<InputOTP [maxLength]='6' [(value)]='otpValue' (complete)='onOtpComplete($event)'>\n  <InputOTPGroup>\n    <InputOTPSlot [index]='0' />\n    <InputOTPSlot [index]='1' />\n    <InputOTPSlot [index]='2' />\n    <InputOTPSlot [index]='3' />\n    <InputOTPSlot [index]='4' />\n    <InputOTPSlot [index]='5' />\n  </InputOTPGroup>\n</InputOTP>"
      }
    ],
    "relatedComponents": ["Input", "Form", "Label"],
    "installation": {
      "npm": "npm install @ng-cn/input-otp",
      "pnpm": "pnpm add @ng-cn/input-otp",
      "yarn": "yarn add @ng-cn/input-otp",
      "bun": "bun add @ng-cn/input-otp",
      "ngAdd": "ng g @ng-cn/core:c input-otp",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/input-otp directory",
          "Copy component files from the library",
          "Import InputOTP in your component"
        ],
        "files": [
          "src/app/lib/components/ui/input-otp/input-otp.component.ts"
        ]
      }
    },
    "usage": "import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/lib/components/ui/input-otp';\n\n"
  },
  {
    "name": "Label",
    "selector": "Label",
    "package": "@ng-cn/label",
    "description": "Renders an accessible label associated with controls.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "for",
        "type": "string",
        "description": "The id of the element the label is associated with.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Label",
        "description": "Label for input field",
        "code": "<div class='grid w-full max-w-sm items-center gap-1.5'>\n  <Label for='email'>Email</Label>\n  <Input type='email' id='email' placeholder='Email' />\n</div>"
      },
      {
        "title": "Label with Checkbox",
        "description": "Label associated with checkbox",
        "code": "<div class='flex items-center space-x-2'>\n  <Checkbox id='terms' />\n  <Label for='terms'>Accept terms and conditions</Label>\n</div>"
      },
      {
        "title": "Required Field Label",
        "description": "Label indicating required field",
        "code": "<div class='grid w-full max-w-sm items-center gap-1.5'>\n  <Label for='username'>\n    Username <span class='text-destructive'>*</span>\n  </Label>\n  <Input type='text' id='username' placeholder='Username' required />\n</div>"
      }
    ],
    "relatedComponents": ["Input", "Checkbox", "Radio Group", "Switch", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/label",
      "pnpm": "pnpm add @ng-cn/label",
      "yarn": "yarn add @ng-cn/label",
      "bun": "bun add @ng-cn/label",
      "ngAdd": "ng g @ng-cn/core:c label",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/label directory",
          "Copy component files from the library",
          "Import Label in your component"
        ],
        "files": [
          "src/app/lib/components/ui/label/label.component.ts"
        ]
      }
    },
    "usage": "import { Label } from '@/lib/components/ui/label';\n\n"
  },
  {
    "name": "Radio Group",
    "selector": "RadioGroup",
    "package": "@ng-cn/radio-group",
    "description": "A set of checkable buttons where only one can be checked at a time.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "defaultValue",
        "type": "string",
        "description": "The value of the radio item that should be checked by default.",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "description": "The controlled value of the radio group.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the radio group is disabled.",
        "required": false
      },
      {
        "name": "orientation",
        "type": "string",
        "default": "vertical",
        "description": "Orientation: horizontal | vertical",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the selected value changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Radio Group",
        "description": "Simple radio group with options",
        "code": "<RadioGroup defaultValue='comfortable'>\n  <div class='flex items-center space-x-2'>\n    <RadioGroupItem value='default' id='r1' />\n    <Label for='r1'>Default</Label>\n  </div>\n  <div class='flex items-center space-x-2'>\n    <RadioGroupItem value='comfortable' id='r2' />\n    <Label for='r2'>Comfortable</Label>\n  </div>\n  <div class='flex items-center space-x-2'>\n    <RadioGroupItem value='compact' id='r3' />\n    <Label for='r3'>Compact</Label>\n  </div>\n</RadioGroup>"
      },
      {
        "title": "Controlled Radio Group",
        "description": "Radio group with two-way binding",
        "code": "<RadioGroup [(value)]='selectedPlan'>\n  <div class='flex items-center space-x-2'>\n    <RadioGroupItem value='free' id='free' />\n    <Label for='free'>Free</Label>\n  </div>\n  <div class='flex items-center space-x-2'>\n    <RadioGroupItem value='pro' id='pro' />\n    <Label for='pro'>Pro</Label>\n  </div>\n  <div class='flex items-center space-x-2'>\n    <RadioGroupItem value='enterprise' id='enterprise' />\n    <Label for='enterprise'>Enterprise</Label>\n  </div>\n</RadioGroup>\n<p class='text-sm text-muted-foreground'>Selected: {{ selectedPlan }}</p>"
      },
      {
        "title": "Radio Group with Form",
        "description": "Radio group in form context",
        "code": "<FormField name='type'>\n  <FormItem class='space-y-3'>\n    <FormLabel>Notify me about...</FormLabel>\n    <FormControl>\n      <RadioGroup formControlName='type' class='flex flex-col space-y-1'>\n        <FormItem class='flex items-center space-x-3 space-y-0'>\n          <FormControl>\n            <RadioGroupItem value='all' />\n          </FormControl>\n          <FormLabel class='font-normal'>All new messages</FormLabel>\n        </FormItem>\n        <FormItem class='flex items-center space-x-3 space-y-0'>\n          <FormControl>\n            <RadioGroupItem value='mentions' />\n          </FormControl>\n          <FormLabel class='font-normal'>Direct messages and mentions</FormLabel>\n        </FormItem>\n        <FormItem class='flex items-center space-x-3 space-y-0'>\n          <FormControl>\n            <RadioGroupItem value='none' />\n          </FormControl>\n          <FormLabel class='font-normal'>Nothing</FormLabel>\n        </FormItem>\n      </RadioGroup>\n    </FormControl>\n    <FormMessage />\n  </FormItem>\n</FormField>"
      }
    ],
    "relatedComponents": ["Checkbox", "Switch", "Select", "Label", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/radio-group",
      "pnpm": "pnpm add @ng-cn/radio-group",
      "yarn": "yarn add @ng-cn/radio-group",
      "bun": "bun add @ng-cn/radio-group",
      "ngAdd": "ng g @ng-cn/core:c radio-group",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/radio-group directory",
          "Copy component files from the library",
          "Import RadioGroup in your component"
        ],
        "files": [
          "src/app/lib/components/ui/radio-group/radio-group.component.ts"
        ]
      }
    },
    "usage": "import { RadioGroup, RadioGroupItem } from '@/lib/components/ui/radio-group';\n\n"
  },
  {
    "name": "Select",
    "selector": "Select",
    "package": "@ng-cn/select",
    "description": "Displays a list of options for the user to pick from.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "value",
        "type": "string",
        "description": "The controlled value of the select.",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Placeholder text.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the select is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the selected value changes."
      },
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the select open state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Select",
        "description": "Simple select with options",
        "code": "<Select>\n  <SelectTrigger class='w-[180px]'>\n    <SelectValue placeholder='Select a fruit' />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value='apple'>Apple</SelectItem>\n    <SelectItem value='banana'>Banana</SelectItem>\n    <SelectItem value='blueberry'>Blueberry</SelectItem>\n    <SelectItem value='grapes'>Grapes</SelectItem>\n    <SelectItem value='pineapple'>Pineapple</SelectItem>\n  </SelectContent>\n</Select>"
      },
      {
        "title": "Select with Groups",
        "description": "Select with grouped options",
        "code": "<Select>\n  <SelectTrigger class='w-[280px]'>\n    <SelectValue placeholder='Select a timezone' />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectGroup>\n      <SelectLabel>North America</SelectLabel>\n      <SelectItem value='est'>Eastern Standard Time (EST)</SelectItem>\n      <SelectItem value='cst'>Central Standard Time (CST)</SelectItem>\n      <SelectItem value='mst'>Mountain Standard Time (MST)</SelectItem>\n      <SelectItem value='pst'>Pacific Standard Time (PST)</SelectItem>\n    </SelectGroup>\n    <SelectGroup>\n      <SelectLabel>Europe & Africa</SelectLabel>\n      <SelectItem value='gmt'>Greenwich Mean Time (GMT)</SelectItem>\n      <SelectItem value='cet'>Central European Time (CET)</SelectItem>\n    </SelectGroup>\n  </SelectContent>\n</Select>"
      },
      {
        "title": "Controlled Select",
        "description": "Select with two-way binding",
        "code": "<Select [(value)]='selectedFramework'>\n  <SelectTrigger class='w-[180px]'>\n    <SelectValue placeholder='Select framework' />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value='next'>Next.js</SelectItem>\n    <SelectItem value='svelte'>SvelteKit</SelectItem>\n    <SelectItem value='nuxt'>Nuxt.js</SelectItem>\n    <SelectItem value='remix'>Remix</SelectItem>\n    <SelectItem value='astro'>Astro</SelectItem>\n  </SelectContent>\n</Select>\n<p class='text-sm text-muted-foreground'>Selected: {{ selectedFramework }}</p>"
      },
      {
        "title": "Select with Form",
        "description": "Select in form context",
        "code": "<FormField name='email'>\n  <FormItem>\n    <FormLabel>Email</FormLabel>\n    <Select formControlName='email'>\n      <FormControl>\n        <SelectTrigger>\n          <SelectValue placeholder='Select a verified email' />\n        </SelectTrigger>\n      </FormControl>\n      <SelectContent>\n        <SelectItem value='m@example.com'>m@example.com</SelectItem>\n        <SelectItem value='m@google.com'>m@google.com</SelectItem>\n        <SelectItem value='m@support.com'>m@support.com</SelectItem>\n      </SelectContent>\n    </Select>\n    <FormDescription>You can manage email addresses in your settings.</FormDescription>\n    <FormMessage />\n  </FormItem>\n</FormField>"
      }
    ],
    "relatedComponents": ["Combobox", "Dropdown Menu", "Radio Group", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/select",
      "pnpm": "pnpm add @ng-cn/select",
      "yarn": "yarn add @ng-cn/select",
      "bun": "bun add @ng-cn/select",
      "ngAdd": "ng g @ng-cn/core:c select",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/select directory",
          "Copy component files from the library",
          "Import Select in your component"
        ],
        "files": [
          "src/app/lib/components/ui/select/select.component.ts"
        ]
      }
    },
    "usage": "import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/lib/components/ui/select';\n\n"
  },
  {
    "name": "Slider",
    "selector": "Slider",
    "package": "@ng-cn/slider",
    "description": "An input where the user selects a value from within a given range.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "value",
        "type": "number[]",
        "description": "The controlled value of the slider.",
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "number[]",
        "description": "The default value of the slider.",
        "required": false
      },
      {
        "name": "min",
        "type": "number",
        "default": "0",
        "description": "Minimum value.",
        "required": false
      },
      {
        "name": "max",
        "type": "number",
        "default": "100",
        "description": "Maximum value.",
        "required": false
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Step increment.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the slider is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<number[]>",
        "description": "Emitted when the slider value changes."
      },
      {
        "name": "valueCommit",
        "type": "EventEmitter<number[]>",
        "description": "Emitted when the slider value is committed (on mouse up)."
      }
    ],
    "examples": [
      {
        "title": "Basic Slider",
        "description": "Simple slider with default range",
        "code": "<Slider [defaultValue]='[50]' [max]='100' [step]='1' />"
      },
      {
        "title": "Controlled Slider",
        "description": "Slider with two-way binding",
        "code": "<div class='space-y-4'>\n  <Slider [(value)]='volume' [max]='100' [step]='1' class='w-[60%]' />\n  <p class='text-sm text-muted-foreground'>Volume: {{ volume[0] }}%</p>\n</div>"
      },
      {
        "title": "Range Slider",
        "description": "Slider with two handles for range selection",
        "code": "<div class='space-y-4'>\n  <Slider [(value)]='priceRange' [min]='0' [max]='1000' [step]='10' class='w-[60%]' />\n  <p class='text-sm text-muted-foreground'>\n    Price: ${{ priceRange[0] }} - ${{ priceRange[1] }}\n  </p>\n</div>"
      },
      {
        "title": "Slider with Labels",
        "description": "Slider with custom labels",
        "code": "<div class='space-y-4'>\n  <div class='flex justify-between'>\n    <Label>Temperature</Label>\n    <span class='text-sm text-muted-foreground'>{{ temperature[0] }}°C</span>\n  </div>\n  <Slider [(value)]='temperature' [min]='-10' [max]='40' [step]='1' />\n</div>"
      }
    ],
    "relatedComponents": ["Input", "Form", "Progress"],
    "installation": {
      "npm": "npm install @ng-cn/slider",
      "pnpm": "pnpm add @ng-cn/slider",
      "yarn": "yarn add @ng-cn/slider",
      "bun": "bun add @ng-cn/slider",
      "ngAdd": "ng g @ng-cn/core:c slider",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/slider directory",
          "Copy component files from the library",
          "Import Slider in your component"
        ],
        "files": [
          "src/app/lib/components/ui/slider/slider.component.ts"
        ]
      }
    },
    "usage": "import { Slider } from '@/lib/components/ui/slider';\n\n"
  },
  {
    "name": "Switch",
    "selector": "Switch",
    "package": "@ng-cn/switch",
    "description": "A control that allows the user to toggle between checked and not checked.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Whether the switch is checked.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the switch is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the checked state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Switch",
        "description": "Simple switch with label",
        "code": "<div class='flex items-center space-x-2'>\n  <Switch id='airplane-mode' />\n  <Label for='airplane-mode'>Airplane Mode</Label>\n</div>"
      },
      {
        "title": "Controlled Switch",
        "description": "Switch with two-way binding",
        "code": "<div class='flex items-center space-x-2'>\n  <Switch id='notifications' [(checked)]='notificationsEnabled' />\n  <Label for='notifications'>Enable notifications</Label>\n</div>\n<p class='text-sm text-muted-foreground'>\n  Notifications are {{ notificationsEnabled ? 'enabled' : 'disabled' }}\n</p>"
      },
      {
        "title": "Switch with Form",
        "description": "Switch in a settings form",
        "code": "<div class='space-y-4'>\n  <div class='flex flex-row items-center justify-between rounded-lg border p-4'>\n    <div class='space-y-0.5'>\n      <Label class='text-base'>Marketing emails</Label>\n      <p class='text-sm text-muted-foreground'>\n        Receive emails about new products and features.\n      </p>\n    </div>\n    <Switch [(checked)]='marketingEmails' />\n  </div>\n  <div class='flex flex-row items-center justify-between rounded-lg border p-4'>\n    <div class='space-y-0.5'>\n      <Label class='text-base'>Security emails</Label>\n      <p class='text-sm text-muted-foreground'>\n        Receive emails about account security.\n      </p>\n    </div>\n    <Switch [(checked)]='securityEmails' disabled />\n  </div>\n</div>"
      }
    ],
    "relatedComponents": ["Checkbox", "Toggle", "Label", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/switch",
      "pnpm": "pnpm add @ng-cn/switch",
      "yarn": "yarn add @ng-cn/switch",
      "bun": "bun add @ng-cn/switch",
      "ngAdd": "ng g @ng-cn/core:c switch",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/switch directory",
          "Copy component files from the library",
          "Import Switch in your component"
        ],
        "files": [
          "src/app/lib/components/ui/switch/switch.component.ts"
        ]
      }
    },
    "usage": "import { Switch } from '@/lib/components/ui/switch';\n\n"
  },
  {
    "name": "Textarea",
    "selector": "Textarea",
    "package": "@ng-cn/textarea",
    "description": "Displays a form textarea.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "placeholder",
        "type": "string",
        "description": "Placeholder text.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the textarea is disabled.",
        "required": false
      },
      {
        "name": "rows",
        "type": "number",
        "description": "Number of visible text lines.",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "description": "The textarea value.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the textarea value changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Textarea",
        "description": "Simple textarea",
        "code": "<Textarea placeholder='Type your message here.' />"
      },
      {
        "title": "Textarea with Label",
        "description": "Textarea with associated label",
        "code": "<div class='grid w-full gap-1.5'>\n  <Label for='message'>Your message</Label>\n  <Textarea placeholder='Type your message here.' id='message' />\n</div>"
      },
      {
        "title": "Textarea with Text",
        "description": "Textarea with helper text",
        "code": "<div class='grid w-full gap-1.5'>\n  <Label for='message-2'>Your Message</Label>\n  <Textarea placeholder='Type your message here.' id='message-2' />\n  <p class='text-sm text-muted-foreground'>\n    Your message will be copied to the support team.\n  </p>\n</div>"
      },
      {
        "title": "Textarea with Button",
        "description": "Textarea in a comment form",
        "code": "<div class='grid w-full gap-2'>\n  <Textarea placeholder='Type your message here.' />\n  <Button>Send message</Button>\n</div>"
      },
      {
        "title": "Disabled Textarea",
        "description": "Textarea in disabled state",
        "code": "<Textarea placeholder='Type your message here.' disabled />"
      }
    ],
    "relatedComponents": ["Input", "Label", "Form", "Button"],
    "installation": {
      "npm": "npm install @ng-cn/textarea",
      "pnpm": "pnpm add @ng-cn/textarea",
      "yarn": "yarn add @ng-cn/textarea",
      "bun": "bun add @ng-cn/textarea",
      "ngAdd": "ng g @ng-cn/core:c textarea",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/textarea directory",
          "Copy component files from the library",
          "Import Textarea in your component"
        ],
        "files": [
          "src/app/lib/components/ui/textarea/textarea.component.ts"
        ]
      }
    },
    "usage": "import { Textarea } from '@/lib/components/ui/textarea';\n\n"
  },
  {
    "name": "Toggle",
    "selector": "Toggle",
    "package": "@ng-cn/toggle",
    "description": "A two-state button that can be either on or off.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "pressed",
        "type": "boolean",
        "default": "false",
        "description": "Whether the toggle is pressed.",
        "required": false
      },
      {
        "name": "variant",
        "type": "string",
        "default": "default",
        "description": "Visual style: default | outline",
        "required": false
      },
      {
        "name": "size",
        "type": "string",
        "default": "default",
        "description": "Toggle size: default | sm | lg",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the toggle is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "pressedChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the pressed state changes."
      }
    ],
    "variants": [
      {
        "name": "variant",
        "values": ["default", "outline"],
        "default": "default"
      },
      {
        "name": "size",
        "values": ["default", "sm", "lg"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Toggle",
        "description": "Simple toggle button",
        "code": "<Toggle aria-label='Toggle italic'>\n  <Bold class='h-4 w-4' />\n</Toggle>"
      },
      {
        "title": "Toggle with Text",
        "description": "Toggle with icon and label",
        "code": "<Toggle aria-label='Toggle italic'>\n  <Italic class='h-4 w-4 mr-2' />\n  Italic\n</Toggle>"
      },
      {
        "title": "Outline Toggle",
        "description": "Toggle with outline variant",
        "code": "<Toggle variant='outline' aria-label='Toggle italic'>\n  <Italic class='h-4 w-4' />\n</Toggle>"
      },
      {
        "title": "Controlled Toggle",
        "description": "Toggle with two-way binding",
        "code": "<Toggle [(pressed)]='isBold' aria-label='Toggle bold'>\n  <Bold class='h-4 w-4' />\n</Toggle>\n<p class='text-sm text-muted-foreground'>\n  Bold is {{ isBold ? 'on' : 'off' }}\n</p>"
      },
      {
        "title": "Toggle Sizes",
        "description": "Toggle in different sizes",
        "code": "<Toggle size='sm' aria-label='Toggle'>\n  <Italic class='h-4 w-4' />\n</Toggle>\n<Toggle size='default' aria-label='Toggle'>\n  <Italic class='h-4 w-4' />\n</Toggle>\n<Toggle size='lg' aria-label='Toggle'>\n  <Italic class='h-4 w-4' />\n</Toggle>"
      },
      {
        "title": "Disabled Toggle",
        "description": "Toggle in disabled state",
        "code": "<Toggle aria-label='Toggle italic' disabled>\n  <Underline class='h-4 w-4' />\n</Toggle>"
      }
    ],
    "relatedComponents": ["Toggle Group", "Button", "Switch"],
    "installation": {
      "npm": "npm install @ng-cn/toggle",
      "pnpm": "pnpm add @ng-cn/toggle",
      "yarn": "yarn add @ng-cn/toggle",
      "bun": "bun add @ng-cn/toggle",
      "ngAdd": "ng g @ng-cn/core:c toggle",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/toggle directory",
          "Copy component files from the library",
          "Import Toggle in your component"
        ],
        "files": [
          "src/app/lib/components/ui/toggle/toggle.component.ts"
        ]
      }
    },
    "usage": "import { Toggle } from '@/lib/components/ui/toggle';\n\n"
  },
  {
    "name": "Toggle Group",
    "selector": "ToggleGroup",
    "package": "@ng-cn/toggle-group",
    "description": "A set of two-state buttons that can be toggled on or off.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "type",
        "type": "string",
        "default": "single",
        "description": "Selection type: single | multiple",
        "required": false
      },
      {
        "name": "value",
        "type": "string | string[]",
        "description": "The controlled value of the toggle group.",
        "required": false
      },
      {
        "name": "variant",
        "type": "string",
        "default": "default",
        "description": "Visual style: default | outline",
        "required": false
      },
      {
        "name": "size",
        "type": "string",
        "default": "default",
        "description": "Toggle size: default | sm | lg",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Whether the toggle group is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string | string[]>",
        "description": "Emitted when the selected value changes."
      }
    ],
    "variants": [
      {
        "name": "variant",
        "values": ["default", "outline"],
        "default": "default"
      },
      {
        "name": "size",
        "values": ["default", "sm", "lg"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Single Toggle Group",
        "description": "Toggle group with single selection",
        "code": "<ToggleGroup type='single'>\n  <ToggleGroupItem value='left' aria-label='Left aligned'>\n    <AlignLeft class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='center' aria-label='Center aligned'>\n    <AlignCenter class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='right' aria-label='Right aligned'>\n    <AlignRight class='h-4 w-4' />\n  </ToggleGroupItem>\n</ToggleGroup>"
      },
      {
        "title": "Multiple Toggle Group",
        "description": "Toggle group with multiple selection",
        "code": "<ToggleGroup type='multiple'>\n  <ToggleGroupItem value='bold' aria-label='Toggle bold'>\n    <Bold class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='italic' aria-label='Toggle italic'>\n    <Italic class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='underline' aria-label='Toggle underline'>\n    <Underline class='h-4 w-4' />\n  </ToggleGroupItem>\n</ToggleGroup>"
      },
      {
        "title": "Outline Toggle Group",
        "description": "Toggle group with outline variant",
        "code": "<ToggleGroup type='single' variant='outline'>\n  <ToggleGroupItem value='left' aria-label='Left aligned'>\n    <AlignLeft class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='center' aria-label='Center aligned'>\n    <AlignCenter class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='right' aria-label='Right aligned'>\n    <AlignRight class='h-4 w-4' />\n  </ToggleGroupItem>\n</ToggleGroup>"
      },
      {
        "title": "Controlled Toggle Group",
        "description": "Toggle group with two-way binding",
        "code": "<ToggleGroup type='single' [(value)]='alignment'>\n  <ToggleGroupItem value='left'>\n    <AlignLeft class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='center'>\n    <AlignCenter class='h-4 w-4' />\n  </ToggleGroupItem>\n  <ToggleGroupItem value='right'>\n    <AlignRight class='h-4 w-4' />\n  </ToggleGroupItem>\n</ToggleGroup>\n<p class='text-sm text-muted-foreground'>Alignment: {{ alignment }}</p>"
      }
    ],
    "relatedComponents": ["Toggle", "Button Group", "Segmented", "Radio Group"],
    "installation": {
      "npm": "npm install @ng-cn/toggle-group",
      "pnpm": "pnpm add @ng-cn/toggle-group",
      "yarn": "yarn add @ng-cn/toggle-group",
      "bun": "bun add @ng-cn/toggle-group",
      "ngAdd": "ng g @ng-cn/core:c toggle-group",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/toggle-group directory",
          "Copy component files from the library",
          "Import ToggleGroup in your component"
        ],
        "files": [
          "src/app/lib/components/ui/toggle-group/toggle-group.component.ts"
        ]
      }
    },
    "usage": "import { ToggleGroup, ToggleGroupItem } from '@/lib/components/ui/toggle-group';\n\n"
  },
  {
    "name": "Alert",
    "selector": "Alert",
    "package": "@ng-cn/alert",
    "description": "Displays a callout for user attention.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "variant",
        "type": "string",
        "default": "default",
        "description": "Visual style: default | destructive",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "variant",
        "values": ["default", "destructive"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Alert",
        "description": "Default alert with title and description",
        "code": "<Alert>\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>You can add components to your app using the cli.</AlertDescription>\n</Alert>"
      },
      {
        "title": "Destructive Alert",
        "description": "Error or warning alert",
        "code": "<Alert variant=\"destructive\">\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>\n</Alert>"
      }
    ],
    "installation": {
      "npm": "npm install @ng-cn/alert",
      "pnpm": "pnpm add @ng-cn/alert",
      "yarn": "yarn add @ng-cn/alert",
      "bun": "bun add @ng-cn/alert",
      "ngAdd": "ng g @ng-cn/core:c alert",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/alert directory",
          "Copy component files from the library",
          "Import Alert in your component"
        ],
        "files": [
          "src/app/lib/components/ui/alert/alert.component.ts"
        ]
      }
    },
    "usage": "import { Alert, AlertTitle, AlertDescription } from '@/lib/components/ui/alert';\n\n@Component({\n  imports: [Alert, AlertTitle, AlertDescription],\n  template: `\n    <Alert>\n      <AlertTitle>Note</AlertTitle>\n      <AlertDescription>This is an alert message.</AlertDescription>\n    </Alert>\n  `\n})",
    "relatedComponents": ["Alert Dialog", "Toast"]
  },
  {
    "name": "Alert Dialog",
    "selector": "AlertDialog",
    "package": "@ng-cn/alert-dialog",
    "description": "A modal dialog that interrupts the user with important content.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "open",
        "type": "boolean",
        "description": "Whether the dialog is open.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the dialog open state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Alert Dialog",
        "description": "Confirmation alert dialog",
        "code": "<AlertDialog>\n  <AlertDialogTrigger>\n    <Button variant='outline'>Show Dialog</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\n      <AlertDialogDescription>\n        This action cannot be undone. This will permanently delete your\n        account and remove your data from our servers.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Continue</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>"
      },
      {
        "title": "Controlled Alert Dialog",
        "description": "Alert dialog with controlled state",
        "code": "<AlertDialog [(open)]='showDeleteDialog'>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete Item</AlertDialogTitle>\n      <AlertDialogDescription>\n        Are you sure you want to delete this item? This action cannot be undone.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction (click)='deleteItem()'>Delete</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>\n\n<Button variant='destructive' (click)='showDeleteDialog = true'>\n  Delete\n</Button>"
      }
    ],
    "relatedComponents": ["Dialog", "Alert", "Toast"],
    "installation": {
      "npm": "npm install @ng-cn/alert-dialog",
      "pnpm": "pnpm add @ng-cn/alert-dialog",
      "yarn": "yarn add @ng-cn/alert-dialog",
      "bun": "bun add @ng-cn/alert-dialog",
      "ngAdd": "ng g @ng-cn/core:c alert-dialog",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/alert-dialog directory",
          "Copy component files from the library",
          "Import AlertDialog in your component"
        ],
        "files": [
          "src/app/lib/components/ui/alert-dialog/alert-dialog.component.ts"
        ]
      }
    },
    "usage": "import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/lib/components/ui/alert-dialog';\n\n"
  },
  {
    "name": "Dialog",
    "selector": "Dialog",
    "package": "@ng-cn/dialog",
    "description": "A window overlaid on the primary window.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "open",
        "type": "boolean",
        "description": "Whether the dialog is open.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when dialog open state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Dialog",
        "description": "Dialog with trigger, content, header and footer",
        "code": "<Dialog>\n  <DialogTrigger>\n    <Button>Open Dialog</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Are you sure?</DialogTitle>\n      <DialogDescription>This action cannot be undone.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <Button variant=\"outline\">Cancel</Button>\n      <Button>Continue</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>"
      },
      {
        "title": "Controlled Dialog",
        "description": "Dialog controlled with open binding",
        "code": "<Dialog [(open)]=\"isOpen\">\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit Profile</DialogTitle>\n    </DialogHeader>\n    <!-- form content -->\n  </DialogContent>\n</Dialog>"
      }
    ],
    "installation": {
      "npm": "npm install @ng-cn/dialog",
      "pnpm": "pnpm add @ng-cn/dialog",
      "yarn": "yarn add @ng-cn/dialog",
      "bun": "bun add @ng-cn/dialog",
      "ngAdd": "ng g @ng-cn/core:c dialog",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/dialog directory",
          "Copy component files from the library",
          "Import Dialog in your component"
        ],
        "files": [
          "src/app/lib/components/ui/dialog/dialog.component.ts"
        ]
      }
    },
    "usage": "import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/lib/components/ui/dialog';\n\n@Component({\n  imports: [Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter],\n  template: `<!-- see examples -->`\n})",
    "relatedComponents": ["Alert Dialog", "Sheet", "Drawer"]
  },
  {
    "name": "Drawer",
    "selector": "Drawer",
    "package": "@ng-cn/drawer",
    "description": "A drawer component for Angular.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "open",
        "type": "boolean",
        "description": "Whether the drawer is open.",
        "required": false
      },
      {
        "name": "direction",
        "type": "string",
        "default": "bottom",
        "description": "Direction: top | right | bottom | left",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the drawer open state changes."
      }
    ],
    "variants": [
      {
        "name": "direction",
        "values": ["top", "right", "bottom", "left"],
        "default": "bottom"
      }
    ],
    "examples": [
      {
        "title": "Basic Drawer",
        "description": "Bottom drawer with content",
        "code": "<Drawer>\n  <DrawerTrigger>\n    <Button variant='outline'>Open Drawer</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Edit profile</DrawerTitle>\n      <DrawerDescription>Make changes to your profile here.</DrawerDescription>\n    </DrawerHeader>\n    <div class='p-4 pb-0'>\n      <div class='flex items-center justify-center space-x-2'>\n        <Button variant='outline'>Cancel</Button>\n        <Button>Submit</Button>\n      </div>\n    </div>\n    <DrawerFooter>\n      <DrawerClose>\n        <Button variant='outline'>Cancel</Button>\n      </DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>"
      },
      {
        "title": "Drawer with Form",
        "description": "Drawer containing a form",
        "code": "<Drawer>\n  <DrawerTrigger>\n    <Button>Edit Goal</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <div class='mx-auto w-full max-w-sm'>\n      <DrawerHeader>\n        <DrawerTitle>Move Goal</DrawerTitle>\n        <DrawerDescription>Set your daily activity goal.</DrawerDescription>\n      </DrawerHeader>\n      <div class='p-4 pb-0'>\n        <div class='flex items-center justify-center space-x-2'>\n          <Button variant='outline' size='icon' class='h-8 w-8' (click)='decrementGoal()'>\n            <Minus class='h-4 w-4' />\n          </Button>\n          <div class='flex-1 text-center'>\n            <div class='text-7xl font-bold tracking-tighter'>{{ goal }}</div>\n            <div class='text-[0.70rem] uppercase text-muted-foreground'>Calories/day</div>\n          </div>\n          <Button variant='outline' size='icon' class='h-8 w-8' (click)='incrementGoal()'>\n            <Plus class='h-4 w-4' />\n          </Button>\n        </div>\n      </div>\n      <DrawerFooter>\n        <Button>Submit</Button>\n        <DrawerClose>\n          <Button variant='outline'>Cancel</Button>\n        </DrawerClose>\n      </DrawerFooter>\n    </div>\n  </DrawerContent>\n</Drawer>"
      },
      {
        "title": "Responsive Drawer",
        "description": "Drawer that works on mobile and dialog on desktop",
        "code": "@if (isDesktop) {\n  <Dialog [(open)]='open'>\n    <DialogTrigger>\n      <Button variant='outline'>Edit Profile</Button>\n    </DialogTrigger>\n    <DialogContent class='sm:max-w-[425px]'>\n      <DialogHeader>\n        <DialogTitle>Edit profile</DialogTitle>\n        <DialogDescription>Make changes to your profile here.</DialogDescription>\n      </DialogHeader>\n      <ProfileForm />\n    </DialogContent>\n  </Dialog>\n} @else {\n  <Drawer [(open)]='open'>\n    <DrawerTrigger>\n      <Button variant='outline'>Edit Profile</Button>\n    </DrawerTrigger>\n    <DrawerContent>\n      <DrawerHeader class='text-left'>\n        <DrawerTitle>Edit profile</DrawerTitle>\n        <DrawerDescription>Make changes to your profile here.</DrawerDescription>\n      </DrawerHeader>\n      <ProfileForm class='px-4' />\n      <DrawerFooter class='pt-2'>\n        <DrawerClose>\n          <Button variant='outline'>Cancel</Button>\n        </DrawerClose>\n      </DrawerFooter>\n    </DrawerContent>\n  </Drawer>\n}"
      }
    ],
    "relatedComponents": ["Dialog", "Sheet", "Collapsible"],
    "installation": {
      "npm": "npm install @ng-cn/drawer",
      "pnpm": "pnpm add @ng-cn/drawer",
      "yarn": "yarn add @ng-cn/drawer",
      "bun": "bun add @ng-cn/drawer",
      "ngAdd": "ng g @ng-cn/core:c drawer",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/drawer directory",
          "Copy component files from the library",
          "Import Drawer in your component"
        ],
        "files": [
          "src/app/lib/components/ui/drawer/drawer.component.ts"
        ]
      }
    },
    "usage": "import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/lib/components/ui/drawer';\n\n"
  },
  {
    "name": "Hover Card",
    "selector": "HoverCard",
    "package": "@ng-cn/hover-card",
    "description": "For sighted users to preview content available behind a link.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "openDelay",
        "type": "number",
        "default": "700",
        "description": "The delay before the hover card opens.",
        "required": false
      },
      {
        "name": "closeDelay",
        "type": "number",
        "default": "300",
        "description": "The delay before the hover card closes.",
        "required": false
      },
      {
        "name": "open",
        "type": "boolean",
        "description": "Whether the hover card is open.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the hover card open state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Hover Card",
        "description": "Hover card showing user info",
        "code": "<HoverCard>\n  <HoverCardTrigger>\n    <a href='#' class='text-sm font-medium underline underline-offset-4'>@nextjs</a>\n  </HoverCardTrigger>\n  <HoverCardContent class='w-80'>\n    <div class='flex justify-between space-x-4'>\n      <Avatar>\n        <AvatarImage src='https://github.com/vercel.png' />\n        <AvatarFallback>VC</AvatarFallback>\n      </Avatar>\n      <div class='space-y-1'>\n        <h4 class='text-sm font-semibold'>@nextjs</h4>\n        <p class='text-sm'>The React Framework – created and maintained by @vercel.</p>\n        <div class='flex items-center pt-2'>\n          <CalendarDays class='mr-2 h-4 w-4 opacity-70' />\n          <span class='text-xs text-muted-foreground'>Joined December 2021</span>\n        </div>\n      </div>\n    </div>\n  </HoverCardContent>\n</HoverCard>"
      },
      {
        "title": "Hover Card with Image",
        "description": "Preview card with image",
        "code": "<HoverCard>\n  <HoverCardTrigger>\n    <Button variant='link'>View Project</Button>\n  </HoverCardTrigger>\n  <HoverCardContent class='w-96'>\n    <div class='space-y-2'>\n      <img src='/project-preview.png' alt='Project preview' class='rounded-md' />\n      <h4 class='text-sm font-semibold'>Project Name</h4>\n      <p class='text-sm text-muted-foreground'>\n        A brief description of the project and its features.\n      </p>\n    </div>\n  </HoverCardContent>\n</HoverCard>"
      }
    ],
    "relatedComponents": ["Tooltip", "Popover", "Avatar"],
    "installation": {
      "npm": "npm install @ng-cn/hover-card",
      "pnpm": "pnpm add @ng-cn/hover-card",
      "yarn": "yarn add @ng-cn/hover-card",
      "bun": "bun add @ng-cn/hover-card",
      "ngAdd": "ng g @ng-cn/core:c hover-card",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/hover-card directory",
          "Copy component files from the library",
          "Import HoverCard in your component"
        ],
        "files": [
          "src/app/lib/components/ui/hover-card/hover-card.component.ts"
        ]
      }
    },
    "usage": "import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/lib/components/ui/hover-card';\n\n"
  },
  {
    "name": "Popover",
    "selector": "Popover",
    "package": "@ng-cn/popover",
    "description": "Displays rich content in a portal, triggered by a button.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "open",
        "type": "boolean",
        "description": "Whether the popover is open.",
        "required": false
      },
      {
        "name": "align",
        "type": "string",
        "default": "center",
        "description": "Alignment: start | center | end",
        "required": false
      },
      {
        "name": "side",
        "type": "string",
        "default": "bottom",
        "description": "Preferred side: top | right | bottom | left",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the popover open state changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Popover",
        "description": "Simple popover with content",
        "code": "<Popover>\n  <PopoverTrigger>\n    <Button variant='outline'>Open popover</Button>\n  </PopoverTrigger>\n  <PopoverContent class='w-80'>\n    <div class='grid gap-4'>\n      <div class='space-y-2'>\n        <h4 class='font-medium leading-none'>Dimensions</h4>\n        <p class='text-sm text-muted-foreground'>\n          Set the dimensions for the layer.\n        </p>\n      </div>\n      <div class='grid gap-2'>\n        <div class='grid grid-cols-3 items-center gap-4'>\n          <Label for='width'>Width</Label>\n          <Input id='width' defaultValue='100%' class='col-span-2 h-8' />\n        </div>\n        <div class='grid grid-cols-3 items-center gap-4'>\n          <Label for='maxWidth'>Max. width</Label>\n          <Input id='maxWidth' defaultValue='300px' class='col-span-2 h-8' />\n        </div>\n        <div class='grid grid-cols-3 items-center gap-4'>\n          <Label for='height'>Height</Label>\n          <Input id='height' defaultValue='25px' class='col-span-2 h-8' />\n        </div>\n      </div>\n    </div>\n  </PopoverContent>\n</Popover>"
      },
      {
        "title": "Popover with Form",
        "description": "Popover containing a small form",
        "code": "<Popover>\n  <PopoverTrigger>\n    <Button>Share</Button>\n  </PopoverTrigger>\n  <PopoverContent class='w-80'>\n    <div class='space-y-4'>\n      <h4 class='font-medium leading-none'>Share this document</h4>\n      <p class='text-sm text-muted-foreground'>\n        Anyone with the link can view this document.\n      </p>\n      <div class='flex space-x-2'>\n        <Input value='https://example.com/doc/123' readOnly />\n        <Button variant='secondary' class='shrink-0'>Copy Link</Button>\n      </div>\n    </div>\n  </PopoverContent>\n</Popover>"
      }
    ],
    "relatedComponents": ["Tooltip", "Hover Card", "Dropdown Menu", "Dialog"],
    "installation": {
      "npm": "npm install @ng-cn/popover",
      "pnpm": "pnpm add @ng-cn/popover",
      "yarn": "yarn add @ng-cn/popover",
      "bun": "bun add @ng-cn/popover",
      "ngAdd": "ng g @ng-cn/core:c popover",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/popover directory",
          "Copy component files from the library",
          "Import Popover in your component"
        ],
        "files": [
          "src/app/lib/components/ui/popover/popover.component.ts"
        ]
      }
    },
    "usage": "import { Popover, PopoverTrigger, PopoverContent } from '@/lib/components/ui/popover';\n\n"
  },
  {
    "name": "Progress",
    "selector": "Progress",
    "package": "@ng-cn/progress",
    "description": "Displays an indicator showing the completion progress of a task.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "value",
        "type": "number",
        "default": "0",
        "description": "The progress value (0-100).",
        "required": false
      },
      {
        "name": "max",
        "type": "number",
        "default": "100",
        "description": "Maximum value.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Progress",
        "description": "Simple progress bar",
        "code": "<Progress [value]='33' />"
      },
      {
        "title": "Animated Progress",
        "description": "Progress with animation",
        "code": "<Progress [value]='progress' class='w-[60%]' />\n\n// In component:\nprogress = signal(13);\n\nconstructor() {\n  setTimeout(() => this.progress.set(66), 500);\n}"
      },
      {
        "title": "Progress with Label",
        "description": "Progress bar with percentage label",
        "code": "<div class='space-y-2'>\n  <div class='flex justify-between text-sm'>\n    <span>Uploading...</span>\n    <span>{{ progress }}%</span>\n  </div>\n  <Progress [value]='progress' />\n</div>"
      },
      {
        "title": "Indeterminate Progress",
        "description": "Loading state without known progress",
        "code": "<Progress [value]='undefined' class='w-[60%]' />"
      }
    ],
    "relatedComponents": ["Slider", "Skeleton", "Spinner"],
    "installation": {
      "npm": "npm install @ng-cn/progress",
      "pnpm": "pnpm add @ng-cn/progress",
      "yarn": "yarn add @ng-cn/progress",
      "bun": "bun add @ng-cn/progress",
      "ngAdd": "ng g @ng-cn/core:c progress",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/progress directory",
          "Copy component files from the library",
          "Import Progress in your component"
        ],
        "files": [
          "src/app/lib/components/ui/progress/progress.component.ts"
        ]
      }
    },
    "usage": "import { Progress } from '@/lib/components/ui/progress';\n\n"
  },
  {
    "name": "Sheet",
    "selector": "Sheet",
    "package": "@ng-cn/sheet",
    "description": "Extends the Dialog component to display content that complements the main content.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "open",
        "type": "boolean",
        "description": "Whether the sheet is open.",
        "required": false
      },
      {
        "name": "side",
        "type": "string",
        "default": "right",
        "description": "Side: top | right | bottom | left",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "openChange",
        "type": "EventEmitter<boolean>",
        "description": "Emitted when the sheet open state changes."
      }
    ],
    "variants": [
      {
        "name": "side",
        "values": ["top", "right", "bottom", "left"],
        "default": "right"
      }
    ],
    "examples": [
      {
        "title": "Basic Sheet",
        "description": "Side sheet with form",
        "code": "<Sheet>\n  <SheetTrigger>\n    <Button variant='outline'>Open</Button>\n  </SheetTrigger>\n  <SheetContent>\n    <SheetHeader>\n      <SheetTitle>Edit profile</SheetTitle>\n      <SheetDescription>\n        Make changes to your profile here. Click save when you're done.\n      </SheetDescription>\n    </SheetHeader>\n    <div class='grid gap-4 py-4'>\n      <div class='grid grid-cols-4 items-center gap-4'>\n        <Label for='name' class='text-right'>Name</Label>\n        <Input id='name' value='Pedro Duarte' class='col-span-3' />\n      </div>\n      <div class='grid grid-cols-4 items-center gap-4'>\n        <Label for='username' class='text-right'>Username</Label>\n        <Input id='username' value='@peduarte' class='col-span-3' />\n      </div>\n    </div>\n    <SheetFooter>\n      <SheetClose>\n        <Button type='submit'>Save changes</Button>\n      </SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>"
      },
      {
        "title": "Sheet Sides",
        "description": "Sheet opening from different sides",
        "code": "<div class='grid grid-cols-2 gap-2'>\n  @for (side of ['top', 'right', 'bottom', 'left']; track side) {\n    <Sheet>\n      <SheetTrigger>\n        <Button variant='outline'>{{ side }}</Button>\n      </SheetTrigger>\n      <SheetContent [side]='side'>\n        <SheetHeader>\n          <SheetTitle>{{ side | titlecase }} Sheet</SheetTitle>\n          <SheetDescription>\n            This sheet opens from the {{ side }}.\n          </SheetDescription>\n        </SheetHeader>\n      </SheetContent>\n    </Sheet>\n  }\n</div>"
      },
      {
        "title": "Controlled Sheet",
        "description": "Sheet with controlled state",
        "code": "<Sheet [(open)]='sheetOpen'>\n  <SheetContent side='left' class='w-[400px] sm:w-[540px]'>\n    <SheetHeader>\n      <SheetTitle>Navigation</SheetTitle>\n    </SheetHeader>\n    <nav class='flex flex-col space-y-4 py-4'>\n      <a href='#' class='text-sm font-medium'>Home</a>\n      <a href='#' class='text-sm font-medium'>About</a>\n      <a href='#' class='text-sm font-medium'>Services</a>\n      <a href='#' class='text-sm font-medium'>Contact</a>\n    </nav>\n  </SheetContent>\n</Sheet>\n\n<Button (click)='sheetOpen = true'>Open Menu</Button>"
      }
    ],
    "relatedComponents": ["Dialog", "Drawer", "Sidebar"],
    "installation": {
      "npm": "npm install @ng-cn/sheet",
      "pnpm": "pnpm add @ng-cn/sheet",
      "yarn": "yarn add @ng-cn/sheet",
      "bun": "bun add @ng-cn/sheet",
      "ngAdd": "ng g @ng-cn/core:c sheet",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/sheet directory",
          "Copy component files from the library",
          "Import Sheet in your component"
        ],
        "files": [
          "src/app/lib/components/ui/sheet/sheet.component.ts"
        ]
      }
    },
    "usage": "import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/lib/components/ui/sheet';\n\n"
  },
  {
    "name": "Skeleton",
    "selector": "Skeleton",
    "package": "@ng-cn/skeleton",
    "description": "Use to show a placeholder while content is loading.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes for sizing and shape.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Skeleton",
        "description": "Simple skeleton shapes",
        "code": "<div class='flex items-center space-x-4'>\n  <Skeleton class='h-12 w-12 rounded-full' />\n  <div class='space-y-2'>\n    <Skeleton class='h-4 w-[250px]' />\n    <Skeleton class='h-4 w-[200px]' />\n  </div>\n</div>"
      },
      {
        "title": "Card Skeleton",
        "description": "Skeleton for card loading state",
        "code": "<div class='flex flex-col space-y-3'>\n  <Skeleton class='h-[125px] w-[250px] rounded-xl' />\n  <div class='space-y-2'>\n    <Skeleton class='h-4 w-[250px]' />\n    <Skeleton class='h-4 w-[200px]' />\n  </div>\n</div>"
      },
      {
        "title": "Table Skeleton",
        "description": "Skeleton for table rows",
        "code": "<div class='space-y-2'>\n  @for (row of [1, 2, 3, 4, 5]; track row) {\n    <div class='flex items-center space-x-4'>\n      <Skeleton class='h-4 w-[100px]' />\n      <Skeleton class='h-4 w-[150px]' />\n      <Skeleton class='h-4 w-[200px]' />\n      <Skeleton class='h-4 w-[80px]' />\n    </div>\n  }\n</div>"
      },
      {
        "title": "Article Skeleton",
        "description": "Skeleton for article content",
        "code": "<div class='space-y-4'>\n  <Skeleton class='h-8 w-[300px]' />\n  <Skeleton class='h-4 w-[100px]' />\n  <div class='space-y-2'>\n    <Skeleton class='h-4 w-full' />\n    <Skeleton class='h-4 w-full' />\n    <Skeleton class='h-4 w-[80%]' />\n  </div>\n  <Skeleton class='h-[200px] w-full rounded-lg' />\n  <div class='space-y-2'>\n    <Skeleton class='h-4 w-full' />\n    <Skeleton class='h-4 w-full' />\n    <Skeleton class='h-4 w-[60%]' />\n  </div>\n</div>"
      }
    ],
    "relatedComponents": ["Progress", "Spinner", "Card"],
    "installation": {
      "npm": "npm install @ng-cn/skeleton",
      "pnpm": "pnpm add @ng-cn/skeleton",
      "yarn": "yarn add @ng-cn/skeleton",
      "bun": "bun add @ng-cn/skeleton",
      "ngAdd": "ng g @ng-cn/core:c skeleton",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/skeleton directory",
          "Copy component files from the library",
          "Import Skeleton in your component"
        ],
        "files": [
          "src/app/lib/components/ui/skeleton/skeleton.component.ts"
        ]
      }
    },
    "usage": "import { Skeleton } from '@/lib/components/ui/skeleton';\n\n"
  },
  {
    "name": "Toast",
    "selector": "Toast",
    "package": "@ng-cn/toast",
    "description": "A succinct message that is displayed temporarily.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "title",
        "type": "string",
        "description": "The title of the toast.",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "description": "The description of the toast.",
        "required": false
      },
      {
        "name": "variant",
        "type": "string",
        "default": "default",
        "description": "Visual style: default | destructive",
        "required": false
      },
      {
        "name": "duration",
        "type": "number",
        "default": "5000",
        "description": "Duration in milliseconds before auto-dismiss.",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "variant",
        "values": ["default", "destructive"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Toast",
        "description": "Show a simple toast message",
        "code": "// In your component\nconstructor(private toast: ToastService) {}\n\nshowToast() {\n  this.toast.show({\n    title: 'Scheduled: Catch up',\n    description: 'Friday, February 10, 2023 at 5:57 PM',\n  });\n}\n\n// In template\n<Button (click)='showToast()'>Show Toast</Button>\n<Toaster />"
      },
      {
        "title": "Toast with Action",
        "description": "Toast with action button",
        "code": "showToastWithAction() {\n  this.toast.show({\n    title: 'Undo',\n    description: 'Your message has been sent.',\n    action: {\n      label: 'Undo',\n      onClick: () => this.undoSend()\n    }\n  });\n}"
      },
      {
        "title": "Destructive Toast",
        "description": "Error toast message",
        "code": "showErrorToast() {\n  this.toast.show({\n    variant: 'destructive',\n    title: 'Uh oh! Something went wrong.',\n    description: 'There was a problem with your request.',\n    action: {\n      label: 'Try again',\n      onClick: () => this.retry()\n    }\n  });\n}"
      },
      {
        "title": "Success Toast",
        "description": "Success notification toast",
        "code": "showSuccessToast() {\n  this.toast.show({\n    title: 'Success!',\n    description: 'Your changes have been saved.',\n  });\n}"
      }
    ],
    "relatedComponents": ["Alert", "Alert Dialog", "Dialog"],
    "installation": {
      "npm": "npm install @ng-cn/toast",
      "pnpm": "pnpm add @ng-cn/toast",
      "yarn": "yarn add @ng-cn/toast",
      "bun": "bun add @ng-cn/toast",
      "ngAdd": "ng g @ng-cn/core:c toast",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/toast directory",
          "Copy component files from the library",
          "Import Toaster in your component"
        ],
        "files": [
          "src/app/lib/components/ui/toast/toast.component.ts"
        ]
      }
    },
    "usage": "import { Toaster, ToastService } from '@/lib/components/ui/toast';\n\n"
  },
  {
    "name": "Tooltip",
    "selector": "Tooltip",
    "package": "@ng-cn/tooltip",
    "description": "A popup that displays information related to an element.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "delayDuration",
        "type": "number",
        "default": "700",
        "description": "The delay before the tooltip appears.",
        "required": false
      },
      {
        "name": "side",
        "type": "string",
        "default": "top",
        "description": "Preferred side: top | right | bottom | left",
        "required": false
      },
      {
        "name": "align",
        "type": "string",
        "default": "center",
        "description": "Alignment: start | center | end",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Tooltip",
        "description": "Simple tooltip on hover",
        "code": "<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger>\n      <Button variant='outline'>Hover</Button>\n    </TooltipTrigger>\n    <TooltipContent>\n      <p>Add to library</p>\n    </TooltipContent>\n  </Tooltip>\n</TooltipProvider>"
      },
      {
        "title": "Tooltip Positions",
        "description": "Tooltips on different sides",
        "code": "<TooltipProvider>\n  <div class='flex gap-4'>\n    <Tooltip>\n      <TooltipTrigger>\n        <Button variant='outline'>Top</Button>\n      </TooltipTrigger>\n      <TooltipContent side='top'>\n        <p>Tooltip on top</p>\n      </TooltipContent>\n    </Tooltip>\n    <Tooltip>\n      <TooltipTrigger>\n        <Button variant='outline'>Right</Button>\n      </TooltipTrigger>\n      <TooltipContent side='right'>\n        <p>Tooltip on right</p>\n      </TooltipContent>\n    </Tooltip>\n    <Tooltip>\n      <TooltipTrigger>\n        <Button variant='outline'>Bottom</Button>\n      </TooltipTrigger>\n      <TooltipContent side='bottom'>\n        <p>Tooltip on bottom</p>\n      </TooltipContent>\n    </Tooltip>\n    <Tooltip>\n      <TooltipTrigger>\n        <Button variant='outline'>Left</Button>\n      </TooltipTrigger>\n      <TooltipContent side='left'>\n        <p>Tooltip on left</p>\n      </TooltipContent>\n    </Tooltip>\n  </div>\n</TooltipProvider>"
      },
      {
        "title": "Icon Button Tooltip",
        "description": "Tooltip for icon-only button",
        "code": "<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger>\n      <Button variant='outline' size='icon'>\n        <Plus class='h-4 w-4' />\n      </Button>\n    </TooltipTrigger>\n    <TooltipContent>\n      <p>Add new item</p>\n    </TooltipContent>\n  </Tooltip>\n</TooltipProvider>"
      }
    ],
    "relatedComponents": ["Popover", "Hover Card", "Button"],
    "installation": {
      "npm": "npm install @ng-cn/tooltip",
      "pnpm": "pnpm add @ng-cn/tooltip",
      "yarn": "yarn add @ng-cn/tooltip",
      "bun": "bun add @ng-cn/tooltip",
      "ngAdd": "ng g @ng-cn/core:c tooltip",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/tooltip directory",
          "Copy component files from the library",
          "Import Tooltip in your component"
        ],
        "files": [
          "src/app/lib/components/ui/tooltip/tooltip.component.ts"
        ]
      }
    },
    "usage": "import { Tooltip, TooltipTrigger, TooltipContent } from '@/lib/components/ui/tooltip';\n\n"
  },
  {
    "name": "Avatar",
    "selector": "Avatar",
    "package": "@ng-cn/avatar",
    "description": "An image element with a fallback for representing the user.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "src",
        "type": "string",
        "description": "The image source URL.",
        "required": false
      },
      {
        "name": "alt",
        "type": "string",
        "description": "Alternative text for the image.",
        "required": false
      },
      {
        "name": "size",
        "type": "string",
        "default": "default",
        "description": "Avatar size: sm | default | lg",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "size",
        "values": ["sm", "default", "lg"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Avatar",
        "description": "Avatar with image and fallback",
        "code": "<Avatar>\n  <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />\n  <AvatarFallback>CN</AvatarFallback>\n</Avatar>"
      },
      {
        "title": "Avatar Fallback",
        "description": "Avatar with fallback initials",
        "code": "<Avatar>\n  <AvatarImage src='/broken-image.jpg' alt='@user' />\n  <AvatarFallback>JD</AvatarFallback>\n</Avatar>"
      },
      {
        "title": "Avatar Group",
        "description": "Multiple avatars stacked",
        "code": "<div class='flex -space-x-4'>\n  <Avatar class='border-2 border-background'>\n    <AvatarImage src='https://github.com/shadcn.png' />\n    <AvatarFallback>CN</AvatarFallback>\n  </Avatar>\n  <Avatar class='border-2 border-background'>\n    <AvatarImage src='https://github.com/vercel.png' />\n    <AvatarFallback>VC</AvatarFallback>\n  </Avatar>\n  <Avatar class='border-2 border-background'>\n    <AvatarImage src='https://github.com/angular.png' />\n    <AvatarFallback>NG</AvatarFallback>\n  </Avatar>\n  <Avatar class='border-2 border-background'>\n    <AvatarFallback>+3</AvatarFallback>\n  </Avatar>\n</div>"
      },
      {
        "title": "Avatar Sizes",
        "description": "Different avatar sizes",
        "code": "<div class='flex items-center gap-4'>\n  <Avatar class='h-6 w-6'>\n    <AvatarImage src='https://github.com/shadcn.png' />\n    <AvatarFallback>SM</AvatarFallback>\n  </Avatar>\n  <Avatar>\n    <AvatarImage src='https://github.com/shadcn.png' />\n    <AvatarFallback>MD</AvatarFallback>\n  </Avatar>\n  <Avatar class='h-14 w-14'>\n    <AvatarImage src='https://github.com/shadcn.png' />\n    <AvatarFallback>LG</AvatarFallback>\n  </Avatar>\n</div>"
      }
    ],
    "relatedComponents": ["Hover Card", "Card", "Badge"],
    "installation": {
      "npm": "npm install @ng-cn/avatar",
      "pnpm": "pnpm add @ng-cn/avatar",
      "yarn": "yarn add @ng-cn/avatar",
      "bun": "bun add @ng-cn/avatar",
      "ngAdd": "ng g @ng-cn/core:c avatar",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/avatar directory",
          "Copy component files from the library",
          "Import Avatar in your component"
        ],
        "files": [
          "src/app/lib/components/ui/avatar/avatar.component.ts"
        ]
      }
    },
    "usage": "import { Avatar, AvatarImage, AvatarFallback } from '@/lib/components/ui/avatar';\n\n"
  },
  {
    "name": "Badge",
    "selector": "Badge",
    "package": "@ng-cn/badge",
    "description": "Displays a badge or a component that looks like a badge.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "variant",
        "type": "string",
        "default": "default",
        "description": "Visual style: default | secondary | destructive | outline",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "variant",
        "values": ["default", "secondary", "destructive", "outline"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Badge",
        "description": "Default badge usage",
        "code": "<Badge>New</Badge>"
      },
      {
        "title": "Badge Variants",
        "description": "Different visual styles",
        "code": "<Badge variant=\"default\">Default</Badge>\n<Badge variant=\"secondary\">Secondary</Badge>\n<Badge variant=\"destructive\">Error</Badge>\n<Badge variant=\"outline\">Outline</Badge>"
      }
    ],
    "installation": {
      "npm": "npm install @ng-cn/badge",
      "pnpm": "pnpm add @ng-cn/badge",
      "yarn": "yarn add @ng-cn/badge",
      "bun": "bun add @ng-cn/badge",
      "ngAdd": "ng g @ng-cn/core:c badge",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/badge directory",
          "Copy component files from the library",
          "Import Badge in your component"
        ],
        "files": [
          "src/app/lib/components/ui/badge/badge.component.ts",
          "src/app/lib/components/ui/badge/badge-variants.ts"
        ]
      }
    },
    "usage": "import { Badge } from '@/lib/components/ui/badge';\n\n@Component({\n  imports: [Badge],\n  template: `<Badge variant=\"secondary\">Beta</Badge>`\n})"
  },
  {
    "name": "Calendar",
    "selector": "Calendar",
    "package": "@ng-cn/calendar",
    "description": "A date field component that allows users to enter and edit date.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "selected",
        "type": "Date",
        "description": "The selected date.",
        "required": false
      },
      {
        "name": "mode",
        "type": "string",
        "default": "single",
        "description": "Selection mode: single | multiple | range",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean | (date: Date) => boolean",
        "description": "Disable specific dates or all dates.",
        "required": false
      },
      {
        "name": "numberOfMonths",
        "type": "number",
        "default": "1",
        "description": "Number of months to display.",
        "required": false
      },
      {
        "name": "initialFocus",
        "type": "boolean",
        "description": "Focus the calendar on mount.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "selectedChange",
        "type": "EventEmitter<Date | Date[] | DateRange>",
        "description": "Emitted when the selected date(s) change."
      },
      {
        "name": "monthChange",
        "type": "EventEmitter<Date>",
        "description": "Emitted when the displayed month changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Calendar",
        "description": "Simple single date selection",
        "code": "<Calendar mode='single' [(selected)]='date' class='rounded-md border' />"
      },
      {
        "title": "Calendar with Disabled Dates",
        "description": "Calendar with past dates disabled",
        "code": "<Calendar\n  mode='single'\n  [(selected)]='date'\n  [disabled]='isPastDate'\n  class='rounded-md border'\n/>\n\n// In component:\nisPastDate = (date: Date) => date < new Date();"
      },
      {
        "title": "Date Range Calendar",
        "description": "Calendar for selecting date range",
        "code": "<Calendar\n  mode='range'\n  [(selected)]='dateRange'\n  [numberOfMonths]='2'\n  class='rounded-md border'\n/>"
      },
      {
        "title": "Multiple Date Selection",
        "description": "Calendar for selecting multiple dates",
        "code": "<Calendar\n  mode='multiple'\n  [(selected)]='selectedDates'\n  class='rounded-md border'\n/>\n<p class='text-sm text-muted-foreground'>\n  {{ selectedDates.length }} dates selected\n</p>"
      }
    ],
    "relatedComponents": ["Date Picker", "Popover", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/calendar",
      "pnpm": "pnpm add @ng-cn/calendar",
      "yarn": "yarn add @ng-cn/calendar",
      "bun": "bun add @ng-cn/calendar",
      "ngAdd": "ng g @ng-cn/core:c calendar",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/calendar directory",
          "Copy component files from the library",
          "Import Calendar in your component"
        ],
        "files": [
          "src/app/lib/components/ui/calendar/calendar.component.ts"
        ]
      }
    },
    "usage": "import { Calendar } from '@/lib/components/ui/calendar';\n\n"
  },
  {
    "name": "Carousel",
    "selector": "Carousel",
    "package": "@ng-cn/carousel",
    "description": "A carousel with motion and swipe built using Embla.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "embla-carousel-angular"
    ],
    "inputs": [
      {
        "name": "opts",
        "type": "EmblaOptionsType",
        "description": "Embla carousel options.",
        "required": false
      },
      {
        "name": "orientation",
        "type": "string",
        "default": "horizontal",
        "description": "Carousel orientation: horizontal | vertical",
        "required": false
      },
      {
        "name": "plugins",
        "type": "EmblaPluginType[]",
        "description": "Embla carousel plugins.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "apiChange",
        "type": "EventEmitter<EmblaCarouselType>",
        "description": "Emitted when the carousel API is ready."
      }
    ],
    "examples": [
      {
        "title": "Basic Carousel",
        "description": "Simple horizontal carousel",
        "code": "<Carousel class='w-full max-w-xs'>\n  <CarouselContent>\n    @for (i of [1, 2, 3, 4, 5]; track i) {\n      <CarouselItem>\n        <div class='p-1'>\n          <Card>\n            <CardContent class='flex aspect-square items-center justify-center p-6'>\n              <span class='text-4xl font-semibold'>{{ i }}</span>\n            </CardContent>\n          </Card>\n        </div>\n      </CarouselItem>\n    }\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>"
      },
      {
        "title": "Carousel with Multiple Items",
        "description": "Show multiple items per view",
        "code": "<Carousel [opts]=\"{ align: 'start' }\" class='w-full max-w-sm'>\n  <CarouselContent class='-ml-1'>\n    @for (i of [1, 2, 3, 4, 5]; track i) {\n      <CarouselItem class='pl-1 md:basis-1/2 lg:basis-1/3'>\n        <div class='p-1'>\n          <Card>\n            <CardContent class='flex aspect-square items-center justify-center p-6'>\n              <span class='text-2xl font-semibold'>{{ i }}</span>\n            </CardContent>\n          </Card>\n        </div>\n      </CarouselItem>\n    }\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>"
      },
      {
        "title": "Vertical Carousel",
        "description": "Carousel with vertical orientation",
        "code": "<Carousel orientation='vertical' class='w-full max-w-xs'>\n  <CarouselContent class='-mt-1 h-[200px]'>\n    @for (i of [1, 2, 3, 4, 5]; track i) {\n      <CarouselItem class='pt-1 md:basis-1/2'>\n        <div class='p-1'>\n          <Card>\n            <CardContent class='flex items-center justify-center p-6'>\n              <span class='text-3xl font-semibold'>{{ i }}</span>\n            </CardContent>\n          </Card>\n        </div>\n      </CarouselItem>\n    }\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>"
      },
      {
        "title": "Autoplay Carousel",
        "description": "Carousel with autoplay plugin",
        "code": "<Carousel [plugins]='[autoplayPlugin]' class='w-full max-w-xs'>\n  <CarouselContent>\n    @for (i of [1, 2, 3, 4, 5]; track i) {\n      <CarouselItem>\n        <div class='p-1'>\n          <Card>\n            <CardContent class='flex aspect-square items-center justify-center p-6'>\n              <span class='text-4xl font-semibold'>{{ i }}</span>\n            </CardContent>\n          </Card>\n        </div>\n      </CarouselItem>\n    }\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>\n\n// In component:\nautoplayPlugin = Autoplay({ delay: 2000, stopOnInteraction: true });"
      }
    ],
    "relatedComponents": ["Card", "Aspect Ratio", "Button"],
    "installation": {
      "npm": "npm install @ng-cn/carousel",
      "pnpm": "pnpm add @ng-cn/carousel",
      "yarn": "yarn add @ng-cn/carousel",
      "bun": "bun add @ng-cn/carousel",
      "ngAdd": "ng g @ng-cn/core:c carousel",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/carousel directory",
          "Copy component files from the library",
          "Import Carousel in your component"
        ],
        "files": [
          "src/app/lib/components/ui/carousel/carousel.component.ts"
        ]
      }
    },
    "usage": "import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/lib/components/ui/carousel';\n\n"
  },
  {
    "name": "Chart",
    "selector": "Chart",
    "package": "@ng-cn/chart",
    "description": "Beautiful charts built with SVG.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "ngx-echarts"
    ],
    "inputs": [
      {
        "name": "config",
        "type": "ChartConfig",
        "description": "Chart configuration object.",
        "required": true
      },
      {
        "name": "data",
        "type": "any[]",
        "description": "Chart data array.",
        "required": true
      },
      {
        "name": "type",
        "type": "string",
        "description": "Chart type: bar | line | area | pie | donut | radar",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Bar Chart",
        "description": "Vertical bar chart",
        "code": "<ChartContainer [config]='chartConfig' class='min-h-[200px] w-full'>\n  <BarChart [data]='chartData'>\n    <CartesianGrid vertical={false} />\n    <XAxis dataKey='month' />\n    <ChartTooltip [content]='ChartTooltipContent' />\n    <Bar dataKey='desktop' fill='var(--color-desktop)' radius='4' />\n  </BarChart>\n</ChartContainer>\n\n// In component:\nchartConfig = {\n  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' }\n};\n\nchartData = [\n  { month: 'January', desktop: 186 },\n  { month: 'February', desktop: 305 },\n  { month: 'March', desktop: 237 },\n];"
      },
      {
        "title": "Line Chart",
        "description": "Line chart with multiple series",
        "code": "<ChartContainer [config]='chartConfig' class='min-h-[200px] w-full'>\n  <LineChart [data]='chartData'>\n    <CartesianGrid strokeDasharray='3 3' />\n    <XAxis dataKey='month' />\n    <YAxis />\n    <ChartTooltip />\n    <Line type='monotone' dataKey='desktop' stroke='var(--color-desktop)' />\n    <Line type='monotone' dataKey='mobile' stroke='var(--color-mobile)' />\n  </LineChart>\n</ChartContainer>"
      },
      {
        "title": "Pie Chart",
        "description": "Pie chart with legend",
        "code": "<ChartContainer [config]='chartConfig' class='mx-auto aspect-square max-h-[250px]'>\n  <PieChart>\n    <ChartTooltip />\n    <Pie [data]='chartData' dataKey='visitors' nameKey='browser' />\n    <ChartLegend [content]='ChartLegendContent' />\n  </PieChart>\n</ChartContainer>"
      },
      {
        "title": "Area Chart",
        "description": "Stacked area chart",
        "code": "<ChartContainer [config]='chartConfig' class='min-h-[200px] w-full'>\n  <AreaChart [data]='chartData'>\n    <CartesianGrid strokeDasharray='3 3' />\n    <XAxis dataKey='month' />\n    <ChartTooltip />\n    <Area type='monotone' dataKey='desktop' stackId='1' fill='var(--color-desktop)' />\n    <Area type='monotone' dataKey='mobile' stackId='1' fill='var(--color-mobile)' />\n  </AreaChart>\n</ChartContainer>"
      }
    ],
    "relatedComponents": ["Card", "Table", "Tooltip"],
    "installation": {
      "npm": "npm install @ng-cn/chart",
      "pnpm": "pnpm add @ng-cn/chart",
      "yarn": "yarn add @ng-cn/chart",
      "bun": "bun add @ng-cn/chart",
      "ngAdd": "ng g @ng-cn/core:c chart",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/chart directory",
          "Copy component files from the library",
          "Import Chart in your component"
        ],
        "files": [
          "src/app/lib/components/ui/chart/chart.component.ts"
        ]
      }
    },
    "usage": "import { Chart } from '@/lib/components/ui/chart';\n\n"
  },
  {
    "name": "Command",
    "selector": "Command",
    "package": "@ng-cn/command",
    "description": "Fast, composable, unstyled command menu.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      },
      {
        "name": "filter",
        "type": "(value: string, search: string) => number",
        "description": "Custom filter function.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the selected value changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Command",
        "description": "Command palette with groups",
        "code": "<Command class='rounded-lg border shadow-md'>\n  <CommandInput placeholder='Type a command or search...' />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading='Suggestions'>\n      <CommandItem>\n        <Calendar class='mr-2 h-4 w-4' />\n        <span>Calendar</span>\n      </CommandItem>\n      <CommandItem>\n        <Smile class='mr-2 h-4 w-4' />\n        <span>Search Emoji</span>\n      </CommandItem>\n      <CommandItem>\n        <Calculator class='mr-2 h-4 w-4' />\n        <span>Calculator</span>\n      </CommandItem>\n    </CommandGroup>\n    <CommandSeparator />\n    <CommandGroup heading='Settings'>\n      <CommandItem>\n        <User class='mr-2 h-4 w-4' />\n        <span>Profile</span>\n        <CommandShortcut>⌘P</CommandShortcut>\n      </CommandItem>\n      <CommandItem>\n        <CreditCard class='mr-2 h-4 w-4' />\n        <span>Billing</span>\n        <CommandShortcut>⌘B</CommandShortcut>\n      </CommandItem>\n      <CommandItem>\n        <Settings class='mr-2 h-4 w-4' />\n        <span>Settings</span>\n        <CommandShortcut>⌘S</CommandShortcut>\n      </CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>"
      },
      {
        "title": "Command Dialog",
        "description": "Command palette in dialog",
        "code": "<p class='text-sm text-muted-foreground'>\n  Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette\n</p>\n\n<CommandDialog [(open)]='open'>\n  <CommandInput placeholder='Type a command or search...' />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading='Suggestions'>\n      <CommandItem (select)=\"runCommand('calendar')\">Calendar</CommandItem>\n      <CommandItem (select)=\"runCommand('emoji')\">Search Emoji</CommandItem>\n      <CommandItem (select)=\"runCommand('calculator')\">Calculator</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</CommandDialog>\n\n// In component:\n@HostListener('document:keydown', ['$event'])\nhandleKeyDown(e: KeyboardEvent) {\n  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {\n    e.preventDefault();\n    this.open = !this.open;\n  }\n}"
      },
      {
        "title": "Command with Combobox",
        "description": "Command as a combobox",
        "code": "<Popover [(open)]='open'>\n  <PopoverTrigger>\n    <Button variant='outline' role='combobox' class='w-[200px] justify-between'>\n      {{ selectedFramework?.label ?? 'Select framework...' }}\n      <ChevronsUpDown class='ml-2 h-4 w-4 shrink-0 opacity-50' />\n    </Button>\n  </PopoverTrigger>\n  <PopoverContent class='w-[200px] p-0'>\n    <Command>\n      <CommandInput placeholder='Search framework...' />\n      <CommandList>\n        <CommandEmpty>No framework found.</CommandEmpty>\n        <CommandGroup>\n          @for (framework of frameworks; track framework.value) {\n            <CommandItem [value]='framework.value' (onSelect)='select(framework)'>\n              <Check class='mr-2 h-4 w-4' [class.opacity-100]='value === framework.value' />\n              {{ framework.label }}\n            </CommandItem>\n          }\n        </CommandGroup>\n      </CommandList>\n    </Command>\n  </PopoverContent>\n</Popover>"
      }
    ],
    "relatedComponents": ["Combobox", "Dialog", "Popover", "Kbd"],
    "installation": {
      "npm": "npm install @ng-cn/command",
      "pnpm": "pnpm add @ng-cn/command",
      "yarn": "yarn add @ng-cn/command",
      "bun": "bun add @ng-cn/command",
      "ngAdd": "ng g @ng-cn/core:c command",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/command directory",
          "Copy component files from the library",
          "Import Command in your component"
        ],
        "files": [
          "src/app/lib/components/ui/command/command.component.ts"
        ]
      }
    },
    "usage": "import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/lib/components/ui/command';\n\n"
  },
  {
    "name": "Data Table",
    "selector": "DataTable",
    "package": "@ng-cn/data-table",
    "description": "Powerful table and datagrids.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "@tanstack/angular-table"
    ],
    "inputs": [
      {
        "name": "columns",
        "type": "ColumnDef[]",
        "description": "Column definitions array.",
        "required": true
      },
      {
        "name": "data",
        "type": "T[]",
        "description": "Data array.",
        "required": true
      },
      {
        "name": "pageSize",
        "type": "number",
        "default": "10",
        "description": "Number of rows per page.",
        "required": false
      },
      {
        "name": "enableSorting",
        "type": "boolean",
        "default": "true",
        "description": "Enable column sorting.",
        "required": false
      },
      {
        "name": "enableFiltering",
        "type": "boolean",
        "default": "true",
        "description": "Enable column filtering.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "rowSelectionChange",
        "type": "EventEmitter<T[]>",
        "description": "Emitted when row selection changes."
      },
      {
        "name": "sortingChange",
        "type": "EventEmitter<SortingState>",
        "description": "Emitted when sorting changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Data Table",
        "description": "Simple data table with columns",
        "code": "<DataTable [columns]='columns' [data]='payments' />\n\n// In component:\ncolumns: ColumnDef<Payment>[] = [\n  {\n    accessorKey: 'status',\n    header: 'Status',\n  },\n  {\n    accessorKey: 'email',\n    header: 'Email',\n  },\n  {\n    accessorKey: 'amount',\n    header: () => 'Amount',\n    cell: ({ row }) => {\n      const amount = parseFloat(row.getValue('amount'));\n      const formatted = new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: 'USD',\n      }).format(amount);\n      return formatted;\n    },\n  },\n];"
      },
      {
        "title": "Data Table with Sorting",
        "description": "Sortable columns",
        "code": "<DataTable [columns]='columns' [data]='payments'>\n  <ng-template #headerCell let-column='column'>\n    <Button variant='ghost' (click)='column.toggleSorting()'>\n      {{ column.header }}\n      <ArrowUpDown class='ml-2 h-4 w-4' />\n    </Button>\n  </ng-template>\n</DataTable>"
      },
      {
        "title": "Data Table with Row Selection",
        "description": "Table with checkbox selection",
        "code": "<DataTable [columns]='columnsWithSelect' [data]='payments'>\n  <ng-template #headerCell='select'>\n    <Checkbox\n      [(checked)]='table.getIsAllPageRowsSelected()'\n      (checkedChange)='table.toggleAllPageRowsSelected()'\n      aria-label='Select all'\n    />\n  </ng-template>\n  <ng-template #cell='select' let-row='row'>\n    <Checkbox\n      [(checked)]='row.getIsSelected()'\n      (checkedChange)='row.toggleSelected()'\n      aria-label='Select row'\n    />\n  </ng-template>\n</DataTable>\n\n<div class='text-sm text-muted-foreground'>\n  {{ table.getFilteredSelectedRowModel().rows.length }} of\n  {{ table.getFilteredRowModel().rows.length }} row(s) selected.\n</div>"
      },
      {
        "title": "Data Table with Pagination",
        "description": "Table with pagination controls",
        "code": "<div>\n  <DataTable [columns]='columns' [data]='payments' />\n  <div class='flex items-center justify-end space-x-2 py-4'>\n    <Button variant='outline' size='sm' (click)='table.previousPage()' [disabled]='!table.getCanPreviousPage()'>\n      Previous\n    </Button>\n    <Button variant='outline' size='sm' (click)='table.nextPage()' [disabled]='!table.getCanNextPage()'>\n      Next\n    </Button>\n  </div>\n</div>"
      }
    ],
    "relatedComponents": ["Table", "Pagination", "Checkbox", "Input"],
    "installation": {
      "npm": "npm install @ng-cn/data-table",
      "pnpm": "pnpm add @ng-cn/data-table",
      "yarn": "yarn add @ng-cn/data-table",
      "bun": "bun add @ng-cn/data-table",
      "ngAdd": "ng g @ng-cn/core:c data-table",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/data-table directory",
          "Copy component files from the library",
          "Import DataTable in your component"
        ],
        "files": [
          "src/app/lib/components/ui/data-table/data-table.component.ts"
        ]
      }
    },
    "usage": "import { DataTable } from '@/lib/components/ui/data-table';\n\n"
  },
  {
    "name": "Table",
    "selector": "Table",
    "package": "@ng-cn/table",
    "description": "A responsive table component.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Table",
        "description": "Simple data table",
        "code": "<Table>\n  <TableCaption>A list of your recent invoices.</TableCaption>\n  <TableHeader>\n    <TableRow>\n      <TableHead class='w-[100px]'>Invoice</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead>Method</TableHead>\n      <TableHead class='text-right'>Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    @for (invoice of invoices; track invoice.invoice) {\n      <TableRow>\n        <TableCell class='font-medium'>{{ invoice.invoice }}</TableCell>\n        <TableCell>{{ invoice.paymentStatus }}</TableCell>\n        <TableCell>{{ invoice.paymentMethod }}</TableCell>\n        <TableCell class='text-right'>{{ invoice.totalAmount }}</TableCell>\n      </TableRow>\n    }\n  </TableBody>\n  <TableFooter>\n    <TableRow>\n      <TableCell colspan='3'>Total</TableCell>\n      <TableCell class='text-right'>$2,500.00</TableCell>\n    </TableRow>\n  </TableFooter>\n</Table>"
      },
      {
        "title": "Table with Actions",
        "description": "Table with row actions",
        "code": "<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n      <TableHead>Email</TableHead>\n      <TableHead>Role</TableHead>\n      <TableHead class='text-right'>Actions</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    @for (user of users; track user.id) {\n      <TableRow>\n        <TableCell class='font-medium'>{{ user.name }}</TableCell>\n        <TableCell>{{ user.email }}</TableCell>\n        <TableCell>{{ user.role }}</TableCell>\n        <TableCell class='text-right'>\n          <DropdownMenu>\n            <DropdownMenuTrigger>\n              <Button variant='ghost' class='h-8 w-8 p-0'>\n                <MoreHorizontal class='h-4 w-4' />\n              </Button>\n            </DropdownMenuTrigger>\n            <DropdownMenuContent align='end'>\n              <DropdownMenuLabel>Actions</DropdownMenuLabel>\n              <DropdownMenuItem>Edit</DropdownMenuItem>\n              <DropdownMenuItem>Delete</DropdownMenuItem>\n            </DropdownMenuContent>\n          </DropdownMenu>\n        </TableCell>\n      </TableRow>\n    }\n  </TableBody>\n</Table>"
      },
      {
        "title": "Striped Table",
        "description": "Table with striped rows",
        "code": "<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Product</TableHead>\n      <TableHead>Price</TableHead>\n      <TableHead>Stock</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    @for (product of products; track product.id; let odd = $odd) {\n      <TableRow [class.bg-muted/50]='odd'>\n        <TableCell>{{ product.name }}</TableCell>\n        <TableCell>{{ product.price | currency }}</TableCell>\n        <TableCell>{{ product.stock }}</TableCell>\n      </TableRow>\n    }\n  </TableBody>\n</Table>"
      }
    ],
    "relatedComponents": ["Data Table", "Pagination", "Card", "Dropdown Menu"],
    "installation": {
      "npm": "npm install @ng-cn/table",
      "pnpm": "pnpm add @ng-cn/table",
      "yarn": "yarn add @ng-cn/table",
      "bun": "bun add @ng-cn/table",
      "ngAdd": "ng g @ng-cn/core:c table",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/table directory",
          "Copy component files from the library",
          "Import Table in your component"
        ],
        "files": [
          "src/app/lib/components/ui/table/table.component.ts"
        ]
      }
    },
    "usage": "import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/lib/components/ui/table';\n\n"
  },
  {
    "name": "Button Group",
    "selector": "ButtonGroup",
    "package": "@ng-cn/button-group",
    "description": "Groups multiple buttons together.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "orientation",
        "type": "string",
        "default": "horizontal",
        "description": "Orientation: horizontal | vertical",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Button Group",
        "description": "Horizontal group of buttons",
        "code": "<ButtonGroup>\n  <Button variant='outline'>Edit</Button>\n  <Button variant='outline'>Duplicate</Button>\n  <Button variant='outline'>Archive</Button>\n</ButtonGroup>"
      },
      {
        "title": "Vertical Button Group",
        "description": "Vertically stacked buttons",
        "code": "<ButtonGroup orientation='vertical'>\n  <Button variant='outline'>Profile</Button>\n  <Button variant='outline'>Settings</Button>\n  <Button variant='outline'>Logout</Button>\n</ButtonGroup>"
      },
      {
        "title": "Button Group with Icons",
        "description": "Grouped icon buttons",
        "code": "<ButtonGroup>\n  <Button variant='outline' size='icon'>\n    <Bold class='h-4 w-4' />\n  </Button>\n  <Button variant='outline' size='icon'>\n    <Italic class='h-4 w-4' />\n  </Button>\n  <Button variant='outline' size='icon'>\n    <Underline class='h-4 w-4' />\n  </Button>\n</ButtonGroup>"
      },
      {
        "title": "Split Button",
        "description": "Button group as split button",
        "code": "<ButtonGroup>\n  <Button>Save changes</Button>\n  <DropdownMenu>\n    <DropdownMenuTrigger asChild>\n      <Button variant='default' size='icon'>\n        <ChevronDown class='h-4 w-4' />\n      </Button>\n    </DropdownMenuTrigger>\n    <DropdownMenuContent>\n      <DropdownMenuItem>Save as draft</DropdownMenuItem>\n      <DropdownMenuItem>Save and close</DropdownMenuItem>\n    </DropdownMenuContent>\n  </DropdownMenu>\n</ButtonGroup>"
      }
    ],
    "relatedComponents": ["Button", "Toggle Group", "Dropdown Menu"],
    "installation": {
      "npm": "npm install @ng-cn/button-group",
      "pnpm": "pnpm add @ng-cn/button-group",
      "yarn": "yarn add @ng-cn/button-group",
      "bun": "bun add @ng-cn/button-group",
      "ngAdd": "ng g @ng-cn/core:c button-group",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/button-group directory",
          "Copy component files from the library",
          "Import ButtonGroup in your component"
        ],
        "files": [
          "src/app/lib/components/ui/button-group/button-group.component.ts"
        ]
      }
    },
    "usage": "import { ButtonGroup } from '@/lib/components/ui/button-group';\n\n"
  },
  {
    "name": "Empty",
    "selector": "Empty",
    "package": "@ng-cn/empty",
    "description": "Empty state placeholder component.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "icon",
        "type": "TemplateRef<any>",
        "description": "Custom icon template.",
        "required": false
      },
      {
        "name": "title",
        "type": "string",
        "description": "Empty state title text.",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "description": "Empty state description text.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Empty State",
        "description": "Simple empty state",
        "code": "<Empty>\n  <EmptyIcon>\n    <Inbox class='h-10 w-10 text-muted-foreground' />\n  </EmptyIcon>\n  <EmptyTitle>No results found</EmptyTitle>\n  <EmptyDescription>\n    Try adjusting your search or filter to find what you're looking for.\n  </EmptyDescription>\n</Empty>"
      },
      {
        "title": "Empty State with Action",
        "description": "Empty state with call to action",
        "code": "<Empty>\n  <EmptyIcon>\n    <FileX class='h-10 w-10 text-muted-foreground' />\n  </EmptyIcon>\n  <EmptyTitle>No files uploaded</EmptyTitle>\n  <EmptyDescription>\n    Get started by uploading your first file.\n  </EmptyDescription>\n  <EmptyAction>\n    <Button>\n      <Upload class='mr-2 h-4 w-4' />\n      Upload File\n    </Button>\n  </EmptyAction>\n</Empty>"
      },
      {
        "title": "Empty State in Table",
        "description": "Empty state for empty data tables",
        "code": "<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead>Date</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    @if (data.length === 0) {\n      <TableRow>\n        <TableCell colspan='3'>\n          <Empty class='py-10'>\n            <EmptyIcon>\n              <Database class='h-8 w-8' />\n            </EmptyIcon>\n            <EmptyTitle>No data</EmptyTitle>\n            <EmptyDescription>There are no records to display.</EmptyDescription>\n          </Empty>\n        </TableCell>\n      </TableRow>\n    }\n  </TableBody>\n</Table>"
      }
    ],
    "relatedComponents": ["Skeleton", "Card", "Table"],
    "installation": {
      "npm": "npm install @ng-cn/empty",
      "pnpm": "pnpm add @ng-cn/empty",
      "yarn": "yarn add @ng-cn/empty",
      "bun": "bun add @ng-cn/empty",
      "ngAdd": "ng g @ng-cn/core:c empty",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/empty directory",
          "Copy component files from the library",
          "Import Empty in your component"
        ],
        "files": [
          "src/app/lib/components/ui/empty/empty.component.ts"
        ]
      }
    },
    "usage": "import { Empty } from '@/lib/components/ui/empty';\n\n"
  },
  {
    "name": "Input Group",
    "selector": "InputGroup",
    "package": "@ng-cn/input-group",
    "description": "Input with prefix/suffix addons.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Input with Icon Prefix",
        "description": "Input field with leading icon",
        "code": "<InputGroup>\n  <InputGroupPrefix>\n    <Search class='h-4 w-4 text-muted-foreground' />\n  </InputGroupPrefix>\n  <Input placeholder='Search...' />\n</InputGroup>"
      },
      {
        "title": "Input with Text Addon",
        "description": "Input with text prefix/suffix",
        "code": "<InputGroup>\n  <InputGroupAddon>https://</InputGroupAddon>\n  <Input placeholder='example.com' />\n  <InputGroupAddon>.com</InputGroupAddon>\n</InputGroup>"
      },
      {
        "title": "Input with Button",
        "description": "Input with button suffix",
        "code": "<InputGroup>\n  <Input placeholder='Enter email...' type='email' />\n  <InputGroupSuffix>\n    <Button size='sm'>Subscribe</Button>\n  </InputGroupSuffix>\n</InputGroup>"
      },
      {
        "title": "Currency Input",
        "description": "Input for currency values",
        "code": "<InputGroup>\n  <InputGroupAddon>$</InputGroupAddon>\n  <Input type='number' placeholder='0.00' />\n  <InputGroupAddon>USD</InputGroupAddon>\n</InputGroup>"
      }
    ],
    "relatedComponents": ["Input", "Button", "Form"],
    "installation": {
      "npm": "npm install @ng-cn/input-group",
      "pnpm": "pnpm add @ng-cn/input-group",
      "yarn": "yarn add @ng-cn/input-group",
      "bun": "bun add @ng-cn/input-group",
      "ngAdd": "ng g @ng-cn/core:c input-group",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/input-group directory",
          "Copy component files from the library",
          "Import InputGroup in your component"
        ],
        "files": [
          "src/app/lib/components/ui/input-group/input-group.component.ts"
        ]
      }
    },
    "usage": "import { InputGroup } from '@/lib/components/ui/input-group';\n\n"
  },
  {
    "name": "Kbd",
    "selector": "Kbd",
    "package": "@ng-cn/kbd",
    "description": "Keyboard key indicator component.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "size",
        "type": "string",
        "default": "default",
        "description": "Size: sm | default | lg",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "size",
        "values": ["sm", "default", "lg"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Kbd",
        "description": "Single keyboard key",
        "code": "<Kbd>⌘</Kbd>"
      },
      {
        "title": "Keyboard Shortcut",
        "description": "Multiple keys for shortcut",
        "code": "<p class='text-sm text-muted-foreground'>\n  Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette\n</p>"
      },
      {
        "title": "Copy Shortcut",
        "description": "Common keyboard shortcuts",
        "code": "<div class='flex items-center gap-1'>\n  <span class='text-sm text-muted-foreground'>Copy:</span>\n  <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>\n</div>\n<div class='flex items-center gap-1'>\n  <span class='text-sm text-muted-foreground'>Paste:</span>\n  <Kbd>Ctrl</Kbd> + <Kbd>V</Kbd>\n</div>"
      },
      {
        "title": "Kbd in Dropdown",
        "description": "Shortcut hints in menu items",
        "code": "<DropdownMenuContent>\n  <DropdownMenuItem>\n    <span>New Tab</span>\n    <DropdownMenuShortcut>\n      <Kbd size='sm'>⌘</Kbd><Kbd size='sm'>T</Kbd>\n    </DropdownMenuShortcut>\n  </DropdownMenuItem>\n  <DropdownMenuItem>\n    <span>New Window</span>\n    <DropdownMenuShortcut>\n      <Kbd size='sm'>⌘</Kbd><Kbd size='sm'>N</Kbd>\n    </DropdownMenuShortcut>\n  </DropdownMenuItem>\n</DropdownMenuContent>"
      }
    ],
    "relatedComponents": ["Command", "Dropdown Menu", "Tooltip"],
    "installation": {
      "npm": "npm install @ng-cn/kbd",
      "pnpm": "pnpm add @ng-cn/kbd",
      "yarn": "yarn add @ng-cn/kbd",
      "bun": "bun add @ng-cn/kbd",
      "ngAdd": "ng g @ng-cn/core:c kbd",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/kbd directory",
          "Copy component files from the library",
          "Import Kbd in your component"
        ],
        "files": [
          "src/app/lib/components/ui/kbd/kbd.component.ts"
        ]
      }
    },
    "usage": "import { Kbd } from '@/lib/components/ui/kbd';\n\n"
  },
  {
    "name": "Native Select",
    "selector": "NativeSelect",
    "package": "@ng-cn/native-select",
    "description": "HTML native select with styling.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "value",
        "type": "string",
        "description": "The selected value.",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "Whether the select is disabled.",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the selected value changes."
      }
    ],
    "examples": [
      {
        "title": "Basic Native Select",
        "description": "Simple select dropdown",
        "code": "<NativeSelect [(value)]='selectedFruit'>\n  <option value=''>Select a fruit</option>\n  <option value='apple'>Apple</option>\n  <option value='banana'>Banana</option>\n  <option value='orange'>Orange</option>\n  <option value='grape'>Grape</option>\n</NativeSelect>"
      },
      {
        "title": "Native Select with Optgroup",
        "description": "Grouped options",
        "code": "<NativeSelect [(value)]='selectedCar'>\n  <option value=''>Select a car</option>\n  <optgroup label='Swedish Cars'>\n    <option value='volvo'>Volvo</option>\n    <option value='saab'>Saab</option>\n  </optgroup>\n  <optgroup label='German Cars'>\n    <option value='mercedes'>Mercedes</option>\n    <option value='audi'>Audi</option>\n  </optgroup>\n</NativeSelect>"
      },
      {
        "title": "Disabled Native Select",
        "description": "Select in disabled state",
        "code": "<NativeSelect disabled>\n  <option value=''>Select an option</option>\n  <option value='1'>Option 1</option>\n  <option value='2'>Option 2</option>\n</NativeSelect>"
      },
      {
        "title": "Native Select in Form",
        "description": "Native select with form field",
        "code": "<div class='grid gap-2'>\n  <Label for='country'>Country</Label>\n  <NativeSelect id='country' [(value)]='country'>\n    <option value=''>Select a country</option>\n    <option value='us'>United States</option>\n    <option value='uk'>United Kingdom</option>\n    <option value='ca'>Canada</option>\n    <option value='au'>Australia</option>\n  </NativeSelect>\n</div>"
      }
    ],
    "relatedComponents": ["Select", "Combobox", "Form", "Label"],
    "installation": {
      "npm": "npm install @ng-cn/native-select",
      "pnpm": "pnpm add @ng-cn/native-select",
      "yarn": "yarn add @ng-cn/native-select",
      "bun": "bun add @ng-cn/native-select",
      "ngAdd": "ng g @ng-cn/core:c native-select",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/native-select directory",
          "Copy component files from the library",
          "Import NativeSelect in your component"
        ],
        "files": [
          "src/app/lib/components/ui/native-select/native-select.component.ts"
        ]
      }
    },
    "usage": "import { NativeSelect } from '@/lib/components/ui/native-select';\n\n"
  },
  {
    "name": "Segmented",
    "selector": "Segmented",
    "package": "@ng-cn/segmented",
    "description": "iOS-style segmented control buttons.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "defaultValue",
        "type": "string",
        "description": "The default selected value.",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "description": "The controlled value.",
        "required": false
      },
      {
        "name": "size",
        "type": "string",
        "default": "default",
        "description": "Size: sm | default | lg",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "description": "Whether the segmented control is disabled.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "EventEmitter<string>",
        "description": "Emitted when the selected value changes."
      }
    ],
    "variants": [
      {
        "name": "size",
        "values": ["sm", "default", "lg"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Segmented Control",
        "description": "Simple segmented control",
        "code": "<Segmented defaultValue='all'>\n  <SegmentedItem value='all'>All</SegmentedItem>\n  <SegmentedItem value='unread'>Unread</SegmentedItem>\n  <SegmentedItem value='starred'>Starred</SegmentedItem>\n</Segmented>"
      },
      {
        "title": "Controlled Segmented",
        "description": "Segmented with two-way binding",
        "code": "<Segmented [(value)]='view'>\n  <SegmentedItem value='list'>\n    <List class='h-4 w-4' />\n  </SegmentedItem>\n  <SegmentedItem value='grid'>\n    <Grid class='h-4 w-4' />\n  </SegmentedItem>\n  <SegmentedItem value='kanban'>\n    <Columns class='h-4 w-4' />\n  </SegmentedItem>\n</Segmented>\n\n<p class='text-sm text-muted-foreground'>View: {{ view }}</p>"
      },
      {
        "title": "Segmented with Icons and Text",
        "description": "Segmented items with icons and labels",
        "code": "<Segmented [(value)]='period'>\n  <SegmentedItem value='day'>\n    <CalendarDays class='h-4 w-4 mr-2' />\n    Day\n  </SegmentedItem>\n  <SegmentedItem value='week'>\n    <CalendarRange class='h-4 w-4 mr-2' />\n    Week\n  </SegmentedItem>\n  <SegmentedItem value='month'>\n    <Calendar class='h-4 w-4 mr-2' />\n    Month\n  </SegmentedItem>\n</Segmented>"
      },
      {
        "title": "Segmented Sizes",
        "description": "Different sizes of segmented control",
        "code": "<div class='space-y-4'>\n  <Segmented size='sm' defaultValue='1'>\n    <SegmentedItem value='1'>Small</SegmentedItem>\n    <SegmentedItem value='2'>Control</SegmentedItem>\n  </Segmented>\n  <Segmented size='default' defaultValue='1'>\n    <SegmentedItem value='1'>Default</SegmentedItem>\n    <SegmentedItem value='2'>Control</SegmentedItem>\n  </Segmented>\n  <Segmented size='lg' defaultValue='1'>\n    <SegmentedItem value='1'>Large</SegmentedItem>\n    <SegmentedItem value='2'>Control</SegmentedItem>\n  </Segmented>\n</div>"
      }
    ],
    "relatedComponents": ["Toggle Group", "Radio Group", "Tabs"],
    "installation": {
      "npm": "npm install @ng-cn/segmented",
      "pnpm": "pnpm add @ng-cn/segmented",
      "yarn": "yarn add @ng-cn/segmented",
      "bun": "bun add @ng-cn/segmented",
      "ngAdd": "ng g @ng-cn/core:c segmented",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/segmented directory",
          "Copy component files from the library",
          "Import Segmented in your component"
        ],
        "files": [
          "src/app/lib/components/ui/segmented/segmented.component.ts"
        ]
      }
    },
    "usage": "import { Segmented, SegmentedItem } from '@/lib/components/ui/segmented';\n\n"
  },
  {
    "name": "Sidebar",
    "selector": "Sidebar",
    "package": "@ng-cn/sidebar",
    "description": "A composable, themeable and customizable sidebar component.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "side",
        "type": "string",
        "default": "left",
        "description": "Side of the sidebar: left | right",
        "required": false
      },
      {
        "name": "variant",
        "type": "string",
        "default": "sidebar",
        "description": "Variant: sidebar | floating | inset",
        "required": false
      },
      {
        "name": "collapsible",
        "type": "string",
        "default": "offcanvas",
        "description": "Collapsible mode: offcanvas | icon | none",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "side",
        "values": ["left", "right"],
        "default": "left"
      },
      {
        "name": "variant",
        "values": ["sidebar", "floating", "inset"],
        "default": "sidebar"
      },
      {
        "name": "collapsible",
        "values": ["offcanvas", "icon", "none"],
        "default": "offcanvas"
      }
    ],
    "examples": [
      {
        "title": "Basic Sidebar",
        "description": "Sidebar with navigation",
        "code": "<SidebarProvider>\n  <Sidebar>\n    <SidebarHeader>\n      <SidebarMenu>\n        <SidebarMenuItem>\n          <SidebarMenuButton size='lg'>\n            <Package class='h-6 w-6' />\n            <span>Acme Inc</span>\n          </SidebarMenuButton>\n        </SidebarMenuItem>\n      </SidebarMenu>\n    </SidebarHeader>\n    <SidebarContent>\n      <SidebarGroup>\n        <SidebarGroupLabel>Platform</SidebarGroupLabel>\n        <SidebarGroupContent>\n          <SidebarMenu>\n            @for (item of navItems; track item.title) {\n              <SidebarMenuItem>\n                <SidebarMenuButton>\n                  <lucide-icon [img]='item.icon' />\n                  <span>{{ item.title }}</span>\n                </SidebarMenuButton>\n              </SidebarMenuItem>\n            }\n          </SidebarMenu>\n        </SidebarGroupContent>\n      </SidebarGroup>\n    </SidebarContent>\n    <SidebarFooter>\n      <SidebarMenu>\n        <SidebarMenuItem>\n          <SidebarMenuButton>\n            <User class='h-4 w-4' />\n            <span>Profile</span>\n          </SidebarMenuButton>\n        </SidebarMenuItem>\n      </SidebarMenu>\n    </SidebarFooter>\n  </Sidebar>\n  <SidebarInset>\n    <header class='flex h-16 items-center gap-4 border-b px-4'>\n      <SidebarTrigger />\n      <span class='font-semibold'>Dashboard</span>\n    </header>\n    <main class='p-4'>\n      <!-- Content -->\n    </main>\n  </SidebarInset>\n</SidebarProvider>"
      },
      {
        "title": "Collapsible Sidebar",
        "description": "Sidebar that collapses to icons",
        "code": "<SidebarProvider>\n  <Sidebar collapsible='icon'>\n    <SidebarHeader>\n      <SidebarMenu>\n        <SidebarMenuItem>\n          <SidebarMenuButton size='lg'>\n            <Package class='h-6 w-6' />\n            <span>Acme</span>\n          </SidebarMenuButton>\n        </SidebarMenuItem>\n      </SidebarMenu>\n    </SidebarHeader>\n    <SidebarContent>\n      <SidebarGroup>\n        <SidebarMenu>\n          <SidebarMenuItem>\n            <SidebarMenuButton tooltip='Dashboard'>\n              <Home class='h-4 w-4' />\n              <span>Dashboard</span>\n            </SidebarMenuButton>\n          </SidebarMenuItem>\n          <SidebarMenuItem>\n            <SidebarMenuButton tooltip='Settings'>\n              <Settings class='h-4 w-4' />\n              <span>Settings</span>\n            </SidebarMenuButton>\n          </SidebarMenuItem>\n        </SidebarMenu>\n      </SidebarGroup>\n    </SidebarContent>\n  </Sidebar>\n  <SidebarInset>\n    <!-- Content -->\n  </SidebarInset>\n</SidebarProvider>"
      },
      {
        "title": "Sidebar with Nested Menu",
        "description": "Sidebar with collapsible sub-menus",
        "code": "<SidebarGroup>\n  <SidebarGroupLabel>Platform</SidebarGroupLabel>\n  <SidebarMenu>\n    <Collapsible class='group/collapsible'>\n      <SidebarMenuItem>\n        <CollapsibleTrigger asChild>\n          <SidebarMenuButton>\n            <Settings class='h-4 w-4' />\n            <span>Settings</span>\n            <ChevronRight class='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />\n          </SidebarMenuButton>\n        </CollapsibleTrigger>\n        <CollapsibleContent>\n          <SidebarMenuSub>\n            <SidebarMenuSubItem>\n              <SidebarMenuSubButton>General</SidebarMenuSubButton>\n            </SidebarMenuSubItem>\n            <SidebarMenuSubItem>\n              <SidebarMenuSubButton>Security</SidebarMenuSubButton>\n            </SidebarMenuSubItem>\n            <SidebarMenuSubItem>\n              <SidebarMenuSubButton>Notifications</SidebarMenuSubButton>\n            </SidebarMenuSubItem>\n          </SidebarMenuSub>\n        </CollapsibleContent>\n      </SidebarMenuItem>\n    </Collapsible>\n  </SidebarMenu>\n</SidebarGroup>"
      }
    ],
    "relatedComponents": ["Navigation Menu", "Collapsible", "Sheet", "Resizable"],
    "installation": {
      "npm": "npm install @ng-cn/sidebar",
      "pnpm": "pnpm add @ng-cn/sidebar",
      "yarn": "yarn add @ng-cn/sidebar",
      "bun": "bun add @ng-cn/sidebar",
      "ngAdd": "ng g @ng-cn/core:c sidebar",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/sidebar directory",
          "Copy component files from the library",
          "Import SidebarProvider in your component"
        ],
        "files": [
          "src/app/lib/components/ui/sidebar/sidebar.component.ts"
        ]
      }
    },
    "usage": "import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/lib/components/ui/sidebar';\n\n"
  },
  {
    "name": "Spinner",
    "selector": "Spinner",
    "package": "@ng-cn/spinner",
    "description": "Loading indicator animations.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "size",
        "type": "string",
        "default": "default",
        "description": "Size: sm | default | lg",
        "required": false
      },
      {
        "name": "variant",
        "type": "string",
        "default": "default",
        "description": "Style variant: default | dots | bars",
        "required": false
      },
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "variants": [
      {
        "name": "size",
        "values": ["sm", "default", "lg"],
        "default": "default"
      },
      {
        "name": "variant",
        "values": ["default", "dots", "bars"],
        "default": "default"
      }
    ],
    "examples": [
      {
        "title": "Basic Spinner",
        "description": "Default loading spinner",
        "code": "<Spinner />"
      },
      {
        "title": "Spinner Sizes",
        "description": "Different spinner sizes",
        "code": "<div class='flex items-center gap-4'>\n  <Spinner size='sm' />\n  <Spinner size='default' />\n  <Spinner size='lg' />\n</div>"
      },
      {
        "title": "Spinner in Button",
        "description": "Loading state in button",
        "code": "<Button disabled>\n  <Spinner class='mr-2 h-4 w-4' />\n  Please wait\n</Button>"
      },
      {
        "title": "Full Page Loading",
        "description": "Centered spinner for page loading",
        "code": "<div class='flex h-[200px] w-full items-center justify-center'>\n  <div class='flex flex-col items-center gap-2'>\n    <Spinner size='lg' />\n    <p class='text-sm text-muted-foreground'>Loading...</p>\n  </div>\n</div>"
      },
      {
        "title": "Spinner with Overlay",
        "description": "Loading overlay for content",
        "code": "<div class='relative'>\n  <Card>\n    <CardHeader>\n      <CardTitle>Content</CardTitle>\n    </CardHeader>\n    <CardContent>\n      <p>Some content here...</p>\n    </CardContent>\n  </Card>\n  @if (isLoading) {\n    <div class='absolute inset-0 flex items-center justify-center bg-background/80'>\n      <Spinner />\n    </div>\n  }\n</div>"
      }
    ],
    "relatedComponents": ["Button", "Progress", "Skeleton"],
    "installation": {
      "npm": "npm install @ng-cn/spinner",
      "pnpm": "pnpm add @ng-cn/spinner",
      "yarn": "yarn add @ng-cn/spinner",
      "bun": "bun add @ng-cn/spinner",
      "ngAdd": "ng g @ng-cn/core:c spinner",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/spinner directory",
          "Copy component files from the library",
          "Import Spinner in your component"
        ],
        "files": [
          "src/app/lib/components/ui/spinner/spinner.component.ts"
        ]
      }
    },
    "usage": "import { Spinner } from '@/lib/components/ui/spinner';\n\n"
  },
  {
    "name": "Typography",
    "selector": "Typography",
    "package": "@ng-cn/typography",
    "description": "Text styling components.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [
      {
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Heading Components",
        "description": "Various heading sizes",
        "code": "<H1>This is an H1 heading</H1>\n<H2>This is an H2 heading</H2>\n<H3>This is an H3 heading</H3>\n<H4>This is an H4 heading</H4>"
      },
      {
        "title": "Paragraph and Text",
        "description": "Body text components",
        "code": "<P>\n  The king, seeing how much happier his subjects were, realized the error\n  of his ways and promised to rule with wisdom and kindness.\n</P>\n<Lead>\n  A modal dialog that interrupts the user with important content and expects\n  a response.\n</Lead>"
      },
      {
        "title": "Text Variants",
        "description": "Large, small, and muted text",
        "code": "<Large>Are you absolutely sure?</Large>\n<Small>Email address</Small>\n<Muted>Enter your email address.</Muted>"
      },
      {
        "title": "Complete Typography Example",
        "description": "Full typography showcase",
        "code": "<article class='prose dark:prose-invert'>\n  <H1>The Joke Tax Chronicles</H1>\n  <Lead>\n    Once upon a time, in a kingdom full of laughter, there lived a king who\n    loved jokes more than anything else.\n  </Lead>\n  <H2>The People of the Kingdom</H2>\n  <P>\n    The king's subjects were known for their wit and humor. They would gather\n    in the town square to share their best jokes.\n  </P>\n  <H3>The Royal Decree</H3>\n  <P>\n    One day, the king decided that every joke must be taxed. This led to\n    hilarious consequences as people tried to make their jokes tax-free.\n  </P>\n  <blockquote class='border-l-2 pl-6 italic'>\n    \"After all,\" he said, \"everyone enjoys a good joke.\"\n  </blockquote>\n  <Muted>This story is fictional and for demonstration purposes only.</Muted>\n</article>"
      },
      {
        "title": "Inline Code",
        "description": "Code text styling",
        "code": "<P>\n  The <InlineCode>Dialog</InlineCode> component is used to create modal dialogs.\n  You can also use <InlineCode>AlertDialog</InlineCode> for confirmation prompts.\n</P>"
      }
    ],
    "relatedComponents": ["Card", "Alert", "Badge"],
    "installation": {
      "npm": "npm install @ng-cn/typography",
      "pnpm": "pnpm add @ng-cn/typography",
      "yarn": "yarn add @ng-cn/typography",
      "bun": "bun add @ng-cn/typography",
      "ngAdd": "ng g @ng-cn/core:c typography",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/typography directory",
          "Copy component files from the library",
          "Import H1 in your component"
        ],
        "files": [
          "src/app/lib/components/ui/typography/typography.component.ts"
        ]
      }
    },
    "usage": "import { H1, H2, H3, H4, P, Lead, Large, Small, Muted } from '@/lib/components/ui/typography';\n\n"
  }
];

export const componentCategories: Record<string, string> = {
  basic: 'Basic Components',
  form: 'Form Components',
  layout: 'Layout Components',
  overlay: 'Overlay Components',
  complex: 'Complex Components',
  advanced: 'Advanced Components',
};

export function getComponent(nameOrSelector: string): ComponentMetadata | undefined {
  const lowerName = nameOrSelector.toLowerCase();
  return componentsData.find(
    (c) =>
      c.name.toLowerCase() === lowerName ||
      c.selector.toLowerCase() === lowerName ||
      c.package.toLowerCase() === `@ng-cn/${lowerName}`
  );
}

export function searchComponents(query?: string, category?: string): ComponentMetadata[] {
  let results = componentsData;

  if (category) {
    results = results.filter((c) => c.category === category);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.selector.toLowerCase().includes(lowerQuery)
    );
  }

  return results;
}
