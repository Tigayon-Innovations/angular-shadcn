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

  const text = `# Search Results\n\nFound ${results.length} component(s)\n\n` +
    results
      .map(
        (c) =>
          `## ${c.name}\n` +
          `- **Selector**: \`${c.selector}\`\n` +
          `- **Category**: ${c.category}\n` +
          `- **Package**: ${c.package}\n` +
          `- **Description**: ${c.description}\n`
      )
      .join('\n');

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
