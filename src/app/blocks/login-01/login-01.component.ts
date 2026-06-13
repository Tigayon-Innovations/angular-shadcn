import { Input } from '@/lib/components/ui/input';
import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';

import { Label } from '@/lib/components/ui/label';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-01',
  imports: [Input, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Label],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-sm">
        <div class="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div class="flex flex-col gap-6">
                  <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="m&#64;example.com" required />
                  </div>
                  <div class="grid gap-2">
                    <div class="flex items-center">
                      <Label for="password">Password</Label>
                      <a
                        href="#"
                        class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <div class="flex flex-col gap-3">
                    <Button type="submit" class="w-full">Login</Button>
                    <Button variant="outline" type="button" class="w-full">
                      Login with Google
                    </Button>
                    <p class="text-center text-sm text-muted-foreground">
                      Don't have an account?
                      <a href="#" class="underline underline-offset-4">Sign up</a>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login01Component {}
