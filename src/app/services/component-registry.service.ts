import type { ApiProperty } from '@/components/api-reference';
import { Injectable } from '@angular/core';

export type ComponentCategory =
  | 'layout'
  | 'navigation'
  | 'forms'
  | 'feedback'
  | 'data-display'
  | 'extended';

export interface ComponentInfo {
  name: string;
  slug: string;
  description: string;
  category: ComponentCategory;
  imports: string[];
  examples: ComponentExample[];
  props: ApiProperty[];
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
}

/**
 * Registry service containing metadata for all 57 components.
 */
@Injectable({ providedIn: 'root' })
export class ComponentRegistry {
  private readonly components: ComponentInfo[] = [
    // Layout Components
    {
      name: 'Aspect Ratio',
      slug: 'aspect-ratio',
      description: 'Displays content within a desired ratio.',
      category: 'layout',
      imports: ['AspectRatio'],
      examples: [
        {
          title: 'Basic',
          code: `<AspectRatio [ratio]="16 / 9" class="bg-muted">
  <img src="/image.jpg" alt="Image" class="rounded-md object-cover" />
</AspectRatio>`,
        },
      ],
      props: [
        { name: 'ratio', type: 'number', default: '1', description: 'The desired aspect ratio.' },
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Card',
      slug: 'card',
      description: 'Displays a card with header, content, and footer.',
      category: 'layout',
      imports: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
      examples: [
        {
          title: 'Basic',
          code: `<Card>
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
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Collapsible',
      slug: 'collapsible',
      description: 'An interactive component which expands/collapses a panel.',
      category: 'layout',
      imports: ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'],
      examples: [
        {
          title: 'Basic',
          code: `<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Content that can be expanded or collapsed.
  </CollapsibleContent>
</Collapsible>`,
        },
      ],
      props: [
        { name: 'open', type: 'boolean', default: 'false', description: 'Whether the collapsible is open.' },
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Resizable',
      slug: 'resizable',
      description: 'Resizable panel groups and panels.',
      category: 'layout',
      imports: ['ResizablePanelGroup', 'ResizablePanel', 'ResizableHandle'],
      examples: [
        {
          title: 'Basic',
          code: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>Panel 1</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Panel 2</ResizablePanel>
</ResizablePanelGroup>`,
        },
      ],
      props: [
        { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The direction of the panels.' },
      ],
    },
    {
      name: 'Scroll Area',
      slug: 'scroll-area',
      description: 'Augments native scroll functionality for custom styling.',
      category: 'layout',
      imports: ['ScrollArea', 'ScrollBar'],
      examples: [
        {
          title: 'Basic',
          code: `<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <!-- Scrollable content -->
  </div>
</ScrollArea>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Separator',
      slug: 'separator',
      description: 'Visually or semantically separates content.',
      category: 'layout',
      imports: ['Separator'],
      examples: [
        {
          title: 'Basic',
          code: `<div>
  <p>Content above</p>
  <Separator class="my-4" />
  <p>Content below</p>
</div>`,
        },
      ],
      props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The orientation of the separator.' },
      ],
    },

    // Navigation Components
    {
      name: 'Accordion',
      slug: 'accordion',
      description: 'A vertically stacked set of interactive headings.',
      category: 'navigation',
      imports: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
      examples: [
        {
          title: 'Basic',
          code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
      ],
      props: [
        { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Whether one or multiple items can be opened.' },
        { name: 'collapsible', type: 'boolean', default: 'false', description: 'When type is single, allows closing content when clicking trigger of an open item.' },
      ],
    },
    {
      name: 'Breadcrumb',
      slug: 'breadcrumb',
      description: 'Displays the path to the current resource.',
      category: 'navigation',
      imports: ['Breadcrumb', 'BreadcrumbList', 'BreadcrumbItem', 'BreadcrumbLink', 'BreadcrumbPage', 'BreadcrumbSeparator'],
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
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Context Menu',
      slug: 'context-menu',
      description: 'Displays a menu to the user on right click.',
      category: 'navigation',
      imports: ['ContextMenu', 'ContextMenuTrigger', 'ContextMenuContent', 'ContextMenuItem'],
      examples: [
        {
          title: 'Basic',
          code: `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Settings</ContextMenuItem>
    <ContextMenuItem>Logout</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Dropdown Menu',
      slug: 'dropdown-menu',
      description: 'Displays a menu when triggered.',
      category: 'navigation',
      imports: ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem'],
      examples: [
        {
          title: 'Basic',
          code: `<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Menubar',
      slug: 'menubar',
      description: 'A visually persistent menu common in desktop applications.',
      category: 'navigation',
      imports: ['Menubar', 'MenubarMenu', 'MenubarTrigger', 'MenubarContent', 'MenubarItem'],
      examples: [
        {
          title: 'Basic',
          code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab</MenubarItem>
      <MenubarItem>New Window</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Navigation Menu',
      slug: 'navigation-menu',
      description: 'A collection of links for navigating websites.',
      category: 'navigation',
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
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Pagination',
      slug: 'pagination',
      description: 'Pagination with page navigation, next and previous links.',
      category: 'navigation',
      imports: ['Pagination', 'PaginationContent', 'PaginationItem', 'PaginationLink', 'PaginationPrevious', 'PaginationNext'],
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
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Tabs',
      slug: 'tabs',
      description: 'A set of layered sections of content.',
      category: 'navigation',
      imports: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
      examples: [
        {
          title: 'Basic',
          code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings here.</TabsContent>
  <TabsContent value="password">Password settings here.</TabsContent>
</Tabs>`,
        },
      ],
      props: [
        { name: 'defaultValue', type: 'string', description: 'The value of the tab that should be active by default.' },
      ],
    },

    // Form Components
    {
      name: 'Button',
      slug: 'button',
      description: 'Displays a button or a component that looks like a button.',
      category: 'forms',
      imports: ['Button'],
      examples: [
        {
          title: 'Default',
          code: `<Button>Button</Button>`,
        },
        {
          title: 'Variants',
          code: `<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
        },
        {
          title: 'Sizes',
          code: `<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>`,
        },
      ],
      props: [
        { name: 'variant', type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: 'The visual style of the button.' },
        { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: 'The size of the button.' },
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Checkbox',
      slug: 'checkbox',
      description: 'A control that allows the user to toggle between checked and not checked.',
      category: 'forms',
      imports: ['Checkbox'],
      examples: [
        {
          title: 'Basic',
          code: `<div class="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label for="terms">Accept terms and conditions</Label>
</div>`,
        },
      ],
      props: [
        { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the checkbox is checked.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled.' },
      ],
    },
    {
      name: 'Combobox',
      slug: 'combobox',
      description: 'Autocomplete input and command palette with a list of suggestions.',
      category: 'forms',
      imports: ['Combobox'],
      examples: [
        {
          title: 'Basic',
          code: `<Combobox [options]="frameworks" placeholder="Select framework..." />`,
        },
      ],
      props: [
        { name: 'options', type: 'ComboboxOption[]', description: 'The list of options to display.' },
        { name: 'placeholder', type: 'string', description: 'Placeholder text when no option is selected.' },
      ],
    },
    {
      name: 'Date Picker',
      slug: 'date-picker',
      description: 'A date picker component with calendar popup.',
      category: 'forms',
      imports: ['DatePicker'],
      examples: [
        {
          title: 'Basic',
          code: `<DatePicker [(date)]="selectedDate" />`,
        },
      ],
      props: [
        { name: 'date', type: 'Date', description: 'The selected date.' },
        { name: 'placeholder', type: 'string', default: "'Pick a date'", description: 'Placeholder text.' },
      ],
    },
    {
      name: 'Form',
      slug: 'form',
      description: 'Building forms with React Hook Form and Zod.',
      category: 'forms',
      imports: ['Form', 'FormField', 'FormItem', 'FormLabel', 'FormControl', 'FormDescription', 'FormMessage'],
      examples: [
        {
          title: 'Basic',
          code: `<Form [formGroup]="form">
  <FormField name="username">
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input formControlName="username" />
      </FormControl>
      <FormDescription>Your public display name.</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</Form>`,
        },
      ],
      props: [
        { name: 'formGroup', type: 'FormGroup', description: 'The reactive form group.' },
      ],
    },
    {
      name: 'Input',
      slug: 'input',
      description: 'Displays a form input field.',
      category: 'forms',
      imports: ['Input'],
      examples: [
        {
          title: 'Basic',
          code: `<Input type="email" placeholder="Email" />`,
        },
        {
          title: 'With Label',
          code: `<div class="grid w-full max-w-sm items-center gap-1.5">
  <Label for="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`,
        },
      ],
      props: [
        { name: 'type', type: 'string', default: "'text'", description: 'The type of input.' },
        { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled.' },
      ],
    },
    {
      name: 'Input OTP',
      slug: 'input-otp',
      description: 'Accessible one-time password component with copy paste functionality.',
      category: 'forms',
      imports: ['InputOTP', 'InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator'],
      examples: [
        {
          title: 'Basic',
          code: `<InputOTP maxLength="6">
  <InputOTPGroup>
    <InputOTPSlot index="0" />
    <InputOTPSlot index="1" />
    <InputOTPSlot index="2" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index="3" />
    <InputOTPSlot index="4" />
    <InputOTPSlot index="5" />
  </InputOTPGroup>
</InputOTP>`,
        },
      ],
      props: [
        { name: 'maxLength', type: 'number', description: 'Maximum number of characters.' },
        { name: 'value', type: 'string', description: 'The OTP value.' },
      ],
    },
    {
      name: 'Label',
      slug: 'label',
      description: 'Renders an accessible label associated with controls.',
      category: 'forms',
      imports: ['Label'],
      examples: [
        {
          title: 'Basic',
          code: `<Label for="email">Email</Label>`,
        },
      ],
      props: [
        { name: 'for', type: 'string', description: 'The id of the element the label is associated with.' },
      ],
    },
    {
      name: 'Radio Group',
      slug: 'radio-group',
      description: 'A set of checkable buttons where only one can be checked at a time.',
      category: 'forms',
      imports: ['RadioGroup', 'RadioGroupItem'],
      examples: [
        {
          title: 'Basic',
          code: `<RadioGroup defaultValue="option-one">
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label for="option-one">Option One</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label for="option-two">Option Two</Label>
  </div>
</RadioGroup>`,
        },
      ],
      props: [
        { name: 'defaultValue', type: 'string', description: 'The value of the radio item that should be checked by default.' },
        { name: 'value', type: 'string', description: 'The controlled value of the radio group.' },
      ],
    },
    {
      name: 'Select',
      slug: 'select',
      description: 'Displays a list of options for the user to pick from.',
      category: 'forms',
      imports: ['Select', 'SelectTrigger', 'SelectValue', 'SelectContent', 'SelectItem'],
      examples: [
        {
          title: 'Basic',
          code: `<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`,
        },
      ],
      props: [
        { name: 'value', type: 'string', description: 'The controlled value of the select.' },
        { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
      ],
    },
    {
      name: 'Slider',
      slug: 'slider',
      description: 'An input where the user selects a value from within a given range.',
      category: 'forms',
      imports: ['Slider'],
      examples: [
        {
          title: 'Basic',
          code: `<Slider [defaultValue]="[50]" [max]="100" [step]="1" />`,
        },
      ],
      props: [
        { name: 'defaultValue', type: 'number[]', description: 'The default value of the slider.' },
        { name: 'max', type: 'number', default: '100', description: 'The maximum value.' },
        { name: 'step', type: 'number', default: '1', description: 'The step increment.' },
      ],
    },
    {
      name: 'Switch',
      slug: 'switch',
      description: 'A control that allows the user to toggle between checked and not checked.',
      category: 'forms',
      imports: ['Switch'],
      examples: [
        {
          title: 'Basic',
          code: `<div class="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label for="airplane-mode">Airplane Mode</Label>
</div>`,
        },
      ],
      props: [
        { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is checked.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is disabled.' },
      ],
    },
    {
      name: 'Textarea',
      slug: 'textarea',
      description: 'Displays a form textarea.',
      category: 'forms',
      imports: ['Textarea'],
      examples: [
        {
          title: 'Basic',
          code: `<Textarea placeholder="Type your message here." />`,
        },
      ],
      props: [
        { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled.' },
      ],
    },
    {
      name: 'Toggle',
      slug: 'toggle',
      description: 'A two-state button that can be either on or off.',
      category: 'forms',
      imports: ['Toggle'],
      examples: [
        {
          title: 'Basic',
          code: `<Toggle aria-label="Toggle italic">
  <lucide-icon [img]="Italic" class="h-4 w-4" />
</Toggle>`,
        },
      ],
      props: [
        { name: 'variant', type: "'default' | 'outline'", default: "'default'", description: 'The visual style of the toggle.' },
        { name: 'size', type: "'default' | 'sm' | 'lg'", default: "'default'", description: 'The size of the toggle.' },
        { name: 'pressed', type: 'boolean', default: 'false', description: 'Whether the toggle is pressed.' },
      ],
    },
    {
      name: 'Toggle Group',
      slug: 'toggle-group',
      description: 'A set of two-state buttons that can be toggled on or off.',
      category: 'forms',
      imports: ['ToggleGroup', 'ToggleGroupItem'],
      examples: [
        {
          title: 'Basic',
          code: `<ToggleGroup type="single">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <lucide-icon [img]="Bold" class="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <lucide-icon [img]="Italic" class="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
        },
      ],
      props: [
        { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Whether one or multiple items can be pressed.' },
        { name: 'value', type: 'string | string[]', description: 'The controlled value of the toggle group.' },
      ],
    },

    // Feedback Components
    {
      name: 'Alert',
      slug: 'alert',
      description: 'Displays a callout for user attention.',
      category: 'feedback',
      imports: ['Alert', 'AlertTitle', 'AlertDescription'],
      examples: [
        {
          title: 'Default',
          code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Destructive',
          code: `<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
        },
      ],
      props: [
        { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: 'The visual style of the alert.' },
      ],
    },
    {
      name: 'Alert Dialog',
      slug: 'alert-dialog',
      description: 'A modal dialog that interrupts the user with important content.',
      category: 'feedback',
      imports: ['AlertDialog', 'AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogFooter', 'AlertDialogCancel', 'AlertDialogAction'],
      examples: [
        {
          title: 'Basic',
          code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="outline">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
      ],
      props: [
        { name: 'open', type: 'boolean', description: 'Whether the dialog is open.' },
      ],
    },
    {
      name: 'Dialog',
      slug: 'dialog',
      description: 'A window overlaid on the primary window.',
      category: 'feedback',
      imports: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter'],
      examples: [
        {
          title: 'Basic',
          code: `<Dialog>
  <DialogTrigger>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div class="grid gap-4 py-4">
      <!-- Form fields -->
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        },
      ],
      props: [
        { name: 'open', type: 'boolean', description: 'Whether the dialog is open.' },
      ],
    },
    {
      name: 'Drawer',
      slug: 'drawer',
      description: 'A drawer component for Angular.',
      category: 'feedback',
      imports: ['Drawer', 'DrawerTrigger', 'DrawerContent', 'DrawerHeader', 'DrawerTitle', 'DrawerDescription', 'DrawerFooter'],
      examples: [
        {
          title: 'Basic',
          code: `<Drawer>
  <DrawerTrigger>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit Profile</DrawerTitle>
      <DrawerDescription>Make changes to your profile.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
        },
      ],
      props: [
        { name: 'open', type: 'boolean', description: 'Whether the drawer is open.' },
      ],
    },
    {
      name: 'Hover Card',
      slug: 'hover-card',
      description: 'For sighted users to preview content available behind a link.',
      category: 'feedback',
      imports: ['HoverCard', 'HoverCardTrigger', 'HoverCardContent'],
      examples: [
        {
          title: 'Basic',
          code: `<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    The Angular Framework. Maintained by Google.
  </HoverCardContent>
</HoverCard>`,
        },
      ],
      props: [
        { name: 'openDelay', type: 'number', default: '700', description: 'The delay before the hover card opens.' },
        { name: 'closeDelay', type: 'number', default: '300', description: 'The delay before the hover card closes.' },
      ],
    },
    {
      name: 'Popover',
      slug: 'popover',
      description: 'Displays rich content in a portal, triggered by a button.',
      category: 'feedback',
      imports: ['Popover', 'PopoverTrigger', 'PopoverContent'],
      examples: [
        {
          title: 'Basic',
          code: `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    Place content for the popover here.
  </PopoverContent>
</Popover>`,
        },
      ],
      props: [
        { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'The alignment of the popover.' },
      ],
    },
    {
      name: 'Progress',
      slug: 'progress',
      description: 'Displays an indicator showing the completion progress of a task.',
      category: 'feedback',
      imports: ['Progress'],
      examples: [
        {
          title: 'Basic',
          code: `<Progress [value]="66" />`,
        },
      ],
      props: [
        { name: 'value', type: 'number', default: '0', description: 'The progress value (0-100).' },
      ],
    },
    {
      name: 'Sheet',
      slug: 'sheet',
      description: 'Extends the Dialog component to display content that complements the main content.',
      category: 'feedback',
      imports: ['Sheet', 'SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetTitle', 'SheetDescription'],
      examples: [
        {
          title: 'Basic',
          code: `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        },
      ],
      props: [
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'right'", description: 'The side from which the sheet appears.' },
      ],
    },
    {
      name: 'Skeleton',
      slug: 'skeleton',
      description: 'Use to show a placeholder while content is loading.',
      category: 'feedback',
      imports: ['Skeleton'],
      examples: [
        {
          title: 'Basic',
          code: `<div class="flex items-center space-x-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes for sizing and shape.' },
      ],
    },
    {
      name: 'Toast',
      slug: 'toast',
      description: 'A succinct message that is displayed temporarily.',
      category: 'feedback',
      imports: ['Toaster', 'ToastService'],
      examples: [
        {
          title: 'Basic',
          code: `// In your component
constructor(private toast: ToastService) {}

showToast() {
  this.toast.show({
    title: 'Success',
    description: 'Your message has been sent.',
  });
}`,
        },
      ],
      props: [
        { name: 'title', type: 'string', description: 'The title of the toast.' },
        { name: 'description', type: 'string', description: 'The description of the toast.' },
        { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: 'The visual style of the toast.' },
      ],
    },
    {
      name: 'Tooltip',
      slug: 'tooltip',
      description: 'A popup that displays information related to an element.',
      category: 'feedback',
      imports: ['Tooltip', 'TooltipTrigger', 'TooltipContent'],
      examples: [
        {
          title: 'Basic',
          code: `<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Hover</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`,
        },
      ],
      props: [
        { name: 'delayDuration', type: 'number', default: '700', description: 'The delay before the tooltip appears.' },
      ],
    },

    // Data Display Components
    {
      name: 'Avatar',
      slug: 'avatar',
      description: 'An image element with a fallback for representing the user.',
      category: 'data-display',
      imports: ['Avatar', 'AvatarImage', 'AvatarFallback'],
      examples: [
        {
          title: 'Basic',
          code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
        },
      ],
      props: [
        { name: 'src', type: 'string', description: 'The image source URL.' },
        { name: 'alt', type: 'string', description: 'Alternative text for the image.' },
      ],
    },
    {
      name: 'Badge',
      slug: 'badge',
      description: 'Displays a badge or a component that looks like a badge.',
      category: 'data-display',
      imports: ['Badge'],
      examples: [
        {
          title: 'Default',
          code: `<Badge>Badge</Badge>`,
        },
        {
          title: 'Variants',
          code: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
        },
      ],
      props: [
        { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'destructive'", default: "'default'", description: 'The visual style of the badge.' },
      ],
    },
    {
      name: 'Calendar',
      slug: 'calendar',
      description: 'A date field component that allows users to enter and edit date.',
      category: 'data-display',
      imports: ['Calendar'],
      examples: [
        {
          title: 'Basic',
          code: `<Calendar [(selected)]="date" />`,
        },
      ],
      props: [
        { name: 'selected', type: 'Date', description: 'The selected date.' },
        { name: 'mode', type: "'single' | 'multiple' | 'range'", default: "'single'", description: 'The selection mode.' },
      ],
    },
    {
      name: 'Carousel',
      slug: 'carousel',
      description: 'A carousel with motion and swipe built using Embla.',
      category: 'data-display',
      imports: ['Carousel', 'CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext'],
      examples: [
        {
          title: 'Basic',
          code: `<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
        },
      ],
      props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The orientation of the carousel.' },
      ],
    },
    {
      name: 'Chart',
      slug: 'chart',
      description: 'Beautiful charts built with SVG.',
      category: 'data-display',
      imports: ['Chart'],
      examples: [
        {
          title: 'Basic',
          code: `<Chart [data]="chartData" type="bar" />`,
        },
      ],
      props: [
        { name: 'data', type: 'ChartData[]', description: 'The chart data.' },
        { name: 'type', type: "'bar' | 'line' | 'pie'", description: 'The type of chart.' },
      ],
    },
    {
      name: 'Command',
      slug: 'command',
      description: 'Fast, composable, unstyled command menu.',
      category: 'data-display',
      imports: ['Command', 'CommandInput', 'CommandList', 'CommandEmpty', 'CommandGroup', 'CommandItem'],
      examples: [
        {
          title: 'Basic',
          code: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
    {
      name: 'Data Table',
      slug: 'data-table',
      description: 'Powerful table and datagrids.',
      category: 'data-display',
      imports: ['DataTable'],
      examples: [
        {
          title: 'Basic',
          code: `<DataTable [columns]="columns" [data]="data" />`,
        },
      ],
      props: [
        { name: 'columns', type: 'ColumnDef[]', description: 'The column definitions.' },
        { name: 'data', type: 'T[]', description: 'The data to display.' },
      ],
    },
    {
      name: 'Table',
      slug: 'table',
      description: 'A responsive table component.',
      category: 'data-display',
      imports: ['Table', 'TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell'],
      examples: [
        {
          title: 'Basic',
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },

    // Extended Components
    {
      name: 'Button Group',
      slug: 'button-group',
      description: 'Groups multiple buttons together.',
      category: 'extended',
      imports: ['ButtonGroup'],
      examples: [
        {
          title: 'Basic',
          code: `<ButtonGroup>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
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
      category: 'extended',
      imports: ['Empty'],
      examples: [
        {
          title: 'Basic',
          code: `<Empty>
  <p>No data available</p>
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
      category: 'extended',
      imports: ['InputGroup'],
      examples: [
        {
          title: 'Basic',
          code: `<InputGroup>
  <span>$</span>
  <Input type="number" placeholder="0.00" />
</InputGroup>`,
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
      category: 'extended',
      imports: ['Kbd'],
      examples: [
        {
          title: 'Basic',
          code: `<p>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette</p>`,
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
      category: 'extended',
      imports: ['NativeSelect'],
      examples: [
        {
          title: 'Basic',
          code: `<NativeSelect>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</NativeSelect>`,
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
      category: 'extended',
      imports: ['Segmented', 'SegmentedItem'],
      examples: [
        {
          title: 'Basic',
          code: `<Segmented defaultValue="all">
  <SegmentedItem value="all">All</SegmentedItem>
  <SegmentedItem value="active">Active</SegmentedItem>
  <SegmentedItem value="inactive">Inactive</SegmentedItem>
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
      category: 'extended',
      imports: ['SidebarProvider', 'Sidebar', 'SidebarHeader', 'SidebarContent', 'SidebarFooter', 'SidebarGroup', 'SidebarMenu', 'SidebarMenuItem', 'SidebarMenuButton', 'SidebarTrigger'],
      examples: [
        {
          title: 'Basic',
          code: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Logo</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Footer</SidebarFooter>
  </Sidebar>
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
      category: 'extended',
      imports: ['Spinner'],
      examples: [
        {
          title: 'Basic',
          code: `<Spinner />`,
        },
        {
          title: 'Sizes',
          code: `<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />`,
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
      category: 'extended',
      imports: ['H1', 'H2', 'H3', 'H4', 'P', 'Lead', 'Large', 'Small', 'Muted'],
      examples: [
        {
          title: 'Basic',
          code: `<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<P>Paragraph text</P>
<Lead>Lead text</Lead>
<Muted>Muted text</Muted>`,
        },
      ],
      props: [
        { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      ],
    },
  ];

  /** Get all components */
  getAll(): ComponentInfo[] {
    return this.components;
  }

  /** Get component by slug */
  getBySlug(slug: string): ComponentInfo | undefined {
    return this.components.find((c) => c.slug === slug);
  }

  /** Get components by category */
  getByCategory(category: ComponentCategory): ComponentInfo[] {
    return this.components.filter((c) => c.category === category);
  }

  /** Get all categories with their components */
  getCategories(): { category: ComponentCategory; label: string; components: ComponentInfo[] }[] {
    const categoryLabels: Record<ComponentCategory, string> = {
      layout: 'Layout',
      navigation: 'Navigation',
      forms: 'Forms',
      feedback: 'Feedback',
      'data-display': 'Data Display',
      extended: 'Extended',
    };

    const categories: ComponentCategory[] = ['layout', 'navigation', 'forms', 'feedback', 'data-display', 'extended'];

    return categories.map((category) => ({
      category,
      label: categoryLabels[category],
      components: this.getByCategory(category),
    }));
  }

  /** Search components by name */
  search(query: string): ComponentInfo[] {
    const lowerQuery = query.toLowerCase();
    return this.components.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery)
    );
  }
}
