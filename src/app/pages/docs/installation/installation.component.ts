import { CodeBlock } from '@/components/code-block';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, Check, Copy, LucideAngularModule } from 'lucide-angular';

/**
 * Installation documentation page.
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
            Get set up fast. Install what you need, then start building.
          </p>
        </div>
      </div>

      <Separator class="mb-10" />

      <!-- Content -->
      <div class="space-y-16">
        <!-- Prerequisites -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                Prerequisites
              </h2>
              <p class="text-muted-foreground">
                Make sure you have the following tools installed before you begin.
              </p>
            </div>
            <div class="rounded-lg border bg-muted/50 p-6">
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <div class="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <span class="font-medium">Node.js 18.19 or later</span>
                    <p class="text-sm text-muted-foreground mt-0.5">Required for running Angular CLI and build tools</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <span class="font-medium">Angular CLI 21 or later</span>
                    <p class="text-sm text-muted-foreground mt-0.5">Install globally with <code class="bg-background px-1.5 py-0.5 rounded text-xs">npm i -g &#64;angular/cli</code></p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <span class="font-medium">A package manager</span>
                    <p class="text-sm text-muted-foreground mt-0.5">npm, pnpm, or yarn</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Step 1: Create Project -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary">
                1
              </div>
              <div class="space-y-2 flex-1">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
                  Create a New Project
                </h2>
                <p class="text-muted-foreground">
                  Start by creating a new Angular application, or use an existing one.
                </p>
              </div>
            </div>
            <div class="pl-14">
              <CodeBlock
                [code]="createProjectCode"
                language="bash"
              />
            </div>
          </div>
        </section>

        <!-- Step 2: Add Tailwind -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary">
                2
              </div>
              <div class="space-y-2 flex-1">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
                  Add Tailwind CSS
                </h2>
                <p class="text-muted-foreground">
                  Install and configure Tailwind CSS using the Angular CLI schematic.
                </p>
              </div>
            </div>
            <div class="pl-14">
              <CodeBlock
                [code]="addTailwindCode"
                language="bash"
              />
            </div>
          </div>
        </section>

        <!-- Step 3: CSS Variables -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary">
                3
              </div>
              <div class="space-y-2 flex-1">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
                  Configure CSS Variables
                </h2>
                <p class="text-muted-foreground">
                  Replace the contents of your <code class="bg-muted px-1.5 py-0.5 rounded text-sm">styles.scss</code> file with the shadcn CSS variables.
                </p>
              </div>
            </div>
            <div class="pl-14 space-y-4">
              <div class="rounded-lg border bg-amber-500/10 border-amber-500/20 p-4 flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
                  <path d="M12 9v4"/>
                  <path d="M12 17h.01"/>
                </svg>
                <div class="text-sm">
                  <p class="font-medium text-amber-900 dark:text-amber-200">Important</p>
                  <p class="text-amber-800 dark:text-amber-300 mt-1">
                    This will replace your existing styles. Make sure to backup any custom CSS first.
                  </p>
                </div>
              </div>
              <CodeBlock
                [code]="cssVariablesCode"
                language="css"
              />
            </div>
          </div>
        </section>

        <!-- Step 4: Add cn Utility -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary">
                4
              </div>
              <div class="space-y-2 flex-1">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
                  Add the cn Utility
                </h2>
                <p class="text-muted-foreground">
                  Install utility libraries and create the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">cn</code> helper for merging class names.
                </p>
              </div>
            </div>
            <div class="pl-14 space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-3">Install dependencies</h3>
                <CodeBlock
                  [code]="installDepsCode"
                  language="bash"
                />
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-3">Create the utility function</h3>
                <CodeBlock
                  [code]="cnUtilityCode"
                  language="typescript"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Step 5: Path Aliases -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary">
                5
              </div>
              <div class="space-y-2 flex-1">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
                  Add Path Aliases
                </h2>
                <p class="text-muted-foreground">
                  Configure path aliases in <code class="bg-muted px-1.5 py-0.5 rounded text-sm">tsconfig.json</code> for cleaner imports.
                </p>
              </div>
            </div>
            <div class="pl-14">
              <CodeBlock
                [code]="pathAliasesCode"
                language="json"
              />
            </div>
          </div>
        </section>

        <!-- That's it Section -->
        <section class="scroll-mt-20">
          <div class="rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5 p-8">
            <div class="space-y-4 text-center">
              <div class="flex justify-center">
                <div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
              </div>
              <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
                That's it!
              </h2>
              <p class="text-muted-foreground max-w-2xl mx-auto">
                You're now ready to start using shadcn-angular components. Install the components you need and start building beautiful interfaces.
              </p>
            </div>
          </div>
        </section>

        <!-- Installing Components -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                Installing Components
              </h2>
              <p class="text-muted-foreground">
                Add individual components to your project using Angular schematics or copy them manually.
              </p>
            </div>
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-3">Using the CLI (Recommended)</h3>
                <CodeBlock
                  [code]="installComponentCode"
                  language="bash"
                />
              </div>
              <div class="rounded-lg border bg-muted/50 p-6 space-y-4">
                <h3 class="text-lg font-semibold">Available components</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <code class="bg-background px-2 py-1.5 rounded">button</code>
                  <code class="bg-background px-2 py-1.5 rounded">card</code>
                  <code class="bg-background px-2 py-1.5 rounded">input</code>
                  <code class="bg-background px-2 py-1.5 rounded">label</code>
                  <code class="bg-background px-2 py-1.5 rounded">separator</code>
                  <code class="bg-background px-2 py-1.5 rounded">badge</code>
                  <code class="bg-background px-2 py-1.5 rounded">alert</code>
                  <code class="bg-background px-2 py-1.5 rounded">dialog</code>
                  <code class="bg-background px-2 py-1.5 rounded">data-table</code>
                  <code class="bg-background px-2 py-1.5 rounded">and many more...</code>
                </div>
              </div>
              <div class="rounded-lg border bg-blue-500/10 border-blue-500/20 p-4 flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
                <div class="text-sm">
                  <p class="font-medium text-blue-900 dark:text-blue-200">Manual Installation</p>
                  <p class="text-blue-800 dark:text-blue-300 mt-1">
                    You can also copy components manually from the documentation pages. Each component page has installation instructions and source code.
                  </p>
                </div>
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
  protected readonly icons = { ArrowRight, ArrowLeft, Copy, Check };

  protected readonly createProjectCode = `ng new my-app
cd my-app`;

  protected readonly addTailwindCode = `ng add tailwindcss`;

  protected readonly cssVariablesCode = `@use "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode colors */
}`;

  protected readonly installDepsCode = `npm install clsx tailwind-merge class-variance-authority`;

  protected readonly cnUtilityCode = `// src/app/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
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

  protected readonly installComponentCode = `# Install a specific component
ng generate shadcn-angular:component button

# Or use the alias
ng g shadcn-angular:c data-table`;
}
