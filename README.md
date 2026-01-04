# shadcn-angular

A comprehensive Angular port of [shadcn/ui](https://ui.shadcn.com/) components, built with Angular 21+, Tailwind CSS 4+, and modern best practices.

## Features

- 🎨 **60+ Components**: Complete set of beautifully designed, accessible components
- 🔥 **Tailwind 4+**: Built with the latest Tailwind CSS v4
- ⚡ **Angular 21+**: Leverages Angular's latest features (signals, standalone components, control flow)
- 🎯 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 📦 **Multiple Install Methods**: npm, pnpm, yarn, bun, and `ng add` support
- 🤖 **AI-Powered**: Includes MCP server for AI assistant integration
- ♿ **Accessible**: Built with accessibility in mind
- 🎭 **Dark Mode**: Full dark mode support out of the box
- 🧩 **Composable**: Flexible component architecture

## Quick Start

### Installation

```bash
# Using npm
npm install @shadcn-angular/button

# Using pnpm
pnpm add @shadcn-angular/button

# Using yarn
yarn add @shadcn-angular/button

# Using bun
bun add @shadcn-angular/button

# Using Angular CLI
ng add @shadcn-angular/button
```

### Usage

```typescript
import { Button } from '@/lib/components/ui/button';

@Component({
  selector: 'app-root',
  imports: [Button],
  template: `
    <Button>Click me</Button>
    <Button variant="destructive">Delete</Button>
    <Button variant="outline" size="lg">Large Outline</Button>
  `,
})
export class AppComponent {}
```

## Documentation

- 📚 **[Component Documentation](docs/)**: Comprehensive guides for all components
- 🛠️ **[Installation Guide](docs/installation/)**: Setup instructions
- 🎨 **[Theming Guide](docs/theming/)**: Customize colors and styles
- 🌙 **[Dark Mode Guide](docs/dark-mode/)**: Implementing dark mode
- 🤖 **[MCP Server Setup](docs/MCP-SETUP.md)**: AI assistant integration

## MCP Server

The shadcn-angular MCP (Model Context Protocol) server enables AI assistants like Claude to provide intelligent assistance with component documentation, installation, and usage.

### Quick Setup

1. Build the MCP server:
   ```bash
   npm run build:mcp
   ```

2. Configure your AI client (e.g., Claude Desktop):
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

3. Ask your AI assistant about shadcn-angular components!

For detailed setup instructions, see [MCP-SETUP.md](docs/MCP-SETUP.md).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Building

To build the project:

```bash
# Build the application
ng build

# Build the MCP server
npm run build:mcp

# Build schematics
npm run build:schematics
```

## Running unit tests

To execute unit tests with Vitest:

```bash
npm test
```

For UI mode:

```bash
npm run test:ui
```

For coverage:

```bash
npm run test:coverage
```

## Component Categories

### Basic Components
Button, Badge, Card, Alert, Separator, Skeleton, Avatar, Progress, Typography

### Form Components
Input, Checkbox, Select, Radio Group, Switch, Slider, Textarea, Form, Label, Input OTP, Native Select

### Layout Components
Tabs, Accordion, Collapsible, Scroll Area, Resizable, Table, Pagination, Breadcrumb

### Overlay Components
Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card, Context Menu, Dropdown Menu, Alert Dialog

### Complex Components
Data Table, Calendar, Date Picker, Command, Combobox, Carousel, Chart

### Advanced Components
Navigation Menu, Menubar, Sidebar, Toast, Toggle, Toggle Group, Segmented, Empty, Kbd, Spinner

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/)

## License

MIT

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

---

Built with ❤️ for the Angular community
