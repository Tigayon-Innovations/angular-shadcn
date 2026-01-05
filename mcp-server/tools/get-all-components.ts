/**
 * Get All Components Tool
 *
 * Gets a complete list of all available ng-cn components.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { componentCategories, componentsData } from '../components-data.js';

export const getAllComponentsTool: Tool = {
  name: 'get_all_components',
  description: 'Get a complete list of all available ng-cn components with their basic information.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export function handleGetAllComponents() {
  let text = `# All ng-cn Components\n\n`;
  text += `Total: ${componentsData.length} components\n\n`;

  Object.entries(componentCategories).forEach(([key, value]) => {
    const categoryComponents = componentsData.filter((c) => c.category === key);

    if (categoryComponents.length > 0) {
      text += `## ${value}\n\n`;
      categoryComponents.forEach((c) => {
        text += `### ${c.name}\n`;
        text += `- **Selector**: \`${c.selector}\`\n`;
        text += `- **Package**: ${c.package}\n`;
        text += `- **Description**: ${c.description}\n\n`;
      });
    }
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
