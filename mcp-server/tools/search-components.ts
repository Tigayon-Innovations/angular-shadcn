/**
 * Search Components Tool
 *
 * Searches for ng-cn components by name, description, or category.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { searchComponents } from '../components-data.js';

export const searchComponentsTool: Tool = {
  name: 'search_components',
  description:
    'Search for ng-cn components by name, description, or category. Returns a list of matching components with their basic information.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query to match component names or descriptions',
      },
      category: {
        type: 'string',
        enum: ['basic', 'form', 'layout', 'overlay', 'complex', 'advanced'],
        description: 'Filter by component category',
      },
    },
  },
};

export function handleSearchComponents(args: any) {
  const { query = '', category } = args;
  const results = searchComponents(query, category);

  let text = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `  SEARCH RESULTS\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (query) text += `Query: "${query}"\n`;
  if (category) text += `Category: ${category}\n`;
  text += `Found: ${results.length} component(s)\n\n`;

  if (results.length === 0) {
    text += `No components found. Try a different search term.\n`;
  } else {
    results.forEach((c) => {
      text += `─────────────────────────────────────────────────────────────\n`;
      text += `${c.name}\n`;
      text += `  Selector:  ${c.selector}\n`;
      text += `  Category:  ${c.category}\n`;
      text += `  Install:   ng g @ng-cn/core:c ${c.selector.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}\n`;
      text += `  ${c.description}\n\n`;
    });
  }

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Use get_component for detailed info about a specific component.\n`;

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
