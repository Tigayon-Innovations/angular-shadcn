#!/usr/bin/env node

/**
 * shadcn-angular MCP Server (Stdio)
 *
 * Provides Model Context Protocol tools for querying and installing shadcn-angular components.
 * This version uses stdio transport for local development.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { toolHandlers, tools } from './tools/index.js';

class ShadcnAngularServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'shadcn-angular',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools,
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        const handler = toolHandlers[name as keyof typeof toolHandlers];
        if (!handler) {
          throw new Error(`Unknown tool: ${name}`);
        }
        return handler(args);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text' as const,
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('shadcn-angular MCP server running on stdio');
  }
}

// Start the server
const server = new ShadcnAngularServer();
server.run().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
