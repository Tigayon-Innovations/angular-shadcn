import { Button } from '@/ui/button';
import { Sonner, toast } from '@/ui/sonner';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'SonnerDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Sonner],
  template: `
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" (click)="showDefault()">Default</Button>
      <Button variant="outline" (click)="showSuccess()">Success</Button>
      <Button variant="outline" (click)="showError()">Error</Button>
      <Button variant="outline" (click)="showWarning()">Warning</Button>
      <Button variant="outline" (click)="showInfo()">Info</Button>
    </div>
    <Sonner />
  `,
})
export class SonnerDemo {
  protected showDefault(): void {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
    });
  }
  protected showSuccess(): void {
    toast.success('Profile updated', {
      description: 'Your changes have been saved successfully.',
    });
  }
  protected showError(): void {
    toast.error('Something went wrong', {
      description: 'Please try again later.',
    });
  }
  protected showWarning(): void {
    toast.warning('Storage almost full', {
      description: 'You have used 90% of your storage quota.',
    });
  }
  protected showInfo(): void {
    toast.info('New features available', {
      description: 'Check out the latest updates in the changelog.',
    });
  }
}
