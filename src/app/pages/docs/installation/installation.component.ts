import { CodeBlock } from '@/components/code-block';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, Check, Copy, LucideAngularModule } from 'lucide-angular';

/**
 * Installation documentation page.
 */
@Component({
  selector: 'InstallationPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Separator, Tabs, TabsContent, TabsList, TabsTrigger, CodeBlock, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Installation</h1>
        <p class="text-lg text-muted-foreground mt-2">
          How to install dependencies and structure your app.
        </p>
      </div>

      <Separator />

      <!-- Content -->
      <div class="space-y-8">
        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Prerequisites
          </h2>
          <p class="leading-7">
            Before you begin, make sure you have the following installed:
          </p>
          <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Node.js 18.19 or later</li>
            <li>Angular CLI 21 or later</li>
            <li>A package manager (npm, pnpm, or yarn)</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Create a New Project
          </h2>
          <p class="leading-7">
            Start by creating a new Angular project if you don't have one:
          </p>
          <CodeBlock
            [code]="createProjectCode"
            language="bash"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Add Tailwind CSS
          </h2>
          <p class="leading-7">
            Install Tailwind CSS using the Angular CLI:
          </p>
          <CodeBlock
            [code]="addTailwindCode"
            language="bash"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Configure CSS Variables
          </h2>
          <p class="leading-7">
            Add the shadcn CSS variables to your <code class="bg-muted px-1.5 py-0.5 rounded text-sm">styles.scss</code> file:
          </p>
          <CodeBlock
            [code]="cssVariablesCode"
            language="css"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Add the cn Utility
          </h2>
          <p class="leading-7">
            Install the required dependencies:
          </p>
          <CodeBlock
            [code]="installDepsCode"
            language="bash"
          />
          <p class="leading-7">
            Create the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">cn</code> utility function:
          </p>
          <CodeBlock
            [code]="cnUtilityCode"
            language="typescript"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Add Path Aliases
          </h2>
          <p class="leading-7">
            Configure path aliases in your <code class="bg-muted px-1.5 py-0.5 rounded text-sm">tsconfig.json</code>:
          </p>
          <CodeBlock
            [code]="pathAliasesCode"
            language="json"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            That's it!
          </h2>
          <p class="leading-7">
            You're now ready to start adding components to your project. Head over to the
            components section to start copying components.
          </p>
        </section>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-8 border-t">
        <Button routerLink="/docs/introduction" variant="outline" class="gap-2">
          <lucide-icon [img]="icons.ArrowLeft" class="h-4 w-4" />
          Introduction
        </Button>
        <Button routerLink="/docs/theming" variant="outline" class="gap-2">
          Theming
          <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
        </Button>
      </div>
    </div>
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
}
