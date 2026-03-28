import fs from 'fs';

const registryPath =
  '/Users/jameleidyassin/Desktop/Tigayon/shadcn-angular/src/app/services/component-registry.service.ts';
const outputPath =
  '/Users/jameleidyassin/Desktop/Tigayon/shadcn-angular/mcp-server/components-data.ts';

const content = fs.readFileSync(registryPath, 'utf-8');

// Find the components array
const arrayStartMatch = content.match(/private readonly components: ComponentInfo\[\] = \[/);
if (!arrayStartMatch) {
  console.error('Could not find components array');
  process.exit(1);
}

const arrayStart = arrayStartMatch.index + arrayStartMatch[0].length;
const arrayEnd = content.lastIndexOf('];');
const arrayContent = content.substring(arrayStart, arrayEnd);

// Split by top-level objects. This is tricky because of nested objects.
// We'll use a simple state machine to find the top-level objects.
const components = [];
let currentObject = '';
let depth = 0;

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];
  if (char === '{') depth++;
  if (char === '}') depth--;

  currentObject += char;

  if (depth === 0 && currentObject.trim().length > 0) {
    if (currentObject.includes('name:')) {
      parseComponent(currentObject);
    }
    currentObject = '';
  }
}

function parseComponent(objStr) {
  const name = matchField(objStr, 'name');
  const slug = matchField(objStr, 'slug');
  const description = matchField(objStr, 'description');
  const category = matchField(objStr, 'category');

  const imports = matchArray(objStr, 'imports');
  const examples = parseExamples(objStr);
  const props = parseProps(objStr);

  if (!name || !slug) return;

  let mcpCategory = 'basic';
  if (category === 'layout') mcpCategory = 'layout';
  else if (category === 'forms') mcpCategory = 'form';
  else if (category === 'feedback') mcpCategory = 'overlay';
  else if (category === 'data-display') mcpCategory = 'complex';
  else if (category === 'extended') mcpCategory = 'advanced';
  else if (category === 'navigation') mcpCategory = 'basic';

  components.push({
    name,
    selector: name.replace(/\s+/g, ''),
    package: `@shadcn-angular/${slug}`,
    description,
    category: mcpCategory,
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    inputs: props,
    examples,
    installation: {
      npm: `npm install @shadcn-angular/${slug}`,
      pnpm: `pnpm add @shadcn-angular/${slug}`,
      yarn: `yarn add @shadcn-angular/${slug}`,
      bun: `bun add @shadcn-angular/${slug}`,
      ngAdd: `ng add @shadcn-angular/${slug}`,
      manual: {
        description: 'Manually copy the component files to your project',
        steps: [
          `Create src/app/lib/components/ui/${slug} directory`,
          `Copy component files from the library`,
          `Import ${imports[0] || name} in your component`,
        ],
        files: [`src/app/lib/components/ui/${slug}/${slug}.component.ts`],
      },
    },
    usage: `import { ${(imports.length > 0 ? imports : [name.replace(/\s+/g, '')]).join(', ')} } from '@/lib/components/ui/${slug}';\n\n${examples[0]?.code || ''}`,
  });
}

function matchField(str, field) {
  const regex = new RegExp(`${field}:\\s+'([^']+)'`);
  const match = str.match(regex);
  return match ? match[1] : '';
}

function matchArray(str, field) {
  const regex = new RegExp(`${field}:\\s+\\[([^\\]]+)\\]`);
  const match = str.match(regex);
  if (!match) return [];
  return match[1].split(',').map((i) => i.trim().replace(/'/g, ''));
}

function parseExamples(str) {
  const examples = [];
  const exampleBlockMatch = str.match(/examples:\s+\[([\s\S]*?)\]/);
  if (!exampleBlockMatch) return [];

  const block = exampleBlockMatch[1];
  const exampleRegex =
    /\{\s+title:\s+'([^']+)',(?:\s+description:\s+'([^']+)',)?\s+code:\s+`([\s\S]*?)`\s+\}/g;
  let match;
  while ((match = exampleRegex.exec(block)) !== null) {
    examples.push({
      title: match[1],
      description: match[2] || '',
      code: match[3].trim(),
    });
  }
  return examples;
}

function parseProps(str) {
  const props = [];
  const propsBlockMatch = str.match(/props:\s+\[([\s\S]*?)\]/);
  if (!propsBlockMatch) return [];

  const block = propsBlockMatch[1];
  const propRegex =
    /\{\s+name:\s+'([^']+)',\s+type:\s+'([^']+)',(?:\s+default:\s+'([^']+)',)?\s+description:\s+'([^']+)'\s+\}/g;
  let match;
  while ((match = propRegex.exec(block)) !== null) {
    props.push({
      name: match[1],
      type: match[2],
      default: match[3] || undefined,
      description: match[4],
      required: false,
    });
  }
  return props;
}

const outputContent = `/**
 * Component metadata for shadcn-angular MCP Server
 * Automatically generated from ComponentRegistry
 */

import { ComponentMetadata } from './types.js';

export const componentsData: ComponentMetadata[] = ${JSON.stringify(components, null, 2)};

export const componentCategories: Record<string, string> = {
  basic: 'Basic Components',
  form: 'Form Components',
  layout: 'Layout Components',
  overlay: 'Overlay Components',
  complex: 'Complex Components',
  advanced: 'Advanced Components',
};

export function getComponent(nameOrSelector: string): ComponentMetadata | undefined {
  const lowerName = nameOrSelector.toLowerCase();
  return componentsData.find(
    (c) =>
      c.name.toLowerCase() === lowerName ||
      c.selector.toLowerCase() === lowerName ||
      c.package.toLowerCase() === \`@shadcn-angular/\${lowerName}\`
  );
}

export function searchComponents(query?: string, category?: string): ComponentMetadata[] {
  let results = componentsData;

  if (category) {
    results = results.filter((c) => c.category === category);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.selector.toLowerCase().includes(lowerQuery)
    );
  }

  return results;
}
`;

fs.writeFileSync(outputPath, outputContent);
console.log('Successfully generated metadata for ' + components.length + ' components.');
