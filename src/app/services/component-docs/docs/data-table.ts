/**
 * DataTable Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const DATA_TABLE_DOCUMENTATION: ComponentDocumentation = {
  name: 'Data Table',
  slug: 'data-table',
  description:
    'A fully-featured data table with column sorting, global text filtering, column visibility toggling, and client-side pagination. Built with a composable anatomy so you can assemble exactly the toolbar, content, and pagination controls you need.',

  features: [
    { text: 'Column sorting (ascending → descending → unsorted cycle).', highlight: true },
    { text: 'Global text filter searches across all visible columns.', highlight: true },
    { text: 'Column visibility toggling via a View Options dropdown.' },
    { text: 'Client-side pagination with configurable page sizes.' },
    { text: 'Row selection state (single and multi-row).' },
    { text: 'Fully accessible: aria-sort on headers, aria-selected on rows, role="grid".' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/data-table',
      pnpm: 'pnpm add @ng-cn/data-table',
      yarn: 'yarn add @ng-cn/data-table',
      bun: 'bun add @ng-cn/data-table',
    },
    ngAdd: 'ng g @ng-cn/core:c data-table',
  },

  anatomy: {
    importStatement: `import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableViewOptions,
  DataTableContent,
  DataTablePagination
} from '@/ui/data-table';
import type { ColumnDef } from '@/ui/data-table';`,
    structure: `<DataTable [data]="rows" [columns]="columns">
  <DataTableToolbar>
    <DataTableSearch placeholder="Filter..." />
    <DataTableViewOptions />
  </DataTableToolbar>
  <DataTableContent />
  <DataTablePagination />
</DataTable>`,
  },

  apiReference: [
    {
      name: 'DataTable',
      description:
        'Root container. Accepts the data array and column definitions, then provides a shared context to all child components.',
      props: [
        {
          name: 'data',
          type: 'T[]',
          required: true,
          description: 'The array of row objects to display.',
        },
        {
          name: 'columns',
          type: 'ColumnDef<T>[]',
          required: true,
          description: 'Column definitions that describe how each field is labelled, accessed, and sorted.',
        },
        {
          name: 'pageSizeOptions',
          type: 'number[]',
          default: '[10, 20, 30, 40, 50]',
          description: 'Available page-size values shown in the DataTablePagination select.',
        },
        {
          name: 'initialPageSize',
          type: 'number',
          default: '10',
          description: 'Number of rows displayed per page on initial render.',
        },
        {
          name: 'enableRowSelection',
          type: 'boolean',
          default: 'false',
          description: 'When true, rows can be individually selected.',
        },
        {
          name: 'enableMultiRowSelection',
          type: 'boolean',
          default: 'true',
          description: 'When true alongside enableRowSelection, multiple rows can be selected simultaneously.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the DataTable root.',
        },
      ],
      events: [
        {
          name: 'sortingChange',
          type: 'SortingState[]',
          description: 'Emitted whenever the sort state changes.',
        },
        {
          name: 'rowSelectionChange',
          type: 'RowSelectionState',
          description: 'Emitted whenever the row selection changes.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"data-table"' },
      ],
    },
    {
      name: 'DataTableToolbar',
      description:
        'A flex row container for search inputs and action buttons. Place DataTableSearch and DataTableViewOptions inside it.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the toolbar.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"data-table-toolbar"' },
      ],
    },
    {
      name: 'DataTableSearch',
      description:
        'A text input that updates the global filter, instantly filtering rows across all columns. Resets pagination to page 1 on every keystroke.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: "'Search...'",
          description: 'Placeholder text for the search input.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the wrapper element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"data-table-search"' },
      ],
    },
    {
      name: 'DataTableViewOptions',
      description:
        'A "View" button that opens a dropdown listing all toggleable columns. Clicking a column name shows or hides it.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the view-options wrapper.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"data-table-view-options"' },
      ],
      notes: [
        'Columns with enableHiding: false are excluded from the dropdown.',
        'The dropdown closes automatically when clicking outside the DataTable.',
      ],
    },
    {
      name: 'DataTableContent',
      description:
        'Renders the actual <table> element with headers, body rows, and an empty state. Sorting, filtering, and pagination are all applied here.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content wrapper.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"data-table-content"' },
      ],
      notes: [
        'Header cells expose aria-sort="ascending|descending|none".',
        'Sortable columns cycle: unsorted → ascending → descending → unsorted.',
        'Selected rows receive data-state="selected" and aria-selected="true".',
      ],
    },
    {
      name: 'DataTablePagination',
      description:
        'Pagination bar with first/previous/next/last buttons and a rows-per-page selector.',
      props: [
        {
          name: 'pageSizeOptions',
          type: 'number[]',
          default: '[10, 20, 30, 40, 50]',
          description: 'Page size options shown in the select element.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the pagination bar.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"data-table-pagination"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A minimal table with sorting and pagination.',
      hasDemo: true,
      code: `// Define your column types
interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

// In your component:
columns: ColumnDef<User>[] = [
  { id: 'name',   header: 'Name',   accessorKey: 'name' },
  { id: 'email',  header: 'Email',  accessorKey: 'email' },
  { id: 'status', header: 'Status', accessorKey: 'status' },
];

users: User[] = [
  { id: 1, name: 'Alice',   email: 'alice@example.com',   status: 'Active' },
  { id: 2, name: 'Bob',     email: 'bob@example.com',     status: 'Inactive' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
];

// In your template:
<DataTable [data]="users" [columns]="columns">
  <DataTableContent />
  <DataTablePagination />
</DataTable>`,
    },
    {
      title: 'With toolbar',
      description: 'Add search filtering and column visibility toggling.',
      code: `<DataTable [data]="users" [columns]="columns">
  <DataTableToolbar>
    <DataTableSearch placeholder="Filter users..." />
    <DataTableViewOptions />
  </DataTableToolbar>
  <DataTableContent />
  <DataTablePagination [pageSizeOptions]="[5, 10, 25]" />
</DataTable>`,
    },
    {
      title: 'Disable sorting on a column',
      description: 'Set enableSorting: false in the column definition to remove the sort button.',
      code: `columns: ColumnDef<User>[] = [
  { id: 'name',   header: 'Name',   accessorKey: 'name' },
  { id: 'avatar', header: 'Avatar', accessorKey: 'avatar', enableSorting: false },
  { id: 'email',  header: 'Email',  accessorKey: 'email' },
];`,
    },
    {
      title: 'Custom cell accessor',
      description: 'Use accessorFn to derive the displayed value from a row object.',
      code: `columns: ColumnDef<User>[] = [
  {
    id: 'fullName',
    header: 'Full Name',
    accessorFn: (row) => \`\${row.firstName} \${row.lastName}\`,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
  },
];`,
    },
    {
      title: 'React to sort and selection changes',
      description: 'Use the sortingChange and rowSelectionChange outputs.',
      code: `// In your component:
onSortChange(sorting: SortingState[]): void {
  console.log('Sort changed:', sorting);
}

onSelectionChange(selection: RowSelectionState): void {
  const selectedKeys = Object.keys(selection).filter(k => selection[k]);
  console.log('Selected row indices:', selectedKeys);
}

// In your template:
<DataTable
  [data]="users"
  [columns]="columns"
  [enableRowSelection]="true"
  (sortingChange)="onSortChange($event)"
  (rowSelectionChange)="onSelectionChange($event)"
>
  <DataTableContent />
  <DataTablePagination />
</DataTable>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Grid WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus through sort buttons, the page-size select, and pagination buttons.',
      },
      {
        key: 'Enter / Space',
        description: 'Activates the focused sort button or pagination control.',
      },
      {
        key: 'ArrowLeft / ArrowRight',
        description: 'Navigates between pagination buttons when focus is in that region.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/data-table',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA grid pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
      icon: 'docs',
    },
  ],
};
