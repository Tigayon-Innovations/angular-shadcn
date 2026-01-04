# shadcn-angular MCP Server - Quick Start

## ✨ One-Click Setup

The easiest way to get started with MCP for shadcn-angular is using our automatic setup:

```bash
npm run mcp:setup
```

This will guide you through a simple wizard to configure Claude Desktop with either:
- **Local development**: `http://localhost:4000/api/mcp/sse`
- **Production**: Your deployed app URL

That's it! Just restart Claude Desktop and start using it.

## 🚀 How It Works

The MCP server is **built into your Angular SSR application**. When you deploy your app, the MCP endpoints are automatically available at:

- **SSE Endpoint**: `https://your-app.com/api/mcp/sse`
- **Message Endpoint**: `https://your-app.com/api/mcp/message`  
- **Info Endpoint**: `https://your-app.com/api/mcp`

No separate server to run, no complex configuration - just a URL!

## 📦 What's Inside

### File Structure

```
mcp-server/
├── tools/                      # Individual tool files
│   ├── search-components.ts    # Search for components
│   ├── get-component.ts        # Get component details
│   ├── get-install-command.ts  # Generate install commands
│   ├── list-categories.ts      # List component categories
│   ├── get-all-components.ts   # List all components
│   └── index.ts                # Tool registry
├── index.ts                    # Stdio server (for local dev)
├── http-server.ts              # Standalone HTTP server
├── ssr-handler.ts              # Angular SSR integration
├── setup-mcp.ts                # One-click setup script
├── components-data.ts          # Component metadata
└── types.ts                    # TypeScript types
```

### Available Tools

1. **search_components** - Find components by name, description, or category
2. **get_component** - Get detailed info about a specific component
3. **get_install_command** - Generate installation commands for multiple components
4. **list_categories** - List all component categories
5. **get_all_components** - Get complete list of components

## 🛠️ Development

### Local Development

For local development, you can run the standalone HTTP server:

```bash
npm run build:mcp
npm run mcp:dev
```

This starts an HTTP/SSE server on port 3100 (or MCP_PORT environment variable).

### Testing with Claude

After setup, try asking Claude:
- "What shadcn-angular components are available?"
- "Show me details about the Button component"
- "How do I install the Card and Avatar components?"

## 🌐 Deployment

The MCP server is automatically deployed with your Angular SSR app. No additional configuration needed!

The endpoints are available at `/api/mcp/*` on your deployed application.

## 📚 Documentation

For detailed documentation, visit your app's docs at:
`/docs/mcp-setup`

Or check out:
- [Setup Guide](../docs/MCP-SETUP.md)
- [Examples](./EXAMPLES.md)

## 🔧 Manual Configuration

If you prefer manual configuration, add this to your Claude Desktop config:

**Local Development:**
```json
{
  "mcpServers": {
    "shadcn-angular": {
      "url": "http://localhost:4000/api/mcp/sse",
      "transport": {
        "type": "sse"
      }
    }
  }
}
```

**Production:**
```json
{
  "mcpServers": {
    "shadcn-angular": {
      "url": "https://your-app.com/api/mcp/sse",
      "transport": {
        "type": "sse"
      }
    }
  }
}
```

Config file locations:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

## 🎯 Key Benefits

- ✅ **No separate server** - Built into your Angular SSR app
- ✅ **No complex setup** - Just run `npm run mcp:setup`
- ✅ **Works anywhere** - Local development or production
- ✅ **Simple URL** - Just configure once with your app URL
- ✅ **Auto-deployed** - Deploys with your app automatically

## 🤝 Contributing

To add new tools:

1. Create a new file in `mcp-server/tools/`
2. Export a `Tool` definition and handler function
3. Add to `mcp-server/tools/index.ts`

That's it! The tool will be automatically available via all transports.
