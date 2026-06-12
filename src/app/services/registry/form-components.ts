import type { ComponentInfo } from './types';

/**
 * Form components: inputs, buttons, checkboxes, selects, and form controls
 * Phase 1 Documentation - Complete with accessibility and best practices
 */
export const FORM_COMPONENTS: ComponentInfo[] = [
  {
    name: 'Button',
    slug: 'button',
    description:
      'Displays a button or a component that looks like a button. Supports multiple variants, sizes, and states.',
    category: 'form',
    package: '@ng-cn/button',
    imports: ['Button', 'buttonVariants'],
    examples: [
      {
        title: 'All Variants',
        description: 'Buttons come in six distinct visual variants.',
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
        title: 'All Sizes',
        description: 'Available in four sizes to fit different contexts.',
        code: `<div class="flex flex-wrap items-center gap-4">
  <Button size="lg">Large</Button>
  <Button size="default">Default</Button>
  <Button size="sm">Small</Button>
  <Button size="icon">
    <lucide-icon name="plus" class="h-4 w-4" />
  </Button>
</div>`,
      },
      {
        title: 'With Icon',
        description: 'Combine buttons with icons for enhanced visual communication.',
        code: `<div class="flex flex-wrap items-center gap-4">
  <Button>
    <lucide-icon name="mail" class="mr-2 h-4 w-4" />
    Login with Email
  </Button>
  <Button variant="secondary">
    <lucide-icon name="loader-2" class="mr-2 h-4 w-4 animate-spin" />
    Loading
  </Button>
  <Button variant="outline">
    <lucide-icon name="github" class="mr-2 h-4 w-4" />
    GitHub
  </Button>
</div>`,
      },
      {
        title: 'Loading State',
        description: 'Show loading state with a spinner and disabled interaction.',
        code: `<!-- In component: isLoading = signal(false) -->
<Button [disabled]="isLoading()" (click)="handleSubmit()">
  @if (isLoading()) {
    <lucide-icon name="loader-2" class="mr-2 h-4 w-4 animate-spin" />
    Please wait
  } @else {
    Submit
  }
</Button>`,
      },
      {
        title: 'Disabled State',
        description: 'Disabled buttons indicate unavailable actions.',
        code: `<div class="flex flex-wrap items-center gap-4">
  <Button disabled>Default</Button>
  <Button variant="secondary" disabled>Secondary</Button>
  <Button variant="destructive" disabled>Destructive</Button>
  <Button variant="outline" disabled>Outline</Button>
</div>`,
      },
      {
        title: 'As Link (asChild Pattern)',
        description: 'Use button styling on links with the asChild pattern.',
        code: `<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>

<Button variant="outline" asChild>
  <a routerLink="/settings">Settings</a>
</Button>

<Button variant="link" asChild>
  <a href="https://angular.dev" target="_blank" rel="noopener noreferrer">
    Learn Angular
  </a>
</Button>`,
      },
      {
        title: 'Button Group',
        description: 'Group related buttons together.',
        code: `<div class="inline-flex rounded-md shadow-sm" role="group">
  <Button variant="outline" class="rounded-r-none">
    <lucide-icon name="align-left" class="h-4 w-4" />
  </Button>
  <Button variant="outline" class="rounded-none border-x-0">
    <lucide-icon name="align-center" class="h-4 w-4" />
  </Button>
  <Button variant="outline" class="rounded-l-none">
    <lucide-icon name="align-right" class="h-4 w-4" />
  </Button>
</div>`,
      },
      {
        title: 'Custom Styling with buttonVariants',
        description: 'Use buttonVariants to apply button styles to custom elements.',
        code: `import { buttonVariants } from '@/ui/button';

// In template
<a [class]="buttonVariants({ variant: 'outline', size: 'sm' })"
   href="/docs">
  Documentation
</a>

// Or combine with cn for additional classes
<button [class]="cn(buttonVariants({ variant: 'default' }), 'w-full')">
  Full Width Button
</button>`,
      },
    ],
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        default: "'default'",
        description: 'The visual style of the button.',
      },
      {
        name: 'size',
        type: "'default' | 'sm' | 'lg' | 'icon'",
        default: "'default'",
        description: 'The size of the button.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the button is disabled.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Render as child element, passing props to the child.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
      {
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
        default: "'button'",
        description: 'The button type attribute.',
      },
    ],
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    description: 'A control that allows the user to toggle between checked and not checked.',
    category: 'form',
    package: '@ng-cn/checkbox',
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
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is checked.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is disabled.',
      },
      { name: 'id', type: 'string', description: 'The id of the checkbox.' },
    ],
  },
  {
    name: 'Combobox',
    slug: 'combobox',
    description: 'Autocomplete input and command palette with a list of suggestions.',
    category: 'form',
    package: '@ng-cn/combobox',
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
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text when no option is selected.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Date Picker',
    slug: 'date-picker',
    description: 'A date picker component with calendar popup.',
    category: 'form',
    package: '@ng-cn/date-picker',
    imports: ['DatePicker', 'Calendar'],
    examples: [
      {
        title: 'Basic',
        code: `<DatePicker [(date)]="date" placeholder="Pick a date" />`,
      },
    ],
    props: [
      { name: 'date', type: 'Date', description: 'The selected date.' },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Pick a date'",
        description: 'Placeholder text.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Form',
    slug: 'form',
    description:
      'Building forms with Angular Reactive Forms. Provides form field components with built-in validation, error messages, and accessibility.',
    category: 'form',
    package: '@ng-cn/form',
    imports: ['FormField', 'FormLabel', 'FormControl', 'FormDescription', 'FormMessage'],
    examples: [
      {
        title: 'Basic Form',
        description: 'A simple form with a single field and validation.',
        code: `// In component
form = new FormGroup({
  username: new FormControl('', [Validators.required])
});

// In template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <FormField>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <Input formControlName="username" />
    </FormControl>
    <FormDescription>Your public display name.</FormDescription>
    <FormMessage />
  </FormField>
  <Button type="submit" class="mt-4">Submit</Button>
</form>`,
      },
      {
        title: 'Form with Validation',
        description: 'Form fields with validation rules and error messages.',
        code: `// In component
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
});

// In template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="space-y-4">
    <FormField>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" formControlName="email" placeholder="m@example.com" />
      </FormControl>
      <FormDescription>We'll never share your email.</FormDescription>
      <FormMessage>
        @if (form.get('email')?.hasError('required')) {
          Email is required.
        } @else if (form.get('email')?.hasError('email')) {
          Please enter a valid email address.
        }
      </FormMessage>
    </FormField>

    <FormField>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input type="password" formControlName="password" />
      </FormControl>
      <FormDescription>Must be at least 8 characters.</FormDescription>
      <FormMessage>
        @if (form.get('password')?.hasError('required')) {
          Password is required.
        } @else if (form.get('password')?.hasError('minlength')) {
          Password must be at least 8 characters.
        }
      </FormMessage>
    </FormField>
  </div>
  <Button type="submit" [disabled]="form.invalid" class="mt-4">
    Create Account
  </Button>
</form>`,
      },
      {
        title: 'Multiple Field Types',
        description: 'Form with various input types and controls.',
        code: `// In component
profileForm = new FormGroup({
  fullName: new FormControl('', [Validators.required]),
  bio: new FormControl('', [Validators.maxLength(160)]),
  notifications: new FormControl(false),
  theme: new FormControl('', [Validators.required])
});

// In template
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
  <FormField>
    <FormLabel>Full Name</FormLabel>
    <FormControl>
      <Input formControlName="fullName" placeholder="John Doe" />
    </FormControl>
  </FormField>

  <FormField>
    <FormLabel>Bio</FormLabel>
    <FormControl>
      <Textarea formControlName="bio" placeholder="Tell us about yourself..." />
    </FormControl>
    <FormDescription>Maximum 160 characters.</FormDescription>
  </FormField>

  <FormField>
    <FormLabel>Notifications</FormLabel>
    <FormControl>
      <div class="flex items-center space-x-2">
        <Checkbox formControlName="notifications" id="notifications" />
        <Label htmlFor="notifications">Receive email notifications</Label>
      </div>
    </FormControl>
  </FormField>

  <FormField>
    <FormLabel>Theme</FormLabel>
    <FormControl>
      <Select formControlName="theme">
        <SelectTrigger class="w-[200px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </FormControl>
  </FormField>

  <Button type="submit">Save Profile</Button>
</form>`,
      },
      {
        title: 'Form with Custom Validation',
        description: 'Implement custom validators for complex validation logic.',
        code: `// Custom validator
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

// In component
form = new FormGroup({
  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  confirmPassword: new FormControl('', [Validators.required]),
}, { validators: passwordMatchValidator });

// In template
<form [formGroup]="form" class="space-y-4">
  <FormField>
    <FormLabel>Password</FormLabel>
    <FormControl>
      <Input type="password" formControlName="password" />
    </FormControl>
  </FormField>

  <FormField>
    <FormLabel>Confirm Password</FormLabel>
    <FormControl>
      <Input type="password" formControlName="confirmPassword" />
    </FormControl>
    <FormMessage>
      @if (form.hasError('passwordMismatch')) {
        Passwords do not match.
      }
    </FormMessage>
  </FormField>
</form>`,
      },
      {
        title: 'Form Submission with Loading',
        description: 'Handle form submission with loading state.',
        code: `// In component
isSubmitting = signal(false);

async onSubmit() {
  if (this.form.invalid) return;

  this.isSubmitting.set(true);
  try {
    await this.api.submitForm(this.form.value);
    this.toast.success({ title: 'Success!', description: 'Form submitted.' });
  } catch (error) {
    this.toast.error({ title: 'Error', description: 'Submission failed.' });
  } finally {
    this.isSubmitting.set(false);
  }
}

// In template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- Form fields -->
  <Button type="submit" [disabled]="form.invalid || isSubmitting()">
    @if (isSubmitting()) {
      <lucide-icon name="loader-2" class="mr-2 h-4 w-4 animate-spin" />
      Submitting...
    } @else {
      Submit
    }
  </Button>
</form>`,
      },
      {
        title: 'Inline Form Layout',
        description: 'Horizontal form layout for compact interfaces.',
        code: `<form class="flex items-end gap-4">
  <FormField class="flex-1">
    <FormLabel>Email</FormLabel>
    <FormControl>
      <Input type="email" placeholder="Enter your email" />
    </FormControl>
  </FormField>
  <Button type="submit">Subscribe</Button>
</form>`,
      },
      {
        title: 'Form Reset',
        description: 'Reset form to initial state.',
        code: `// In template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- Form fields -->
  <div class="flex gap-4 mt-4">
    <Button type="submit">Submit</Button>
    <Button type="button" variant="outline" (click)="form.reset()">
      Reset
    </Button>
  </div>
</form>`,
      },
    ],
    props: [
      {
        name: 'formGroup',
        type: 'FormGroup',
        description: 'The reactive form group.',
        component: 'Form',
      },
      {
        name: 'htmlFor',
        type: 'string',
        description: 'Associates label with form control.',
        component: 'FormLabel',
      },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes.',
        component: 'FormField',
      },
    ],
  },
  {
    name: 'Input',
    slug: 'input',
    description:
      'Displays a form input field. Supports various types, states, and integrates with Angular forms.',
    category: 'form',
    package: '@ng-cn/input',
    imports: ['Input'],
    examples: [
      {
        title: 'Basic',
        description: 'A simple text input with placeholder.',
        code: `<Input type="text" placeholder="Enter text..." />`,
      },
      {
        title: 'With Label',
        description: 'Input with an associated label for accessibility.',
        code: `<div class="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`,
      },
      {
        title: 'Input Types',
        description: 'Different input types for various data formats.',
        code: `<div class="grid w-full max-w-sm gap-4">
  <div class="grid gap-1.5">
    <Label htmlFor="text">Text</Label>
    <Input type="text" id="text" placeholder="Enter text" />
  </div>

  <div class="grid gap-1.5">
    <Label htmlFor="email">Email</Label>
    <Input type="email" id="email" placeholder="m@example.com" />
  </div>

  <div class="grid gap-1.5">
    <Label htmlFor="password">Password</Label>
    <Input type="password" id="password" />
  </div>

  <div class="grid gap-1.5">
    <Label htmlFor="number">Number</Label>
    <Input type="number" id="number" placeholder="0" />
  </div>

  <div class="grid gap-1.5">
    <Label htmlFor="date">Date</Label>
    <Input type="date" id="date" />
  </div>

  <div class="grid gap-1.5">
    <Label htmlFor="search">Search</Label>
    <Input type="search" id="search" placeholder="Search..." />
  </div>
</div>`,
      },
      {
        title: 'Disabled State',
        description: 'Input in disabled state.',
        code: `<Input type="text" placeholder="Disabled input" disabled />`,
      },
      {
        title: 'With Error State',
        description: 'Input with error styling for validation feedback.',
        code: `<div class="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email-error">Email</Label>
  <Input
    type="email"
    id="email-error"
    placeholder="Email"
    class="border-destructive focus-visible:ring-destructive"
    aria-invalid="true"
    aria-describedby="email-error-message"
  />
  <p id="email-error-message" class="text-sm text-destructive">
    Please enter a valid email address.
  </p>
</div>`,
      },
      {
        title: 'With Icon',
        description: 'Input with leading or trailing icons.',
        code: `<!-- Leading Icon -->
<div class="relative">
  <lucide-icon name="search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input type="search" placeholder="Search..." class="pl-10" />
</div>

<!-- Trailing Icon -->
<div class="relative">
  <Input type="email" placeholder="Email" class="pr-10" />
  <lucide-icon name="mail" class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
</div>

<!-- Both Icons -->
<div class="relative">
  <lucide-icon name="dollar-sign" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input type="number" placeholder="0.00" class="pl-10 pr-10" />
  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USD</span>
</div>`,
      },
      {
        title: 'File Input',
        description: 'Styled file input for uploads.',
        code: `<div class="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="picture">Picture</Label>
  <Input id="picture" type="file" accept="image/*" />
</div>`,
      },
      {
        title: 'With Form Integration',
        description: 'Input integrated with Angular Reactive Forms.',
        code: `// In component
form = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.minLength(3)]),
});

// In template
<form [formGroup]="form">
  <div class="grid w-full max-w-sm gap-1.5">
    <Label htmlFor="username">Username</Label>
    <Input
      type="text"
      id="username"
      formControlName="username"
      [class]="form.get('username')?.invalid && form.get('username')?.touched
        ? 'border-destructive' : ''"
    />
    @if (form.get('username')?.invalid && form.get('username')?.touched) {
      <p class="text-sm text-destructive">
        Username must be at least 3 characters.
      </p>
    }
  </div>
</form>`,
      },
      {
        title: 'Password with Visibility Toggle',
        description: 'Password input with show/hide toggle.',
        code: `<!-- In component: showPassword = signal(false) -->
<div class="relative">
  <Input
    [type]="showPassword() ? 'text' : 'password'"
    placeholder="Enter password"
    class="pr-10"
  />
  <Button
    type="button"
    variant="ghost"
    size="icon"
    class="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
    (click)="showPassword.update(v => !v)"
  >
    @if (showPassword()) {
      <lucide-icon name="eye-off" class="h-4 w-4" />
    } @else {
      <lucide-icon name="eye" class="h-4 w-4" />
    }
    <span class="sr-only">
      {{ showPassword() ? 'Hide password' : 'Show password' }}
    </span>
  </Button>
</div>`,
      },
    ],
    props: [
      { name: 'type', type: 'string', default: "'text'", description: 'The HTML input type.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the input is disabled.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        description: 'Whether the input is read-only.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      { name: 'id', type: 'string', description: 'The input id for label association.' },
      { name: 'name', type: 'string', description: 'The input name attribute.' },
      { name: 'value', type: 'string', description: 'The input value.' },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the input is required.',
      },
    ],
  },
  {
    name: 'Input OTP',
    slug: 'input-otp',
    description: 'Accessible one-time password component with copy paste functionality.',
    category: 'form',
    package: '@ng-cn/input-otp',
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
    description:
      'Renders an accessible label associated with form controls. Essential for form accessibility and usability.',
    category: 'form',
    package: '@ng-cn/label',
    imports: ['Label'],
    examples: [
      {
        title: 'Basic',
        description: 'A simple label associated with an input.',
        code: `<div class="flex flex-col gap-2">
  <Label htmlFor="username">Username</Label>
  <Input type="text" id="username" placeholder="Enter username" />
</div>`,
      },
      {
        title: 'With Form Control',
        description: 'Label properly associated with different form controls.',
        code: `<div class="space-y-4">
  <!-- With Input -->
  <div class="grid gap-1.5">
    <Label htmlFor="email">Email</Label>
    <Input type="email" id="email" placeholder="m@example.com" />
  </div>

  <!-- With Textarea -->
  <div class="grid gap-1.5">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" placeholder="Type your message..." />
  </div>

  <!-- With Select -->
  <div class="grid gap-1.5">
    <Label htmlFor="country">Country</Label>
    <Select>
      <SelectTrigger id="country">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>`,
      },
      {
        title: 'Required Field Indicator',
        description: 'Show required field with visual indicator.',
        code: `<div class="grid gap-1.5">
  <Label htmlFor="required-email">
    Email <span class="text-destructive">*</span>
  </Label>
  <Input type="email" id="required-email" required />
</div>

<!-- Alternative with aria-required -->
<div class="grid gap-1.5">
  <Label htmlFor="alt-required">
    Password
    <span class="text-destructive ml-1" aria-hidden="true">*</span>
    <span class="sr-only">(required)</span>
  </Label>
  <Input type="password" id="alt-required" aria-required="true" />
</div>`,
      },
      {
        title: 'Disabled State',
        description: 'Label styling when associated control is disabled.',
        code: `<div class="grid gap-1.5">
  <Label htmlFor="disabled-input" class="text-muted-foreground">
    Disabled Field
  </Label>
  <Input type="text" id="disabled-input" disabled value="Cannot edit" />
</div>`,
      },
      {
        title: 'With Checkbox',
        description: 'Label inline with checkbox control.',
        code: `<div class="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms" class="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    Accept terms and conditions
  </Label>
</div>

<!-- With description -->
<div class="flex items-start space-x-2">
  <Checkbox id="marketing" />
  <div class="grid gap-1.5 leading-none">
    <Label htmlFor="marketing">Marketing emails</Label>
    <p class="text-sm text-muted-foreground">
      Receive emails about new products and features.
    </p>
  </div>
</div>`,
      },
    ],
    props: [
      { name: 'htmlFor', type: 'string', description: 'The id of the associated form element.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
  {
    name: 'Radio Group',
    slug: 'radio-group',
    description: 'A set of checkable buttons where only one can be checked at a time.',
    category: 'form',
    package: '@ng-cn/radio-group',
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
      {
        name: 'defaultValue',
        type: 'string',
        description: 'The value of the radio item that should be checked by default.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Select',
    slug: 'select',
    description: 'Displays a list of options for the user to pick from.',
    category: 'form',
    package: '@ng-cn/select',
    imports: [
      'Select',
      'SelectTrigger',
      'SelectValue',
      'SelectContent',
      'SelectItem',
      'SelectGroup',
      'SelectLabel',
    ],
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
    package: '@ng-cn/slider',
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
    package: '@ng-cn/switch',
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
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the switch is checked.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the switch is disabled.',
      },
      { name: 'id', type: 'string', description: 'The id of the switch.' },
    ],
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    description: 'Displays a form textarea.',
    category: 'form',
    package: '@ng-cn/textarea',
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
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the textarea is disabled.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    description: 'A two-state button that can be either on or off.',
    category: 'form',
    package: '@ng-cn/toggle',
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
      {
        name: 'variant',
        type: "'default' | 'outline'",
        default: "'default'",
        description: 'The visual style of the toggle.',
      },
      {
        name: 'size',
        type: "'default' | 'sm' | 'lg'",
        default: "'default'",
        description: 'The size of the toggle.',
      },
      {
        name: 'pressed',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle is pressed.',
      },
    ],
  },
  {
    name: 'Toggle Group',
    slug: 'toggle-group',
    description: 'A set of two-state buttons that can be toggled on or off.',
    category: 'form',
    package: '@ng-cn/toggle-group',
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
      {
        name: 'type',
        type: "'single' | 'multiple'",
        default: "'single'",
        description: 'Whether one or multiple items can be pressed.',
      },
      {
        name: 'value',
        type: 'string | string[]',
        description: 'The controlled value of the toggle group.',
      },
      { name: 'class', type: 'string', description: 'Additional CSS classes to apply.' },
    ],
  },
  {
    name: 'Country Selector',
    slug: 'country-selector',
    description: 'A searchable country dropdown with flag, name and dial code. Integrates with Angular Forms.',
    category: 'form',
    package: '@ng-cn/country-selector',
    imports: ['CountrySelector'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="w-full max-w-sm">
  <CountrySelector [(ngModel)]="countryCode" />
</div>`,
      },
      {
        title: 'Pre-selected',
        code: `<div class="w-full max-w-sm">
  <CountrySelector [value]="'US'" (countryChange)="onCountryChange($event)" />
</div>`,
      },
    ],
    props: [
      { name: 'value', type: 'string', description: 'ISO 2-letter country code (e.g. "US").' },
      { name: 'placeholder', type: 'string', default: "'Select country'", description: 'Placeholder text when nothing is selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the selector is disabled.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
      { name: 'countryChange', type: 'EventEmitter<Country>', description: 'Emits the selected Country object on change.' },
    ],
  },
  {
    name: 'Phone Input',
    slug: 'phone-input',
    description: 'Phone number input combining a CountrySelector dial code picker with a number field.',
    category: 'form',
    package: '@ng-cn/phone-input',
    imports: ['PhoneInput'],
    examples: [
      {
        title: 'Basic',
        code: `<div class="w-full max-w-sm">
  <PhoneInput [(ngModel)]="phone" placeholder="Enter phone number" />
</div>`,
      },
      {
        title: 'With Label',
        code: `<div class="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="phone">Phone</Label>
  <PhoneInput id="phone" placeholder="Enter phone number" />
</div>`,
      },
    ],
    props: [
      { name: 'placeholder', type: 'string', default: "'Phone number'", description: 'Placeholder for the number input.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled.' },
      { name: 'class', type: 'string', description: 'Additional CSS classes.' },
    ],
  },
];
