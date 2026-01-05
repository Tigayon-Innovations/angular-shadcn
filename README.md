# 🎨 ng-cn

> **Beautiful Angular components built with Tailwind CSS v4** — The official Angular port of [shadcn/ui](https://ui.shadcn.com/)

[![npm version](https://img.shields.io/npm/v/@ng-cn/core.svg)](https://www.npmjs.com/package/@ng-cn/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21%2B-red.svg)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4.svg)](https://tailwindcss.com)

**[🌐 Live Demo](https://shadcn-angular.tigayon.com/)** • **[📚 Documentation](https://shadcn-angular.tigayon.com/docs)** • **[🐛 Report Bug](https://github.com/Tigayon-Innovations/angular-shadcn/issues)**

---

## ✨ Why ng-cn?

- **🎨 60+ Components** - Production-ready, accessible UI components
- **⚡ Angular 21+** - Signals, standalone components, modern control flow
- **📦 Zero Config** - One command sets up everything
- **🧩 Own Your Code** - Components live in your project, customize freely
- **🌙 Dark Mode** - Built-in theme support
- **♿ Accessible** - WCAG 2.1 AA compliant

---

## 🚀 Quick Start

### 1. Initialize

```bash
ng add @ng-cn/core
```

This automatically:
- ✅ Installs dependencies (Tailwind, clsx, tailwind-merge, CDK)
- ✅ Creates `ng-cn.scss` with theme CSS variables
- ✅ Sets up `lib/utils/cn.ts` utility function
- ✅ Configures TypeScript path aliases (`@/ui/*`, `@/utils/*`)
- ✅ Creates the component folder structure

### 2. Add Components

```bash
# Add components to your project
ng g @ng-cn/core:c button
ng g @ng-cn/core:c card
ng g @ng-cn/core:c dialog

# Or use the short alias
ng g @ng-cn/core:c accordion
```

### 3. Use

```typescript
import { Component } from '@angular/core';
import { Button } from '@/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';

@Component({
  selector: 'app-example',
  imports: [Button, Card, CardHeader, CardTitle, CardContent],
  template: \`
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </CardContent>
    </Card>
  \`,
})
export class ExampleComponent {}
```

---

## 📦 Available Components

### Form
\`button\` \`input\` \`textarea\` \`select\` \`checkbox\` \`radio-group\` \`switch\` \`slider\` \`label\` \`toggle\`

### Layout  
\`card\` \`separator\` \`collapsible\` \`accordion\` \`tabs\` \`table\`

### Feedback
\`alert\` \`badge\` \`progress\` \`skeleton\` \`toast\` \`tooltip\`

### Overlay
\`dialog\` \`alert-dialog\` \`sheet\` \`drawer\` \`popover\` \`dropdown-menu\`

### Data Display
\`avatar\` \`calendar\` \`data-table\` \`breadcrumb\`

[See all 60+ components →](https://shadcn-angular.tigayon.com/components)

---

## 🎨 Theming

The \`ng-cn.scss\` file contains all CSS variables for easy customization:

```scss
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --accent: oklch(0.97 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --radius: 0.625rem;
  /* ... more variables */
}

.dark {
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... dark mode overrides */
}
```

[📖 Theming Guide →](https://shadcn-angular.tigayon.com/docs/theming)

---

## 📁 Project Structure

After running \`ng add @ng-cn/core\`, your project will have:

```
src/
├── ng-cn.scss              # Theme CSS variables (auto-imported)
├── app/
│   └── lib/
│       ├── utils/
│       │   ├── cn.ts       # Utility for merging classes
│       │   └── index.ts
│       └── components/
│           └── ui/         # Your components live here
│               ├── button/
│               ├── card/
│               └── ...
```

---

## 🔧 Manual Installation

If you prefer manual setup:

```bash
# 1. Install dependencies
npm i @ng-cn/core clsx tailwind-merge class-variance-authority @angular/cdk lucide-angular

# 2. Add Tailwind
ng add tailwindcss

# 3. Copy the CSS variables from docs to your styles.scss

# 4. Create the cn utility in src/app/lib/utils/cn.ts
```

---

## 🤖 AI Integration (MCP)

ng-cn includes an MCP server for AI assistant integration:

```bash
npm run build:mcp
```

[🤖 MCP Setup Guide →](docs/MCP-SETUP.md)

---

## 📖 Documentation

- [Installation](https://shadcn-angular.tigayon.com/docs/installation)
- [Theming](https://shadcn-angular.tigayon.com/docs/theming)  
- [Dark Mode](https://shadcn-angular.tigayon.com/docs/dark-mode)
- [Components](https://shadcn-angular.tigayon.com/components)
- [Contributing Guide](CONTRIBUTING.md)

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

Inspired by [shadcn/ui](https://github.com/shadcn-ui/ui)

---

<div align="center">

Made with ❤️ by [Tigayon Innovations](https://tigayon.com)

</div>
