import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'AvatarDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, AvatarFallback, AvatarImage],
  template: `
    <div class="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/angular.png" alt="@angular" />
        <AvatarFallback>NG</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  `,
})
export class AvatarDemo {}
