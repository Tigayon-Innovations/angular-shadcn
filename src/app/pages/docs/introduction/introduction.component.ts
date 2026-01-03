import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, ExternalLink, Github, LucideAngularModule } from 'lucide-angular';

/**
 * Introduction documentation page.
 */
@Component({
  selector: 'IntroductionPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Badge, Separator, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Introduction</h1>
        <p class="text-lg text-muted-foreground mt-2">
          Re-usable components built with Angular, Tailwind CSS, and shadcn/ui design principles.
        </p>
      </div>

      <Separator />

      <!-- Content -->
      <div class="space-y-8">
        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            What is shadcn-angular?
          </h2>
          <p class="leading-7">
            shadcn-angular is a collection of re-usable components built using Angular and
            Tailwind CSS. It's NOT a component library. It's a collection of components that
            you can copy and paste into your apps.
          </p>
          <p class="leading-7">
            This project is an Angular port of
            <a href="https://ui.shadcn.com" target="_blank" class="font-medium underline underline-offset-4 hover:text-primary">
              shadcn/ui
            </a>
            , maintaining the same design principles, naming conventions, and API patterns
            wherever possible.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Philosophy
          </h2>
          <p class="leading-7">
            The idea behind shadcn-angular is simple:
          </p>
          <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
              <strong>Ownership</strong> — You own the code. Copy and paste the components
              you need into your project.
            </li>
            <li>
              <strong>Customization</strong> — Every component is fully customizable.
              Modify the styles, behavior, or structure to fit your needs.
            </li>
            <li>
              <strong>No Dependencies</strong> — No runtime dependencies on third-party
              component libraries. Just pure Angular and Tailwind CSS.
            </li>
            <li>
              <strong>Accessibility</strong> — Components are built with accessibility in
              mind, following WAI-ARIA guidelines.
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Key Features
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border p-4">
              <h3 class="font-semibold">Angular 21+</h3>
              <p class="text-sm text-muted-foreground mt-1">
                Built for the latest Angular with signals, standalone components, and
                zoneless change detection.
              </p>
            </div>
            <div class="rounded-lg border p-4">
              <h3 class="font-semibold">Tailwind CSS 4</h3>
              <p class="text-sm text-muted-foreground mt-1">
                Uses Tailwind CSS v4 with CSS variables for theming and dark mode support.
              </p>
            </div>
            <div class="rounded-lg border p-4">
              <h3 class="font-semibold">TypeScript First</h3>
              <p class="text-sm text-muted-foreground mt-1">
                100% TypeScript with strict type checking. No any types in the public API.
              </p>
            </div>
            <div class="rounded-lg border p-4">
              <h3 class="font-semibold">57+ Components</h3>
              <p class="text-sm text-muted-foreground mt-1">
                A comprehensive collection covering forms, navigation, feedback, data
                display, and more.
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Credits
          </h2>
          <p class="leading-7">
            This project is inspired by and based on:
          </p>
          <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
              <a href="https://ui.shadcn.com" target="_blank" class="font-medium underline underline-offset-4 hover:text-primary">
                shadcn/ui
              </a>
              — The original React component collection by shadcn.
            </li>
            <li>
              <a href="https://www.radix-ui.com" target="_blank" class="font-medium underline underline-offset-4 hover:text-primary">
                Radix UI
              </a>
              — Unstyled, accessible components for React.
            </li>
            <li>
              <a href="https://tailwindcss.com" target="_blank" class="font-medium underline underline-offset-4 hover:text-primary">
                Tailwind CSS
              </a>
              — A utility-first CSS framework.
            </li>
          </ul>
        </section>
      </div>

      <!-- Next Steps -->
      <div class="flex items-center justify-between pt-8 border-t">
        <div></div>
        <Button routerLink="/docs/installation" variant="outline" class="gap-2">
          Installation
          <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  `,
})
export class IntroductionPage {
  protected readonly icons = { ArrowRight, Github, ExternalLink };
}
