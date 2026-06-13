/**
 * Form Component Documentation
 * Angular-specific comprehensive documentation for form handling
 */

import type { ComponentDocumentation } from '../types';

export const FORM_DOCUMENTATION: ComponentDocumentation = {
  name: 'Form',
  slug: 'form',
  description:
    'Building forms with Angular Reactive Forms and validation using Zod or class-validator.',

  features: [
    { text: 'Composable form components.', highlight: true },
    { text: 'Form field component for building accessible forms.' },
    { text: 'Form validation using Angular validators or Zod.', highlight: true },
    { text: 'Accessible error messages.' },
    { text: 'Form submission handling.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/form',
      pnpm: 'pnpm add @ng-cn/form',
      yarn: 'yarn add @ng-cn/form',
      bun: 'bun add @ng-cn/form',
    },
    ngAdd: 'ng g @ng-cn/core:c form',
  },

  anatomy: {
    importStatement: `import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/ui/form';`,
    structure: `<Form [form]="form">
  <FormField name="fieldName">
    <FormItem>
      <FormLabel />
      <FormControl>
        <!-- Input component -->
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</Form>`,
  },

  apiReference: [
    {
      name: 'Form',
      description: 'The form wrapper component that provides context.',
      props: [
        {
          name: 'form',
          type: 'FormGroup',
          required: true,
          description: 'The Angular FormGroup instance.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      events: [
        {
          name: 'ngSubmit',
          type: 'EventEmitter<void>',
          description: 'Event emitted when the form is submitted.',
        },
      ],
    },
    {
      name: 'FormField',
      description: 'Wraps a form field and provides context for validation.',
      props: [
        {
          name: 'name',
          type: 'string',
          required: true,
          description: 'The name of the field in the form.',
        },
      ],
    },
    {
      name: 'FormItem',
      description: 'Container for form field components.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'FormLabel',
      description: 'The label for the form field.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [{ name: '[data-invalid]', values: 'Present when field has errors' }],
    },
    {
      name: 'FormControl',
      description: 'Wraps the actual input component.',
      props: [],
      notes: [
        'Provides proper aria attributes for accessibility.',
        'Connects input to error messages.',
      ],
    },
    {
      name: 'FormDescription',
      description: 'Help text for the form field.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'FormMessage',
      description: 'Displays validation error messages.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [{ name: '[data-state]', values: '"error" | "valid"' }],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple form with validation.',
      code: `// In your component:
form = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.minLength(2)]),
});

onSubmit() {
  if (this.form.valid) {
    console.log(this.form.value);
  }
}

// In template:
<Form [form]="form" (ngSubmit)="onSubmit()">
  <FormField name="username">
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input formControlName="username" placeholder="shadcn" />
      </FormControl>
      <FormDescription>
        This is your public display name.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
  <Button type="submit">Submit</Button>
</Form>`,
      hasDemo: true,
    },
    {
      title: 'With select',
      description: 'Using select within a form.',
      code: `<Form [form]="form">
  <FormField name="email">
    <FormItem>
      <FormLabel>Email</FormLabel>
      <Select formControlName="email">
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a verified email" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="m@example.com">m&#64;example.com</SelectItem>
          <SelectItem value="m@google.com">m&#64;google.com</SelectItem>
        </SelectContent>
      </Select>
      <FormDescription>
        You can manage email addresses in your settings.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</Form>`,
    },
    {
      title: 'With textarea',
      description: 'Multi-line input in a form.',
      code: `<Form [form]="form">
  <FormField name="bio">
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea
          formControlName="bio"
          placeholder="Tell us a little bit about yourself"
          class="resize-none"
        />
      </FormControl>
      <FormDescription>
        You can &#64;mention other users and organizations.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</Form>`,
    },
    {
      title: 'With checkbox',
      description: 'Boolean field with checkbox.',
      code: `<Form [form]="form">
  <FormField name="marketing">
    <FormItem class="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox formControlName="marketing" />
      </FormControl>
      <div class="space-y-1 leading-none">
        <FormLabel>
          Receive marketing emails
        </FormLabel>
        <FormDescription>
          We'll send you updates about new features.
        </FormDescription>
      </div>
    </FormItem>
  </FormField>
</Form>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Form validation pattern',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus between form fields.',
      },
      {
        key: 'Enter',
        description: 'Submits the form when focus is on the submit button.',
      },
    ],
    ariaAttributes: [
      {
        name: 'aria-invalid',
        description: 'Set to true when the field has validation errors.',
      },
      {
        name: 'aria-describedby',
        description: 'Links the input to its description and error messages.',
      },
      {
        name: 'aria-required',
        description: 'Indicates that the field is required.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/form',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'Angular Forms Guide',
      url: 'https://angular.dev/guide/forms',
      icon: 'docs',
    },
  ],
};
