# shadcn-angular MCP Server

## Overview

The **shadcn-angular MCP Server** provides a Model Context Protocol interface for querying and installing shadcn-angular components. It allows AI assistants like Claude to provide detailed component information, installation instructions for multiple package managers (npm, pnpm, yarn, bun), and ng add commands.

**🎉 Now Available as a Hosted Service** - Access the MCP server at `https://shadcn-angular.tigayon.com/mcp`. No build steps, no local setup required!

## Features

- 🔍 **Search Components**: Find components by name, description, or category
- 📦 **Get Component Details**: Comprehensive information including inputs, outputs, examples, and installation instructions
- 🛠️ **Installation Commands**: Support for npm, pnpm, yarn, bun, and ng add
- 📚 **Component Categories**: Browse components by category (basic, form, layout, overlay, complex, advanced)
- 🎯 **Batch Installation**: Generate commands to install multiple components at once
- ✨ **Zero Setup**: Hosted service accessible via URL - no dependencies required

## Quick Start

### Option 1: Use the Hosted Service (Recommended)

Simply add this URL to your IDE's MCP configuration:

```
https://shadcn-angular.tigayon.com/mcp
```

**Claude Desktop Configuration:**
```json
{
  "mcpServers": {
    "shadcn-angular": {
      "url": "https://shadcn-angular.tigayon.com/mcp",
      "transport": {
        "type": "sse"
      }
    }
  }
}
```

See [QUICKSTART.md](QUICKSTART.md) for complete setup instructions for all IDEs.

### Option 2: Run Locally (For Development)

If you're developing the MCP server itself or want to run it locally:

### Zed Editor

1. **Open Zed settings** (`Cmd/Ctrl + ,`)

2. **Add to your `settings.json`:**

```json
{
  "context_servers": {
    "shadcn-angular": {
      "command": {
        "path": "node",
        "args": ["/absolute/path/to/shadcn-angular/dist/mcp-server/index.js"]
      }
    }
  }
}
```

3. **Restart Zed** for the changes to take effect.

### Cline (VS Code Extension)

1. **Open VS Code Settings** (`Cmd/Ctrl + ,`)

2. **Search for** "Cline: MCP Settings"

3. **Add the server configuration:**

```json
{
  "mcpServers": {
    "shadcn-angular": {
      "command": "node",
      "args": ["/absolute/path/to/shadcn-angular/dist/mcp-server/index.js"]
    }
  }
}
```

### Other MCP Clients

For other MCP clients, refer to their documentation for configuring MCP servers. Generally, you'll need to provide:

- **Command**: `node`
- **Arguments**: `["/absolute/path/to/shadcn-angular/dist/mcp-server/index.js"]`

## Available Tools

The MCP server provides the following tools:

### 1. `search_components`

Search for components by name, description, or category.

**Parameters:**
- `query` (optional): Search query string
- `category` (optional): Filter by category (`basic`, `form`, `layout`, `overlay`, `complex`, `advanced`)

**Example:**
```
Search for button components in shadcn-angular
```

### 2. `get_component`

Get detailed information about a specific component.

**Parameters:**
- `name` (required): Component name or selector
- `packageManager` (optional): Preferred package manager (`npm`, `pnpm`, `yarn`, `bun`)

**Example:**
```
Get details for the Button component with pnpm installation commands
```

### 3. `get_install_command`

Generate installation commands for multiple components.

**Parameters:**
- `components` (required): Array of component names
- `packageManager` (optional): Package manager to use

**Example:**
```
Generate installation commands for Button, Card, and Input components using pnpm
```

### 4. `list_categories`

List all available component categories.

**Example:**
```
List all component categories in shadcn-angular
```

### 5. `get_all_components`

Get a complete list of all available components.

**Example:**
```
Show me all available shadcn-angular components
```

## Usage Examples

Once configured, you can interact with the MCP server through your AI assistant:

### Example 1: Search for Components

**User**: "Show me all form components in shadcn-angular"

**Assistant** will use the `search_components` tool with `category: "form"` and display:
- Input
- Checkbox
- Select
- Radio Group
- etc.

### Example 2: Get Component Details

**User**: "How do I install the Button component using pnpm?"

**Assistant** will use the `get_component` tool with `name: "Button"` and `packageManager: "pnpm"` and provide:
- Complete installation instructions
- Usage examples
- API documentation
- Variants and options

### Example 3: Install Multiple Components

**User**: "Generate installation commands for Dialog, Button, and Card components using yarn"

**Assistant** will use the `get_install_command` tool and provide:
- Yarn installation command
- ng add commands
- List of dependencies
- Component descriptions

### Example 4: Installation Options

For any component, the MCP server provides multiple installation methods:

```bash
# npm
npm install @shadcn-angular/button

# pnpm
pnpm add @shadcn-angular/button

# yarn
yarn add @shadcn-angular/button

# bun
bun add @shadcn-angular/button

# Angular CLI
ng add @shadcn-angular/button
```

## Troubleshooting

### MCP Server Not Appearing

1. **Verify the build**: Check that `dist/mcp-server/index.js` exists
2. **Check the path**: Ensure the absolute path in your config is correct
3. **Restart the client**: Completely quit and restart your MCP client
4. **Check logs**: Look for error messages in your client's logs

### Build Errors

```bash
# Clean and rebuild
rm -rf dist/mcp-server
npm run build:mcp
```

### Permission Issues

```bash
# Make the built file executable
chmod +x dist/mcp-server/index.js
```

## Development

### Project Structure

```
mcp-server/
├── index.ts              # Main MCP server implementation
├── types.ts              # TypeScript type definitions
├── components-data.ts    # Component metadata
└── README.md            # This file
```

### Adding New Components

To add a new component to the MCP server:

1. Open `mcp-server/components-data.ts`
2. Add a new entry to the `componentsData` array:

```typescript
{
  name: 'YourComponent',
  selector: 'YourComponent',
  package: '@shadcn-angular/your-component',
  description: 'Component description',
  category: 'basic', // or 'form', 'layout', etc.
  dependencies: [],
  inputs: [
    {
      name: 'inputName',
      type: 'string',
      description: 'Input description',
      default: "'default'",
      required: false,
    },
  ],
  examples: [
    {
      title: 'Basic Example',
      description: 'Example description',
      code: '<YourComponent>Content</YourComponent>',
    },
  ],
  installation: {
    npm: 'npm install @shadcn-angular/your-component',
    pnpm: 'pnpm add @shadcn-angular/your-component',
    yarn: 'yarn add @shadcn-angular/your-component',
    bun: 'bun add @shadcn-angular/your-component',
    ngAdd: 'ng add @shadcn-angular/your-component',
    manual: {
      description: 'Manual installation description',
      steps: ['Step 1', 'Step 2'],
      files: ['path/to/file.ts'],
    },
  },
  usage: 'import { YourComponent } from "@/lib/components/ui/your-component";',
  relatedComponents: ['RelatedComponent1'],
}
```

3. Rebuild the MCP server:

```bash
npm run build:mcp
```

### Testing

Test the MCP server locally:

```bash
# Run the server directly
node dist/mcp-server/index.js

# The server will wait for MCP protocol messages on stdin
```

## Support

- **Documentation**: [shadcn-angular docs](https://shadcn-angular.dev)
- **Issues**: [GitHub Issues](https://github.com/yourusername/shadcn-angular/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/shadcn-angular/discussions)

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

---

Built with ❤️ for the Angular community
