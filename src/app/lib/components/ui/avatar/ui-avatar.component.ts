import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarFallback } from './avatar-fallback.component';
import { AvatarImage } from './avatar-image.component';
import { Avatar } from './avatar.component';

/**
 * Convenience component combining Avatar + AvatarImage + AvatarFallback.
 * Error handling is automatic via the shared Avatar context.
 *
 * @example
 * <ui-avatar src="/avatar.png" alt="John Doe" fallback="JD" />
 */
@Component({
  selector: 'ui-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, AvatarImage, AvatarFallback],
  template: `
    <Avatar [class]="class()">
      @if (src()) {
        <AvatarImage [src]="src()" [alt]="alt()" />
      }
      <AvatarFallback>{{ fallback() }}</AvatarFallback>
    </Avatar>
  `,
})
export class UiAvatar {
  readonly src = input<string>('');
  readonly alt = input<string>('');
  readonly fallback = input<string>('');
  readonly class = input<string>('');
}
