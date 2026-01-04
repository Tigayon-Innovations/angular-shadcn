# MCP Server for shadcn-angular

## Overview

This document provides comprehensive information about the **shadcn-angular MCP (Model Context Protocol) Server**. The MCP server enables AI assistants like Claude to provide intelligent assistance with shadcn-angular components, including detailed documentation, installation instructions for multiple package managers, and usage examples.

**🎉 New: HTTP-Based Setup** - The MCP server is now hosted at `https://shadcn-angular.tigayon.com/mcp` and accessible via a simple URL. No build steps, no local server, no dependencies required!

## What is MCP?

Model Context Protocol (MCP) is an open standard developed by Anthropic that enables AI assistants to securely access external data sources and tools. The shadcn-angular MCP server exposes component information through this protocol, allowing AI assistants to:

- Search and discover components
- Provide detailed API documentation
- Generate installation commands for npm, pnpm, yarn, and bun
- Show usage examples and best practices
- Explain component relationships and dependencies

## Features

### ✨ Zero-Setup Configuration
- **Hosted Service**: Access MCP at `https://shadcn-angular.tigayon.com/mcp`
- **No Build Required**: Works instantly without local setup
- **No Dependencies**: Just add a URL to your IDE config
- **Works Everywhere**: Compatible with Claude Desktop, Zed, Cline, and more

### 🔍 Component Search
Search across all shadcn-angular components by:
- Component name
- Description
- Category (basic, form, layout, overlay, complex, advanced)

### 📦 Multi-Package Manager Support
Installation instructions for:
- **npm**: `npm install @shadcn-angular/component`
- **pnpm**: `pnpm add @shadcn-angular/component`
- **yarn**: `yarn add @shadcn-angular/component`
- **bun**: `bun add @shadcn-angular/component`
- **Angular CLI**: `ng add @shadcn-angular/component`

### 📚 Comprehensive Documentation
For each component:
- Input properties with types and descriptions
- Output events
- Variants and configuration options
- Usage examples
- Related components
- Manual installation steps

### 🛠️ Batch Operations
Generate installation commands for multiple components simultaneously, including all required dependencies.

## Quick Setup

### Prerequisites

All you need:
- An MCP-compatible IDE (Claude Desktop, Zed, Cline, etc.)
- Internet connection

That's it! No Node.js, no build tools, no dependencies.

### Setup URL

The MCP server is hosted and ready to use at:

```
https://shadcn-angular.tigayon.com/mcp
```

Simply add this URL to your IDE's MCP configuration (see below for IDE-specific instructions).

## Configuration

### Claude Desktop

Claude Desktop is the official desktop application from Anthropic.

#### macOS

1. Open the configuration file:
   ```bash
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

#### macOS

1. Open the configuration file:
   ```bash
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. Add the MCP server:
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

3. Restart Claude Desktop.

#### Windows

1. Open the configuration file:
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```

2. Add the MCP server:
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

3. Restart Claude Desktop.

#### Linux

1. Open the configuration file:
   ```bash
   nano ~/.config/Claude/claude_desktop_config.json
   ```

2. Add the MCP server:
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

3. Restart Claude Desktop.

### Zed Editor

Zed is a modern, high-performance code editor with built-in AI features.

1. Open Zed settings: `Cmd/Ctrl + ,`

2. Click "Open settings.json"

3. Add the context server:
   ```json
   {
     "context_servers": {
       "shadcn-angular": {
         "settings": {
           "url": "https://shadcn-angular.tigayon.com/mcp"
         }
       }
     }
   }
   ```

4. Restart Zed.

### Cline (VS Code Extension)

Cline is a popular VS Code extension for AI-assisted coding.

1. Install the Cline extension from VS Code marketplace

2. Open VS Code settings: `Cmd/Ctrl + ,`

3. Search for "Cline: MCP Settings"

4. Add the server configuration:
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

5. Reload VS Code.

### Other MCP Clients

For other MCP-compatible clients:

1. Locate the MCP configuration file or settings
2. Add a server entry with:
   - **URL**: `https://shadcn-angular.tigayon.com/mcp`
   - **Transport**: `sse` (Server-Sent Events)
3. Restart the client

## Available Tools

### 1. search_components

Search for components by name, description, or category.

**Parameters:**
- `query` (string, optional): Search terms
- `category` (string, optional): One of `basic`, `form`, `layout`, `overlay`, `complex`, `advanced`

**Example queries:**
- "Find all button components"
- "Show me form components"
- "Search for dialog"

**Returns:**
- List of matching components with name, selector, package, and description

---

### 2. get_component

Get comprehensive details about a specific component.

**Parameters:**
- `name` (string, required): Component name or selector
- `packageManager` (string, optional): Preferred package manager (`npm`, `pnpm`, `yarn`, `bun`)

**Example queries:**
- "Show me the Button component documentation"
- "Get details for Card component with pnpm"
- "How do I use the Dialog component?"

**Returns:**
- Complete component documentation including:
  - Description and category
  - Installation commands for all package managers
  - Input properties with types and defaults
  - Output events
  - Variants and options
  - Usage examples
  - Related components

---

### 3. get_install_command

Generate installation commands for multiple components.

**Parameters:**
- `components` (array of strings, required): Component names to install
- `packageManager` (string, optional): Package manager to use

**Example queries:**
- "Install Button, Card, and Input using pnpm"
- "Generate npm install command for Dialog and Alert"
- "How do I add Select and Combobox with yarn?"

**Returns:**
- Installation commands for the specified package manager
- Angular CLI (ng add) commands
- List of components to install
- Required dependencies

---

### 4. list_categories

List all component categories with counts.

**Example queries:**
- "What component categories are available?"
- "List all categories"
- "Show me component types"

**Returns:**
- All categories with:
  - Category name
  - Category ID
  - Number of components

---

### 5. get_all_components

Get a complete list of all available components.

**Example queries:**
- "Show all shadcn-angular components"
- "List every component"
- "What components are available?"

**Returns:**
- Complete component list organized by category
- Basic information for each component

## Usage Examples

### Example 1: Finding Components

**User**: "I need a component to display user information in a card"

**AI Assistant**:
1. Uses `search_components` with query "card"
2. Returns Card component information
3. Suggests related components (Alert, Dialog)

---

### Example 2: Installation with Preferred Package Manager

**User**: "How do I install the Button component? I use pnpm."

**AI Assistant**:
1. Uses `get_component` with name "Button" and packageManager "pnpm"
2. Provides:
   ```bash
   pnpm add @shadcn-angular/button
   # or
   ng add @shadcn-angular/button
   ```
3. Shows usage examples and API documentation

---

### Example 3: Multiple Component Installation

**User**: "I'm building a form. Install Input, Select, Checkbox, and Button using yarn"

**AI Assistant**:
1. Uses `get_install_command` with components array and packageManager "yarn"
2. Generates:
   ```bash
   yarn add @shadcn-angular/input @shadcn-angular/select @shadcn-angular/checkbox @shadcn-angular/button @angular/cdk
   ```
3. Lists all components with descriptions
4. Notes required dependencies (@angular/cdk)

---

### Example 4: Component Documentation

**User**: "What inputs does the Dialog component accept?"

**AI Assistant**:
1. Uses `get_component` with name "Dialog"
2. Displays:
   - All input properties with types
   - Default values
   - Required vs optional inputs
   - Usage examples showing each input

## Component Categories

### Basic Components
Core UI elements for building interfaces:
- Button
- Badge
- Card
- Alert
- Separator
- Skeleton
- Avatar
- Progress

### Form Components
Input and form-related components:
- Input
- Checkbox
- Select
- Radio Group
- Switch
- Slider
- Textarea
- Form

### Layout Components
Structural components for organizing content:
- Tabs
- Accordion
- Collapsible
- Scroll Area
- Resizable
- Table
- Pagination

### Overlay Components
Components that appear over other content:
- Dialog
- Sheet
- Drawer
- Popover
- Tooltip
- Hover Card
- Context Menu
- Dropdown Menu

### Complex Components
Advanced components with rich functionality:
- Data Table
- Calendar
- Date Picker
- Command
- Combobox
- Carousel

### Advanced Components
Specialized components for specific use cases:
- Navigation Menu
- Menubar
- Breadcrumb
- Sidebar
- Toast
- Input OTP

## Troubleshooting

### Server Not Connecting

**Symptoms:**
- MCP server not listed in client
- Tools not available in AI assistant

**Solutions:**

1. **Verify the URL:**
   - Ensure you're using the correct URL: `https://shadcn-angular.tigayon.com/mcp`
   - No trailing slashes
   - Use `https://`, not `http://`

2. **Check your internet connection:**
   - The MCP service requires an active internet connection
   - Try accessing the URL in your browser to verify it's reachable

3. **Validate JSON configuration:**
   - Ensure your config file has valid JSON syntax
   - No trailing commas
   - Proper quotes and braces

4. **Restart the client completely:**
   - Don't just reload, fully quit and restart
   - On macOS: `Cmd + Q`
   - On Windows: Close from system tray
   - On Linux: Fully quit the application

5. **Check client logs:**
   - Claude Desktop: `~/Library/Logs/Claude/` (macOS)
   - Look for error messages mentioning the MCP server or connection issues

### Service Unavailable

**Error: Cannot connect to MCP service**

**Solutions:**
- The hosted MCP service might be temporarily unavailable
- Check if `https://shadcn-angular.tigayon.com` is accessible in your browser
- Try again in a few minutes
- Check for any service status updates

### Transport Type Issues

**Error: Unsupported transport type**

**Solution:**
Ensure your client supports SSE (Server-Sent Events) transport. Most modern MCP clients do. The configuration should include:
```json
{
  "transport": {
    "type": "sse"
  }
}
```

### IDE-Specific Issues

**Claude Desktop:**
- Ensure you're using the latest version
- Check the config file is in the correct location
- Look for syntax errors in JSON

**Zed:**
- Some Zed versions may require `"url"` directly without transport config
- Check Zed's MCP documentation for your specific version

**Cline/VS Code:**
- Ensure the Cline extension is up to date
- Try reloading the VS Code window after configuration changes

## Development

### Project Structure

```
mcp-server/
├── index.ts              # Main MCP server implementation
├── types.ts              # TypeScript interfaces and types
├── components-data.ts    # Component metadata and search logic
├── tsconfig.json         # TypeScript configuration
└── README.md            # Detailed setup guide
```

### Adding New Components

To extend the MCP server with new components:

1. **Edit components-data.ts:**

```typescript
export const componentsData: ComponentMetadata[] = [
  // ... existing components
  {
    name: 'NewComponent',
    selector: 'NewComponent',
    package: '@shadcn-angular/new-component',
    description: 'Description of the new component',
    category: 'basic', // or 'form', 'layout', etc.
    dependencies: ['@angular/cdk'], // if needed
    inputs: [
      {
        name: 'variant',
        type: "'primary' | 'secondary'",
        description: 'The variant of the component',
        default: "'primary'",
        required: false,
      },
    ],
    outputs: [
      {
        name: 'valueChange',
        type: 'EventEmitter<string>',
        description: 'Emitted when value changes',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple example',
        code: '<NewComponent>Content</NewComponent>',
      },
    ],
    installation: {
      npm: 'npm install @shadcn-angular/new-component',
      pnpm: 'pnpm add @shadcn-angular/new-component',
      yarn: 'yarn add @shadcn-angular/new-component',
      bun: 'bun add @shadcn-angular/new-component',
      ngAdd: 'ng add @shadcn-angular/new-component',
      manual: {
        description: 'Manual installation steps',
        steps: [
          'Create directory src/app/lib/components/ui/new-component',
          'Copy new-component.component.ts',
          'Import NewComponent in your component',
        ],
        files: [
          'src/app/lib/components/ui/new-component/new-component.component.ts',
        ],
      },
    },
    usage: 'import { NewComponent } from "@/lib/components/ui/new-component";',
    variants: [
      {
        name: 'variant',
        values: ['primary', 'secondary'],
        default: 'primary',
      },
    ],
    relatedComponents: ['Button', 'Card'],
  },
];
```

2. **Rebuild the MCP server:**
   ```bash
   npm run build:mcp
   ```

3. **Test the new component:**
   - Ask your AI assistant about the new component
   - Verify all information is correct

### Testing Locally

Test the MCP server in standalone mode:

```bash
# Run the server
node dist/mcp-server/index.js

# It will wait for MCP protocol messages on stdin
# Press Ctrl+C to exit
```

### Debugging

Enable debug logging by checking your MCP client's debug settings. Most clients log MCP communication which can help diagnose issues.

## Best Practices

### For Users

1. **Always rebuild after updates:**
   ```bash
   git pull
   npm install
   npm run build:mcp
   ```

2. **Use absolute paths** in configuration files

3. **Restart your client** after configuration changes

4. **Be specific in queries:**
   - Good: "Show me the Dialog component with pnpm installation"
   - Better than: "dialog"

### For Developers

1. **Keep component metadata complete:**
   - All inputs with types and descriptions
   - Output events
   - Real usage examples
   - Accurate dependencies

2. **Test with multiple package managers:**
   - Verify installation commands work
   - Check dependency lists

3. **Document edge cases:**
   - Special installation steps
   - Platform-specific instructions

4. **Update related components:**
   - Keep relationships accurate
   - Update when new related components are added

## Integration with CI/CD

### Automated Testing

Add MCP server build to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Build MCP Server
  run: npm run build:mcp

- name: Test MCP Server
  run: node dist/mcp-server/index.js --version
```

### Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
npm run build:mcp
```

## FAQ

**Q: Do I need to rebuild the MCP server after updating components?**
A: Yes, run `npm run build:mcp` after adding or modifying components in the codebase.

**Q: Can I use multiple MCP servers simultaneously?**
A: Yes, most MCP clients support multiple servers. Add them to the configuration file with different names.

**Q: How do I know if the MCP server is working?**
A: Ask your AI assistant about shadcn-angular components. If it provides detailed information with installation commands, the server is working.

**Q: Can I contribute new components to the metadata?**
A: Yes! Follow the "Adding New Components" section and submit a pull request.

**Q: Does this work with private/self-hosted AI assistants?**
A: Yes, as long as your AI assistant supports the Model Context Protocol.

## Resources

- **MCP Documentation**: https://modelcontextprotocol.io
- **shadcn-angular GitHub**: https://github.com/yourusername/shadcn-angular
- **Claude Desktop**: https://claude.ai/download
- **Zed Editor**: https://zed.dev
- **Anthropic MCP SDK**: https://github.com/anthropics/anthropic-sdk-typescript

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch
3. Add or update component metadata
4. Test the MCP server
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Discord**: Join our community (link TBD)

---

**Built with ❤️ for the Angular community**

*Last updated: January 2026*
