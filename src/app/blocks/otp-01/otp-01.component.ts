import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-otp-01',
  imports: [],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div class="w-full max-w-sm">
        <div class="rounded-lg border bg-card p-6 shadow-lg">
          <div class="mb-6 text-center">
            <h1 class="mb-2 text-2xl font-bold">Enter verification code</h1>
            <p class="text-sm text-muted-foreground">
              We sent a 6-digit code to your email.
            </p>
          </div>

          <form class="space-y-6">
            <!-- Verification Code Label -->
            <div>
              <label class="mb-3 block text-sm font-medium">
                Verification code
              </label>

              <!-- OTP Input Boxes -->
              <div class="flex justify-between gap-2">
                @for (i of [1, 2, 3, 4, 5, 6]; track i) {
                  <input
                    type="text"
                    maxlength="1"
                    class="h-14 w-full rounded-md border bg-background text-center text-lg font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    [attr.aria-label]="'Digit ' + i"
                  />
                }
              </div>

              <p class="mt-2 text-sm text-muted-foreground">
                Enter the 6-digit code sent to your email.
              </p>
            </div>

            <!-- Verify Button -->
            <button
              type="submit"
              class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Verify
            </button>

            <!-- Resend Link -->
            <div class="text-center text-sm">
              <span class="text-muted-foreground">Didn't receive the code?</span>
              <button
                type="button"
                class="ml-1 text-primary underline-offset-4 hover:underline"
              >
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Otp01Component {}
