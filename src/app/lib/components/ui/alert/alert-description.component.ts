import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Alert description component.
 *
 * @example
 * <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
 */
@Component({
  selector: 'AlertDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'alert-description',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDescription {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
      this.class()
    )
  );
}
