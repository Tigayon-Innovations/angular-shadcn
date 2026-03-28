import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarDays, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'HoverCardDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Avatar,
    AvatarFallback,
    AvatarImage,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    LucideAngularModule,
  ],
  template: `
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="link">&#64;nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent class="w-80">
        <div class="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">&#64;nextjs</h4>
            <p class="text-sm">The React Framework – created and maintained by &#64;vercel.</p>
            <div class="flex items-center pt-2">
              <lucide-icon [img]="CalendarDays" class="mr-2 h-4 w-4 opacity-70" />
              <span class="text-xs text-muted-foreground"> Joined December 2021 </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  `,
})
export class HoverCardDemo {
  protected readonly CalendarDays = CalendarDays;
}
