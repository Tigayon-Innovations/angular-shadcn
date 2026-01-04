import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-01',
  imports: [],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div class="w-full max-w-sm">
        <div class="rounded-lg border bg-card p-6 shadow-lg">
          <div class="mb-6 space-y-2 text-center">
            <h1 class="text-2xl font-bold">Welcome back</h1>
            <p class="text-sm text-muted-foreground">
              Enter your email to sign in to your account
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
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-medium">
                  Password
                </label>
                <a
                  href="#"
                  class="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                class="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Sign In Button -->
            <button
              type="submit"
              class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign In
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

            <!-- Social Login Buttons -->
            <button
              type="button"
              class="w-full rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Login with Google
            </button>
          </form>

          <!-- Sign Up Link -->
          <div class="mt-6 text-center text-sm">
            <span class="text-muted-foreground">Don't have an account?</span>
            <a
              href="#"
              class="ml-1 text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login01Component {}
