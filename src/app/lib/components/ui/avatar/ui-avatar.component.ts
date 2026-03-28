import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { AvatarFallback } from './avatar-fallback.component';
import { Avatar } from './avatar.component';

/**
 * Avatar component that handles image loading and fallback display.
 * This is a convenience component that combines Avatar, AvatarImage, and AvatarFallback.
 *
 * @example
 * <ui-avatar
 *   src="/avatar.png"
 *   alt="John Doe"
 *   fallback="JD"
 * />
 */
@Component({
  selector: 'ui-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, AvatarFallback],
  template: `
    <Avatar [class]="class()">
      @if (src() && !imageError()) {
        <img AvatarImage [src]="src()" [alt]="alt()" (error)="onImageError()" />
      }
      @if (!src() || imageError()) {
        <AvatarFallback>{{ fallback() }}</AvatarFallback>
      }
    </Avatar>
  `,
})
export class UiAvatar {
  readonly src = input<string>('');
  readonly alt = input<string>('');
  readonly fallback = input<string>('');
  readonly class = input<string>('');

  protected readonly imageError = signal(false);

  protected onImageError(): void {
    this.imageError.set(true);
  }
}
