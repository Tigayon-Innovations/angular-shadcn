import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/ui/input-otp';
import { Label } from '@/ui/label';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'InputOtpDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Label],
  template: `
    <div class="space-y-2">
      <Label>One-Time Password</Label>
      <InputOTP [maxLength]="6">
        <InputOTPGroup>
          <InputOTPSlot [index]="0" />
          <InputOTPSlot [index]="1" />
          <InputOTPSlot [index]="2" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot [index]="3" />
          <InputOTPSlot [index]="4" />
          <InputOTPSlot [index]="5" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  `,
})
export class InputOtpDemo {}
