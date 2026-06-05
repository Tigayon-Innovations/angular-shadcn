/**
 * Table Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const TABLE_DOCUMENTATION: ComponentDocumentation = {
  name: 'Table',
  slug: 'table',
  description:
    'A set of styled semantic HTML table components. Each piece maps 1:1 to a native HTML element, applying consistent Tailwind styles while keeping full accessibility semantics.',

  features: [
    { text: 'Semantic HTML: table, thead, tbody, tfoot, tr, th, td, caption.', highlight: true },
    { text: 'Horizontally scrollable wrapper prevents layout overflow.' },
    { text: 'TableHead defaults to scope="col" for correct screen reader column announcements.', highlight: true },
    { text: 'TableRow supports a selected state with visual and ARIA feedback.' },
    { text: 'All sub-components accept a class input for Tailwind overrides.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/table',
      pnpm: 'pnpm add @ng-cn/table',
      yarn: 'yarn add @ng-cn/table',
      bun: 'bun add @ng-cn/table',
    },
    ngAdd: 'ng g @ng-cn/core:c table',
  },

  anatomy: {
    importStatement: `import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from '@/ui/table';`,
    structure: `<Table>
  <TableCaption />
  <TableHeader>
    <TableRow>
      <TableHead />
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell />
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell />
    </TableRow>
  </TableFooter>
</Table>`,
  },

  apiReference: [
    {
      name: 'Table',
      description:
        'Outer wrapper that adds horizontal scroll overflow. Renders a <div> host and a <table> inner element.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes applied to the outer overflow wrapper.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table"' },
      ],
    },
    {
      name: 'TableHeader',
      description: 'Renders a <thead> element. Adds a bottom border to every child TableRow.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the <thead>.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table-header"' },
      ],
    },
    {
      name: 'TableBody',
      description: 'Renders a <tbody> element. Removes the bottom border from the last TableRow.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the <tbody>.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table-body"' },
      ],
    },
    {
      name: 'TableFooter',
      description:
        'Renders a <tfoot> element. Applies a muted background and a top border for summary rows.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the <tfoot>.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table-footer"' },
      ],
    },
    {
      name: 'TableRow',
      description:
        'Renders a <tr> element with a hover background and an optional selected state.',
      props: [
        {
          name: 'selected',
          type: 'boolean',
          default: 'false',
          description:
            'When true, applies the selected background colour and sets data-state="selected" on the <tr>.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the <tr>.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table-row"' },
        { name: '[data-state]', values: '"selected" when selected is true' },
      ],
    },
    {
      name: 'TableHead',
      description:
        'Renders a <th> element. Defaults to scope="col" for proper column header semantics.',
      props: [
        {
          name: 'scope',
          type: "'col' | 'row' | 'colgroup' | 'rowgroup'",
          default: "'col'",
          description: 'The HTML scope attribute value for the <th> element.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the <th>.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table-head"' },
      ],
    },
    {
      name: 'TableCell',
      description: 'Renders a <td> element with consistent padding and vertical alignment.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the <td>.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table-cell"' },
      ],
    },
    {
      name: 'TableCaption',
      description: 'Renders a <caption> element placed below the table with muted styling.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the <caption>.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"table-caption"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple table with headers, rows, and a caption.',
      hasDemo: true,
      code: `<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell class="font-medium">INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell class="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell class="font-medium">INV-002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell class="text-right">$150.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell class="font-medium">INV-003</TableCell>
      <TableCell>Unpaid</TableCell>
      <TableCell>Bank Transfer</TableCell>
      <TableCell class="text-right">$350.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    },
    {
      title: 'With footer',
      description: 'Use TableFooter to display summary or total rows.',
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead class="text-right">Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    @for (item of cartItems; track item.id) {
      <TableRow>
        <TableCell>{{ item.name }}</TableCell>
        <TableCell class="text-right">{{ item.price | currency }}</TableCell>
      </TableRow>
    }
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell class="text-right">{{ total | currency }}</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
    },
    {
      title: 'Selected row',
      description: 'Highlight a row by binding the selected input.',
      code: `// In your component:
selectedId = signal<number | null>(null);

// In your template:
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    @for (user of users; track user.id) {
      <TableRow
        [selected]="selectedId() === user.id"
        (click)="selectedId.set(user.id)"
        class="cursor-pointer"
      >
        <TableCell>{{ user.name }}</TableCell>
        <TableCell>{{ user.role }}</TableCell>
      </TableRow>
    }
  </TableBody>
</Table>`,
    },
    {
      title: 'Row header cells',
      description: 'Use scope="row" on TableHead cells that label their row rather than their column.',
      code: `<Table>
  <TableBody>
    @for (row of data; track row.label) {
      <TableRow>
        <TableHead scope="row" class="font-medium">{{ row.label }}</TableHead>
        @for (value of row.values; track $index) {
          <TableCell>{{ value }}</TableCell>
        }
      </TableRow>
    }
  </TableBody>
</Table>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Table WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/table/',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus through interactive elements inside table cells (links, buttons, inputs).',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus backwards through interactive elements.',
      },
    ],
    ariaAttributes: [
      {
        name: 'scope="col"',
        description: 'Applied by default to TableHead, associating the header with its column.',
      },
      {
        name: 'data-state="selected"',
        description: 'Applied to TableRow when selected is true, enabling CSS-based selected styling.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/table',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA table pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/table/',
      icon: 'docs',
    },
  ],
};
