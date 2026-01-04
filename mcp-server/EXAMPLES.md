# Example MCP Server Configurations

This directory contains example configuration files for various MCP clients.

## Claude Desktop

**File:** `claude_desktop_config.example.json`

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

**Steps:**
1. Copy the example config
2. Replace `/REPLACE/WITH/ABSOLUTE/PATH/TO/shadcn-angular` with your actual path
3. Save to the location above
4. Restart Claude Desktop

## Zed Editor

Add to your Zed `settings.json`:

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

## Cline (VS Code)

Add to Cline MCP settings in VS Code:

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

## Generic MCP Client

For any MCP-compatible client:

- **Command**: `node`
- **Arguments**: `["/absolute/path/to/shadcn-angular/dist/mcp-server/index.js"]`
- **Working Directory**: (optional)
- **Environment**: (optional, can be empty object)

## Important Notes

1. **Always use absolute paths** - relative paths may not work
2. **No trailing slashes** on the path
3. **Restart your client** after configuration changes
4. **Check the build** - run `npm run build:mcp` if `dist/mcp-server/index.js` doesn't exist
5. **Windows users**: Use forward slashes or escaped backslashes
   - Good: `C:/Users/Name/shadcn-angular/dist/mcp-server/index.js`
   - Also good: `C:\\Users\\Name\\shadcn-angular\\dist\\mcp-server\\index.js`
   - Bad: `C:\Users\Name\shadcn-angular\dist\mcp-server\index.js`

## Verification

After configuration, ask your AI assistant:

```
"List all shadcn-angular components"
```

or

```
"How do I install the Button component?"
```

You should get detailed responses with installation commands for multiple package managers.

## Troubleshooting

If the server doesn't appear:

1. Verify the build exists: `ls dist/mcp-server/index.js`
2. Check your path is absolute and correct
3. Completely quit and restart your client (don't just reload)
4. Check client logs for error messages

For more help, see [README.md](README.md) or [QUICKSTART.md](QUICKSTART.md).
