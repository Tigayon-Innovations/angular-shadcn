import { SeoService } from '@/services/seo.service';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';
import { Progress } from '@/ui/progress';
import { Separator } from '@/ui/separator';
import { Switch } from '@/ui/switch';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    ArrowRight,
    Boxes,
    ChevronRight,
    Code2,
    Github,
    LucideAngularModule,
    Palette,
    Shield,
    Star,
    Users,
    Zap,
} from 'lucide-angular';

/**
 * Home page component with hero, features, and component showcase.
 */
@Component({
  selector: 'HomePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Button,
    Badge,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Checkbox,
    Switch,
    Progress,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Separator,
    LucideAngularModule,
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <!-- Hero Section -->
      <section class="relative overflow-hidden py-20 md:py-32">
        <div class="container mx-auto px-4">
          <div class="flex flex-col items-center text-center gap-8">
            <!-- Badges -->
            <div class="flex items-center gap-2 flex-wrap justify-center">
              <Badge variant="secondary" class="px-3 py-1">
                <lucide-icon [img]="icons.Zap" class="h-3 w-3 mr-1" />
                Angular 21+
              </Badge>
              <Badge variant="secondary" class="px-3 py-1">TypeScript</Badge>
              <Badge variant="secondary" class="px-3 py-1">Tailwind CSS 4</Badge>
            </div>

            <!-- Title -->
            <div class="max-w-4xl">
              <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                A modern
                <span class="text-primary">&#64;shadcn/ui</span>
                experience for
                <span class="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Angular
                </span>
              </h1>
            </div>

            <!-- Description -->
            <p class="max-w-2xl text-lg text-muted-foreground md:text-xl">
              Beautiful components for Angular, built with Tailwind CSS.
              Open source. Accessible. Ready when you are.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <Button routerLink="/docs" size="lg" class="gap-2">
                Start building
                <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
              </Button>
              <Button routerLink="/docs/components" variant="outline" size="lg">
                Explore components
              </Button>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-8 text-center mt-8">
              <div>
                <div class="text-3xl font-bold">60+</div>
                <div class="text-sm text-muted-foreground">Components</div>
              </div>
              <Separator orientation="vertical" class="h-12" />
              <div>
                <div class="text-3xl font-bold">99%</div>
                <div class="text-sm text-muted-foreground">TypeScript</div>
              </div>
              <Separator orientation="vertical" class="h-12" />
              <div>
                <div class="text-3xl font-bold">100%</div>
                <div class="text-sm text-muted-foreground">Tree-shakable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Beautiful Components Section -->
      <section class="py-20 bg-muted/30">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Components that feel right
            </h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              A growing set of polished, accessible building blocks.
              Copy, paste, ship.
            </p>
          </div>

          <!-- Component Showcase Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <!-- Button Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Button</CardTitle>
                <CardDescription class="text-xs">Clear, responsive actions</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="outline">Outline</Button>
              </CardContent>
            </Card>

            <!-- Badge Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Badge</CardTitle>
                <CardDescription class="text-xs">Small details. Big clarity.</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
              </CardContent>
            </Card>

            <!-- Input Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Input</CardTitle>
                <CardDescription class="text-xs">Simple, focused form fields</CardDescription>
              </CardHeader>
              <CardContent>
                <Input type="email" placeholder="Email address" class="w-full" />
              </CardContent>
            </Card>

            <!-- Checkbox Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Checkbox</CardTitle>
                <CardDescription class="text-xs">Selection, made effortless</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-col gap-3">
                <label class="flex items-center gap-2 text-sm">
                  <Checkbox [checked]="true" />
                  Accept terms
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <Checkbox />
                  Subscribe
                </label>
              </CardContent>
            </Card>

            <!-- Switch Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Switch</CardTitle>
                <CardDescription class="text-xs">Toggles that just work</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-col gap-3">
                <label class="flex items-center justify-between text-sm">
                  Notifications
                  <Switch [checked]="true" />
                </label>
                <label class="flex items-center justify-between text-sm">
                  Dark mode
                  <Switch />
                </label>
              </CardContent>
            </Card>

            <!-- Progress Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Progress</CardTitle>
                <CardDescription class="text-xs">A better sense of progress</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-col gap-3">
                <Progress [value]="66"></Progress>
                <Progress [value]="33"></Progress>
              </CardContent>
            </Card>

            <!-- Avatar Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Avatar</CardTitle>
                <CardDescription class="text-xs">Identity, at a glance</CardDescription>
              </CardHeader>
              <CardContent class="flex gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            <!-- Card Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Card</CardTitle>
                <CardDescription class="text-xs">Thoughtful, flexible layouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="rounded-md border p-3 bg-background">
                  <p class="text-xs text-muted-foreground">Content, beautifully grouped</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- View All Link -->
          <div class="text-center mt-12">
            <Button routerLink="/docs/components" variant="outline" class="gap-2">
              See all 60+ components
              <lucide-icon [img]="icons.ChevronRight" class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Designed for Angular.
            </h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              The shadcn approach, rebuilt for Angular — fast, typed, and easy to adopt.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <!-- Lightning Fast -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Zap" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p class="text-muted-foreground text-sm">
                Built for speed with OnPush change detection and signals.
              </p>
            </div>

            <!-- Beautiful Design -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Palette" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Beautiful Design</h3>
              <p class="text-muted-foreground text-sm">
                Crafted with care. Looks great from day one.
              </p>
            </div>

            <!-- Developer Experience -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Code2" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Developer Experience</h3>
              <p class="text-muted-foreground text-sm">
                TypeScript-first. Great DX. Strong defaults.
              </p>
            </div>

            <!-- Modular Architecture -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Boxes" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Modular Architecture</h3>
              <p class="text-muted-foreground text-sm">
                Standalone by default. Import what you need. Nothing more.
              </p>
            </div>

            <!-- Type Safe -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Shield" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Type Safe</h3>
              <p class="text-muted-foreground text-sm">
                Strict types throughout. No guesswork.
              </p>
            </div>

            <!-- Community Driven -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Users" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Community Driven</h3>
              <p class="text-muted-foreground text-sm">
                Open source, built in the open. Contributions welcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-muted/30">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Build something great.
            </h2>
            <p class="text-lg text-muted-foreground mb-8">
              Bring a new level of polish to your next Angular app.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button routerLink="/docs" size="lg" class="gap-2">
                Read the docs
                <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                class="gap-2"
                (click)="openGitHub()"
              >
                <lucide-icon [img]="icons.Github" class="h-4 w-4" />
                Star on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomePage {
  private readonly seo = inject(SeoService);

  protected readonly icons = {
    Zap,
    Palette,
    Code2,
    Boxes,
    Shield,
    Users,
    ArrowRight,
    Github,
    Star,
    ChevronRight,
  };

  constructor() {
    this.seo.updateMetaTags({
      title: 'Beautiful UI Components for Angular',
      description:
        'Beautiful, accessible, and customizable UI components for Angular. Built with Tailwind CSS. 60+ components. Open source and ready to use.',
      keywords: [
        'angular',
        'shadcn',
        'ui components',
        'tailwind css',
        'typescript',
        'accessible',
        'open source',
        'angular components',
        'design system',
        'component library',
        'radix',
        'headless ui',
      ],
      ogType: 'website',
      structuredData: this.seo.getWebsiteStructuredData(),
    });
  }

  protected openGitHub(): void {
    window.open('https://github.com/example/shadcn-angular', '_blank');
  }
}
