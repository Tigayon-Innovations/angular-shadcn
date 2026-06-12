import { PhoneInput } from '@/ui/phone-input';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'PhoneInputDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PhoneInput, FormsModule],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-sm">
      <PhoneInput
        placeholder="Phone number"
        [ngModel]="phoneValue()"
        (ngModelChange)="phoneValue.set($event)"
      />
      @if (phoneValue()) {
        <p class="text-sm text-muted-foreground">
          Value: <span class="font-medium text-foreground">{{ phoneValue() }}</span>
        </p>
      }
    </div>
  `,
})
export class PhoneInputDemo {
  protected readonly phoneValue = signal<string>('');
}
