/**
 * ng-cn MCP HTTP/SSE Server
 *
 * Provides Model Context Protocol over HTTP with Server-Sent Events.
 * This can be deployed as part of your Angular SSR application.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import express, { Request, Response } from 'express';
import { toolHandlers, tools } from './tools/index.js';

const app = express();
const PORT = process.env.MCP_PORT || 3100;

app.use(express.json());

// CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', server: 'ng-cn-mcp' });
});

// MCP SSE endpoint
app.get('/sse', async (req: Request, res: Response) => {
  const transport = new SSEServerTransport('/message', res);
  const server = new Server(
    {
      name: 'ng-cn',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
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

  await server.connect(transport);
  console.log('MCP client connected via SSE');
});

// Message endpoint for SSE transport
app.post('/message', async (req: Request, res: Response) => {
  // The SSE transport handles this automatically
  res.sendStatus(202);
});

// Simple info endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'ng-cn MCP Server',
    version: '0.1.0',
    description: 'Model Context Protocol server for ng-cn components',
    endpoints: {
      sse: '/sse',
      message: '/message',
      health: '/health',
    },
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
    })),
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 ng-cn MCP Server running on http://localhost:${PORT}`);
  console.log(`📡 SSE endpoint: http://localhost:${PORT}/sse`);
  console.log(`💚 Health check: http://localhost:${PORT}/health\n`);
});
