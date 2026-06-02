import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertCircle, LucideAngularModule, Terminal } from 'lucide-angular';

@Component({
  selector: 'AlertDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Alert, AlertDescription, AlertTitle, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-2xl">
      <Alert>
        <lucide-icon [img]="Terminal" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <lucide-icon [img]="AlertCircle" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  `,
})
export class AlertDemo {
  protected readonly Terminal = Terminal;
  protected readonly AlertCircle = AlertCircle;
}
