import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * DialogHeader component - header area of the dialog.
 * Matches shadcn/ui React DialogHeader exactly.
 */
@Component({
  selector: 'DialogHeader',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"dialog-header"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHeader {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-1.5 text-center sm:text-left', this.class()),
  );
}
