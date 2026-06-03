import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * AlertDialogHeader component - header area of the alert dialog.
 * Matches shadcn/ui React AlertDialogHeader exactly.
 * Contains title and description elements.
 *
 * @example
 * <AlertDialogHeader>
 *   <AlertDialogTitle>Delete Account</AlertDialogTitle>
 *   <AlertDialogDescription>Are you absolutely sure?</AlertDialogDescription>
 * </AlertDialogHeader>
 */
@Component({
  selector: 'AlertDialogHeader',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"alert-dialog-header"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogHeader {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-2 text-center sm:text-left', this.class()),
  );
}
