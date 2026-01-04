/**
 * Get Install Command Tool
 *
 * Generates installation commands for multiple shadcn-angular components at once.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { getComponent } from '../components-data.js';
import { ComponentMetadata, PackageManager } from '../types.js';

export const getInstallCommandTool: Tool = {
  name: 'get_install_command',
  description:
    'Generate installation commands for multiple shadcn-angular components at once. Supports npm, pnpm, yarn, bun, and ng add.',
  inputSchema: {
    type: 'object',
    properties: {
      components: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Array of component names to install',
      },
      packageManager: {
        type: 'string',
        enum: ['npm', 'pnpm', 'yarn', 'bun'],
        description: 'Package manager to use (default: npm)',
      },
    },
    required: ['components'],
  },
};

const PACKAGE_MANAGERS: PackageManager[] = [
  {
    name: 'npm',
    addCommand: 'npm install',
    ngAddCommand: 'ng add',
  },
  {
    name: 'pnpm',
    addCommand: 'pnpm add',
    ngAddCommand: 'ng add',
  },
  {
    name: 'yarn',
    addCommand: 'yarn add',
    ngAddCommand: 'ng add',
  },
  {
    name: 'bun',
    addCommand: 'bun add',
    ngAddCommand: 'ng add',
  },
];

export function handleGetInstallCommand(args: any) {
  const { components, packageManager = 'npm' } = args;

  if (!Array.isArray(components) || components.length === 0) {
    return {
      content: [
        {
          type: 'text' as const,
          text: 'Please provide an array of component names to install.',
        },
      ],
    };
  }

  const componentData = components
    .map((name) => getComponent(name))
    .filter((c): c is ComponentMetadata => c !== undefined);

  if (componentData.length === 0) {
    return {
      content: [
        {
          type: 'text' as const,
          text: 'None of the specified components were found.',
        },
      ],
    };
  }

  const packages = componentData.map((c) => c.package);
  const dependencies = new Set<string>();
  componentData.forEach((c) => c.dependencies.forEach((d) => dependencies.add(d)));

  const pm = PACKAGE_MANAGERS.find((p) => p.name === packageManager) || PACKAGE_MANAGERS[0];

  let text = `# Installation Commands\n\n`;
  text += `## Using ${pm.name}\n\n`;
  text += `\`\`\`bash\n`;
  text += `${pm.addCommand} ${packages.join(' ')}`;

  if (dependencies.size > 0) {
    text += ` ${Array.from(dependencies).join(' ')}`;
  }

  text += `\n\`\`\`\n\n`;

  text += `## Using Angular CLI (ng add)\n\n`;
  text += `\`\`\`bash\n`;
  packages.forEach((pkg) => {
    text += `${pm.ngAddCommand} ${pkg}\n`;
  });
  text += `\`\`\`\n\n`;

  text += `## Components to Install\n\n`;
  componentData.forEach((c) => {
    text += `- **${c.name}**: ${c.description}\n`;
  });

  if (dependencies.size > 0) {
    text += `\n## Required Dependencies\n\n`;
    Array.from(dependencies).forEach((dep) => {
      text += `- ${dep}\n`;
    });
  }

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
