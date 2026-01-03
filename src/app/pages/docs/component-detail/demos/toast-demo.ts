import { Button } from '@/ui/button';
import { Toaster } from '@/ui/toast';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ToastDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Toaster],
  template: `
    <div>
      <Button variant="outline" (click)="showToast()">Show Toast</Button>
      <Toaster />
    </div>
  `,
})
export class ToastDemo {
  protected showToast(): void {
    // Toast service would be injected and used here
    console.log('Toast triggered');
  }
}
