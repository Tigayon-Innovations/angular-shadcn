import { Button } from '@/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/sheet';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'SheetDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Button],
  template: `
    <Sheet [(open)]="open">
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div class="py-4">
          <p class="text-sm text-muted-foreground">
            Sheet content goes here. You can add forms, lists, or any other content.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  `,
})
export class SheetDemo {
  readonly open = signal(false);
}
