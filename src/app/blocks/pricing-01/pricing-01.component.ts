import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pricing-01',
  imports: [],
  template: `
    <div class="container py-12">
      <div class="mx-auto max-w-6xl">
        <!-- Header -->
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-bold">Simple, transparent pricing</h2>
          <p class="text-lg text-muted-foreground">
            Choose the plan that's right for you
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid gap-8 md:grid-cols-3">
          <!-- Free Plan -->
          <div class="rounded-lg border bg-card p-8">
            <div class="mb-4">
              <h3 class="text-2xl font-bold">Free</h3>
              <div class="mt-4 flex items-baseline">
                <span class="text-4xl font-bold">$0</span>
                <span class="ml-2 text-muted-foreground">/month</span>
              </div>
            </div>
            <p class="mb-6 text-sm text-muted-foreground">
              Perfect for trying out our service
            </p>
            <button
              class="mb-6 w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Get Started
            </button>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Up to 10 projects</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Basic analytics</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Community support</span>
              </li>
              <li class="flex items-center gap-2 text-muted-foreground">
                <span>✗</span>
                <span>Advanced features</span>
              </li>
              <li class="flex items-center gap-2 text-muted-foreground">
                <span>✗</span>
                <span>Priority support</span>
              </li>
            </ul>
          </div>

          <!-- Pro Plan (Featured) -->
          <div class="relative rounded-lg border-2 border-primary bg-card p-8">
            <div
              class="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
            >
              Popular
            </div>
            <div class="mb-4">
              <h3 class="text-2xl font-bold">Pro</h3>
              <div class="mt-4 flex items-baseline">
                <span class="text-4xl font-bold">$29</span>
                <span class="ml-2 text-muted-foreground">/month</span>
              </div>
            </div>
            <p class="mb-6 text-sm text-muted-foreground">
              For professional developers
            </p>
            <button
              class="mb-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </button>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Unlimited projects</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Priority support</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Custom integrations</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Team collaboration</span>
              </li>
            </ul>
          </div>

          <!-- Enterprise Plan -->
          <div class="rounded-lg border bg-card p-8">
            <div class="mb-4">
              <h3 class="text-2xl font-bold">Enterprise</h3>
              <div class="mt-4 flex items-baseline">
                <span class="text-4xl font-bold">Custom</span>
              </div>
            </div>
            <p class="mb-6 text-sm text-muted-foreground">
              For large organizations
            </p>
            <button
              class="mb-6 w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Contact Sales
            </button>
            <ul class="space-y-3 text-sm">
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Everything in Pro</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Dedicated support</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Custom SLA</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Advanced security</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Training & onboarding</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing01Component {}
