/**
 * Tool Registry
 *
 * Exports all MCP tools and their handlers.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { getAllComponentsTool, handleGetAllComponents } from './get-all-components.js';
import { getComponentTool, handleGetComponent } from './get-component.js';
import { getInstallCommandTool, handleGetInstallCommand } from './get-install-command.js';
import { handleListCategories, listCategoriesTool } from './list-categories.js';
import { handleSearchComponents, searchComponentsTool } from './search-components.js';

export const tools: Tool[] = [
  searchComponentsTool,
  getComponentTool,
  getInstallCommandTool,
  listCategoriesTool,
  getAllComponentsTool,
];

export const toolHandlers = {
  search_components: handleSearchComponents,
  get_component: handleGetComponent,
  get_install_command: handleGetInstallCommand,
  list_categories: handleListCategories,
  get_all_components: handleGetAllComponents,
};
