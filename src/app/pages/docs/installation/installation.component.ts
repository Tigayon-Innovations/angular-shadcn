import { CodeBlock } from '@/components/code-block';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, FolderTree, LucideAngularModule, Package, Terminal, Zap } from 'lucide-angular';

/**
 * Installation documentation page - Developer-first UX
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
        <!-- Quick Start -->
        <section class="scroll-mt-20">
          <div class="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <lucide-icon [img]="icons.Zap" class="h-5 w-5" />
                </div>
                <div>
                  <h2 class="text-2xl font-bold">Quick Start</h2>
                  <p class="text-sm text-muted-foreground">Get up and running in one command</p>
                </div>
              </div>
              <CodeBlock
                [code]="quickStartCode"
                language="bash"
              />
              <div class="grid gap-3 text-sm md:grid-cols-2">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Installs all dependencies
                </div>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Creates theme styles
                </div>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Sets up utilities
                </div>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Configures path aliases
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Add Components -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <lucide-icon [img]="icons.Package" class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">Add Components</h2>
                <p class="text-sm text-muted-foreground">Install only what you need</p>
              </div>
            </div>
            <CodeBlock
              [code]="addComponentsCode"
              language="bash"
            />
            <div class="rounded-lg border bg-muted/30 p-4">
              <p class="text-sm font-medium mb-3">Available components:</p>
              <div class="flex flex-wrap gap-2">
                @for (comp of popularComponents; track comp) {
                  <code class="bg-background px-2 py-1 rounded text-xs">{{ comp }}</code>
                }
                <span class="text-xs text-muted-foreground self-center">and 50+ more...</span>
              </div>
            </div>
          </div>
        </section>

        <!-- What Gets Created -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <lucide-icon [img]="icons.FolderTree" class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">What Gets Created</h2>
                <p class="text-sm text-muted-foreground">Clean, organized project structure</p>
              </div>
            </div>
            <CodeBlock
              [code]="projectStructureCode"
              language="plaintext"
            />
          </div>
        </section>

        <!-- Manual Setup -->
        <section class="scroll-mt-20">
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
                  <h3 class="font-semibold">Add Tailwind CSS</h3>
                </div>
                <CodeBlock [code]="tailwindCode" language="bash" />
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
                <p class="text-sm text-muted-foreground">Add to your <code class="bg-muted px-1.5 py-0.5 rounded">styles.scss</code>:</p>
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
                  <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
              <h2 class="text-2xl font-bold">You're ready!</h2>
              <p class="text-muted-foreground max-w-md mx-auto">
                Start adding components and building your UI.
              </p>
              <div class="flex justify-center gap-3 pt-2">
                <Button routerLink="/components/button">
                  Browse Components
                </Button>
                <Button routerLink="/docs/theming" variant="outline">
                  Customize Theme
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
  protected readonly icons = { ArrowRight, ArrowLeft, Terminal, Zap, FolderTree, Package };

  protected readonly popularComponents = [
    'button', 'card', 'dialog', 'input', 'select',
    'checkbox', 'tabs', 'table', 'toast', 'dropdown-menu'
  ];

  protected readonly quickStartCode = `ng add @ng-cn/core`;

  protected readonly addComponentsCode = `# Add components to your project
ng g @ng-cn/core:c button
ng g @ng-cn/core:c card
ng g @ng-cn/core:c dialog

# Multiple at once
ng g @ng-cn/core:c input && ng g @ng-cn/core:c label`;

  protected readonly projectStructureCode = `src/
├── ng-cn.scss                    # Theme CSS variables
├── styles.scss                   # Auto-imports ng-cn.scss
└── app/
    └── lib/
        ├── utils/
        │   ├── cn.ts             # Class merging utility
        │   └── index.ts
        └── components/
            └── ui/               # Your components
                ├── button/
                ├── card/
                └── ...`;

  protected readonly manualDepsCode = `npm install clsx tailwind-merge class-variance-authority @angular/cdk lucide-angular`;

  protected readonly tailwindCode = `ng add tailwindcss`;

  protected readonly cnUtilityCode = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  /* See docs for full variable list */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
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
