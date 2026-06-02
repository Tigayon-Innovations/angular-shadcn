import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { AVATAR_CONTEXT, AvatarContext, AvatarImageStatus } from './avatar-context';

@Component({
  selector: 'Avatar',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"avatar"',
    '[class]': 'computedClass()',
  },
  providers: [
    {
      provide: AVATAR_CONTEXT,
      useExisting: forwardRef(() => Avatar),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar implements AvatarContext {
  readonly class = input<string>('');
  readonly imageStatus = signal<AvatarImageStatus>('idle');

  protected readonly computedClass = computed(() =>
    cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', this.class()),
  );
}
