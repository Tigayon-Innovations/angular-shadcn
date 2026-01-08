import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'AvatarDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, AvatarFallback, AvatarImage],
  template: `
    <div class="flex items-center gap-4">
      <Avatar class="h-12 w-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar class="h-12 w-12">
        <AvatarImage src="https://github.com/angular.png" alt="@angular" />
        <AvatarFallback>NG</AvatarFallback>
      </Avatar>
      <Avatar class="h-12 w-12">
        <AvatarFallback class="text-lg">JD</AvatarFallback>
      </Avatar>
    </div>
  `,
})
export class AvatarDemo {}
