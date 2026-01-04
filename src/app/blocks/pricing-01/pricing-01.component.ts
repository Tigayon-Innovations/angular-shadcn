import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Check, LucideAngularModule, X } from 'lucide-angular';

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  featured?: boolean;
}

@Component({
  selector: 'app-pricing-01',
  imports: [Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, LucideAngularModule],
  template: `
    <div class="container py-12">
      <div class="mx-auto max-w-6xl">
        <!-- Header -->
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p class="text-lg text-muted-foreground">
            Choose the plan that's right for you
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid gap-8 md:grid-cols-3">
          @for (plan of plans; track plan.name) {
            <Card [class]="plan.featured ? 'border-2 border-primary relative' : ''">
              @if (plan.featured) {
                <Badge class="absolute right-4 top-4">Popular</Badge>
              }
              <CardHeader>
                <CardTitle class="text-2xl">{{ plan.name }}</CardTitle>
                <div class="mt-4 flex items-baseline">
                  <span class="text-4xl font-bold">{{ plan.price }}</span>
                  @if (plan.period) {
                    <span class="ml-2 text-muted-foreground">{{ plan.period }}</span>
                  }
                </div>
                <CardDescription class="mt-2">
                  {{ plan.description }}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  [variant]="plan.featured ? 'default' : 'outline'"
                  class="w-full mb-6"
                >
                  {{ plan.buttonText }}
                </Button>
                <ul class="space-y-3 text-sm">
                  @for (feature of plan.features; track feature.text) {
                    <li class="flex items-center gap-2" [class.text-muted-foreground]="!feature.included">
                      @if (feature.included) {
                        <lucide-icon [img]="icons.Check" class="h-4 w-4 text-primary" />
                      } @else {
                        <lucide-icon [img]="icons.X" class="h-4 w-4" />
                      }
                      <span>{{ feature.text }}</span>
                    </li>
                  }
                </ul>
              </CardContent>
            </Card>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing01Component {
  protected readonly icons = { Check, X };

  protected readonly plans: PricingPlan[] = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for trying out our service',
      buttonText: 'Get Started',
      features: [
        { text: 'Up to 10 projects', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Community support', included: true },
        { text: 'Advanced features', included: false },
        { text: 'Priority support', included: false },
      ],
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For professional developers',
      buttonText: 'Get Started',
      featured: true,
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Team collaboration', included: true },
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      buttonText: 'Contact Sales',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Custom SLA', included: true },
        { text: 'Advanced security', included: true },
        { text: 'Training & onboarding', included: true },
      ],
    },
  ];
}
