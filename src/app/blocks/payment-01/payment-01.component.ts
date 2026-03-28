import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment-01',
  imports: [],
  template: `
    <div class="container max-w-2xl py-12">
      <div class="rounded-lg border bg-card p-8">
        <!-- Header -->
        <div class="mb-8">
          <h2 class="mb-2 text-2xl font-bold">Payment Details</h2>
          <p class="text-sm text-muted-foreground">Complete your purchase securely</p>
        </div>

        <!-- Order Summary -->
        <div class="mb-8 rounded-lg bg-muted p-4">
          <h3 class="mb-4 font-semibold">Order Summary</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Pro Plan (Monthly)</span>
              <span>$29.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tax</span>
              <span>$2.90</span>
            </div>
            <div class="my-2 border-t"></div>
            <div class="flex justify-between font-semibold">
              <span>Total</span>
              <span>$31.90</span>
            </div>
          </div>
        </div>

        <form class="space-y-6">
          <!-- Card Information -->
          <div>
            <h3 class="mb-4 font-semibold">Card Information</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium"> Card Number </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium"> Expiry Date </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Billing Information -->
          <div>
            <h3 class="mb-4 font-semibold">Billing Information</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium"> Cardholder Name </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Country</label>
                <select
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium">City</label>
                  <input
                    type="text"
                    placeholder="San Francisco"
                    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium"> Postal Code </label>
                  <input
                    type="text"
                    placeholder="94102"
                    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Terms -->
          <div class="flex items-start gap-2">
            <input type="checkbox" class="mt-1 h-4 w-4" id="terms" />
            <label for="terms" class="text-sm text-muted-foreground">
              I agree to the
              <a href="#" class="text-primary hover:underline">Terms of Service</a>
              and
              <a href="#" class="text-primary hover:underline">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Complete Payment
          </button>

          <!-- Security Notice -->
          <div class="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>🔒</span>
            <span>Your payment information is secure and encrypted</span>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Payment01Component {}
