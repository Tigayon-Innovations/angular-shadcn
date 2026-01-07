import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'TextareaDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, Label],
  template: `
    <div class="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." ></Textarea>
    </div>
  `,
})
export class TextareaDemo {}
