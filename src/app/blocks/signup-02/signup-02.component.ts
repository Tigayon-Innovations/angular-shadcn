import { Button } from '@/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-signup-02',
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Input,
    Label,
  ],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div class="w-full max-w-sm">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your details below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="space-y-4">
              <!-- Name Field -->
              <div class="space-y-2">
                <Label htmlFor="name">Name</Label>
                <input Input id="name" type="text" placeholder="John Doe" />
              </div>

              <!-- Email Field -->
              <div class="space-y-2">
                <Label htmlFor="email">Email</Label>
                <input Input id="email" type="email" placeholder="m@example.com" />
              </div>

              <!-- Password Field -->
              <div class="space-y-2">
                <Label htmlFor="password">Password</Label>
                <input Input id="password" type="password" />
              </div>

              <!-- Confirm Password Field -->
              <div class="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <input Input id="confirm-password" type="password" />
              </div>

              <!-- Terms and Conditions -->
              <div class="flex items-center space-x-2">
                <Checkbox id="terms" [(checked)]="agreedToTerms" />
                <Label htmlFor="terms" class="font-normal">
                  I agree to the
                  <a href="#" class="text-primary underline underline-offset-4 hover:no-underline">
                    terms and conditions
                  </a>
                </Label>
              </div>

              <!-- Create Account Button -->
              <Button type="submit" class="w-full" [disabled]="!agreedToTerms()">
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter class="justify-center">
            <p class="text-center text-sm text-muted-foreground">
              Already have an account?
              <a href="#" class="ml-1 text-primary underline-offset-4 hover:underline">Login</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup02Component {
  protected readonly agreedToTerms = signal(false);
}
