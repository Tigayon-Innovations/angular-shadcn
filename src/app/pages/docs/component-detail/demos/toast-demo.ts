import { Button } from '@/ui/button';
import { Toaster, ToastService } from '@/ui/toast';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

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
  private readonly toastService = inject(ToastService);

  protected showToast(): void {
    this.toastService.success({
      title: 'Success',
      description: 'Your action was completed successfully.',
    });
  }
}
