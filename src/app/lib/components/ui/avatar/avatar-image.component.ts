import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { AVATAR_CONTEXT } from './avatar-context';

@Component({
  selector: 'AvatarImage',
  template: `
    @if (context.imageStatus() !== 'error') {
      <img
        [src]="src()"
        [alt]="alt()"
        [class]="computedClass()"
        (load)="onLoad()"
        (error)="onError()"
      />
    }
  `,
  host: {
    'attr.data-slot': '"avatar-image"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImage {
  readonly src = input<string>('');
  readonly alt = input<string>('');
  readonly class = input<string>('');

  protected readonly context = inject(AVATAR_CONTEXT);
  protected readonly computedClass = computed(() => cn('aspect-square size-full', this.class()));

  constructor() {
    // Reset status whenever src changes so a new src gets a fresh load attempt
    effect(() => {
      const _ = this.src();
      this.context.imageStatus.set('idle');
    });
  }

  protected onLoad(): void {
    this.context.imageStatus.set('loaded');
  }

  protected onError(): void {
    this.context.imageStatus.set('error');
  }
}
