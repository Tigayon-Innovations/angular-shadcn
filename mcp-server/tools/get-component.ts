/**
 * Get Component Tool
 *
 * Gets detailed information about a specific ng-cn component.
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
  let details = `# ${component.name}\n\n`;
  details += `${component.description}\n\n`;

  details += `## Basic Information\n\n`;
  details += `- **Selector**: \`${component.selector}\`\n`;
  details += `- **Package**: ${component.package}\n`;
  details += `- **Category**: ${component.category}\n`;

  if (component.dependencies.length > 0) {
    details += `- **Dependencies**: ${component.dependencies.join(', ')}\n`;
  }

  details += `\n`;

  // Installation
  details += `## Installation\n\n`;
  details += `### Using Package Managers\n\n`;
  details += `\`\`\`bash\n`;
  details += `# npm\n${component.installation.npm}\n\n`;
  details += `# pnpm\n${component.installation.pnpm}\n\n`;
  details += `# yarn\n${component.installation.yarn}\n\n`;
  details += `# bun\n${component.installation.bun}\n`;
  details += `\`\`\`\n\n`;

  details += `### Using Angular CLI\n\n`;
  details += `\`\`\`bash\n${component.installation.ngAdd}\n\`\`\`\n\n`;

  details += `### Manual Installation\n\n`;
  details += `${component.installation.manual.description}\n\n`;
  details += `**Steps:**\n`;
  component.installation.manual.steps.forEach((step, i) => {
    details += `${i + 1}. ${step}\n`;
  });
  details += `\n**Files:**\n`;
  component.installation.manual.files.forEach((file) => {
    details += `- \`${file}\`\n`;
  });
  details += `\n`;

  // Usage
  details += `## Usage\n\n`;
  details += `\`\`\`typescript\n${component.usage}\n\`\`\`\n\n`;

  // Inputs
  if (component.inputs && component.inputs.length > 0) {
    details += `## Inputs\n\n`;
    component.inputs.forEach((input) => {
      details += `### ${input.name}\n`;
      details += `- **Type**: \`${input.type}\`\n`;
      details += `- **Description**: ${input.description}\n`;
      if (input.default) {
        details += `- **Default**: ${input.default}\n`;
      }
      details += `- **Required**: ${input.required ? 'Yes' : 'No'}\n\n`;
    });
  }

  // Outputs
  if (component.outputs && component.outputs.length > 0) {
    details += `## Outputs\n\n`;
    component.outputs.forEach((output) => {
      details += `### ${output.name}\n`;
      details += `- **Type**: \`${output.type}\`\n`;
      details += `- **Description**: ${output.description}\n\n`;
    });
  }

  // Variants
  if (component.variants && component.variants.length > 0) {
    details += `## Variants\n\n`;
    component.variants.forEach((variant) => {
      details += `### ${variant.name}\n`;
      details += `**Values**: ${variant.values.map((v) => `\`${v}\``).join(', ')}\n`;
      if (variant.default) {
        details += `**Default**: \`${variant.default}\`\n`;
      }
      details += `\n`;
    });
  }

  // Examples
  details += `## Examples\n\n`;
  component.examples.forEach((example) => {
    details += `### ${example.title}\n`;
    details += `${example.description}\n\n`;
    details += `\`\`\`html\n${example.code}\n\`\`\`\n\n`;
  });

  // Related Components
  if (component.relatedComponents && component.relatedComponents.length > 0) {
    details += `## Related Components\n\n`;
    details += component.relatedComponents.map((c) => `- ${c}`).join('\n');
    details += `\n`;
  }

  return details;
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
