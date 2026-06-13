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
  selector: 'app-signup-01',
  imports: [Input, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Label],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div class="flex flex-col gap-6">
                <div class="grid gap-2">
                  <Label for="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div class="grid gap-2">
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m&#64;example.com"
                    required
                  />
                  <p class="text-sm text-muted-foreground">
                    We'll use this to contact you. We will not share your email
                    with anyone else.
                  </p>
                </div>
                <div class="grid gap-2">
                  <Label for="password">Password</Label>
                  <Input id="password" type="password" required />
                  <p class="text-sm text-muted-foreground">
                    Must be at least 8 characters long.
                  </p>
                </div>
                <div class="grid gap-2">
                  <Label for="confirm-password">
                    Confirm Password
                  </Label>
                  <Input id="confirm-password" type="password" required />
                  <p class="text-sm text-muted-foreground">Please confirm your password.</p>
                </div>
                <div class="flex flex-col gap-6">
                  <div class="grid gap-2">
                    <Button type="submit">Create Account</Button>
                    <Button variant="outline" type="button">
                      Sign up with Google
                    </Button>
                    <p class="text-sm text-muted-foreground px-6 text-center">
                      Already have an account? <a href="#">Sign in</a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup01Component {}
