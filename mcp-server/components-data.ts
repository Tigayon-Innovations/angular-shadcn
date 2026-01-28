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
    "examples": [],
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
    "examples": [],
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
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
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
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
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
      }
    ],
    "examples": [],
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
      "tailwind-merge"
    ],
    "inputs": [],
    "examples": [],
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
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [],
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
    "examples": [],
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
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [],
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
        "name": "class",
        "type": "string",
        "description": "Additional CSS classes.",
        "required": false
      }
    ],
    "examples": [],
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
      }
    ],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
    "inputs": [],
    "examples": [],
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
    "examples": [],
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
