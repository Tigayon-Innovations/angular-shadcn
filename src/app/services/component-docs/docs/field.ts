/**
 * Field Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const FIELD_DOCUMENTATION: ComponentDocumentation = {
  name: 'Field',
  slug: 'field',
  description:
    'A flexible, composable set of components for building form fields with labels, descriptions, errors and grouped layouts.',

  features: [
    { text: 'Composable building blocks for any form layout.', highlight: true },
    { text: 'Vertical, horizontal and responsive orientations.', highlight: true },
    { text: 'Works with native inputs, selects, checkboxes and custom controls.' },
    { text: 'Built-in error and description slots with accessible roles.' },
    { text: 'Group fields with FieldSet, FieldLegend and FieldGroup.' },
    { text: 'Separator with optional centered content text.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/field',
      pnpm: 'pnpm add @ng-cn/field',
      yarn: 'yarn add @ng-cn/field',
      bun: 'bun add @ng-cn/field',
    },
    ngAdd: 'ng g @ng-cn/core:c field',
  },

  anatomy: {
    importStatement: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from '@/ui/field';`,
    structure: `<FieldSet>
  <FieldLegend />
  <FieldGroup>
    <Field>
      <FieldLabel />
      <!-- control: input, select, switch... -->
      <FieldDescription />
      <FieldError />
    </Field>
    <FieldSeparator />
    <Field>
      <FieldContent>
        <FieldTitle />
        <FieldDescription />
      </FieldContent>
    </Field>
  </FieldGroup>
</FieldSet>`,
  },

  apiReference: [
    {
      name: 'FieldSet',
      description: 'Groups related fields together with fieldset (group) semantics.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the fieldset.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"field-set"' }],
      notes: ['Rendered with role="group" so assistive technology announces it as a group.'],
    },
    {
      name: 'FieldLegend',
      description: 'Legend/title for a FieldSet. Supports legend and label sized variants.',
      props: [
        {
          name: 'variant',
          type: "'legend' | 'label'",
          default: "'legend'",
          description:
            'Visual size of the legend. Use "label" to match the size of field labels.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the legend.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"field-legend"' },
        { name: '[data-variant]', values: '"legend" | "label"' },
      ],
    },
    {
      name: 'FieldGroup',
      description:
        'Container that stacks multiple Field components. Establishes a container query context used by the responsive orientation.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"field-group"' }],
    },
    {
      name: 'Field',
      description:
        'Wraps a single form field with its label, control, description and error message.',
      props: [
        {
          name: 'orientation',
          type: "'vertical' | 'horizontal' | 'responsive'",
          default: "'vertical'",
          description:
            'Layout direction. "responsive" stacks vertically and switches to a horizontal row at the @md container breakpoint of the parent FieldGroup.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the field.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"field"' },
        { name: '[data-orientation]', values: '"vertical" | "horizontal" | "responsive"' },
        {
          name: '[data-invalid]',
          values: '"true"',
          description: 'Set this attribute yourself to apply destructive text styling.',
        },
      ],
      notes: ['Rendered with role="group".'],
    },
    {
      name: 'FieldContent',
      description:
        'Groups a field title/label and description. Useful in horizontal orientation next to a control such as a switch or checkbox.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content wrapper.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"field-content"' }],
    },
    {
      name: 'FieldLabel',
      description: 'Label for the field control. Renders a native label element.',
      props: [
        {
          name: 'for',
          type: 'string',
          description: 'ID of the form element this label is for.',
        },
        {
          name: 'htmlFor',
          type: 'string',
          description: "Alternative binding for the 'for' attribute (React-style).",
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the label.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"field-label"' }],
    },
    {
      name: 'FieldTitle',
      description: 'Title text inside FieldContent.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the title.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"field-title"' }],
    },
    {
      name: 'FieldDescription',
      description: 'Helper text describing the field.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the description.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"field-description"' }],
    },
    {
      name: 'FieldSeparator',
      description: 'Visual divider between fields with optional centered content text.',
      props: [
        {
          name: 'content',
          type: 'string',
          description:
            'Optional text rendered centered on the separator line (e.g. "Or continue with").',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the separator.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"field-separator"' },
        { name: '[data-content]', values: '"true" | "false"' },
      ],
    },
    {
      name: 'FieldError',
      description: 'Validation error message(s) for the field. Announced via role="alert".',
      props: [
        {
          name: 'errors',
          type: 'string[] | undefined',
          description:
            'List of error messages. A single error renders as text, multiple errors render as a bulleted list. When omitted, projected content is shown.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the error.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"field-error"' }],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple vertical field with a label, input and description.',
      code: `<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <input Input id="username" type="text" placeholder="shadcn" />
  <FieldDescription>
    Choose a unique username for your account.
  </FieldDescription>
</Field>`,
      hasDemo: true,
    },
    {
      title: 'Fieldset with group',
      description:
        'Use FieldSet, FieldLegend and FieldGroup to group multiple related fields together.',
      code: `<FieldSet>
  <FieldLegend>Address Information</FieldLegend>
  <FieldDescription>
    We need your address to deliver your order.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="street">Street Address</FieldLabel>
      <input Input id="street" type="text" placeholder="123 Main St" />
    </Field>
    <Field orientation="responsive">
      <Field>
        <FieldLabel htmlFor="city">City</FieldLabel>
        <input Input id="city" type="text" placeholder="New York" />
      </Field>
      <Field>
        <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
        <input Input id="zip" type="text" placeholder="90502" />
      </Field>
    </Field>
  </FieldGroup>
</FieldSet>`,
    },
    {
      title: 'Horizontal orientation',
      description:
        'Use orientation="horizontal" with FieldContent for switch- or checkbox-style rows.',
      code: `<Field orientation="horizontal">
  <FieldContent>
    <FieldTitle>Multi-factor authentication</FieldTitle>
    <FieldDescription>
      Enable multi-factor authentication to secure your account.
    </FieldDescription>
  </FieldContent>
  <Switch id="mfa" />
</Field>`,
    },
    {
      title: 'With separator content',
      description: 'Use the content input on FieldSeparator to render centered text.',
      code: `<FieldGroup>
  <Field>
    <Button type="button" variant="outline">Continue with Google</Button>
  </Field>
  <FieldSeparator content="Or continue with" />
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <input Input id="email" type="email" placeholder="me@example.com" />
  </Field>
</FieldGroup>`,
    },
    {
      title: 'Validation errors',
      description:
        'Set data-invalid on the Field and pass errors to FieldError to display validation messages.',
      code: `<Field [attr.data-invalid]="true">
  <FieldLabel htmlFor="password">Password</FieldLabel>
  <input Input id="password" type="password" aria-invalid="true" />
  <FieldError [errors]="['Password must be at least 8 characters.', 'Password must include a number.']" />
</Field>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Form (grouping controls) WAI-ARIA practices',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/form.html',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable control inside the field group.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable control.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="group"',
        description: 'Applied to FieldSet and Field so related controls are announced together.',
      },
      {
        name: 'role="alert"',
        description:
          'Applied to FieldError so validation messages are announced immediately by screen readers.',
      },
      {
        name: 'for',
        description:
          'FieldLabel renders a native label associated with its control via the for/htmlFor input.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/field',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'shadcn/ui Field',
      url: 'https://ui.shadcn.com/docs/components/field',
      icon: 'docs',
    },
  ],
};
