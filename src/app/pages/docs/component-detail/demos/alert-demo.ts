import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertCircle, LucideAngularModule, Terminal } from 'lucide-angular';

@Component({
  selector: 'AlertDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Alert, AlertDescription, AlertTitle, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-md">
      <Alert>
        <lucide-icon [img]="Terminal" class="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <lucide-icon [img]="AlertCircle" class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  `,
})
export class AlertDemo {
  protected readonly Terminal = Terminal;
  protected readonly AlertCircle = AlertCircle;
}
