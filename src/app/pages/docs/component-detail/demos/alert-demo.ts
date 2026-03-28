import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertCircle, LucideAngularModule, Terminal } from 'lucide-angular';

@Component({
  selector: 'AlertDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Alert, AlertDescription, AlertTitle, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-2xl">
      <Alert class="flex items-start gap-4">
        <lucide-icon [img]="Terminal" class="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div class="flex-1">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription> You can add components to your app using the CLI. </AlertDescription>
        </div>
      </Alert>
      <Alert variant="destructive" class="flex items-start gap-4">
        <lucide-icon [img]="AlertCircle" class="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div class="flex-1">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription> Your session has expired. Please log in again. </AlertDescription>
        </div>
      </Alert>
    </div>
  `,
})
export class AlertDemo {
  protected readonly Terminal = Terminal;
  protected readonly AlertCircle = AlertCircle;
}
