import type { ComponentInfo } from './types';

/**
 * Complex components: avatars, badges, calendars, carousels, commands, tables
 */
export const COMPLEX_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Avatar',
    slug: 'avatar',
    description: 'An image element with a fallback for representing the user.',
    category: 'complex',
    package: '@shadcn-angular/avatar',
    imports: ['Avatar', 'AvatarImage', 'AvatarFallback'],
    examples: [
      {
        title: 'Basic',
        code: `<Avatar>
  <AvatarImage src="https://github.com/adrian-ub.png" alt="@adrianub" />
  <AvatarFallback>UB</AvatarFallback>
</Avatar>`,
      },
      {
        title: 'Multiple',
        code: `<div class="flex items-center gap-4">
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://github.com/angular.png" alt="@angular" />
    <AvatarFallback>NG</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
</div>`,
      },
    ],
    props: [
      { name: 'src', type: 'string', description: 'The image source URL.' },
      { name: 'alt', type: 'string', description: 'Alternative text for the image.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Badge',
    slug: 'badge',
    description: 'Displays a badge or a component that looks like a badge.',
    category: 'complex',
    package: '@shadcn-angular/badge',
    imports: ['Badge', 'badgeVariants'],
    examples: [
      {
        title: 'Default',
        code: `<div class="flex flex-wrap items-center gap-4">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
      },
    ],
    props: [
      { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'destructive'", default: "'default'", description: 'The visual style of the badge.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Calendar',
    slug: 'calendar',
    description: 'A date field component that allows users to enter and edit date.',
    category: 'complex',
    package: '@shadcn-angular/calendar',
    imports: ['Calendar'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="flex justify-center">
  <Calendar
    [(selected)]="date"
    class="rounded-md border shadow-sm"
  />
</div>`,
      },
    ],
    props: [
      { name: 'selected', type: 'Date', description: 'The selected date.' },
      { name: 'mode', type: "'single' | 'multiple' | 'range'", default: "'single'", description: 'The selection mode.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Carousel',
    slug: 'carousel',
    description: 'A carousel with motion and swipe built using Embla.',
    category: 'complex',
    package: '@shadcn-angular/carousel',
    imports: ['Carousel', 'CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext'],
    examples: [
      {
        title: 'Basic',
        code: `<Carousel class="w-full max-w-xs">
  <CarouselContent>
    @for (item of [1, 2, 3, 4, 5]; track item) {
      <CarouselItem>
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-4xl font-semibold">{{ item }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      },
    ],
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The orientation of the carousel.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Chart',
    slug: 'chart',
    description: 'Beautiful charts built with SVG.',
    category: 'complex',
    package: '@shadcn-angular/chart',
    imports: ['Chart', 'ChartConfig'],
    examples: [
      {
        title: 'Basic',
        code: `<Chart [data]="chartData" type="bar" />`,
      },
    ],
    props: [
      { name: 'data', type: 'ChartData[]', description: 'The chart data.' },
      { name: 'type', type: "'bar' | 'line' | 'pie' | 'area'", description: 'The type of chart.' },
      { name: 'config', type: 'ChartConfig', description: 'The chart configuration.' },
    ],
  },
  {
    name: 'Command',
    slug: 'command',
    description: 'Fast, composable, unstyled command menu.',
    category: 'complex',
    package: '@shadcn-angular/command',
    imports: ['Command', 'CommandInput', 'CommandList', 'CommandEmpty', 'CommandGroup', 'CommandItem', 'CommandSeparator', 'CommandShortcut'],
    examples: [
      {
        title: 'Basic',
        code: `<Command class="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <lucide-icon name="calendar" class="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <lucide-icon name="smile" class="mr-2 h-4 w-4" />
        <span>Search Emoji</span>
      </CommandItem>
      <CommandItem>
        <lucide-icon name="calculator" class="mr-2 h-4 w-4" />
        <span>Calculator</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <lucide-icon name="user" class="mr-2 h-4 w-4" />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <lucide-icon name="settings" class="mr-2 h-4 w-4" />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Progress',
    slug: 'progress',
    description: 'Displays an indicator showing the completion progress.',
    category: 'complex',
    package: '@shadcn-angular/progress',
    imports: ['Progress'],
    examples: [
      {
        title: 'Basic',
        code: `<Progress [value]="60" class="w-[60%]" />`,
      },
    ],
    props: [
      { name: 'value', type: 'number', default: '0', description: 'The progress value (0-100).' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Skeleton',
    slug: 'skeleton',
    description: 'Used to show a placeholder while content is loading.',
    category: 'complex',
    package: '@shadcn-angular/skeleton',
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
      {
        title: 'Card',
        code: `<div class="flex flex-col space-y-3">
  <Skeleton class="h-[125px] w-[250px] rounded-xl" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Spinner',
    slug: 'spinner',
    description: 'A loading spinner indicator.',
    category: 'complex',
    package: '@shadcn-angular/spinner',
    imports: ['Spinner'],
    examples: [
      {
        title: 'Basic',
        code: `<Spinner />`,
      },
      {
        title: 'Sizes',
        code: `<div class="flex items-center gap-4">
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
</div>`,
      },
    ],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the spinner.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Table',
    slug: 'table',
    description: 'A responsive table component.',
    category: 'complex',
    package: '@shadcn-angular/table',
    imports: ['Table', 'TableHeader', 'TableBody', 'TableFooter', 'TableHead', 'TableRow', 'TableCell', 'TableCaption'],
    examples: [
      {
        title: 'Basic',
        code: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead class="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell class="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell class="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell class="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell class="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
    ],
    props: [
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
];
