import { SeoService } from '@/services/seo.service';
import { Button } from '@/ui/button';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Boxes,
  Check,
  Code2,
  Copy,
  Github,
  LucideAngularModule,
  Palette,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-angular';

/**
 * Home page component with hero, features, and component showcase.
 * Inspired by Next.js website design.
 */
@Component({
  selector: 'HomePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, LucideAngularModule],
  styles: `
    /* Animated grid background */
    .grid-background {
      background-size: 100px 100px;
      background-image: linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
        linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%);
    }

    /* Gradient orbs */
    .gradient-orb {
      filter: blur(100px);
      opacity: 0.4;
    }

    /* Smooth fade in animation */
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }

    .animation-delay-100 { animation-delay: 100ms; }
    .animation-delay-200 { animation-delay: 200ms; }
    .animation-delay-300 { animation-delay: 300ms; }
    .animation-delay-400 { animation-delay: 400ms; }
    .animation-delay-500 { animation-delay: 500ms; }

    /* Terminal glow effect */
    .terminal-glow {
      box-shadow: 0 0 60px hsl(var(--primary) / 0.15), 0 0 100px hsl(var(--primary) / 0.1);
    }

    /* Feature card hover */
    .feature-card {
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      background: hsl(var(--muted) / 0.5);
      border-color: hsl(var(--border));
    }

    /* Shimmer effect */
    .shimmer {
      background: linear-gradient(
        90deg,
        transparent,
        hsl(var(--primary) / 0.1),
        transparent
      );
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,
  template: `
    <div class="flex flex-col min-h-screen overflow-hidden">
      <!-- Hero Section -->
      <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <!-- Animated Grid Background -->
        <div class="absolute inset-0 grid-background"></div>

        <!-- Gradient Orbs -->
        <div class="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full gradient-orb"></div>
        <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/20 rounded-full gradient-orb"></div>

        <!-- Content -->
        <div class="relative z-10 container mx-auto px-4 py-20">
          <div class="flex flex-col items-center text-center max-w-5xl mx-auto">
            <!-- Announcement Badge -->
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8 animate-fade-in-up opacity-0"
            >
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span class="text-sm text-muted-foreground">
                Now with <span class="text-foreground font-medium">Angular 21</span> support
              </span>
            </div>

            <!-- Main Title -->
            <h1
              class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 animate-fade-in-up opacity-0 animation-delay-100"
            >
              <span class="block">Radix + shadcn,</span>
              <span class="block">rebuilt for <span class="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Angular</span></span>
            </h1>

            <!-- Description -->
            <p
              class="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in-up opacity-0 animation-delay-200"
            >
              A modern Angular UI kit that combines <span class="text-foreground font-medium">Radix primitives</span>
              with the <span class="text-foreground font-medium">shadcn approach</span> — accessible, composable,
              and ready to ship.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up opacity-0 animation-delay-300">
              <Button routerLink="/docs" size="lg" class="h-12 px-8 text-base gap-2 group">
                Get Started
                <lucide-icon
                  [img]="icons.ArrowRight"
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button routerLink="/docs/components" variant="outline" size="lg" class="h-12 px-8 text-base">
                Explore Components
              </Button>
            </div>

            <!-- Terminal Command -->
            <div class="animate-fade-in-up opacity-0 animation-delay-400 w-full max-w-md">
              <div
                class="flex items-center gap-3 px-4 py-3 rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm terminal-glow"
              >
                <lucide-icon [img]="icons.Terminal" class="h-4 w-4 text-muted-foreground" />
                <code class="flex-1 text-sm font-mono text-muted-foreground">
                  ng add @ng-cn/core@latest
                </code>
                <button
                  (click)="copyCommand()"
                  class="p-1.5 rounded-md hover:bg-muted transition-colors"
                  [attr.aria-label]="copied() ? 'Copied!' : 'Copy to clipboard'"
                >
                  @if (copied()) {
                    <lucide-icon [img]="icons.Check" class="h-4 w-4 text-green-500" />
                  } @else {
                    <lucide-icon [img]="icons.Copy" class="h-4 w-4 text-muted-foreground" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div class="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div class="w-1 h-2 bg-muted-foreground/50 rounded-full"></div>
          </div>
        </div>
      </section>

      <!-- What's Included Section -->
      <section class="relative py-24 sm:py-32 border-t border-border/50">
        <div class="container mx-auto px-4">
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything you need to build
            </h2>
            <p class="text-lg text-muted-foreground">
              Radix-powered primitives with shadcn-style building blocks — designed for Angular.
            </p>
          </div>

          <!-- Feature Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <!-- Feature 1: Components -->
            <div class="feature-card group p-6 rounded-xl border border-transparent">
              <div class="flex items-center gap-4 mb-4">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <lucide-icon [img]="icons.Boxes" class="h-5 w-5 text-white" />
                </div>
                <h3 class="text-lg font-semibold">60+ Components</h3>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                Buttons, dialogs, forms, navigation, and more — built on Radix primitives and styled the shadcn way.
              </p>
            </div>

            <!-- Feature 2: TypeScript -->
            <div class="feature-card group p-6 rounded-xl border border-transparent">
              <div class="flex items-center gap-4 mb-4">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                  <lucide-icon [img]="icons.Code2" class="h-5 w-5 text-white" />
                </div>
                <h3 class="text-lg font-semibold">TypeScript First</h3>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                Strict types throughout with great DX: autocomplete, docs, and safe APIs.
              </p>
            </div>

            <!-- Feature 3: Signals -->
            <div class="feature-card group p-6 rounded-xl border border-transparent">
              <div class="flex items-center gap-4 mb-4">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <lucide-icon [img]="icons.Zap" class="h-5 w-5 text-white" />
                </div>
                <h3 class="text-lg font-semibold">Signal-Powered</h3>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                Built with Angular signals for fine-grained reactivity and performance.
              </p>
            </div>

            <!-- Feature 4: Themeable -->
            <div class="feature-card group p-6 rounded-xl border border-transparent">
              <div class="flex items-center gap-4 mb-4">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <lucide-icon [img]="icons.Palette" class="h-5 w-5 text-white" />
                </div>
                <h3 class="text-lg font-semibold">Fully Themeable</h3>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                CSS variables for complete customization. Dark mode built-in. Your brand, your way.
              </p>
            </div>

            <!-- Feature 5: Accessible -->
            <div class="feature-card group p-6 rounded-xl border border-transparent">
              <div class="flex items-center gap-4 mb-4">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <lucide-icon [img]="icons.Shield" class="h-5 w-5 text-white" />
                </div>
                <h3 class="text-lg font-semibold">Accessible</h3>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                WAI-ARIA patterns, keyboard-first, screen-reader friendly — Radix-driven by design.
              </p>
            </div>

            <!-- Feature 6: SSR -->
            <div class="feature-card group p-6 rounded-xl border border-transparent">
              <div class="flex items-center gap-4 mb-4">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <lucide-icon [img]="icons.Server" class="h-5 w-5 text-white" />
                </div>
                <h3 class="text-lg font-semibold">SSR Ready</h3>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                Full server-side rendering support. Works seamlessly with Angular Universal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Built for Speed Section -->
      <section class="relative py-24 sm:py-32 border-t border-border/50 bg-muted/30">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <!-- Left Content -->
              <div>
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Built for performance
                </h2>
                <p class="text-lg text-muted-foreground mb-8">
                  Every component is optimized for speed. OnPush change detection, tree-shakable imports,
                  and minimal bundle size by default.
                </p>

                <div class="space-y-6">
                  <!-- Stat 1 -->
                  <div class="flex items-center gap-4">
                    <div class="text-4xl font-bold text-primary">100%</div>
                    <div>
                      <div class="font-medium">Tree-shakable</div>
                      <div class="text-sm text-muted-foreground">Import only what you use</div>
                    </div>
                  </div>

                  <!-- Stat 2 -->
                  <div class="flex items-center gap-4">
                    <div class="text-4xl font-bold text-primary">&lt;10kb</div>
                    <div>
                      <div class="font-medium">Average component</div>
                      <div class="text-sm text-muted-foreground">Gzipped and minified</div>
                    </div>
                  </div>

                  <!-- Stat 3 -->
                  <div class="flex items-center gap-4">
                    <div class="text-4xl font-bold text-primary">0</div>
                    <div>
                      <div class="font-medium">Runtime dependencies</div>
                      <div class="text-sm text-muted-foreground">Pure Angular & Tailwind</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Code Block -->
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
                <div class="relative bg-background border border-border rounded-xl overflow-hidden">
                  <!-- Terminal Header -->
                  <div class="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                    <div class="flex gap-1.5">
                      <div class="w-3 h-3 rounded-full bg-red-500"></div>
                      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span class="text-xs text-muted-foreground ml-2">button.component.ts</span>
                  </div>
                  <!-- Code Content -->
                  <pre class="p-4 text-sm font-mono overflow-x-auto"><code class="text-muted-foreground"><span class="text-pink-400">import</span> {{ '{' }} Button {{ '}' }} <span class="text-pink-400">from</span> <span class="text-green-400">'&#64;/ui/button'</span>;

<span class="text-blue-400">&#64;Component</span>({{ '{' }}
  <span class="text-cyan-400">selector</span>: <span class="text-green-400">'app-hero'</span>,
  <span class="text-cyan-400">imports</span>: [Button],
  <span class="text-cyan-400">template</span>: <span class="text-green-400">\`
    &#60;Button&#62;Click me&#60;/Button&#62;
  \`</span>,
{{ '}' }})
<span class="text-pink-400">export class</span> <span class="text-yellow-400">HeroComponent</span> {{ '{' }} {{ '}' }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trusted By / Open Source Section -->
      <section class="relative py-24 sm:py-32 border-t border-border/50">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <div class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-6">
              <lucide-icon [img]="icons.Sparkles" class="h-6 w-6 text-primary" />
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Open source.<br />Built by the community.
            </h2>
            <p class="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              A community project bringing Radix + shadcn-style components to Angular.
              Contribute, customize, and ship.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button routerLink="/docs" size="lg" class="h-12 px-8 text-base gap-2 group">
                Read the docs
                <lucide-icon
                  [img]="icons.ArrowRight"
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                class="h-12 px-8 text-base gap-2"
                (click)="openGitHub()"
              >
                <lucide-icon [img]="icons.Github" class="h-4 w-4" />
                Star on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Gradient -->
      <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </div>
  `,
})
export class HomePage {
  private readonly seo = inject(SeoService);
  protected readonly copied = signal(false);

  protected readonly icons = {
    Zap,
    Palette,
    Code2,
    Boxes,
    Shield,
    ArrowRight,
    Github,
    Terminal,
    Copy,
    Check,
    Sparkles,
    Server,
  };

  constructor() {
    this.seo.updateMetaTags({
      title: 'Radix + shadcn UI for Angular',
      description:
        'A modern Angular UI kit combining Radix primitives with the shadcn approach. Accessible, composable, themeable, and ready to ship.',
      keywords: [
        'angular',
        'shadcn',
        'radix',
        'ui components',
        'tailwind css',
        'typescript',
        'accessible',
        'open source',
        'angular components',
        'design system',
        'component library',
        'headless ui',
      ],
      ogType: 'website',
      structuredData: this.seo.getWebsiteStructuredData(),
    });
  }

  protected copyCommand(): void {
    navigator.clipboard.writeText('ng add @ng-cn/core@latest').then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  protected openGitHub(): void {
    window.open('https://github.com/example/shadcn-angular', '_blank');
  }
}
