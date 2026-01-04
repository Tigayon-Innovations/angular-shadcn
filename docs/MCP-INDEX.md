# MCP Server Documentation Index

Welcome to the shadcn-angular MCP (Model Context Protocol) Server documentation!

## 📚 Documentation Files

### Quick Start
- **[QUICKSTART.md](../mcp-server/QUICKSTART.md)** - Get up and running in 5 minutes

### Comprehensive Guide
- **[MCP-SETUP.md](MCP-SETUP.md)** - Complete setup and configuration guide

### Examples
- **[EXAMPLES.md](../mcp-server/EXAMPLES.md)** - Configuration examples for different clients

### Technical Reference
- **[README.md](../mcp-server/README.md)** - Technical documentation and API reference

## 🚀 Quick Links

### For First-Time Users
1. Start with [QUICKSTART.md](../mcp-server/QUICKSTART.md)
2. Configure your client using [EXAMPLES.md](../mcp-server/EXAMPLES.md)
3. Read [MCP-SETUP.md](MCP-SETUP.md) for detailed information

### For Developers
1. Review the [technical README](../mcp-server/README.md)
2. Check out the [component data structure](../mcp-server/components-data.ts)
3. Understand the [type definitions](../mcp-server/types.ts)

### For Troubleshooting
- [Common Issues](MCP-SETUP.md#troubleshooting) in MCP-SETUP.md
- [Verification steps](../mcp-server/QUICKSTART.md#verify-its-working) in QUICKSTART.md

## 🎯 What Can the MCP Server Do?

The shadcn-angular MCP server is now **hosted and accessible via HTTP** at:

```
https://shadcn-angular.tigayon.com/mcp
```

**✨ Zero Setup Required** - Just add the URL to your IDE config. No build steps, no dependencies, no local server!

The MCP service enables AI assistants to:

### 1. Search Components
Find components by name, description, or category:
- "Find all form components"
- "Show me button-related components"
- "List overlay components"

### 2. Get Detailed Information
Access comprehensive documentation:
- Input/output properties with types
- Variants and configuration options
- Usage examples and code snippets
- Dependencies and related components

### 3. Multi-Package Manager Installation
Generate installation commands for:
- npm
- pnpm
- yarn
- bun
- Angular CLI (`ng add`)
- Manual installation steps

### 4. Batch Operations
Install multiple components at once:
- "Install Dialog, Button, and Card with pnpm"
- Automatically includes all dependencies
- Provides both individual and batch install commands

### 5. Component Discovery
Browse and explore:
- List all categories
- View all components
- Discover related components

## 🛠️ Supported Clients

The MCP server works with:

- ✅ **Claude Desktop** (Anthropic's official app)
- ✅ **Zed Editor** (Modern code editor)
- ✅ **Cline** (VS Code extension)
- ✅ Any MCP-compatible client

## 📦 Installation Overview

**The simplest setup ever:**

1. **Add the URL** to your IDE's MCP configuration:
   ```
   https://shadcn-angular.tigayon.com/mcp
   ```

2. **Configure your client** - See IDE-specific instructions in [MCP-SETUP.md](MCP-SETUP.md)

3. **Restart your client**

4. **Start asking questions!**

No build steps, no dependencies, no Node.js required. The MCP service is hosted and ready to use.

## 🔍 Example Queries

Once configured, you can ask your AI assistant:

### Finding Components
```
"What components are available in shadcn-angular?"
"Show me all form components"
"Find components related to dialogs"
```

### Installation
```
"How do I install the Button component using pnpm?"
"Install Dialog, Card, and Input with yarn"
"Show me all installation options for Select"
```

### Documentation
```
"What inputs does the Checkbox component accept?"
"Show me Button variants"
"How do I use the Form component?"
"What's the difference between Dialog and Sheet?"
```

### Usage Examples
```
"Show me an example of using the Card component"
"How do I create a form with Input and Button?"
"Give me examples of Dialog usage"
```

## 📖 Component Categories

The MCP server organizes components into categories:

- **Basic**: Button, Badge, Card, Alert, etc.
- **Form**: Input, Checkbox, Select, Radio Group, etc.
- **Layout**: Tabs, Accordion, Table, Pagination, etc.
- **Overlay**: Dialog, Sheet, Drawer, Tooltip, etc.
- **Complex**: Data Table, Calendar, Carousel, etc.
- **Advanced**: Navigation Menu, Sidebar, Toast, etc.

See [Component Categories](MCP-SETUP.md#component-categories) for complete lists.

## 🤝 Contributing

To add or update component documentation:

1. Edit [components-data.ts](../mcp-server/components-data.ts)
2. Add component metadata with all fields
3. Run `npm run build:mcp`
4. Test with your AI assistant
5. Submit a pull request

See [Development](../mcp-server/README.md#development) for detailed instructions.

## 🐛 Troubleshooting

### Server Not Showing Up?
- Verify the URL: `https://shadcn-angular.tigayon.com/mcp`
- Ensure you have internet connectivity
- Check your IDE's config file for valid JSON syntax
- Completely restart your client (don't just reload)

### Still Need Help?
- Read the [full troubleshooting guide](MCP-SETUP.md#troubleshooting)
- Check [GitHub Issues](https://github.com/yourusername/shadcn-angular/issues)
- Ask in [Discussions](https://github.com/yourusername/shadcn-angular/discussions)

## 🎓 Learn More

### About MCP
- [Model Context Protocol](https://modelcontextprotocol.io) - Official MCP documentation
- [Anthropic MCP](https://www.anthropic.com/news/model-context-protocol) - Introduction by Anthropic

### About shadcn-angular
- [Main README](../README.md) - Project overview
- [Component Documentation](../README.md#component-categories) - Component guides
- [Installation Guide](installation/) - Project setup

## 📄 File Structure

```
mcp-server/
├── index.ts              # Main MCP server implementation
├── types.ts              # TypeScript type definitions
├── components-data.ts    # Component metadata database
├── tsconfig.json         # TypeScript config
├── package.json          # Package metadata
├── README.md            # Technical documentation
├── QUICKSTART.md        # Quick start guide
├── EXAMPLES.md          # Configuration examples
└── claude_desktop_config.example.json

docs/
├── MCP-SETUP.md         # Comprehensive setup guide
└── MCP-INDEX.md         # This file
```

## 🚦 Getting Started Checklist

- [ ] Read [QUICKSTART.md](../mcp-server/QUICKSTART.md)
- [ ] Add MCP URL to your IDE config: `https://shadcn-angular.tigayon.com/mcp`
- [ ] Configure using [EXAMPLES.md](../mcp-server/EXAMPLES.md) or [MCP-SETUP.md](MCP-SETUP.md)
- [ ] Restart your client
- [ ] Test: Ask "List shadcn-angular components"
- [ ] Explore: Try different queries
- [ ] Build amazing Angular applications!

## ✨ What's Next?

After setup:
1. Explore component categories
2. Try different installation methods
3. Ask for usage examples
4. Discover related components
5. Build amazing Angular applications!

---

**Need immediate help?** Start with [QUICKSTART.md](../mcp-server/QUICKSTART.md)

**Want comprehensive info?** Read [MCP-SETUP.md](MCP-SETUP.md)

**Looking for examples?** Check [EXAMPLES.md](../mcp-server/EXAMPLES.md)

**Building your own?** See the [technical README](../mcp-server/README.md)

---

Built with ❤️ for the Angular community
