import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Alert description component.
 *
 * @example
 * <p AlertDescription>You can add components to your app using the CLI.</p>
 */
@Component({
  selector: '[AlertDescription]',
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
