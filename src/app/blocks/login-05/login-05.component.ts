import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GalleryVerticalEnd, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login-05',
  imports: [Button, Input, Label, LucideAngularModule],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-sm">
        <form class="flex flex-col gap-6">
          <div class="flex flex-col items-center gap-2">
            <!-- Logo -->
            <a href="#" class="flex flex-col items-center gap-2 font-medium">
              <div class="flex size-8 items-center justify-center rounded-md">
                <lucide-icon [img]="icons.GalleryVerticalEnd" class="size-6" />
              </div>
              <span class="sr-only">Acme Inc.</span>
            </a>
            <h1 class="text-xl font-bold">Welcome back</h1>
            <div class="text-center text-sm">
              Don't have an account?
              <a href="#" class="underline underline-offset-4">Sign up</a>
            </div>
          </div>

          <div class="flex flex-col gap-6">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <input Input id="email" type="email" placeholder="m&#64;example.com" required />
            </div>
            <Button type="submit" class="w-full">Continue</Button>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login05Component {
  readonly icons = { GalleryVerticalEnd };
}
