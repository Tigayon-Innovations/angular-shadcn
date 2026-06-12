import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'TextareaDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, Label],
  template: `
    <div class="flex flex-col gap-6 w-full max-w-sm">
      <!-- Basic -->
      <div class="grid gap-1.5">
        <Label htmlFor="message">Your message</Label>
        <textarea Textarea id="message" placeholder="Type here..."></textarea>
      </div>

      <!-- Disabled -->
      <div class="grid gap-1.5">
        <Label htmlFor="message-disabled">Disabled</Label>
        <textarea Textarea id="message-disabled" disabled placeholder="Cannot type here..."></textarea>
      </div>

      <!-- Auto-resize -->
      <div class="grid gap-1.5">
        <Label htmlFor="message-autoresize">Auto-resize</Label>
        <textarea Textarea id="message-autoresize" [autoResize]="true" placeholder="Grows as you type..."></textarea>
      </div>
    </div>
  `,
})
export class TextareaDemo {}
