import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AVATAR_CONTEXT } from './avatar-context';

@Component({
  selector: 'AvatarFallback',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"avatar-fallback"',
    '[class]': 'computedClass()',
    // Hidden via display:none when image has loaded; always in DOM for layout stability
    '[style.display]': 'context.imageStatus() === "loaded" ? "none" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarFallback {
  readonly class = input<string>('');
  protected readonly context = inject(AVATAR_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn('bg-muted flex size-full items-center justify-center rounded-full text-xs', this.class()),
  );
}
