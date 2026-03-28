/**
 * MCP Handler for Angular SSR
 *
 * This handler can be integrated into your Angular server.ts file
 * to serve MCP over HTTP directly from your deployed application.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { Request, Response } from 'express';
import { toolHandlers, tools } from './tools/index.js';

// Store active MCP connections
const connections = new Map<string, Server>();

/**
 * Handle MCP SSE connections
 */
export async function handleMcpSse(req: Request, res: Response): Promise<void> {
  const connectionId = Math.random().toString(36).substring(7);

  const transport = new SSEServerTransport('/api/mcp/message', res);
  const server = new Server(
    {
      name: 'ng-cn',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  // Setup tool handlers
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
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

  server.onerror = (error) => {
    console.error('[MCP Error]', error);
  };

  connections.set(connectionId, server);

  // Clean up on disconnect
  req.on('close', () => {
    connections.delete(connectionId);
    console.log(`MCP connection ${connectionId} closed`);
  });

  await server.connect(transport);
  console.log(`MCP connection ${connectionId} established`);
}

/**
 * Handle MCP messages
 */
export function handleMcpMessage(req: Request, res: Response): void {
  // The SSE transport handles this automatically
  res.sendStatus(202);
}

/**
 * Get MCP server info
 */
export function getMcpInfo(req: Request, res: Response): void {
  res.json({
    name: 'ng-cn MCP Server',
    version: '0.1.0',
    description: 'Model Context Protocol server for ng-cn components',
    transport: 'Server-Sent Events (SSE)',
    endpoints: {
      sse: '/api/mcp/sse',
      message: '/api/mcp/message',
      info: '/api/mcp',
    },
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
    })),
    activeConnections: connections.size,
  });
}
