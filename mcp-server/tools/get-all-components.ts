/**
 * Get All Components Tool
 *
 * Gets a complete list of all available ng-cn components with instructions.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { componentCategories, componentsData } from '../components-data.js';

export const getAllComponentsTool: Tool = {
  name: 'get_all_components',
  description:
    'Get a complete list of all available ng-cn components with their basic information.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export function handleGetAllComponents() {
  let text = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `  NG-CN COMPONENT LIBRARY\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  text += `Total Components: ${componentsData.length}\n\n`;
  text += `HOW TO USE:\n`;
  text += `  1. Install: ng g @ng-cn/core:c <component-name>\n`;
  text += `  2. Import the component in your Angular component\n`;
  text += `  3. Use the selector in your template\n\n`;

  Object.entries(componentCategories).forEach(([key, value]) => {
    const categoryComponents = componentsData.filter((c) => c.category === key);

    if (categoryComponents.length > 0) {
      text += `─────────────────────────────────────────────────────────────\n`;
      text += `📁 ${value.toUpperCase()} (${categoryComponents.length})\n`;
      text += `─────────────────────────────────────────────────────────────\n\n`;
      categoryComponents.forEach((c) => {
        text += `  ${c.name}\n`;
        text += `    Selector: ${c.selector}\n`;
        text += `    Install:  ng g @ng-cn/core:c ${c.selector
          .toLowerCase()
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()}\n`;
        text += `    ${c.description}\n\n`;
      });
    }
  });

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Use get_component tool with a component name for detailed info.\n`;

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
