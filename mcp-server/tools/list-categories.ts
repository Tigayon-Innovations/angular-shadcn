/**
 * List Categories Tool
 *
 * Lists all available component categories with descriptions.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { componentCategories, componentsData } from '../components-data.js';

export const listCategoriesTool: Tool = {
  name: 'list_categories',
  description: 'List all available component categories with descriptions.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export function handleListCategories() {
  let text = `# Component Categories\n\n`;

  Object.entries(componentCategories).forEach(([key, value]) => {
    const count = componentsData.filter((c) => c.category === key).length;
    text += `## ${value}\n`;
    text += `- **Category ID**: \`${key}\`\n`;
    text += `- **Components**: ${count}\n\n`;
  });

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
