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
  imports: [RouterLink, Button, Separator, LucideAngularModule],
  template: `
    <article class="relative">
      <!-- Header -->
      <div class="space-y-4 pb-8 pt-6 md:pb-10">
        <div class="space-y-2">
          <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            Introduction
          </h1>
          <p class="text-xl text-muted-foreground leading-7">
            Reusable components for Angular — built with Tailwind and shadcn/ui principles.
          </p>
        </div>
      </div>

      <Separator class="mb-10" />

      <!-- Content -->
      <div class="space-y-16">
        <!-- What is Section -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                What is shadcn-angular?
              </h2>
            </div>
            <div class="space-y-4 text-base leading-7">
              <p>
                shadcn-angular is a collection of reusable components built with <strong>Angular 21+</strong> and <strong>Tailwind CSS v4</strong>.
                Unlike traditional component libraries, you don't install a package — you copy what you need into your app.
              </p>
              <div class="rounded-lg border bg-muted/50 p-6 space-y-3">
                <p class="text-sm font-medium">
                  <lucide-icon [img]="icons.ExternalLink" class="h-4 w-4 inline mr-1" />
                  This is an Angular port of
                  <a href="https://ui.shadcn.com" target="_blank" class="font-medium underline underline-offset-4 hover:text-primary">
                    shadcn/ui
                  </a>
                </p>
                <p class="text-sm text-muted-foreground">
                  We follow the same design principles, naming conventions, and API patterns to ensure familiarity for developers coming from React.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Philosophy Section -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                Philosophy
              </h2>
              <p class="text-muted-foreground">
                Built on four core principles that put you in control.
              </p>
            </div>
            <div class="grid gap-6 md:grid-cols-2">
              <div class="rounded-lg border bg-card p-6 space-y-3">
                <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 class="text-xl font-semibold">Ownership</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Copy the components you need. You own the code. Modify, extend, or remove as you see fit.
                </p>
              </div>
              <div class="rounded-lg border bg-card p-6 space-y-3">
                <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M2.5 2.5h19v19h-19z M7 12h10 M12 7v10"/></svg>
                </div>
                <h3 class="text-xl font-semibold">Customization</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Adjust styles, structure, and behavior to perfectly match your product's needs.
                </p>
              </div>
              <div class="rounded-lg border bg-card p-6 space-y-3">
                <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
                </div>
                <h3 class="text-xl font-semibold">No Dependencies</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  No runtime component library bloat. Just Angular and Tailwind CSS — tools you already know.
                </p>
              </div>
              <div class="rounded-lg border bg-card p-6 space-y-3">
                <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M9 12h6 M12 9v6 M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"/></svg>
                </div>
                <h3 class="text-xl font-semibold">Accessibility</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Built with accessibility in mind, following WAI-ARIA patterns and semantic HTML.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Key Features Section -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                Key Features
              </h2>
              <p class="text-muted-foreground">
                Modern tools and technologies that developers love.
              </p>
            </div>
            <div class="grid gap-6 md:grid-cols-2">
              <div class="group relative rounded-lg border bg-card p-6 hover:bg-accent transition-colors">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span class="text-lg font-bold text-primary">A</span>
                    </div>
                    <h3 class="text-xl font-semibold">Angular 21+</h3>
                  </div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Built for modern Angular with signals, standalone components, and zoneless change detection support.
                  </p>
                </div>
              </div>
              <div class="group relative rounded-lg border bg-card p-6 hover:bg-accent transition-colors">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span class="text-lg font-bold text-primary">T</span>
                    </div>
                    <h3 class="text-xl font-semibold">Tailwind CSS 4</h3>
                  </div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Latest Tailwind v4 with CSS variables for effortless theming and built-in dark mode.
                  </p>
                </div>
              </div>
              <div class="group relative rounded-lg border bg-card p-6 hover:bg-accent transition-colors">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span class="text-lg font-bold text-primary">TS</span>
                    </div>
                    <h3 class="text-xl font-semibold">TypeScript First</h3>
                  </div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Strict TypeScript with full type safety. No <code class="bg-muted px-1.5 py-0.5 rounded text-xs">any</code> in the public API.
                  </p>
                </div>
              </div>
              <div class="group relative rounded-lg border bg-card p-6 hover:bg-accent transition-colors">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span class="text-lg font-bold text-primary">57</span>
                    </div>
                    <h3 class="text-xl font-semibold">60+ Components</h3>
                  </div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Comprehensive set of components for forms, navigation, feedback, data display, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Credits Section -->
        <section class="scroll-mt-20">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
                Credits
              </h2>
              <p class="text-muted-foreground">
                Standing on the shoulders of giants.
              </p>
            </div>
            <div class="space-y-4">
              <div class="rounded-lg border p-4 flex items-start gap-4">
                <div class="mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </div>
                <div>
                  <a href="https://ui.shadcn.com" target="_blank" class="font-semibold underline underline-offset-4 hover:text-primary">
                    shadcn/ui
                  </a>
                  <p class="text-sm text-muted-foreground mt-1">
                    The original React component collection by shadcn that inspired this project.
                  </p>
                </div>
              </div>
              <div class="rounded-lg border p-4 flex items-start gap-4">
                <div class="mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </div>
                <div>
                  <a href="https://www.radix-ui.com" target="_blank" class="font-semibold underline underline-offset-4 hover:text-primary">
                    Radix UI
                  </a>
                  <p class="text-sm text-muted-foreground mt-1">
                    Unstyled, accessible components for React that set the accessibility standards.
                  </p>
                </div>
              </div>
              <div class="rounded-lg border p-4 flex items-start gap-4">
                <div class="mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </div>
                <div>
                  <a href="https://tailwindcss.com" target="_blank" class="font-semibold underline underline-offset-4 hover:text-primary">
                    Tailwind CSS
                  </a>
                  <p class="text-sm text-muted-foreground mt-1">
                    A utility-first CSS framework that powers the styling system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Navigation Footer -->
      <div class="flex items-center justify-between pt-12 mt-12 border-t">
        <div></div>
        <Button routerLink="/docs/installation" variant="default" class="gap-2">
          Get Started
          <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
        </Button>
      </div>
    </article>
  `,
})
export class IntroductionPage {
  protected readonly icons = { ArrowRight, Github, ExternalLink };
}
