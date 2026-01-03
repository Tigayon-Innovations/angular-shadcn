import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';
import { Progress } from '@/ui/progress';
import { Separator } from '@/ui/separator';
import { Switch } from '@/ui/switch';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
                Finally, a real
                <span class="text-primary">&#64;shadcn/ui</span>
                alternative for
                <span class="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Angular
                </span>
              </h1>
            </div>

            <!-- Description -->
            <p class="max-w-2xl text-lg text-muted-foreground md:text-xl">
              Beautifully designed components built with Angular and Tailwind CSS.
              Open source. Accessible. Customizable. Just copy and paste.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <Button routerLink="/docs" size="lg" class="gap-2">
                Get Started
                <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
              </Button>
              <Button routerLink="/docs/components" variant="outline" size="lg">
                View Components
              </Button>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-8 text-center mt-8">
              <div>
                <div class="text-3xl font-bold">57+</div>
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
                <div class="text-sm text-muted-foreground">Tree Shakable</div>
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
              Beautiful Components
            </h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of beautifully designed, accessible, and customizable components
              that you can copy and paste into your apps.
            </p>
          </div>

          <!-- Component Showcase Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <!-- Button Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Button</CardTitle>
                <CardDescription class="text-xs">Click me interactions</CardDescription>
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
                <CardDescription class="text-xs">Status indicators</CardDescription>
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
                <CardDescription class="text-xs">Text input fields</CardDescription>
              </CardHeader>
              <CardContent>
                <Input type="email" placeholder="Email address" class="w-full" />
              </CardContent>
            </Card>

            <!-- Checkbox Card -->
            <Card class="group hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-medium">Checkbox</CardTitle>
                <CardDescription class="text-xs">Selection controls</CardDescription>
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
                <CardDescription class="text-xs">Toggle controls</CardDescription>
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
                <CardDescription class="text-xs">Loading indicators</CardDescription>
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
                <CardDescription class="text-xs">User representations</CardDescription>
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
                <CardDescription class="text-xs">Content containers</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="rounded-md border p-3 bg-background">
                  <p class="text-xs text-muted-foreground">Nested card content</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- View All Link -->
          <div class="text-center mt-12">
            <Button routerLink="/docs/components" variant="outline" class="gap-2">
              View All 57+ Components
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
              Why shadcn-angular?
            </h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with the same philosophy as shadcn/ui, but designed specifically for Angular.
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
                Optimized for performance with OnPush change detection and signals.
              </p>
            </div>

            <!-- Beautiful Design -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Palette" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Beautiful Design</h3>
              <p class="text-muted-foreground text-sm">
                Crafted with attention to detail. Looks great out of the box.
              </p>
            </div>

            <!-- Developer Experience -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Code2" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Developer Experience</h3>
              <p class="text-muted-foreground text-sm">
                TypeScript-first with full IDE support and type safety.
              </p>
            </div>

            <!-- Modular Architecture -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Boxes" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Modular Architecture</h3>
              <p class="text-muted-foreground text-sm">
                Standalone components. Import only what you need. Tree-shakable.
              </p>
            </div>

            <!-- Type Safe -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Shield" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Type Safe</h3>
              <p class="text-muted-foreground text-sm">
                Strict TypeScript throughout. No any types in the public API.
              </p>
            </div>

            <!-- Community Driven -->
            <div class="flex flex-col items-center text-center p-6">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <lucide-icon [img]="icons.Users" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-2">Community Driven</h3>
              <p class="text-muted-foreground text-sm">
                Open source and built with the community. Contributions welcome.
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
              Ready to get started?
            </h2>
            <p class="text-lg text-muted-foreground mb-8">
              Start building beautiful Angular applications with shadcn-angular today.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button routerLink="/docs" size="lg" class="gap-2">
                Read the Docs
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

  protected openGitHub(): void {
    window.open('https://github.com/example/shadcn-angular', '_blank');
  }
}
