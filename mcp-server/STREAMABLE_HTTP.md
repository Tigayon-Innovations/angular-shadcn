# ng-cn MCP Streamable HTTP Server

## Overview

The ng-cn MCP server now supports **Streamable HTTP** transport for better compatibility and performance with modern AI assistants and clients.

## Configuration

### MCP Client Configuration

Update your `mcp.json` to use the HTTP endpoint:

```json
{
  "servers": {
    "shadcn-angular": {
      "url": "http://localhost:3100/mcp"
    }
  }
}
```

### Starting the Server

#### Option 1: Using npm script
```bash
cd mcp-server
npm run dev:http
```

#### Option 2: Using the shell script
```bash
cd mcp-server
chmod +x start-http.sh
./start-http.sh
```

#### Option 3: Direct execution
```bash
cd mcp-server
npx tsx streamable-http-server.ts
```

## Environment Variables

- `MCP_PORT` - Server port (default: 3100)

Example:
```bash
MCP_PORT=3200 npx tsx streamable-http-server.ts
```

## Endpoints

- **POST `/mcp`** - Main MCP endpoint with streamable HTTP transport
- **GET `/health`** - Health check endpoint
- **GET `/`** - Server information and available tools

## Available Transports

The server now supports three transport methods:

1. **Streamable HTTP** (Recommended) - `streamable-http-server.ts`
   - Better compatibility with modern clients
   - Efficient streaming support
   - Standard HTTP/HTTPS protocol

2. **SSE (Server-Sent Events)** - `http-server.ts`
   - Real-time updates
   - HTTP-based

3. **Stdio** - `index.ts`
   - Local development
   - Direct process communication

## Migration from Stdio

If you were previously using stdio transport:

1. Start the HTTP server: `npm run dev:http`
2. Update your `mcp.json` to use the URL configuration (as shown above)
3. Restart your AI assistant/client

## Troubleshooting

### Port Already in Use
If port 3100 is already in use, set a different port:
```bash
MCP_PORT=3200 npm run dev:http
```

### Connection Issues
- Ensure the server is running before connecting
- Check firewall settings if connecting remotely
- Verify the URL in your MCP configuration

### Checking Server Status
Visit `http://localhost:3100/health` to verify the server is running.

## Benefits of Streamable HTTP

- ✅ Better compatibility with remote AI assistants
- ✅ Works through firewalls and proxies
- ✅ Standard HTTP protocol
- ✅ Efficient streaming for large responses
- ✅ Easier debugging with standard HTTP tools
