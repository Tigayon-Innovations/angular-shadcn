import { cn, Presence } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Command } from './command.component';

/**
 * CommandDialog component - a command palette in a dialog.
 * Matches shadcn/ui React CommandDialog exactly.
 */
@Component({
  selector: 'CommandDialog',
  imports: [Command, Presence],
  template: `
    <Presence [present]="open()">
      <div
        class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="open() ? 'open' : 'closed'"
        (click)="closeDialog()"
      ></div>
      <div
        [class]="computedDialogClass()"
        [attr.data-state]="open() ? 'open' : 'closed'"
      >
        <Command [class]="'[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'">
          <ng-content />
        </Command>
      </div>
    </Presence>
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
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
      'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      'duration-200',
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
