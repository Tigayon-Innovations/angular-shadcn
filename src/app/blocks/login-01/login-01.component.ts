import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Separator } from '@/lib/components/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-01',
  imports: [Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Separator],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-sm">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your email to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form class="space-y-4">
              <!-- Email Field -->
              <div class="space-y-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m&#64;example.com"
                  required
                />
              </div>

              <!-- Password Field -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label for="password">Password</Label>
                  <a
                    href="#"
                    class="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </div>

              <!-- Sign In Button -->
              <Button type="submit" class="w-full">
                Sign In
              </Button>

              <!-- Divider -->
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <!-- Social Login Button -->
              <Button type="button" variant="outline" class="w-full">
                Login with Google
              </Button>
            </form>
          </CardContent>

          <CardFooter class="justify-center">
            <p class="text-sm text-muted-foreground">
              Don't have an account?
              <a
                href="#"
                class="ml-1 text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login01Component {}
