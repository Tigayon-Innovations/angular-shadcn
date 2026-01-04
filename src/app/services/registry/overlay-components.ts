import type { ComponentInfo } from './types';

/**
 * Overlay components: dialogs, alerts, sheets, drawers, popovers, tooltips
 */
export const OVERLAY_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Alert',
    slug: 'alert',
    description: 'Displays a callout for user attention.',
    category: 'overlay',
    package: '@shadcn-angular/alert',
    imports: ['Alert', 'AlertTitle', 'AlertDescription'],
    examples: [
      {
        title: 'Default',
        code: `<Alert>
  <lucide-icon name="terminal" class="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`,
      },
      {
        title: 'Destructive',
        code: `<Alert variant="destructive">
  <lucide-icon name="alert-circle" class="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
      },
    ],
    props: [
      { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: 'The visual style of the alert.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Alert Dialog',
    slug: 'alert-dialog',
    description: 'A modal dialog that interrupts the user with important content.',
    category: 'overlay',
    package: '@shadcn-angular/alert-dialog',
    imports: ['AlertDialog', 'AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogFooter', 'AlertDialogCancel', 'AlertDialogAction'],
    examples: [
      {
        title: 'Basic',
        code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
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
    category: 'overlay',
    package: '@shadcn-angular/dialog',
    imports: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter', 'DialogClose'],
    examples: [
      {
        title: 'Basic',
        code: `<Dialog [(open)]="open">
  <DialogTrigger>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" class="text-right">Name</Label>
        <Input id="name" value="Pedro Duarte" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" class="text-right">Username</Label>
        <Input id="username" value="@peduarte" class="col-span-3" />
      </div>
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
    category: 'overlay',
    package: '@shadcn-angular/drawer',
    imports: ['Drawer', 'DrawerTrigger', 'DrawerContent', 'DrawerHeader', 'DrawerTitle', 'DrawerDescription', 'DrawerFooter', 'DrawerClose'],
    examples: [
      {
        title: 'Basic',
        code: `<Drawer>
  <DrawerTrigger>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerDescription>
        Make changes to your profile here. Click save when you're done.
      </DrawerDescription>
    </DrawerHeader>
    <div class="p-4 pb-0">
      <p class="text-sm text-muted-foreground">
        This is the drawer content area. You can put any content here.
      </p>
    </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
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
    category: 'overlay',
    package: '@shadcn-angular/hover-card',
    imports: ['HoverCard', 'HoverCardTrigger', 'HoverCardContent'],
    examples: [
      {
        title: 'Basic',
        code: `<HoverCard>
  <HoverCardTrigger>
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">@nextjs</h4>
        <p class="text-sm">
          The React Framework – created and maintained by @vercel.
        </p>
        <div class="flex items-center pt-2">
          <lucide-icon name="calendar-days" class="mr-2 h-4 w-4 opacity-70" />
          <span class="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
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
    category: 'overlay',
    package: '@shadcn-angular/popover',
    imports: ['Popover', 'PopoverTrigger', 'PopoverContent'],
    examples: [
      {
        title: 'Basic',
        code: `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <h4 class="font-medium leading-none">Dimensions</h4>
        <p class="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input id="width" value="100%" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input id="height" value="25px" class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', description: 'Whether the popover is open.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Sheet',
    slug: 'sheet',
    description: 'Extends the Dialog component to display content that complements the main content.',
    category: 'overlay',
    package: '@shadcn-angular/sheet',
    imports: ['Sheet', 'SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetTitle', 'SheetDescription', 'SheetFooter', 'SheetClose'],
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
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" class="text-right">Name</Label>
        <Input id="name" value="Pedro Duarte" class="col-span-3" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
      },
      {
        title: 'Side Variants',
        description: 'Use the side prop to specify which side the sheet appears from.',
        code: `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Sheet</SheetTitle>
    </SheetHeader>
    <p>Content appears from the left.</p>
  </SheetContent>
</Sheet>`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', description: 'Whether the sheet is open.' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'right'", description: 'The side of the screen from which the sheet appears.' },
    ],
  },
  {
    name: 'Toast',
    slug: 'toast',
    description: 'A succinct message that is displayed temporarily.',
    category: 'overlay',
    package: '@shadcn-angular/toast',
    imports: ['Toaster', 'ToastService'],
    examples: [
      {
        title: 'Basic',
        code: `// In your component
import { ToastService } from '@/ui/toast';

constructor(private toast: ToastService) {}

showToast() {
  this.toast.show({
    title: 'Scheduled',
    description: 'Your meeting has been scheduled.',
  });
}`,
      },
      {
        title: 'With Action',
        code: `showToastWithAction() {
  this.toast.show({
    title: 'Undo',
    description: 'Your message has been deleted.',
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo clicked')
    }
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
    category: 'overlay',
    package: '@shadcn-angular/tooltip',
    imports: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'],
    examples: [
      {
        title: 'Basic',
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
    ],
    props: [
      { name: 'delayDuration', type: 'number', default: '700', description: 'The delay before the tooltip appears.' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'The preferred side of the trigger to render the tooltip.' },
    ],
  },
];
