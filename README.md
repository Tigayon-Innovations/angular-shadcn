# 🎨 shadcn-angular

> **Beautifully designed Angular components** built with Tailwind CSS v4, Angular 21+, and modern TypeScript. A comprehensive port of the popular [shadcn/ui](https://ui.shadcn.com/) library.

[![npm version](https://img.shields.io/npm/v/@jamelyassin/shadcn-angular.svg)](https://www.npmjs.com/package/@jamelyassin/shadcn-angular)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21%2B-red.svg)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4.svg)](https://tailwindcss.com)

**[🌐 Live Demo](https://shadcn-angular.tigayon.com/)** • **[📚 Documentation](https://shadcn-angular.tigayon.com/docs)** • **[🐛 Report Bug](https://github.com/Tigayon-Innovations/angular-shadcn/issues)** • **[✨ Request Feature](https://github.com/Tigayon-Innovations/angular-shadcn/issues)**

---

## ✨ Features

- **🎨 60+ Components** - Complete set of production-ready, accessible UI components
- **⚡ Angular 21+** - Built for the latest Angular with signals, standalone components, and modern control flow
- **🎯 Type-Safe** - Full TypeScript support with strict type checking and IntelliSense
- **🌈 Tailwind CSS 4** - Latest Tailwind utilities for responsive, customizable designs
- **📦 Multiple Install Methods** - npm, pnpm, yarn, bun, and `ng add` support
- **🤖 AI Integration** - MCP (Model Context Protocol) server for AI assistant support
- **♿ Accessible** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **🌙 Dark Mode** - Built-in dark mode support with automatic detection
- **🎭 Highly Customizable** - Easy theming with CSS variables
- **📱 Responsive** - Mobile-first design, fully responsive

- **🚀 Performance** - Optimized for speed with minimal bundle impact
- **🧩 Copy-Paste Friendly** - Copy components directly into your project

---

## 🚀 Quick Start

### Installation

Choose your package manager:




```bash
# Angular CLI (recommended)
ng add @jamelyassin/shadcn-angular
```

```bash
# npm
npm install @jamelyassin/shadcn-angular
```
```bash
# pnpm
pnpm add @jamelyassin/shadcn-angular
```
```bash
# yarn
yarn add @jamelyassin/shadcn-angular
```
```bash
# bun
bun add @jamelyassin/shadcn-angular
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { Button } from '@jamelyassin/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button],
  template: `
    <div class="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
    </div>
  `,
})
export class ExampleComponent {}
```

---

## 📚 Available Components

### Form Components
- **Button** - Versatile button with multiple variants
- **Input** - Text input with validation states
- **Select** - Dropdown selection component
- **Checkbox** - Accessible checkbox input
- **Radio** - Radio button group
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input
- **Label** - Form label component
- **Form** - Complete form builder

### Layout Components
- **Card** - Container with header, content, footer
- **Grid** - Responsive grid layout
- **Separator** - Visual divider
- **Spacer** - Flexible spacing element
- **Stack** - Flex-based layout primitive

### Navigation Components
- **Navigation Menu** - Horizontal navigation bar
- **Tabs** - Tabbed content interface
- **Breadcrumb** - Navigation trail
- **Pagination** - Multi-page navigation

### Overlay Components
- **Dialog** - Modal dialog box
- **Popover** - Floating popover
- **Tooltip** - Hover tooltip
- **Alert Dialog** - Confirmation dialog
- **Sheet** - Side panel/drawer
- **Dropdown Menu** - Dropdown menu

### Data Display
- **Table** - Data table with sorting/filtering
- **Badge** - Status badge
- **Avatar** - User avatar
- **Progress** - Progress bar
- **Skeleton** - Loading skeleton
- **Alert** - Alert message
- **Chart** - Data visualization
- **Code Block** - Syntax-highlighted code

### And Many More...

[See all components →](https://shadcn-angular.tigayon.com/components)

---

## 🎨 Theming

Customize colors and appearance using CSS variables:

```scss
// styles.scss
:root {
  --primary: 220 90% 56%;
  --secondary: 210 40% 96%;
  --destructive: 0 84% 60%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --muted: 210 10% 12%;
  --background: 0 0% 100%;
  --foreground: 220 13% 13%;
  --border: 214 31% 91%;
  --radius: 0.5rem;
}

[data-theme="dark"] {
  --background: 220 13% 13%;
  --foreground: 0 0% 100%;
  // ... override other variables
}
```

[📖 Full theming guide →](https://shadcn-angular.tigayon.com/docs/theming)

---

## 🌙 Dark Mode

Enable dark mode support automatically or manually:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div [attr.data-theme]="isDark() ? 'dark' : 'light'">
      <!-- Your content -->
    </div>
  `,
})
export class AppComponent {
  isDark = signal(false);

  toggleDarkMode() {
    this.isDark.update(value => !value);
  }
}
```

---

## 🤖 AI Integration (MCP Server)

## 🤖 AI Integration (MCP Server)

Use the included MCP (Model Context Protocol) server to integrate shadcn-angular with AI assistants like Claude:

### Setup

1. **Build the MCP server:**
   ```bash
   npm run build:mcp
   ```

2. **Configure Claude Desktop** (`~/.config/Claude/claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "shadcn-angular": {
         "command": "node",
         "args": ["/absolute/path/to/dist/mcp-server/index.js"]
       }
     }
   }
   ```

3. **Start using AI assistance:**
   - Ask Claude about component documentation
   - Get installation commands for specific components
   - Receive code examples and implementation guidance

[🤖 MCP Setup Guide →](docs/MCP-SETUP.md)

---

## 📖 Documentation

- **[Component Library](https://shadcn-angular.tigayon.com/components)** - Browse all available components
- **[Installation Guide](https://shadcn-angular.tigayon.com/docs/installation)** - Setup instructions
- **[Theming Guide](https://shadcn-angular.tigayon.com/docs/theming)** - Customize your design system
- **[Dark Mode](https://shadcn-angular.tigayon.com/docs/dark-mode)** - Implement dark mode
- **[API Reference](https://shadcn-angular.tigayon.com/docs/api)** - Component props and methods
- **[Examples](https://shadcn-angular.tigayon.com/examples)** - Real-world examples

---

## 🛠️ Development

### Prerequisites
- Node.js 18+ or higher
- Angular 21+
- Tailwind CSS 4+

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tigayon-Innovations/angular-shadcn.git
   cd shadcn-angular
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser:**
   ```
   http://localhost:4200
   ```

---

## 📋 Building & Testing

### Building

```bash
# Build for production
ng build

# Build with SSR support
ng build -- --configuration production

# Build only schematics
npm run build:schematics

# Build only MCP server
npm run build:mcp
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

---

## 🔗 Project Structure

```
shadcn-angular/
├── src/
│   ├── app/
│   │   ├── components/          # UI components
│   │   │   ├── ui/             # shadcn-angular components
│   │   │   └── ...
│   │   ├── blocks/             # Pre-built component blocks
│   │   ├── lib/                # Utilities and helpers
│   │   └── pages/              # Application pages
│   ├── styles.scss             # Global styles
│   └── main.ts                 # Application entry point
├── mcp-server/                 # MCP server implementation
├── schematics/                 # Angular CLI schematics
├── docs/                       # Documentation
└── package.json
```

---

## 🎓 Learning Resources

- **[Angular Documentation](https://angular.io/docs)** - Official Angular docs
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Tailwind CSS v4 documentation
- **[shadcn/ui](https://ui.shadcn.com/)** - Original React component library
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript documentation

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Inspired by [shadcn/ui](https://github.com/shadcn-ui/ui) by [shadcn](https://twitter.com/shadcn).

---

## 🙏 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute
- 🐛 Report bugs and issues
- ✨ Request new components
- 📝 Improve documentation
- 🎨 Suggest design improvements
- 🚀 Submit pull requests

---

## 🤝 Support

- **[GitHub Issues](https://github.com/Tigayon-Innovations/angular-shadcn/issues)** - Report bugs
- **[GitHub Discussions](https://github.com/Tigayon-Innovations/angular-shadcn/discussions)** - Ask questions
- **[Website](https://shadcn-angular.tigayon.com/)** - Visit our site

---

## 📊 Stats

- **60+** Components
- **100%** Type-Safe
- **WCAG 2.1 AA** Compliant
- **2000+** Hours Development
- **Active** Community

---

<div align="center">

**[⬆ back to top](#-shadcn-angular)**

Made with ❤️ by [Tigayon Innovations](https://tigayon.com)

</div>
