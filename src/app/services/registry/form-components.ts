import type { ComponentInfo } from './types';

/**
 * Form components: inputs, buttons, checkboxes, selects, and form controls
 */
export const FORM_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Button',
    slug: 'button',
    description: 'Displays a button or a component that looks like a button.',
    category: 'form',
    package: '@shadcn-angular/button',
    imports: ['Button', 'buttonVariants'],
    examples: [
      {
        title: 'Default',
        code: `<div class="flex flex-wrap items-center gap-4">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
      },
      {
        title: 'Sizes',
        code: `<div class="flex flex-wrap items-center gap-4">
  <Button size="default">Default</Button>
  <Button size="sm">Small</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">
    <lucide-icon name="plus" class="h-4 w-4" />
  </Button>
</div>`,
      },
      {
        title: 'With Loading',
        code: `<Button disabled>
  <lucide-icon name="loader-2" class="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`,
      },
    ],
    props: [
      { name: 'variant', type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: 'The visual style of the button.' },
      { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: 'The size of the button.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    description: 'A control that allows the user to toggle between checked and not checked.',
    category: 'form',
    package: '@shadcn-angular/checkbox',
    imports: ['Checkbox'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="flex items-center space-x-2">
  <Checkbox id="terms" [(checked)]="checked" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
      },
      {
        title: 'Disabled',
        code: `<div class="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled">Disabled checkbox</Label>
</div>`,
      },
    ],
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the checkbox is checked.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled.' },
      { name: 'id', type: 'string', description: 'The id of the checkbox.' },
    ],
  },
  {
    name: 'Combobox',
    slug: 'combobox',
    description: 'Autocomplete input and command palette with a list of suggestions.',
    category: 'form',
    package: '@shadcn-angular/combobox',
    imports: ['Combobox', 'ComboboxTrigger', 'ComboboxContent', 'ComboboxItem'],
    examples: [
      {
        title: 'Basic',
        code: `<Combobox [(value)]="value" class="w-[200px]">
  <ComboboxTrigger placeholder="Select framework..." />
  <ComboboxContent>
    <ComboboxItem value="next">Next.js</ComboboxItem>
    <ComboboxItem value="sveltekit">SvelteKit</ComboboxItem>
    <ComboboxItem value="nuxt">Nuxt.js</ComboboxItem>
    <ComboboxItem value="remix">Remix</ComboboxItem>
    <ComboboxItem value="angular">Angular</ComboboxItem>
  </ComboboxContent>
</Combobox>`,
      },
    ],
    props: [
      { name: 'value', type: 'string', description: 'The selected value.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text when no option is selected.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Date Picker',
    slug: 'date-picker',
    description: 'A date picker component with calendar popup.',
    category: 'form',
    package: '@shadcn-angular/date-picker',
    imports: ['DatePicker', 'Calendar'],
    examples: [
      {
        title: 'Basic',
        code: `<DatePicker [(date)]="date" placeholder="Pick a date" />`,
      },
    ],
    props: [
      { name: 'date', type: 'Date', description: 'The selected date.' },
      { name: 'placeholder', type: 'string', default: "'Pick a date'", description: 'Placeholder text.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Form',
    slug: 'form',
    description: 'Building forms with Angular Reactive Forms.',
    category: 'form',
    package: '@shadcn-angular/form',
    imports: ['FormField', 'FormLabel', 'FormControl', 'FormDescription', 'FormMessage'],
    examples: [
      {
        title: 'Basic',
        code: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <FormField>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <Input formControlName="username" />
    </FormControl>
    <FormDescription>Your public display name.</FormDescription>
    <FormMessage />
  </FormField>
  <Button type="submit">Submit</Button>
</form>`,
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
    category: 'form',
    package: '@shadcn-angular/input',
    imports: ['Input'],
    examples: [
      {
        title: 'Basic',
        code: `<Input type="email" placeholder="Email" />`,
      },
      {
        title: 'With Label',
        code: `<div class="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`,
      },
      {
        title: 'Disabled',
        code: `<Input type="email" placeholder="Email" disabled />`,
      },
    ],
    props: [
      { name: 'type', type: 'string', default: "'text'", description: 'The type of input.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Input OTP',
    slug: 'input-otp',
    description: 'Accessible one-time password component with copy paste functionality.',
    category: 'form',
    package: '@shadcn-angular/input-otp',
    imports: ['InputOTP', 'InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator'],
    examples: [
      {
        title: 'Basic',
        code: `<InputOTP [maxLength]="6">
  <InputOTPGroup>
    <InputOTPSlot [index]="0" />
    <InputOTPSlot [index]="1" />
    <InputOTPSlot [index]="2" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot [index]="3" />
    <InputOTPSlot [index]="4" />
    <InputOTPSlot [index]="5" />
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
    category: 'form',
    package: '@shadcn-angular/label',
    imports: ['Label'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="flex flex-col gap-2">
  <Label htmlFor="username">Username</Label>
  <Input type="text" id="username" placeholder="Enter username" />
</div>`,
      },
    ],
    props: [
      { name: 'htmlFor', type: 'string', description: 'The id of the element the label is associated with.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Radio Group',
    slug: 'radio-group',
    description: 'A set of checkable buttons where only one can be checked at a time.',
    category: 'form',
    package: '@shadcn-angular/radio-group',
    imports: ['RadioGroup', 'RadioGroupItem'],
    examples: [
      {
        title: 'Basic',
        code: `<RadioGroup [(value)]="value" class="space-y-3">
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`,
      },
    ],
    props: [
      { name: 'value', type: 'string', description: 'The controlled value of the radio group.' },
      { name: 'defaultValue', type: 'string', description: 'The value of the radio item that should be checked by default.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Select',
    slug: 'select',
    description: 'Displays a list of options for the user to pick from.',
    category: 'form',
    package: '@shadcn-angular/select',
    imports: ['Select', 'SelectTrigger', 'SelectValue', 'SelectContent', 'SelectItem', 'SelectGroup', 'SelectLabel'],
    examples: [
      {
        title: 'Basic',
        code: `<Select [(value)]="selectedFruit">
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
    <SelectItem value="pineapple">Pineapple</SelectItem>
  </SelectContent>
</Select>`,
      },
      {
        title: 'With Groups',
        code: `<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Time</SelectItem>
      <SelectItem value="cst">Central Time</SelectItem>
      <SelectItem value="pst">Pacific Time</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
      },
    ],
    props: [
      { name: 'value', type: 'string', description: 'The controlled value of the select.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Slider',
    slug: 'slider',
    description: 'An input where the user selects a value from within a given range.',
    category: 'form',
    package: '@shadcn-angular/slider',
    imports: ['Slider'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="w-full max-w-md space-y-4">
  <Slider [(value)]="value" [max]="100" [step]="1" class="w-full" />
  <p class="text-sm text-muted-foreground text-center">Value: {{ value }}</p>
</div>`,
      },
    ],
    props: [
      { name: 'value', type: 'number | number[]', description: 'The value of the slider.' },
      { name: 'max', type: 'number', default: '100', description: 'The maximum value.' },
      { name: 'min', type: 'number', default: '0', description: 'The minimum value.' },
      { name: 'step', type: 'number', default: '1', description: 'The step increment.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Switch',
    slug: 'switch',
    description: 'A control that allows the user to toggle between checked and not checked.',
    category: 'form',
    package: '@shadcn-angular/switch',
    imports: ['Switch'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="flex items-center space-x-2">
  <Switch id="airplane-mode" [(checked)]="enabled" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,
      },
    ],
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is checked.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is disabled.' },
      { name: 'id', type: 'string', description: 'The id of the switch.' },
    ],
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    description: 'Displays a form textarea.',
    category: 'form',
    package: '@shadcn-angular/textarea',
    imports: ['Textarea'],
    examples: [
      {
        title: 'Basic',
        code: `<Textarea placeholder="Type your message here." />`,
      },
      {
        title: 'With Label',
        code: `<div class="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea id="message" placeholder="Type your message here." />
</div>`,
      },
    ],
    props: [
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    description: 'A two-state button that can be either on or off.',
    category: 'form',
    package: '@shadcn-angular/toggle',
    imports: ['Toggle'],
    examples: [
      {
        title: 'Basic',
        code: `<Toggle aria-label="Toggle bold">
  <lucide-icon name="bold" class="h-4 w-4" />
</Toggle>`,
      },
      {
        title: 'With Text',
        code: `<Toggle aria-label="Toggle italic">
  <lucide-icon name="italic" class="mr-2 h-4 w-4" />
  Italic
</Toggle>`,
      },
      {
        title: 'Outline',
        code: `<Toggle variant="outline" aria-label="Toggle underline">
  <lucide-icon name="underline" class="h-4 w-4" />
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
    category: 'form',
    package: '@shadcn-angular/toggle-group',
    imports: ['ToggleGroup', 'ToggleGroupItem'],
    examples: [
      {
        title: 'Basic',
        code: `<ToggleGroup type="single" [(value)]="value">
  <ToggleGroupItem value="left" aria-label="Left align">
    <lucide-icon name="align-left" class="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Center align">
    <lucide-icon name="align-center" class="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Right align">
    <lucide-icon name="align-right" class="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
      },
    ],
    props: [
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Whether one or multiple items can be pressed.' },
      { name: 'value', type: 'string | string[]', description: 'The controlled value of the toggle group.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
];
