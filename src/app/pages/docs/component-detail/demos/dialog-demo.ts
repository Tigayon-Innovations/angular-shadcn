import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';

import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'DialogDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Input,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Button,
    Label,
  ],
  template: `
    <Dialog [(open)]="open">
      <DialogTrigger>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" class="text-right">Name</Label>
            <Input id="name" value="Pedro Duarte" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" class="text-right">Username</Label>
            <Input id="username" value="@peduarte" class="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" (click)="open.set(false)">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  `,
})
export class DialogDemo {
  readonly open = signal(false);
}
