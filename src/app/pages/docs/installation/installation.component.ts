import { CodeBlock } from '@/components/code-block';
import { SeoService } from '@/services/seo.service';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    ArrowLeft,
    ArrowRight,
    Box,
    Check,
    FolderTree,
    LucideAngularModule,
    Package,
    Palette,
    Sparkles,
    Terminal,
    Zap
} from 'lucide-angular';

/**
 * Installation documentation page - Developer-first UX with Magic Installation
 */
@Component({
  selector: 'InstallationPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Separator, CodeBlock, LucideAngularModule],
  template: `
    <article class="relative">
      <!-- Header -->
      <div class="space-y-4 pb-8 pt-6 md:pb-10">
        <div class="space-y-2">
          <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            Installation
          </h1>
          <p class="text-xl text-muted-foreground leading-7">
            One command. Zero config. Start building in seconds.
          </p>
        </div>
      </div>

      <Separator class="mb-10" />

      <!-- Content -->
      <div class="space-y-12">

        <!-- ✨ MAGIC INSTALLATION -->
        <section class="scroll-mt-20" id="magic-installation">
          <div class="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 relative overflow-hidden">
            <!-- Sparkle decoration -->
            <div class="absolute top-4 right-4 opacity-20">
              <lucide-icon [img]="icons.Sparkles" class="h-24 w-24 text-primary" />
            </div>

            <div class="space-y-6 relative">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <lucide-icon [img]="icons.Sparkles" class="h-6 w-6" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-2xl font-bold">Magic Installation</h2>
                    <span class="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">Recommended</span>
                  </div>
                  <p class="text-sm text-muted-foreground">Everything you need in one command</p>
                </div>
              </div>

              <CodeBlock
                [code]="magicInstallCode"
                language="bash"
              />

              <div class="rounded-lg border bg-card p-4 space-y-3">
                <p class="text-sm font-semibold flex items-center gap-2">
                  <lucide-icon [img]="icons.Zap" class="h-4 w-4 text-amber-500" />
                  This single command:
                </p>
                <div class="grid gap-2 text-sm md:grid-cols-2">
                  @for (feature of magicFeatures; track feature) {
                    <div class="flex items-center gap-2 text-muted-foreground">
                      <lucide-icon [img]="icons.Check" class="h-4 w-4 text-green-500 shrink-0" />
                      {{ feature }}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Quick Start (Basic) -->
        <section class="scroll-mt-20" id="quick-start">
          <div class="rounded-xl border bg-gradient-to-br from-muted/50 to-transparent p-8">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <lucide-icon [img]="icons.Zap" class="h-5 w-5" />
                </div>
                <div>
                  <h2 class="text-2xl font-bold">Quick Start</h2>
                  <p class="text-sm text-muted-foreground">Set up core utilities, add components as needed</p>
                </div>
              </div>
              <CodeBlock
                [code]="quickStartCode"
                language="bash"
              />
              <p class="text-sm text-muted-foreground">
                Then add components individually with <code class="bg-muted px-1.5 py-0.5 rounded">ng g &#64;ng-cn/core:c &lt;name&gt;</code>
              </p>
            </div>
          </div>
        </section>

        <!-- Available Themes -->
        <section class="scroll-mt-20" id="themes">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <lucide-icon [img]="icons.Palette" class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">Available Themes</h2>
                <p class="text-sm text-muted-foreground">Choose your design language</p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              @for (theme of availableThemes; track theme.name) {
                <div class="rounded-lg border bg-card p-4 hover:border-primary/50 transition-colors">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="h-4 w-4 rounded-full" [style.background]="theme.color"></div>
                    <span class="font-medium">{{ theme.name }}</span>
                  </div>
                  <p class="text-xs text-muted-foreground">{{ theme.description }}</p>
                  <code class="text-xs text-muted-foreground mt-2 block">--theme={{ theme.value }}</code>
                </div>
              }
            </div>

            <CodeBlock
              [code]="themeExamplesCode"
              language="bash"
            />
          </div>
        </section>

        <!-- What's in the Box -->
        <section class="scroll-mt-20" id="whats-in-the-box">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <lucide-icon [img]="icons.Box" class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">What's in the Box</h2>
                <p class="text-sm text-muted-foreground">Everything included with the magic install</p>
              </div>
            </div>

            <!-- Components count -->
            <div class="grid gap-4 sm:grid-cols-3">
              <div class="rounded-lg border bg-card p-4 text-center">
                <div class="text-3xl font-bold text-primary">56+</div>
                <div class="text-sm text-muted-foreground">Components</div>
              </div>
              <div class="rounded-lg border bg-card p-4 text-center">
                <div class="text-3xl font-bold text-primary">7</div>
                <div class="text-sm text-muted-foreground">Theme Presets</div>
              </div>
              <div class="rounded-lg border bg-card p-4 text-center">
                <div class="text-3xl font-bold text-primary">∞</div>
                <div class="text-sm text-muted-foreground">Customizable</div>
              </div>
            </div>

            <!-- Dependencies -->
            <div class="rounded-lg border bg-card p-4 space-y-3">
              <h3 class="font-semibold flex items-center gap-2">
                <lucide-icon [img]="icons.Package" class="h-4 w-4" />
                Dependencies Installed
              </h3>
              <div class="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                @for (dep of dependencies; track dep.name) {
                  <div class="flex items-center justify-between bg-muted/50 rounded px-3 py-2">
                    <code class="text-xs">{{ dep.name }}</code>
                    <span class="text-xs text-muted-foreground">{{ dep.version }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Utilities -->
            <div class="rounded-lg border bg-card p-4 space-y-3">
              <h3 class="font-semibold">Utility Functions</h3>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="space-y-1">
                  <code class="text-sm font-medium">cn()</code>
                  <p class="text-xs text-muted-foreground">Tailwind CSS class merging utility with conflict resolution</p>
                </div>
                <div class="space-y-1">
                  <code class="text-sm font-medium">Animation utilities</code>
                  <p class="text-xs text-muted-foreground">Smooth transitions with AnimatedDirective, PresenceComponent</p>
                </div>
                <div class="space-y-1">
                  <code class="text-sm font-medium">Accessibility utilities</code>
                  <p class="text-xs text-muted-foreground">FocusTrap, KeyboardNavigation, LiveRegion directives</p>
                </div>
                <div class="space-y-1">
                  <code class="text-sm font-medium">Positioning utilities</code>
                  <p class="text-xs text-muted-foreground">Smart overlay positioning for popovers & dropdowns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Files Created -->
        <section class="scroll-mt-20" id="project-structure">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <lucide-icon [img]="icons.FolderTree" class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">Project Structure</h2>
                <p class="text-sm text-muted-foreground">Files added to your project</p>
              </div>
            </div>
            <CodeBlock
              [code]="projectStructureCode"
              language="plaintext"
            />

            <!-- File descriptions -->
            <div class="space-y-3">
              @for (file of filesDescription; track file.path) {
                <div class="rounded-lg border bg-card p-4">
                  <div class="flex items-start gap-3">
                    <code class="text-sm font-medium text-primary shrink-0">{{ file.path }}</code>
                    <p class="text-sm text-muted-foreground">{{ file.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Add Components -->
        <section class="scroll-mt-20" id="add-components">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <lucide-icon [img]="icons.Package" class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">Add Components</h2>
                <p class="text-sm text-muted-foreground">Install components one at a time</p>
              </div>
            </div>
            <CodeBlock
              [code]="addComponentsCode"
              language="bash"
            />
            <div class="rounded-lg border bg-muted/30 p-4">
              <p class="text-sm font-medium mb-3">Popular components:</p>
              <div class="flex flex-wrap gap-2">
                @for (comp of popularComponents; track comp) {
                  <code class="bg-background px-2 py-1 rounded text-xs">{{ comp }}</code>
                }
                <span class="text-xs text-muted-foreground self-center">and 40+ more...</span>
              </div>
            </div>
          </div>
        </section>

        <!-- All Components List -->
        <section class="scroll-mt-20" id="all-components">
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold">All Available Components</h2>
              <p class="text-sm text-muted-foreground">56+ components included with <code class="bg-muted px-1.5 py-0.5 rounded">--components=all</code></p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              @for (category of componentCategories; track category.name) {
                <div class="rounded-lg border bg-card p-4 space-y-2">
                  <h3 class="font-semibold text-sm">{{ category.name }}</h3>
                  <div class="flex flex-wrap gap-1">
                    @for (comp of category.components; track comp) {
                      <code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ comp }}</code>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Manual Setup -->
        <section class="scroll-mt-20" id="manual-setup">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <lucide-icon [img]="icons.Terminal" class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">Manual Setup</h2>
                <p class="text-sm text-muted-foreground">For those who prefer full control</p>
              </div>
            </div>

            <div class="space-y-8">
              <!-- Step 1 -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                  <h3 class="font-semibold">Install dependencies</h3>
                </div>
                <CodeBlock [code]="manualDepsCode" language="bash" />
              </div>

              <!-- Step 2 -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                  <h3 class="font-semibold">Create PostCSS config for Tailwind v4</h3>
                </div>
                <p class="text-sm text-muted-foreground">Create <code class="bg-muted px-1.5 py-0.5 rounded">postcss.config.mjs</code>:</p>
                <CodeBlock [code]="postcssConfigCode" language="javascript" />
              </div>

              <!-- Step 3 -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                  <h3 class="font-semibold">Create the cn utility</h3>
                </div>
                <p class="text-sm text-muted-foreground">Create <code class="bg-muted px-1.5 py-0.5 rounded">src/app/lib/utils/cn.ts</code>:</p>
                <CodeBlock [code]="cnUtilityCode" language="typescript" />
              </div>

              <!-- Step 4 -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
                  <h3 class="font-semibold">Add CSS variables</h3>
                </div>
                <p class="text-sm text-muted-foreground">Create <code class="bg-muted px-1.5 py-0.5 rounded">src/ng-cn.scss</code> and import in your styles:</p>
                <CodeBlock [code]="cssVariablesCode" language="scss" />
              </div>

              <!-- Step 5 -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">5</span>
                  <h3 class="font-semibold">Configure path aliases</h3>
                </div>
                <p class="text-sm text-muted-foreground">Add to <code class="bg-muted px-1.5 py-0.5 rounded">tsconfig.json</code>:</p>
                <CodeBlock [code]="pathAliasesCode" language="json" />
              </div>
            </div>
          </div>
        </section>

        <!-- Success -->
        <section class="scroll-mt-20">
          <div class="rounded-xl border bg-gradient-to-br from-green-500/10 to-transparent p-8 text-center">
            <div class="space-y-4">
              <div class="flex justify-center">
                <div class="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <lucide-icon [img]="icons.Check" class="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h2 class="text-2xl font-bold">You're ready!</h2>
              <p class="text-muted-foreground max-w-md mx-auto">
                Start building beautiful, accessible UIs with shadcn-angular.
              </p>
              <div class="flex flex-wrap justify-center gap-3 pt-2">
                <Button routerLink="/docs/components" variant="default">
                  Browse Components
                </Button>
                <Button routerLink="/docs/theming" variant="outline">
                  Customize Theme
                </Button>
                <Button routerLink="/blocks" variant="outline">
                  View Blocks
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Navigation Footer -->
      <div class="flex items-center justify-between pt-12 mt-12 border-t">
        <Button routerLink="/docs/introduction" variant="outline" class="gap-2">
          <lucide-icon [img]="icons.ArrowLeft" class="h-4 w-4" />
          <span class="hidden sm:inline">Introduction</span>
        </Button>
        <Button routerLink="/docs/theming" variant="outline" class="gap-2">
          <span class="hidden sm:inline">Theming</span>
          <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
        </Button>
      </div>
    </article>
  `,
})
export class InstallationPage {
  private readonly seo = inject(SeoService);

  protected readonly icons = {
    ArrowRight, ArrowLeft, Terminal, Zap, FolderTree,
    Package, Sparkles, Palette, Check, Box
  };

  protected readonly magicFeatures = [
    'Installs all 56+ UI components',
    'Configures Tailwind CSS v4 with PostCSS',
    'Sets up beautiful theme presets',
    'Creates utility functions (cn, animations)',
    'Configures TypeScript path aliases',
    'Adds accessibility utilities',
    'Sets up dark mode support',
    'Zero manual configuration needed'
  ];

  protected readonly availableThemes = [
    { name: 'shadcn', value: 'shadcn', color: 'oklch(0.205 0 0)', description: 'Default clean, minimal design' },
    { name: 'GitHub', value: 'github', color: 'oklch(0.546 0.192 262.881)', description: 'Developer-focused aesthetic' },
    { name: 'Vercel', value: 'vercel', color: 'oklch(0 0 0)', description: 'Bold black and white' },
    { name: 'Apple', value: 'apple', color: 'oklch(0.586 0.228 259.815)', description: 'Elegant, sophisticated' },
    { name: 'OpenAI', value: 'openai', color: 'oklch(0.538 0.163 163.319)', description: 'Modern tech-forward' },
    { name: 'ClickUp', value: 'clickup', color: 'oklch(0.638 0.238 288.545)', description: 'Vibrant, colorful' },
    { name: 'Linear', value: 'linear', color: 'oklch(0.538 0.207 262.881)', description: 'Sleek, minimal' }
  ];

  protected readonly dependencies = [
    { name: 'tailwindcss', version: '^4.1.18' },
    { name: '@tailwindcss/postcss', version: '^4.1.18' },
    { name: '@angular/cdk', version: '^21.0.5' },
    { name: 'lucide-angular', version: '^0.562.0' },
    { name: 'class-variance-authority', version: '^0.7.1' },
    { name: 'clsx', version: '^2.1.1' },
    { name: 'tailwind-merge', version: '^3.4.0' }
  ];

  protected readonly filesDescription = [
    { path: 'ng-cn.scss', description: 'Theme CSS variables with light/dark mode support, base styles, and animation keyframes' },
    { path: 'postcss.config.mjs', description: 'PostCSS configuration for Tailwind CSS v4' },
    { path: 'lib/utils/cn.ts', description: 'Class merging utility combining clsx and tailwind-merge' },
    { path: 'lib/utils/animation/', description: 'Animation utilities including AnimatedDirective and PresenceComponent' },
    { path: 'lib/utils/accessibility/', description: 'A11y utilities: FocusTrap, KeyboardNavigation, LiveRegion, VisuallyHidden' },
    { path: 'lib/utils/positioning/', description: 'Smart overlay positioning for popovers, tooltips, and dropdowns' },
    { path: 'lib/components/ui/', description: 'All UI components when using --components=all' }
  ];

  protected readonly componentCategories = [
    {
      name: 'Form Controls',
      components: ['button', 'checkbox', 'input', 'input-otp', 'label', 'radio-group', 'select', 'slider', 'switch', 'textarea', 'toggle', 'toggle-group', 'form']
    },
    {
      name: 'Data Display',
      components: ['avatar', 'badge', 'calendar', 'card', 'carousel', 'chart', 'progress', 'skeleton', 'table', 'data-table']
    },
    {
      name: 'Feedback',
      components: ['alert', 'alert-dialog', 'dialog', 'drawer', 'sheet', 'toast', 'tooltip', 'spinner']
    },
    {
      name: 'Navigation',
      components: ['breadcrumb', 'command', 'dropdown-menu', 'context-menu', 'menubar', 'navigation-menu', 'pagination', 'sidebar', 'tabs']
    },
    {
      name: 'Layout',
      components: ['accordion', 'aspect-ratio', 'collapsible', 'resizable', 'scroll-area', 'separator']
    },
    {
      name: 'Overlay',
      components: ['popover', 'hover-card', 'combobox', 'date-picker']
    }
  ];

  protected readonly popularComponents = [
    'button', 'card', 'dialog', 'input', 'select',
    'checkbox', 'tabs', 'table', 'toast', 'dropdown-menu',
    'form', 'sidebar', 'command', 'calendar'
  ];

  constructor() {
    this.seo.updateMetaTags({
      title: 'Installation',
      description:
        'Learn how to install and set up shadcn-angular in your Angular project. Magic one-command setup with zero configuration, 56+ components, and 7 theme presets.',
      keywords: [
        'angular',
        'shadcn',
        'installation',
        'setup',
        'getting started',
        'ng add',
        'tailwind css',
        'npm',
        'components',
        'ui library',
      ],
      canonicalUrl: '/docs/installation',
      structuredData: this.seo.getBreadcrumbStructuredData([
        { name: 'Home', url: '/' },
        { name: 'Documentation', url: '/docs' },
        { name: 'Installation', url: '/docs/installation' },
      ]),
    });
  }

  // Magic Installation
  protected readonly magicInstallCode = `# 🪄 Magic Installation - Everything in one command
ng add @ng-cn/core --theme=github --components=all

# Or with different themes
ng add @ng-cn/core --theme=vercel --components=all
ng add @ng-cn/core --theme=apple --components=all`;

  protected readonly quickStartCode = `# Basic setup without components
ng add @ng-cn/core

# Or with a specific theme
ng add @ng-cn/core --theme=linear`;

  protected readonly themeExamplesCode = `# Available theme options
ng add @ng-cn/core --theme=shadcn     # Default minimal theme
ng add @ng-cn/core --theme=github     # GitHub's design language
ng add @ng-cn/core --theme=vercel     # Bold black & white
ng add @ng-cn/core --theme=apple      # Elegant Apple style
ng add @ng-cn/core --theme=openai     # Modern tech aesthetic
ng add @ng-cn/core --theme=clickup    # Vibrant colors
ng add @ng-cn/core --theme=linear     # Sleek minimal`;

  protected readonly addComponentsCode = `# Add individual components
ng g @ng-cn/core:c button
ng g @ng-cn/core:c card
ng g @ng-cn/core:c dialog

# Short alias
ng g @ng-cn/core:c input
ng g @ng-cn/core:c select
ng g @ng-cn/core:c tabs`;

  protected readonly projectStructureCode = `your-project/
├── postcss.config.mjs              # Tailwind CSS v4 PostCSS config
├── tsconfig.json                   # Updated with path aliases
├── src/
│   ├── ng-cn.scss                  # Theme CSS variables & base styles
│   ├── styles.scss                 # Auto-imports ng-cn.scss
│   └── app/
│       └── lib/
│           ├── utils/
│           │   ├── cn.ts                    # Class merging utility
│           │   ├── index.ts                 # Utils barrel export
│           │   ├── animation/               # Animation utilities
│           │   │   ├── animated.directive.ts
│           │   │   ├── presence.component.ts
│           │   │   └── animation-tokens.service.ts
│           │   ├── accessibility/           # A11y utilities
│           │   │   ├── focus-trap.directive.ts
│           │   │   ├── keyboard-navigation.directive.ts
│           │   │   ├── live-region.directive.ts
│           │   │   └── visually-hidden.component.ts
│           │   └── positioning/             # Overlay positioning
│           └── components/
│               └── ui/                      # Your components
│                   ├── button/
│                   ├── card/
│                   ├── dialog/
│                   └── ... (56+ with --components=all)`;

  protected readonly manualDepsCode = `npm install clsx tailwind-merge class-variance-authority @angular/cdk lucide-angular tailwindcss @tailwindcss/postcss`;

  protected readonly postcssConfigCode = `/** @type {import('postcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};`;

  protected readonly cnUtilityCode = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with proper conflict resolution.
 * @example cn('px-4 py-2', 'px-6') // => 'py-2 px-6'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}`;

  protected readonly cssVariablesCode = `@use "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... theme mappings */
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}`;

  protected readonly pathAliasesCode = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/lib/*": ["src/app/lib/*"],
      "@/ui/*": ["src/app/lib/components/ui/*"],
      "@/utils/*": ["src/app/lib/utils/*"]
    }
  }
}`;
}
