/**
 * Comprehensive Improvement Plan for shadcn-angular MCP Server
 *
 * AUDIT SUMMARY (as of test date):
 * - Total Components: 57
 * - Categories: 6 (basic, form, layout, overlay, complex, advanced)
 * - Components with Examples: 4/57 (7%)
 * - Components with Variants: 3/57 (5%)
 * - Components with Inputs: 44/57 (77%)
 * - Components with Outputs: 1/57 (2%)
 * - Components with Related: 3/57 (5%)
 *
 * IMPROVEMENTS NEEDED:
 *
 * 1. ADD EXAMPLES (Priority: HIGH)
 *    - 53 components missing examples
 *    - Add at least 2-4 examples per component
 *    - Examples should cover: basic usage, variants, common patterns
 *
 * 2. ADD VARIANTS (Priority: MEDIUM)
 *    - Document variant options for components with visual styles
 *    - Should cover: size, color, state variants
 *
 * 3. ADD OUTPUTS (Priority: MEDIUM)
 *    - Only 1 component has outputs documented
 *    - Add EventEmitter documentation for interactive components
 *
 * 4. ADD RELATED COMPONENTS (Priority: LOW)
 *    - Only 3 components have related component links
 *    - Improve discoverability by linking related components
 *
 * 5. VALIDATE INPUTS (Priority: MEDIUM)
 *    - 13 components have no inputs documented
 *    - Verify if they truly have no inputs or if documentation is missing
 *
 * COMPONENTS THAT NEED EXAMPLES:
 */

export const componentsNeedingExamples = [
  // Layout Components (6)
  'Aspect Ratio',
  'Card',
  'Collapsible',
  'Resizable',
  'Scroll Area',
  'Separator',

  // Basic Components (8)
  'Accordion',
  'Breadcrumb',
  'Context Menu',
  'Dropdown Menu',
  'Menubar',
  'Navigation Menu',
  'Pagination',
  'Tabs',

  // Form Components (15)
  'Checkbox',
  'Combobox',
  'Date Picker',
  'Form',
  'Input',
  'Input OTP',
  'Label',
  'Radio Group',
  'Select',
  'Slider',
  'Switch',
  'Textarea',
  'Toggle',
  'Toggle Group',

  // Overlay Components (11)
  'Alert Dialog',
  'Drawer',
  'Hover Card',
  'Popover',
  'Progress',
  'Sheet',
  'Skeleton',
  'Toast',
  'Tooltip',

  // Complex Components (8)
  'Avatar',
  'Calendar',
  'Carousel',
  'Chart',
  'Command',
  'Data Table',
  'Table',

  // Advanced Components (9)
  'Button Group',
  'Empty',
  'Input Group',
  'Kbd',
  'Native Select',
  'Segmented',
  'Sidebar',
  'Spinner',
  'Typography',
];

/**
 * EXAMPLE TEMPLATES FOR EACH COMPONENT TYPE
 */

export const exampleTemplates = {
  // Basic layout component
  card: {
    examples: [
      {
        title: 'Basic Card',
        description: 'Simple card with header and content',
        code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
      },
      {
        title: 'Card with Footer',
        description: 'Card with actions in footer',
        code: `<Card>
  <CardHeader>
    <CardTitle>Confirm Action</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Are you sure you want to proceed?</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },

  // Form input component
  input: {
    examples: [
      {
        title: 'Basic Input',
        description: 'Simple text input',
        code: `<Input type="text" placeholder="Enter text..." />`,
      },
      {
        title: 'Input with Label',
        description: 'Input with associated label',
        code: `<div class="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="m@example.com" />
</div>`,
      },
      {
        title: 'Disabled Input',
        description: 'Disabled input state',
        code: `<Input disabled placeholder="Disabled input" />`,
      },
    ],
  },

  // Interactive overlay component
  tooltip: {
    examples: [
      {
        title: 'Basic Tooltip',
        description: 'Simple tooltip on hover',
        code: `<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Tooltip content</p>
  </TooltipContent>
</Tooltip>`,
      },
      {
        title: 'Tooltip with Custom Position',
        description: 'Tooltip with specific placement',
        code: `<Tooltip>
  <TooltipTrigger>
    <Button>Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>This appears on top</p>
  </TooltipContent>
</Tooltip>`,
      },
    ],
  },
};

/**
 * NEXT STEPS:
 *
 * 1. For each component in componentsNeedingExamples:
 *    - Review the component's actual implementation
 *    - Create 2-4 realistic examples
 *    - Add to components-data.ts
 *
 * 2. Add missing outputs for interactive components:
 *    - Check components like Checkbox, Switch, Select, etc.
 *    - Document EventEmitter outputs
 *
 * 3. Add variant documentation:
 *    - Components with visual variants need variants array
 *    - Should match actual component props
 *
 * 4. Add related components:
 *    - Link semantically related components
 *    - Helps with discoverability
 *
 * 5. Run audit.ts again to verify improvements
 */

console.log('✅ Improvement plan documented');
console.log('📊 Target: Increase examples from 7% to 95%+');
console.log('🎯 Priority: Add examples to all form and interactive components first');
