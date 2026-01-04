import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-signup-01',
  imports: [],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div class="w-full max-w-sm">
        <div class="rounded-lg border bg-card p-6 shadow-lg">
          <div class="mb-6 space-y-2 text-center">
            <h1 class="text-2xl font-bold">Create an account</h1>
            <p class="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <form class="space-y-4">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                class="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                class="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Confirm Password Field -->
            <div class="space-y-2">
              <label for="confirm-password" class="text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                class="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Create Account Button -->
            <button
              type="submit"
              class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Create Account
            </button>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t"></div>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <!-- Social Signup Buttons -->
            <button
              type="button"
              class="w-full rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Sign up with Google
            </button>
          </form>

          <!-- Terms -->
          <p class="mt-6 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our
            <a href="#" class="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>
            and
            <a href="#" class="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>

          <!-- Sign In Link -->
          <div class="mt-4 text-center text-sm">
            <span class="text-muted-foreground">Already have an account?</span>
            <a
              href="#"
              class="ml-1 text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup01Component {}
