import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GalleryVerticalEnd, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login-02',
  imports: [Button, Input, Label, LucideAngularModule],
  template: `
    <div class="grid min-h-svh lg:grid-cols-2">
      <div class="flex flex-col gap-4 p-6 md:p-10">
        <div class="flex justify-center gap-2 md:justify-start">
          <a href="#" class="flex items-center gap-2 font-medium">
            <div
              class="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
            >
              <lucide-icon [img]="icons.GalleryVerticalEnd" class="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div class="flex flex-1 items-center justify-center">
          <div class="w-full max-w-xs">
            <!-- LoginForm -->
            <form class="flex flex-col gap-6">
              <!-- FieldGroup -->
              <div
                class="group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4"
                data-slot="field-group"
              >
                <div class="flex flex-col items-center gap-1 text-center">
                  <h1 class="text-2xl font-bold">Login to your account</h1>
                  <p class="text-sm text-balance text-muted-foreground">
                    Enter your email below to login to your account
                  </p>
                </div>
                <!-- Field -->
                <div
                  role="group"
                  data-slot="field"
                  data-orientation="vertical"
                  class="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&>*]:w-full [&>.sr-only]:w-auto"
                >
                  <Label
                    for="email"
                    data-slot="field-label"
                    class="group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10"
                    >Email</Label
                  >
                  <input Input id="email" type="email" placeholder="m&#64;example.com" required />
                </div>
                <!-- Field -->
                <div
                  role="group"
                  data-slot="field"
                  data-orientation="vertical"
                  class="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&>*]:w-full [&>.sr-only]:w-auto"
                >
                  <div class="flex items-center">
                    <Label
                      for="password"
                      data-slot="field-label"
                      class="group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10"
                      >Password</Label
                    >
                    <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <input Input id="password" type="password" required />
                </div>
                <!-- Field -->
                <div
                  role="group"
                  data-slot="field"
                  data-orientation="vertical"
                  class="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&>*]:w-full [&>.sr-only]:w-auto"
                >
                  <Button type="submit">Login</Button>
                </div>
                <!-- FieldSeparator -->
                <div
                  data-slot="field-separator"
                  data-content="true"
                  class="relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2"
                >
                  <div
                    data-slot="separator"
                    data-orientation="horizontal"
                    role="none"
                    class="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px absolute inset-0 top-1/2"
                  ></div>
                  <span
                    class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
                    data-slot="field-separator-content"
                  >
                    Or continue with
                  </span>
                </div>
                <!-- Field -->
                <div
                  role="group"
                  data-slot="field"
                  data-orientation="vertical"
                  class="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&>*]:w-full [&>.sr-only]:w-auto"
                >
                  <Button variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="currentColor"
                      />
                    </svg>
                    Login with GitHub
                  </Button>
                  <!-- FieldDescription -->
                  <p
                    data-slot="field-description"
                    class="text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary text-center"
                  >
                    Don't have an account?
                    <a href="#" class="underline underline-offset-4"> Sign up </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login02Component {
  readonly icons = { GalleryVerticalEnd };
}
