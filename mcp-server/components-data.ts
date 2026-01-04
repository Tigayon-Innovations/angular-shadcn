/**
 * Component metadata for shadcn-angular MCP Server
 * Automatically generated from ComponentRegistry
 */

import { ComponentMetadata } from './types.js';

export const componentsData: ComponentMetadata[] = [
  {
    "name": "Aspect Ratio",
    "selector": "AspectRatio",
    "package": "@shadcn-angular/aspect-ratio",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/aspect-ratio",
      "pnpm": "pnpm add @shadcn-angular/aspect-ratio",
      "yarn": "yarn add @shadcn-angular/aspect-ratio",
      "bun": "bun add @shadcn-angular/aspect-ratio",
      "ngAdd": "ng add @shadcn-angular/aspect-ratio",
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
    "package": "@shadcn-angular/card",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/card",
      "pnpm": "pnpm add @shadcn-angular/card",
      "yarn": "yarn add @shadcn-angular/card",
      "bun": "bun add @shadcn-angular/card",
      "ngAdd": "ng add @shadcn-angular/card",
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
    "package": "@shadcn-angular/collapsible",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/collapsible",
      "pnpm": "pnpm add @shadcn-angular/collapsible",
      "yarn": "yarn add @shadcn-angular/collapsible",
      "bun": "bun add @shadcn-angular/collapsible",
      "ngAdd": "ng add @shadcn-angular/collapsible",
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
    "package": "@shadcn-angular/resizable",
    "description": "Resizable panel groups and panels.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/resizable",
      "pnpm": "pnpm add @shadcn-angular/resizable",
      "yarn": "yarn add @shadcn-angular/resizable",
      "bun": "bun add @shadcn-angular/resizable",
      "ngAdd": "ng add @shadcn-angular/resizable",
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
    "package": "@shadcn-angular/scroll-area",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/scroll-area",
      "pnpm": "pnpm add @shadcn-angular/scroll-area",
      "yarn": "yarn add @shadcn-angular/scroll-area",
      "bun": "bun add @shadcn-angular/scroll-area",
      "ngAdd": "ng add @shadcn-angular/scroll-area",
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
    "package": "@shadcn-angular/separator",
    "description": "Visually or semantically separates content.",
    "category": "layout",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/separator",
      "pnpm": "pnpm add @shadcn-angular/separator",
      "yarn": "yarn add @shadcn-angular/separator",
      "bun": "bun add @shadcn-angular/separator",
      "ngAdd": "ng add @shadcn-angular/separator",
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
    "package": "@shadcn-angular/accordion",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/accordion",
      "pnpm": "pnpm add @shadcn-angular/accordion",
      "yarn": "yarn add @shadcn-angular/accordion",
      "bun": "bun add @shadcn-angular/accordion",
      "ngAdd": "ng add @shadcn-angular/accordion",
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
    "package": "@shadcn-angular/breadcrumb",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/breadcrumb",
      "pnpm": "pnpm add @shadcn-angular/breadcrumb",
      "yarn": "yarn add @shadcn-angular/breadcrumb",
      "bun": "bun add @shadcn-angular/breadcrumb",
      "ngAdd": "ng add @shadcn-angular/breadcrumb",
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
    "package": "@shadcn-angular/context-menu",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/context-menu",
      "pnpm": "pnpm add @shadcn-angular/context-menu",
      "yarn": "yarn add @shadcn-angular/context-menu",
      "bun": "bun add @shadcn-angular/context-menu",
      "ngAdd": "ng add @shadcn-angular/context-menu",
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
    "package": "@shadcn-angular/dropdown-menu",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/dropdown-menu",
      "pnpm": "pnpm add @shadcn-angular/dropdown-menu",
      "yarn": "yarn add @shadcn-angular/dropdown-menu",
      "bun": "bun add @shadcn-angular/dropdown-menu",
      "ngAdd": "ng add @shadcn-angular/dropdown-menu",
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
    "package": "@shadcn-angular/menubar",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/menubar",
      "pnpm": "pnpm add @shadcn-angular/menubar",
      "yarn": "yarn add @shadcn-angular/menubar",
      "bun": "bun add @shadcn-angular/menubar",
      "ngAdd": "ng add @shadcn-angular/menubar",
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
    "package": "@shadcn-angular/navigation-menu",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/navigation-menu",
      "pnpm": "pnpm add @shadcn-angular/navigation-menu",
      "yarn": "yarn add @shadcn-angular/navigation-menu",
      "bun": "bun add @shadcn-angular/navigation-menu",
      "ngAdd": "ng add @shadcn-angular/navigation-menu",
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
    "package": "@shadcn-angular/pagination",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/pagination",
      "pnpm": "pnpm add @shadcn-angular/pagination",
      "yarn": "yarn add @shadcn-angular/pagination",
      "bun": "bun add @shadcn-angular/pagination",
      "ngAdd": "ng add @shadcn-angular/pagination",
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
    "package": "@shadcn-angular/tabs",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/tabs",
      "pnpm": "pnpm add @shadcn-angular/tabs",
      "yarn": "yarn add @shadcn-angular/tabs",
      "bun": "bun add @shadcn-angular/tabs",
      "ngAdd": "ng add @shadcn-angular/tabs",
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
    "package": "@shadcn-angular/button",
    "description": "Displays a button or a component that looks like a button.",
    "category": "form",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/button",
      "pnpm": "pnpm add @shadcn-angular/button",
      "yarn": "yarn add @shadcn-angular/button",
      "bun": "bun add @shadcn-angular/button",
      "ngAdd": "ng add @shadcn-angular/button",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/button directory",
          "Copy component files from the library",
          "Import Button in your component"
        ],
        "files": [
          "src/app/lib/components/ui/button/button.component.ts"
        ]
      }
    },
    "usage": "import { Button } from '@/lib/components/ui/button';\n\n"
  },
  {
    "name": "Checkbox",
    "selector": "Checkbox",
    "package": "@shadcn-angular/checkbox",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/checkbox",
      "pnpm": "pnpm add @shadcn-angular/checkbox",
      "yarn": "yarn add @shadcn-angular/checkbox",
      "bun": "bun add @shadcn-angular/checkbox",
      "ngAdd": "ng add @shadcn-angular/checkbox",
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
    "package": "@shadcn-angular/combobox",
    "description": "Autocomplete input and command palette with a list of suggestions.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/combobox",
      "pnpm": "pnpm add @shadcn-angular/combobox",
      "yarn": "yarn add @shadcn-angular/combobox",
      "bun": "bun add @shadcn-angular/combobox",
      "ngAdd": "ng add @shadcn-angular/combobox",
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
    "package": "@shadcn-angular/date-picker",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/date-picker",
      "pnpm": "pnpm add @shadcn-angular/date-picker",
      "yarn": "yarn add @shadcn-angular/date-picker",
      "bun": "bun add @shadcn-angular/date-picker",
      "ngAdd": "ng add @shadcn-angular/date-picker",
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
    "package": "@shadcn-angular/form",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/form",
      "pnpm": "pnpm add @shadcn-angular/form",
      "yarn": "yarn add @shadcn-angular/form",
      "bun": "bun add @shadcn-angular/form",
      "ngAdd": "ng add @shadcn-angular/form",
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
    "package": "@shadcn-angular/input",
    "description": "Displays a form input field.",
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
        "description": "Whether the input is disabled.",
        "required": false
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/input",
      "pnpm": "pnpm add @shadcn-angular/input",
      "yarn": "yarn add @shadcn-angular/input",
      "bun": "bun add @shadcn-angular/input",
      "ngAdd": "ng add @shadcn-angular/input",
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
    "package": "@shadcn-angular/input-otp",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/input-otp",
      "pnpm": "pnpm add @shadcn-angular/input-otp",
      "yarn": "yarn add @shadcn-angular/input-otp",
      "bun": "bun add @shadcn-angular/input-otp",
      "ngAdd": "ng add @shadcn-angular/input-otp",
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
    "package": "@shadcn-angular/label",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/label",
      "pnpm": "pnpm add @shadcn-angular/label",
      "yarn": "yarn add @shadcn-angular/label",
      "bun": "bun add @shadcn-angular/label",
      "ngAdd": "ng add @shadcn-angular/label",
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
    "package": "@shadcn-angular/radio-group",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/radio-group",
      "pnpm": "pnpm add @shadcn-angular/radio-group",
      "yarn": "yarn add @shadcn-angular/radio-group",
      "bun": "bun add @shadcn-angular/radio-group",
      "ngAdd": "ng add @shadcn-angular/radio-group",
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
    "package": "@shadcn-angular/select",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/select",
      "pnpm": "pnpm add @shadcn-angular/select",
      "yarn": "yarn add @shadcn-angular/select",
      "bun": "bun add @shadcn-angular/select",
      "ngAdd": "ng add @shadcn-angular/select",
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
    "package": "@shadcn-angular/slider",
    "description": "An input where the user selects a value from within a given range.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/slider",
      "pnpm": "pnpm add @shadcn-angular/slider",
      "yarn": "yarn add @shadcn-angular/slider",
      "bun": "bun add @shadcn-angular/slider",
      "ngAdd": "ng add @shadcn-angular/slider",
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
    "package": "@shadcn-angular/switch",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/switch",
      "pnpm": "pnpm add @shadcn-angular/switch",
      "yarn": "yarn add @shadcn-angular/switch",
      "bun": "bun add @shadcn-angular/switch",
      "ngAdd": "ng add @shadcn-angular/switch",
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
    "package": "@shadcn-angular/textarea",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/textarea",
      "pnpm": "pnpm add @shadcn-angular/textarea",
      "yarn": "yarn add @shadcn-angular/textarea",
      "bun": "bun add @shadcn-angular/textarea",
      "ngAdd": "ng add @shadcn-angular/textarea",
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
    "package": "@shadcn-angular/toggle",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/toggle",
      "pnpm": "pnpm add @shadcn-angular/toggle",
      "yarn": "yarn add @shadcn-angular/toggle",
      "bun": "bun add @shadcn-angular/toggle",
      "ngAdd": "ng add @shadcn-angular/toggle",
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
    "package": "@shadcn-angular/toggle-group",
    "description": "A set of two-state buttons that can be toggled on or off.",
    "category": "form",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/toggle-group",
      "pnpm": "pnpm add @shadcn-angular/toggle-group",
      "yarn": "yarn add @shadcn-angular/toggle-group",
      "bun": "bun add @shadcn-angular/toggle-group",
      "ngAdd": "ng add @shadcn-angular/toggle-group",
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
    "package": "@shadcn-angular/alert",
    "description": "Displays a callout for user attention.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/alert",
      "pnpm": "pnpm add @shadcn-angular/alert",
      "yarn": "yarn add @shadcn-angular/alert",
      "bun": "bun add @shadcn-angular/alert",
      "ngAdd": "ng add @shadcn-angular/alert",
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
    "usage": "import { Alert, AlertTitle, AlertDescription } from '@/lib/components/ui/alert';\n\n"
  },
  {
    "name": "Alert Dialog",
    "selector": "AlertDialog",
    "package": "@shadcn-angular/alert-dialog",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/alert-dialog",
      "pnpm": "pnpm add @shadcn-angular/alert-dialog",
      "yarn": "yarn add @shadcn-angular/alert-dialog",
      "bun": "bun add @shadcn-angular/alert-dialog",
      "ngAdd": "ng add @shadcn-angular/alert-dialog",
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
    "package": "@shadcn-angular/dialog",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/dialog",
      "pnpm": "pnpm add @shadcn-angular/dialog",
      "yarn": "yarn add @shadcn-angular/dialog",
      "bun": "bun add @shadcn-angular/dialog",
      "ngAdd": "ng add @shadcn-angular/dialog",
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
    "usage": "import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/lib/components/ui/dialog';\n\n"
  },
  {
    "name": "Drawer",
    "selector": "Drawer",
    "package": "@shadcn-angular/drawer",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/drawer",
      "pnpm": "pnpm add @shadcn-angular/drawer",
      "yarn": "yarn add @shadcn-angular/drawer",
      "bun": "bun add @shadcn-angular/drawer",
      "ngAdd": "ng add @shadcn-angular/drawer",
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
    "package": "@shadcn-angular/hover-card",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/hover-card",
      "pnpm": "pnpm add @shadcn-angular/hover-card",
      "yarn": "yarn add @shadcn-angular/hover-card",
      "bun": "bun add @shadcn-angular/hover-card",
      "ngAdd": "ng add @shadcn-angular/hover-card",
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
    "package": "@shadcn-angular/popover",
    "description": "Displays rich content in a portal, triggered by a button.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/popover",
      "pnpm": "pnpm add @shadcn-angular/popover",
      "yarn": "yarn add @shadcn-angular/popover",
      "bun": "bun add @shadcn-angular/popover",
      "ngAdd": "ng add @shadcn-angular/popover",
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
    "package": "@shadcn-angular/progress",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/progress",
      "pnpm": "pnpm add @shadcn-angular/progress",
      "yarn": "yarn add @shadcn-angular/progress",
      "bun": "bun add @shadcn-angular/progress",
      "ngAdd": "ng add @shadcn-angular/progress",
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
    "package": "@shadcn-angular/sheet",
    "description": "Extends the Dialog component to display content that complements the main content.",
    "category": "overlay",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/sheet",
      "pnpm": "pnpm add @shadcn-angular/sheet",
      "yarn": "yarn add @shadcn-angular/sheet",
      "bun": "bun add @shadcn-angular/sheet",
      "ngAdd": "ng add @shadcn-angular/sheet",
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
    "package": "@shadcn-angular/skeleton",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/skeleton",
      "pnpm": "pnpm add @shadcn-angular/skeleton",
      "yarn": "yarn add @shadcn-angular/skeleton",
      "bun": "bun add @shadcn-angular/skeleton",
      "ngAdd": "ng add @shadcn-angular/skeleton",
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
    "package": "@shadcn-angular/toast",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/toast",
      "pnpm": "pnpm add @shadcn-angular/toast",
      "yarn": "yarn add @shadcn-angular/toast",
      "bun": "bun add @shadcn-angular/toast",
      "ngAdd": "ng add @shadcn-angular/toast",
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
    "package": "@shadcn-angular/tooltip",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/tooltip",
      "pnpm": "pnpm add @shadcn-angular/tooltip",
      "yarn": "yarn add @shadcn-angular/tooltip",
      "bun": "bun add @shadcn-angular/tooltip",
      "ngAdd": "ng add @shadcn-angular/tooltip",
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
    "package": "@shadcn-angular/avatar",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/avatar",
      "pnpm": "pnpm add @shadcn-angular/avatar",
      "yarn": "yarn add @shadcn-angular/avatar",
      "bun": "bun add @shadcn-angular/avatar",
      "ngAdd": "ng add @shadcn-angular/avatar",
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
    "package": "@shadcn-angular/badge",
    "description": "Displays a badge or a component that looks like a badge.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/badge",
      "pnpm": "pnpm add @shadcn-angular/badge",
      "yarn": "yarn add @shadcn-angular/badge",
      "bun": "bun add @shadcn-angular/badge",
      "ngAdd": "ng add @shadcn-angular/badge",
      "manual": {
        "description": "Manually copy the component files to your project",
        "steps": [
          "Create src/app/lib/components/ui/badge directory",
          "Copy component files from the library",
          "Import Badge in your component"
        ],
        "files": [
          "src/app/lib/components/ui/badge/badge.component.ts"
        ]
      }
    },
    "usage": "import { Badge } from '@/lib/components/ui/badge';\n\n"
  },
  {
    "name": "Calendar",
    "selector": "Calendar",
    "package": "@shadcn-angular/calendar",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/calendar",
      "pnpm": "pnpm add @shadcn-angular/calendar",
      "yarn": "yarn add @shadcn-angular/calendar",
      "bun": "bun add @shadcn-angular/calendar",
      "ngAdd": "ng add @shadcn-angular/calendar",
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
    "package": "@shadcn-angular/carousel",
    "description": "A carousel with motion and swipe built using Embla.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/carousel",
      "pnpm": "pnpm add @shadcn-angular/carousel",
      "yarn": "yarn add @shadcn-angular/carousel",
      "bun": "bun add @shadcn-angular/carousel",
      "ngAdd": "ng add @shadcn-angular/carousel",
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
    "package": "@shadcn-angular/chart",
    "description": "Beautiful charts built with SVG.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/chart",
      "pnpm": "pnpm add @shadcn-angular/chart",
      "yarn": "yarn add @shadcn-angular/chart",
      "bun": "bun add @shadcn-angular/chart",
      "ngAdd": "ng add @shadcn-angular/chart",
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
    "package": "@shadcn-angular/command",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/command",
      "pnpm": "pnpm add @shadcn-angular/command",
      "yarn": "yarn add @shadcn-angular/command",
      "bun": "bun add @shadcn-angular/command",
      "ngAdd": "ng add @shadcn-angular/command",
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
    "package": "@shadcn-angular/data-table",
    "description": "Powerful table and datagrids.",
    "category": "complex",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/data-table",
      "pnpm": "pnpm add @shadcn-angular/data-table",
      "yarn": "yarn add @shadcn-angular/data-table",
      "bun": "bun add @shadcn-angular/data-table",
      "ngAdd": "ng add @shadcn-angular/data-table",
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
    "package": "@shadcn-angular/table",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/table",
      "pnpm": "pnpm add @shadcn-angular/table",
      "yarn": "yarn add @shadcn-angular/table",
      "bun": "bun add @shadcn-angular/table",
      "ngAdd": "ng add @shadcn-angular/table",
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
    "package": "@shadcn-angular/button-group",
    "description": "Groups multiple buttons together.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/button-group",
      "pnpm": "pnpm add @shadcn-angular/button-group",
      "yarn": "yarn add @shadcn-angular/button-group",
      "bun": "bun add @shadcn-angular/button-group",
      "ngAdd": "ng add @shadcn-angular/button-group",
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
    "package": "@shadcn-angular/empty",
    "description": "Empty state placeholder component.",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/empty",
      "pnpm": "pnpm add @shadcn-angular/empty",
      "yarn": "yarn add @shadcn-angular/empty",
      "bun": "bun add @shadcn-angular/empty",
      "ngAdd": "ng add @shadcn-angular/empty",
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
    "package": "@shadcn-angular/input-group",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/input-group",
      "pnpm": "pnpm add @shadcn-angular/input-group",
      "yarn": "yarn add @shadcn-angular/input-group",
      "bun": "bun add @shadcn-angular/input-group",
      "ngAdd": "ng add @shadcn-angular/input-group",
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
    "package": "@shadcn-angular/kbd",
    "description": "Keyboard key indicator component.",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/kbd",
      "pnpm": "pnpm add @shadcn-angular/kbd",
      "yarn": "yarn add @shadcn-angular/kbd",
      "bun": "bun add @shadcn-angular/kbd",
      "ngAdd": "ng add @shadcn-angular/kbd",
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
    "package": "@shadcn-angular/native-select",
    "description": "HTML native select with styling.",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/native-select",
      "pnpm": "pnpm add @shadcn-angular/native-select",
      "yarn": "yarn add @shadcn-angular/native-select",
      "bun": "bun add @shadcn-angular/native-select",
      "ngAdd": "ng add @shadcn-angular/native-select",
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
    "package": "@shadcn-angular/segmented",
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
      }
    ],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/segmented",
      "pnpm": "pnpm add @shadcn-angular/segmented",
      "yarn": "yarn add @shadcn-angular/segmented",
      "bun": "bun add @shadcn-angular/segmented",
      "ngAdd": "ng add @shadcn-angular/segmented",
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
    "package": "@shadcn-angular/sidebar",
    "description": "A composable, themeable and customizable sidebar component.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/sidebar",
      "pnpm": "pnpm add @shadcn-angular/sidebar",
      "yarn": "yarn add @shadcn-angular/sidebar",
      "bun": "bun add @shadcn-angular/sidebar",
      "ngAdd": "ng add @shadcn-angular/sidebar",
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
    "package": "@shadcn-angular/spinner",
    "description": "Loading indicator animations.",
    "category": "advanced",
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/spinner",
      "pnpm": "pnpm add @shadcn-angular/spinner",
      "yarn": "yarn add @shadcn-angular/spinner",
      "bun": "bun add @shadcn-angular/spinner",
      "ngAdd": "ng add @shadcn-angular/spinner",
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
    "package": "@shadcn-angular/typography",
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
    "examples": [],
    "installation": {
      "npm": "npm install @shadcn-angular/typography",
      "pnpm": "pnpm add @shadcn-angular/typography",
      "yarn": "yarn add @shadcn-angular/typography",
      "bun": "bun add @shadcn-angular/typography",
      "ngAdd": "ng add @shadcn-angular/typography",
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
      c.package.toLowerCase() === `@shadcn-angular/${lowerName}`
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
