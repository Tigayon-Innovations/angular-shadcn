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
  let text = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `  COMPONENT CATEGORIES\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  const categoryDescriptions: Record<string, string> = {
    basic: 'Core UI components like menus, tabs, and navigation',
    form: 'Form inputs, controls, and validation components',
    layout: 'Layout and spacing components like cards, separators',
    overlay: 'Dialogs, popovers, tooltips, and notifications',
    complex: 'Feature-rich components like calendars, tables',
    advanced: 'Specialized components for advanced use cases',
  };

  Object.entries(componentCategories).forEach(([key, value]) => {
    const count = componentsData.filter((c) => c.category === key).length;
    text += `📁 ${value}\n`;
    text += `   ID: ${key}\n`;
    text += `   Components: ${count}\n`;
    text += `   ${categoryDescriptions[key] || ''}\n\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Use search_components with category filter to list components.\n`;
  text += `Example: search_components({ category: "form" })\n`;

  return {
    content: [
      {
        type: 'text' as const,
        text,
      },
    ],
  };
}
