# MCP Server Quick Start

Get access to the shadcn-angular MCP server in 1 minute.

## What You'll Get

- AI assistant can search and explain all shadcn-angular components
- Installation commands for npm, pnpm, yarn, bun, and `ng add`
- Detailed API documentation and usage examples
- Component relationships and dependencies

## Prerequisites

- An MCP client (Claude Desktop, Zed, Cline, or any MCP-compatible IDE)
- Internet connection

## Setup (1 Minute)

### 1. The MCP Service URL

The shadcn-angular MCP server is hosted and ready to use:

```
https://shadcn-angular.tigayon.com/mcp
```

No installation, no build steps, no Node.js required!

### 2. Configure Your Client

Choose your IDE below and add the configuration:

#### Claude Desktop

**macOS:**
```bash
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```
notepad %APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
nano ~/.config/Claude/claude_desktop_config.json
```

Add this configuration:

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

#### Other Clients

**Zed Editor:**
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

**Cline (VS Code):**
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

See [MCP-SETUP.md](../docs/MCP-SETUP.md) for detailed setup for all clients.

### 3. Restart Your Client

Completely quit and restart (not just reload):
- macOS: `Cmd + Q` then reopen
- Windows: Exit from system tray, then reopen

## Verify It's Working

Ask your AI assistant:

```
"What components are available in shadcn-angular?"
```

or

```
"Show me how to install the Button component using pnpm"
```

You should get detailed, formatted responses with installation commands for multiple package managers.

## Common Issues

### Server Not Connecting

1. **Check the URL:**
   ```
   https://shadcn-angular.tigayon.com/mcp
   ```
   Verify there are no typos and you're using `https://`

2. **Check your internet connection:**
   The service requires an active internet connection

3. **Validate JSON configuration:**
   Ensure your config file has valid JSON syntax (no missing commas, proper quotes)

3. **Validate JSON configuration:**
   Ensure your config file has valid JSON syntax (no missing commas, proper quotes)

4. **Restart properly:**
   - Fully quit (don't just close window)
   - Wait 5 seconds
   - Reopen

### Still Not Working?

- Try accessing `https://shadcn-angular.tigayon.com` in your browser
- Check IDE logs for connection errors  
- See full troubleshooting: [MCP-SETUP.md](../docs/MCP-SETUP.md#troubleshooting)

## Example Usage

Once configured, you can ask:

### Finding Components
```
"Find all form components in shadcn-angular"
"Show me overlay components"
```

### Getting Details
```
"How do I use the Dialog component?"
"What inputs does the Select component have?"
"Show me Button component variants"
```

### Installation
```
"Install Dialog, Button, and Card with yarn"
"Generate pnpm command for Input and Form"
"How do I add the Checkbox component?"
```

### Multiple Package Managers
```
"Show me all installation options for the Card component"
```

The AI will provide:
- npm install command
- pnpm add command
- yarn add command
- bun add command
- ng add command
- Manual installation steps

## Next Steps

- Read the full [MCP Setup Guide](MCP-SETUP.md) for advanced configuration
- Explore the [Component Documentation](../README.md#component-categories)
- Check out [example queries](MCP-SETUP.md#usage-examples)

## Need Help?

- Full docs: [MCP-SETUP.md](MCP-SETUP.md)
- GitHub Issues: Report problems
- Discussions: Ask questions

---

**Ready to enhance your AI assistant with shadcn-angular knowledge!** 🚀
