import type { ComponentInfo } from './types';

/**
 * Overlay components: dialogs, alerts, sheets, drawers, popovers, tooltips
 * Phase 1 Documentation - Complete with animation states and accessibility
 */
export const OVERLAY_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Alert',
    slug: 'alert',
    description: 'Displays a callout for user attention with customizable variants.',
    category: 'overlay',
    package: '@ng-cn/alert',
    imports: ['Alert', 'AlertTitle', 'AlertDescription'],
    examples: [
      {
        title: 'Default',
        description: 'A default alert with an icon and descriptive text.',
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
        description: 'Use the destructive variant for error messages or warnings.',
        code: `<Alert variant="destructive">
  <lucide-icon name="alert-circle" class="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
      },
      {
        title: 'With Custom Icon',
        description: 'Alerts can include any Lucide icon to match the context.',
        code: `<Alert>
  <lucide-icon name="rocket" class="h-4 w-4" />
  <AlertTitle>New Feature!</AlertTitle>
  <AlertDescription>
    Check out our latest update with improved performance.
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
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
    category: 'overlay',
    package: '@ng-cn/alert-dialog',
    imports: ['AlertDialog', 'AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogFooter', 'AlertDialogCancel', 'AlertDialogAction'],
    examples: [
      {
        title: 'Basic Confirmation',
        description: 'A simple confirmation dialog with cancel and action buttons.',
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
      {
        title: 'Destructive Action',
        description: 'Use destructive styling for dangerous actions like deletion.',
        code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Account</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your account and all associated data.
        This action cannot be reversed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Yes, delete my account
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      },
      {
        title: 'Controlled State',
        description: 'Control the dialog open state programmatically.',
        code: `<!-- Component: open = signal(false) -->
<AlertDialog [(open)]="open">
  <AlertDialogTrigger>
    <Button variant="outline">Open Controlled Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
      <AlertDialogDescription>
        This dialog's state is controlled by a signal.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction (click)="handleConfirm()">Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      },
      {
        title: 'With Async Action',
        description: 'Handle async operations with loading state.',
        code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button>Save Changes</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Save Changes?</AlertDialogTitle>
      <AlertDialogDescription>
        Your changes will be saved to the server.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel [disabled]="isLoading()">Cancel</AlertDialogCancel>
      <AlertDialogAction [disabled]="isLoading()" (click)="saveChanges()">
        @if (isLoading()) {
          <lucide-icon name="loader-2" class="mr-2 h-4 w-4 animate-spin" />
        }
        {{ isLoading() ? 'Saving...' : 'Save' }}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      },
      {
        title: 'With Custom Content',
        description: 'Add custom content inside the dialog body.',
        code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="outline">Logout</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
      <AlertDialogDescription>
        You will be logged out from all devices.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div class="py-4">
      <div class="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember this device</Label>
      </div>
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
      <AlertDialogAction>Logout</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      },
      {
        title: 'Animation States',
        description: 'Alert Dialog exposes data-state attributes for CSS animations.',
        code: `<!-- Animation classes are applied automatically -->
<!-- data-state="open" | "closed" -->
<AlertDialogContent
  class="data-[state=open]:animate-in data-[state=closed]:animate-out
         data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
         data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
  <!-- Content -->
</AlertDialogContent>`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state of the dialog.', component: 'AlertDialog' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state when uncontrolled.', component: 'AlertDialog' },
      { name: 'class', type: 'string', description: 'Additional CSS classes for the content.', component: 'AlertDialogContent' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the action button.', component: 'AlertDialogAction' },
    ],
  },
  {
    name: 'Dialog',
    slug: 'dialog',
    description: 'A window overlaid on the primary window, rendering content in a layer above the page.',
    category: 'overlay',
    package: '@ng-cn/dialog',
    imports: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter', 'DialogClose'],
    examples: [
      {
        title: 'Basic Dialog',
        description: 'A simple dialog with header, content, and footer.',
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
      <Button type="submit" (click)="open.set(false)">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        title: 'Controlled Dialog',
        description: 'Control dialog state programmatically with signals.',
        code: `<!-- In component: open = signal(false) -->
<Button (click)="open.set(true)">Open Dialog</Button>

<Dialog [(open)]="open">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled Dialog</DialogTitle>
      <DialogDescription>
        This dialog is controlled by a signal.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        title: 'With Form Content',
        description: 'Dialog containing a complete form with validation.',
        code: `// In component
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)])
});

// In template
<Dialog>
  <DialogTrigger>
    <Button>Create Account</Button>
  </DialogTrigger>
  <DialogContent class="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>Create Account</DialogTitle>
      <DialogDescription>
        Fill in your details to create a new account.
      </DialogDescription>
    </DialogHeader>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" formControlName="email" />
        </div>
        <div class="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" formControlName="password" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose>
          <Button variant="outline" type="button">Cancel</Button>
        </DialogClose>
        <Button type="submit">Create Account</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>`,
      },
      {
        title: 'Custom Close Button',
        description: 'Hide the default close button and use a custom one.',
        code: `<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent [showClose]="false">
    <DialogHeader>
      <DialogTitle>Custom Close</DialogTitle>
      <DialogDescription>
        This dialog has a custom close button.
      </DialogDescription>
    </DialogHeader>
    <div class="py-4">
      <p>Dialog content goes here.</p>
    </div>
    <DialogFooter>
      <DialogClose>
        <Button>Got it!</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        title: 'Scrollable Content',
        description: 'Dialog with scrollable content for long forms or lists.',
        code: `<Dialog>
  <DialogTrigger>
    <Button variant="outline">Terms & Conditions</Button>
  </DialogTrigger>
  <DialogContent class="max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogDescription>
        Please read and accept our terms.
      </DialogDescription>
    </DialogHeader>
    <div class="py-4 space-y-4 text-sm text-muted-foreground">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <!-- More content -->
    </div>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Decline</Button>
      </DialogClose>
      <Button>Accept</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        title: 'Nested Dialogs',
        description: 'Open a dialog from within another dialog.',
        code: `<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open First Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>First Dialog</DialogTitle>
    </DialogHeader>
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">Open Nested Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nested Dialog</DialogTitle>
          <DialogDescription>This is a nested dialog.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose><Button>Close</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <DialogFooter>
      <DialogClose><Button variant="outline">Close</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        title: 'Animation States',
        description: 'Dialog exposes data-state for enter/exit animations.',
        code: `<!-- Animation states: open, closed -->
<!-- Overlay animations -->
<div class="data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
</div>

<!-- Content animations -->
<div class="data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            data-[state=closed]:slide-out-to-left-1/2
            data-[state=open]:slide-in-from-left-1/2">
</div>`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state of the dialog.', component: 'Dialog' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state when uncontrolled.', component: 'Dialog' },
      { name: 'modal', type: 'boolean', default: 'true', description: 'Whether the dialog blocks interaction with outside elements.', component: 'Dialog' },
      { name: 'class', type: 'string', description: 'Additional CSS classes for content.', component: 'DialogContent' },
      { name: 'showClose', type: 'boolean', default: 'true', description: 'Whether to show the close button.', component: 'DialogContent' },
      { name: 'initialFocus', type: 'string', description: 'Selector for the element to focus on open.', component: 'DialogContent' },
    ],
  },
  {
    name: 'Drawer',
    slug: 'drawer',
    description: 'A drawer component for Angular.',
    category: 'overlay',
    package: '@ng-cn/drawer',
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
    package: '@ng-cn/hover-card',
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
    description: 'Displays rich content in a portal, triggered by a button. Supports positioning and collision detection.',
    category: 'overlay',
    package: '@ng-cn/popover',
    imports: ['Popover', 'PopoverTrigger', 'PopoverContent'],
    examples: [
      {
        title: 'Basic',
        description: 'A simple popover with form content.',
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
      {
        title: 'Positioning - Top',
        description: 'Position the popover above the trigger.',
        code: `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top" class="w-60">
    <p class="text-sm">This popover appears above the trigger.</p>
  </PopoverContent>
</Popover>`,
      },
      {
        title: 'Positioning - Bottom',
        description: 'Position the popover below the trigger.',
        code: `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Bottom</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" class="w-60">
    <p class="text-sm">This popover appears below the trigger.</p>
  </PopoverContent>
</Popover>`,
      },
      {
        title: 'Positioning - Left & Right',
        description: 'Position the popover to the left or right of the trigger.',
        code: `<div class="flex gap-4">
  <Popover>
    <PopoverTrigger>
      <Button variant="outline">Left</Button>
    </PopoverTrigger>
    <PopoverContent side="left" class="w-60">
      <p class="text-sm">Appears on the left.</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger>
      <Button variant="outline">Right</Button>
    </PopoverTrigger>
    <PopoverContent side="right" class="w-60">
      <p class="text-sm">Appears on the right.</p>
    </PopoverContent>
  </Popover>
</div>`,
      },
      {
        title: 'Controlled State',
        description: 'Control the popover open state programmatically.',
        code: `<!-- Component: open = signal(false) -->
<Popover [(open)]="open">
  <PopoverTrigger>
    <Button variant="outline">
      {{ open() ? 'Close' : 'Open' }} Popover
    </Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="space-y-4">
      <h4 class="font-medium">Controlled Popover</h4>
      <p class="text-sm text-muted-foreground">
        This popover's state is controlled externally.
      </p>
      <Button size="sm" (click)="open.set(false)">Close</Button>
    </div>
  </PopoverContent>
</Popover>`,
      },
      {
        title: 'With Date Picker',
        description: 'Popover containing a calendar for date selection.',
        code: `<Popover>
  <PopoverTrigger>
    <Button variant="outline" class="w-[240px] justify-start text-left font-normal">
      <lucide-icon name="calendar" class="mr-2 h-4 w-4" />
      {{ selectedDate() ? (selectedDate() | date) : 'Pick a date' }}
    </Button>
  </PopoverTrigger>
  <PopoverContent class="w-auto p-0" align="start">
    <Calendar [(selected)]="selectedDate" />
  </PopoverContent>
</Popover>`,
      },
      {
        title: 'Animation States',
        description: 'Popover exposes data-state and data-side for directional animations.',
        code: `<!-- Animation with direction awareness -->
<PopoverContent
  class="animate-in fade-in-0 zoom-in-95
         data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
         data-[side=bottom]:slide-in-from-top-2
         data-[side=top]:slide-in-from-bottom-2
         data-[side=left]:slide-in-from-right-2
         data-[side=right]:slide-in-from-left-2">
  <!-- Content -->
</PopoverContent>`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state.', component: 'Popover' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state when uncontrolled.', component: 'Popover' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Preferred side for positioning.', component: 'PopoverContent' },
      { name: 'sideOffset', type: 'number', default: '4', description: 'Offset from the trigger in pixels.', component: 'PopoverContent' },
      { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment relative to the trigger.', component: 'PopoverContent' },
      { name: 'alignOffset', type: 'number', default: '0', description: 'Alignment offset in pixels.', component: 'PopoverContent' },
      { name: 'class', type: 'string', description: 'Additional CSS classes.', component: 'PopoverContent' },
    ],
  },
  {
    name: 'Sheet',
    slug: 'sheet',
    description: 'A panel that slides in from the edge of the screen. Useful for navigation, filters, or forms.',
    category: 'overlay',
    package: '@ng-cn/sheet',
    imports: ['Sheet', 'SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetTitle', 'SheetDescription', 'SheetFooter', 'SheetClose'],
    examples: [
      {
        title: 'Basic (Right Side)',
        description: 'Default sheet sliding in from the right.',
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
      <div class="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" class="text-right">Username</Label>
        <Input id="username" value="@peduarte" class="col-span-3" />
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
        title: 'Left Side',
        description: 'Sheet sliding in from the left, commonly used for navigation.',
        code: `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
      <SheetDescription>Browse the app sections.</SheetDescription>
    </SheetHeader>
    <nav class="flex flex-col gap-2 py-4">
      <a href="#" class="text-sm hover:underline">Dashboard</a>
      <a href="#" class="text-sm hover:underline">Projects</a>
      <a href="#" class="text-sm hover:underline">Settings</a>
      <a href="#" class="text-sm hover:underline">Help</a>
    </nav>
  </SheetContent>
</Sheet>`,
      },
      {
        title: 'Top Side',
        description: 'Sheet sliding down from the top.',
        code: `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Top</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Notification Settings</SheetTitle>
      <SheetDescription>Configure how you receive notifications.</SheetDescription>
    </SheetHeader>
    <div class="py-4">
      <div class="flex items-center justify-between">
        <Label htmlFor="push">Push Notifications</Label>
        <Switch id="push" />
      </div>
    </div>
  </SheetContent>
</Sheet>`,
      },
      {
        title: 'Bottom Side',
        description: 'Sheet sliding up from the bottom, ideal for mobile interfaces.',
        code: `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Share</SheetTitle>
      <SheetDescription>Share this content with others.</SheetDescription>
    </SheetHeader>
    <div class="grid grid-cols-4 gap-4 py-4">
      <Button variant="outline" class="flex flex-col gap-2 h-auto py-4">
        <lucide-icon name="twitter" class="h-5 w-5" />
        <span class="text-xs">Twitter</span>
      </Button>
      <Button variant="outline" class="flex flex-col gap-2 h-auto py-4">
        <lucide-icon name="facebook" class="h-5 w-5" />
        <span class="text-xs">Facebook</span>
      </Button>
      <Button variant="outline" class="flex flex-col gap-2 h-auto py-4">
        <lucide-icon name="linkedin" class="h-5 w-5" />
        <span class="text-xs">LinkedIn</span>
      </Button>
      <Button variant="outline" class="flex flex-col gap-2 h-auto py-4">
        <lucide-icon name="link" class="h-5 w-5" />
        <span class="text-xs">Copy Link</span>
      </Button>
    </div>
  </SheetContent>
</Sheet>`,
      },
      {
        title: 'Controlled State',
        description: 'Control the sheet open state with signals.',
        code: `<!-- Component: isOpen = signal(false) -->
<Button (click)="isOpen.set(true)">Open Sheet</Button>

<Sheet [(open)]="isOpen">
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Controlled Sheet</SheetTitle>
    </SheetHeader>
    <div class="py-4">
      <p class="text-sm text-muted-foreground">
        This sheet is controlled by a signal.
      </p>
    </div>
    <SheetFooter>
      <Button (click)="isOpen.set(false)">Close</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
      },
      {
        title: 'With Form',
        description: 'Sheet containing a complete form.',
        code: `<Sheet>
  <SheetTrigger>
    <Button>New Project</Button>
  </SheetTrigger>
  <SheetContent class="sm:max-w-[540px]">
    <SheetHeader>
      <SheetTitle>Create Project</SheetTitle>
      <SheetDescription>Add a new project to your workspace.</SheetDescription>
    </SheetHeader>
    <form class="grid gap-4 py-4">
      <div class="grid gap-2">
        <Label htmlFor="project-name">Project Name</Label>
        <Input id="project-name" placeholder="My awesome project" />
      </div>
      <div class="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe your project..." />
      </div>
      <div class="grid gap-2">
        <Label>Visibility</Label>
        <RadioGroup defaultValue="private">
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public">Public</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private">Private</Label>
          </div>
        </RadioGroup>
      </div>
    </form>
    <SheetFooter>
      <SheetClose><Button variant="outline">Cancel</Button></SheetClose>
      <Button type="submit">Create Project</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
      },
      {
        title: 'Animation States',
        description: 'Sheet uses directional slide animations based on the side prop.',
        code: `<!-- Animation classes by side -->
<!-- Right (default) -->
<div class="animate-in slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">

<!-- Left -->
<div class="animate-in slide-in-from-left data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left">

<!-- Top -->
<div class="animate-in slide-in-from-top data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top">

<!-- Bottom -->
<div class="animate-in slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom">`,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state.', component: 'Sheet' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state.', component: 'Sheet' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'right'", description: 'The side the sheet slides in from.', component: 'SheetContent' },
      { name: 'class', type: 'string', description: 'Additional CSS classes.', component: 'SheetContent' },
      { name: 'showClose', type: 'boolean', default: 'true', description: 'Show the close button.', component: 'SheetContent' },
    ],
  },
  {
    name: 'Toast',
    slug: 'toast',
    description: 'A succinct message displayed temporarily. Supports variants, actions, and custom positioning.',
    category: 'overlay',
    package: '@ng-cn/toast',
    imports: ['Toaster', 'ToastService'],
    examples: [
      {
        title: 'Basic Toast',
        description: 'Show a simple notification toast.',
        code: `// In your component
import { inject } from '@angular/core';
import { ToastService } from '@/ui/toast';

export class MyComponent {
  private toast = inject(ToastService);

  showToast() {
    this.toast.show({
      title: 'Scheduled',
      description: 'Your meeting has been scheduled.',
    });
  }
}`,
      },
      {
        title: 'Success Toast',
        description: 'Display a success message.',
        code: `showSuccess() {
  this.toast.success({
    title: 'Success!',
    description: 'Your changes have been saved.',
  });
}`,
      },
      {
        title: 'Error Toast',
        description: 'Display an error message with destructive styling.',
        code: `showError() {
  this.toast.error({
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  });
}

// Or use variant directly
this.toast.show({
  title: 'Error',
  description: 'Failed to save changes.',
  variant: 'destructive',
});`,
      },
      {
        title: 'With Action Button',
        description: 'Include an action button for user interaction.',
        code: `showWithAction() {
  this.toast.show({
    title: 'Message deleted',
    description: 'Your message has been removed.',
    action: {
      label: 'Undo',
      onClick: () => {
        this.restoreMessage();
        this.toast.show({ title: 'Message restored' });
      }
    }
  });
}`,
      },
      {
        title: 'Custom Duration',
        description: 'Control how long the toast is displayed.',
        code: `// Short duration (2 seconds)
this.toast.show({
  title: 'Quick notification',
  duration: 2000,
});

// Long duration (10 seconds)
this.toast.show({
  title: 'Important message',
  description: 'Please read this carefully.',
  duration: 10000,
});

// Persistent (no auto-dismiss)
this.toast.show({
  title: 'Action required',
  description: 'Please complete the form.',
  duration: Infinity,
});`,
      },
      {
        title: 'Toast Positions',
        description: 'Configure toast position in the viewport.',
        code: `// In app.component.ts template
<!-- Top Right (default) -->
<Toaster position="top-right" />

<!-- Top Left -->
<Toaster position="top-left" />

<!-- Top Center -->
<Toaster position="top-center" />

<!-- Bottom Right -->
<Toaster position="bottom-right" />

<!-- Bottom Left -->
<Toaster position="bottom-left" />

<!-- Bottom Center -->
<Toaster position="bottom-center" />`,
      },
      {
        title: 'Promise Toast',
        description: 'Show loading, success, and error states for async operations.',
        code: `async saveData() {
  this.toast.promise(
    this.dataService.save(),
    {
      loading: { title: 'Saving...', description: 'Please wait.' },
      success: { title: 'Saved!', description: 'Your data has been saved.' },
      error: { title: 'Error', description: 'Failed to save data.' },
    }
  );
}`,
      },
      {
        title: 'Stacked Toasts',
        description: 'Multiple toasts stack automatically.',
        code: `showMultiple() {
  this.toast.show({ title: 'First notification' });

  setTimeout(() => {
    this.toast.show({ title: 'Second notification' });
  }, 500);

  setTimeout(() => {
    this.toast.success({ title: 'Third notification' });
  }, 1000);
}`,
      },
    ],
    props: [
      { name: 'title', type: 'string', description: 'The title of the toast.' },
      { name: 'description', type: 'string', description: 'The description text.' },
      { name: 'variant', type: "'default' | 'destructive' | 'success'", default: "'default'", description: 'The visual style.' },
      { name: 'duration', type: 'number', default: '5000', description: 'Duration in milliseconds before auto-dismiss.' },
      { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Action button configuration.' },
      { name: 'position', type: "'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'", default: "'bottom-right'", description: 'Toast viewport position.', component: 'Toaster' },
    ],
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    category: 'overlay',
    package: '@ng-cn/tooltip',
    imports: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'],
    examples: [
      {
        title: 'Basic',
        description: 'A simple tooltip that appears on hover.',
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
      {
        title: 'Positioning - Top',
        description: 'Tooltip appearing above the trigger.',
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline" size="icon">
        <lucide-icon name="arrow-up" class="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>Top tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
      {
        title: 'Positioning - All Sides',
        description: 'Tooltips can appear on any side of the trigger.',
        code: `<TooltipProvider>
  <div class="flex gap-4">
    <Tooltip>
      <TooltipTrigger><Button variant="outline">Top</Button></TooltipTrigger>
      <TooltipContent side="top"><p>Top</p></TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger><Button variant="outline">Right</Button></TooltipTrigger>
      <TooltipContent side="right"><p>Right</p></TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger><Button variant="outline">Bottom</Button></TooltipTrigger>
      <TooltipContent side="bottom"><p>Bottom</p></TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger><Button variant="outline">Left</Button></TooltipTrigger>
      <TooltipContent side="left"><p>Left</p></TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
      },
      {
        title: 'With Icon Buttons',
        description: 'Tooltips are essential for icon-only buttons to provide context.',
        code: `<TooltipProvider>
  <div class="flex gap-2">
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline" size="icon">
          <lucide-icon name="bold" class="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent><p>Bold</p></TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline" size="icon">
          <lucide-icon name="italic" class="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent><p>Italic</p></TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline" size="icon">
          <lucide-icon name="underline" class="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent><p>Underline</p></TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
      },
      {
        title: 'Custom Delay',
        description: 'Configure the delay before the tooltip appears.',
        code: `<!-- Instant tooltip (no delay) -->
<TooltipProvider delayDuration="0">
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Instant</Button>
    </TooltipTrigger>
    <TooltipContent><p>No delay!</p></TooltipContent>
  </Tooltip>
</TooltipProvider>

<!-- Slow tooltip (1 second delay) -->
<TooltipProvider [delayDuration]="1000">
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Slow</Button>
    </TooltipTrigger>
    <TooltipContent><p>1 second delay</p></TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
      {
        title: 'Animation States',
        description: 'Tooltip exposes data-state and data-side for CSS animations.',
        code: `<!-- Animation with direction awareness -->
<TooltipContent
  class="animate-in fade-in-0 zoom-in-95
         data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
         data-[side=bottom]:slide-in-from-top-2
         data-[side=top]:slide-in-from-bottom-2
         data-[side=left]:slide-in-from-right-2
         data-[side=right]:slide-in-from-left-2">
  <p>Animated tooltip</p>
</TooltipContent>`,
      },
    ],
    props: [
      { name: 'delayDuration', type: 'number', default: '700', description: 'Delay before tooltip appears (ms).', component: 'TooltipProvider' },
      { name: 'skipDelayDuration', type: 'number', default: '300', description: 'Time to skip delay when moving to another tooltip.', component: 'TooltipProvider' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Preferred side for positioning.', component: 'TooltipContent' },
      { name: 'sideOffset', type: 'number', default: '4', description: 'Offset from the trigger in pixels.', component: 'TooltipContent' },
      { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment relative to trigger.', component: 'TooltipContent' },
      { name: 'class', type: 'string', description: 'Additional CSS classes.', component: 'TooltipContent' },
    ],
  },
];
