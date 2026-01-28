/**
 * Get Install Command Tool
 *
 * Generates installation commands for multiple ng-cn components at once.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { getComponent } from '../components-data.js';
import { ComponentMetadata, PackageManager } from '../types.js';

export const getInstallCommandTool: Tool = {
  name: 'get_install_command',
  description:
    'Generate installation commands for multiple ng-cn components at once. Supports npm, pnpm, yarn, bun, and ng add.',
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

  let text = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `  INSTALLATION COMMANDS\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  text += `📦 RECOMMENDED: Angular CLI Schematic\n`;
  text += `─────────────────────────────────────────────────────────────\n\n`;
  componentData.forEach((c) => {
    const kebab = c.selector.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    text += `  ng g @ng-cn/core:c ${kebab}\n`;
  });
  text += `\n`;

  text += `📦 ALTERNATIVE: ${pm.name.toUpperCase()}\n`;
  text += `─────────────────────────────────────────────────────────────\n\n`;
  text += `  ${pm.addCommand} ${packages.join(' ')}`;
  if (dependencies.size > 0) {
    text += ` ${Array.from(dependencies).join(' ')}`;
  }
  text += `\n\n`;

  text += `📋 COMPONENTS TO INSTALL (${componentData.length})\n`;
  text += `─────────────────────────────────────────────────────────────\n\n`;
  componentData.forEach((c) => {
    text += `  ✓ ${c.name}\n`;
    text += `    ${c.description}\n\n`;
  });

  text += `📝 NEXT STEPS\n`;
  text += `─────────────────────────────────────────────────────────────\n\n`;
  text += `  1. Run the installation command above\n`;
  text += `  2. Import the component in your Angular component:\n\n`;
  componentData.forEach((c) => {
    text += `     ${c.usage.trim().split('\n')[0]}\n`;
  });
  text += `\n  3. Use the selector in your template\n\n`;

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
