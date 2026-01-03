import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Command } from './command.component';

/**
 * CommandDialog component - a command palette in a dialog.
 * Matches shadcn/ui React CommandDialog exactly.
 */
@Component({
  selector: 'CommandDialog',
  imports: [Command],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 bg-black/80" (click)="closeDialog()"></div>
      <div [class]="computedDialogClass()">
        <Command [class]="'[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'">
          <ng-content />
        </Command>
      </div>
    }
  `,
  host: {
    class: 'contents',
    '(document:keydown.escape)': 'onEscapeKey()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandDialog {
  /** Whether the dialog is open */
  readonly open = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Close event */
  readonly openChange = output<boolean>();

  private readonly internalOpen = signal(false);

  protected readonly computedDialogClass = computed(() =>
    cn(
      'fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-full max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg border bg-popover shadow-lg',
      this.class()
    )
  );

  protected closeDialog(): void {
    this.openChange.emit(false);
  }

  protected onEscapeKey(): void {
    if (this.open()) {
      this.closeDialog();
    }
  }
}
