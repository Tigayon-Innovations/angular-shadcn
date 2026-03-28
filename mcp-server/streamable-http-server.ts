#!/usr/bin/env node

/**
 * ng-cn MCP Streamable HTTP Server
 *
 * Provides Model Context Protocol over HTTP with streaming support.
 * Uses streamable HTTP transport for better compatibility and performance.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
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
  res.json({ status: 'ok', server: 'ng-cn-mcp', transport: 'streamable-http' });
});

// Create the MCP server instance
const mcpServer = new Server(
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
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
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

mcpServer.onerror = (error) => {
  console.error('[MCP Error]', error);
};

// Create transport instance
const transport = new StreamableHTTPServerTransport();

// MCP Streamable HTTP endpoint - handles both GET and POST
app.all('/mcp', async (req: Request, res: Response) => {
  try {
    await transport.handleRequest(req, res, req.body);
    console.log('MCP request handled via Streamable HTTP');
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to handle MCP request' });
    }
  }
});

// Simple info endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'ng-cn MCP Server',
    version: '0.1.0',
    description: 'Model Context Protocol server for ng-cn components',
    transport: 'Streamable HTTP',
    endpoints: {
      mcp: '/mcp',
      health: '/health',
    },
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
    })),
  });
});

// Initialize and start server
async function start() {
  // Connect the server to the transport
  await mcpServer.connect(transport);

  app.listen(PORT, () => {
    console.log(`\n🚀 ng-cn MCP Server running on http://localhost:${PORT}`);
    console.log(`📡 Streamable HTTP endpoint: http://localhost:${PORT}/mcp`);
    console.log(`💚 Health check: http://localhost:${PORT}/health\n`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
