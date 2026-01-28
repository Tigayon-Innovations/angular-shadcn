/**
 * Get Component Tool
 *
 * Gets detailed information about a specific ng-cn component.
 * Returns human-readable text with step-by-step instructions.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { getComponent } from '../components-data.js';
import { ComponentMetadata } from '../types.js';

export const getComponentTool: Tool = {
  name: 'get_component',
  description:
    'Get detailed information about a specific ng-cn component including inputs, outputs, examples, and installation instructions for all package managers (npm, pnpm, yarn, bun) and ng add.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name or selector of the component (e.g., "Button", "Card", "Input")',
      },
      packageManager: {
        type: 'string',
        enum: ['npm', 'pnpm', 'yarn', 'bun'],
        description: 'Preferred package manager for installation commands (default: npm)',
      },
    },
    required: ['name'],
  },
};

function formatComponentDetails(component: ComponentMetadata, packageManager: string): string {
  let text = '';

  // Header
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `  ${component.name.toUpperCase()} COMPONENT\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  text += `${component.description}\n\n`;

  // Quick Start
  text += `📦 QUICK START\n`;
  text += `─────────────────────────────────────────────────────────────\n\n`;
  text += `Step 1: Install the component\n\n`;
  text += `  ${component.installation.ngAdd}\n\n`;
  text += `Step 2: Import in your component\n\n`;
  text += `  ${component.usage.trim()}\n\n`;

  // Installation Options
  text += `🔧 INSTALLATION OPTIONS\n`;
  text += `─────────────────────────────────────────────────────────────\n\n`;
  text += `Recommended: Use Angular CLI schematic\n`;
  text += `  ${component.installation.ngAdd}\n\n`;
  text += `Alternative: Package managers\n`;
  text += `  npm:  ${component.installation.npm}\n`;
  text += `  pnpm: ${component.installation.pnpm}\n`;
  text += `  yarn: ${component.installation.yarn}\n`;
  text += `  bun:  ${component.installation.bun}\n\n`;

  // Component Info
  text += `📋 COMPONENT INFO\n`;
  text += `─────────────────────────────────────────────────────────────\n\n`;
  text += `  Selector:  ${component.selector}\n`;
  text += `  Package:   ${component.package}\n`;
  text += `  Category:  ${component.category}\n\n`;

  // Inputs
  if (component.inputs && component.inputs.length > 0) {
    text += `⚡ INPUTS (Properties)\n`;
    text += `─────────────────────────────────────────────────────────────\n\n`;
    component.inputs.forEach((input) => {
      const required = input.required ? ' (required)' : '';
      const defaultVal = input.default ? ` = ${input.default}` : '';
      text += `  [${input.name}]: ${input.type}${defaultVal}${required}\n`;
      text += `    ${input.description}\n\n`;
    });
  }

  // Outputs
  if (component.outputs && component.outputs.length > 0) {
    text += `📤 OUTPUTS (Events)\n`;
    text += `─────────────────────────────────────────────────────────────\n\n`;
    component.outputs.forEach((output) => {
      text += `  (${output.name}): ${output.type}\n`;
      text += `    ${output.description}\n\n`;
    });
  }

  // Variants
  if (component.variants && component.variants.length > 0) {
    text += `🎨 VARIANTS\n`;
    text += `─────────────────────────────────────────────────────────────\n\n`;
    component.variants.forEach((variant) => {
      const defaultVal = variant.default ? ` (default: ${variant.default})` : '';
      text += `  ${variant.name}${defaultVal}\n`;
      text += `    Options: ${variant.values.join(' | ')}\n\n`;
    });
  }

  // Examples
  if (component.examples && component.examples.length > 0) {
    text += `💡 USAGE EXAMPLES\n`;
    text += `─────────────────────────────────────────────────────────────\n\n`;
    component.examples.forEach((example) => {
      text += `${example.title}\n`;
      text += `${example.description}\n\n`;
      text += `${example.code}\n\n`;
    });
  }

  // Related Components
  if (component.relatedComponents && component.relatedComponents.length > 0) {
    text += `🔗 RELATED COMPONENTS\n`;
    text += `─────────────────────────────────────────────────────────────\n\n`;
    text += `  ${component.relatedComponents.join(', ')}\n\n`;
  }

  // Footer
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  return text;
}

export function handleGetComponent(args: any) {
  const { name, packageManager = 'npm' } = args;
  const component = getComponent(name);

  if (!component) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Component "${name}" not found. Use search_components to find available components.`,
        },
      ],
    };
  }

  const text = formatComponentDetails(component, packageManager);

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
