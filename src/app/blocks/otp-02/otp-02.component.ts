import { Button } from '@/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/ui/input-otp';
import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-otp-02',
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  ],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div class="w-full max-w-sm">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-2xl">Verify your email</CardTitle>
            <CardDescription>
              We sent a 6-digit verification code to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex justify-center">
              <InputOTP [maxLength]="6" [(value)]="otp">
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

            <Button class="w-full" [disabled]="otp().length < 6">Verify</Button>
          </CardContent>
          <CardFooter class="justify-center">
            <div class="flex items-center text-sm">
              <span class="text-muted-foreground">Didn't receive a code?</span>
              @if (countdown() > 0) {
                <span class="ml-1 text-muted-foreground"> Resend in {{ countdown() }}s </span>
              } @else {
                <Button
                  variant="link"
                  class="ml-1 h-auto p-0 text-primary"
                  (click)="resendCode()"
                >
                  Resend
                </Button>
              }
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Otp02Component implements OnDestroy {
  protected readonly otp = signal('');
  protected readonly countdown = signal(0);

  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor() {
    this.startCountdown();
  }

  protected resendCode(): void {
    this.otp.set('');
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startCountdown(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.clearTimer();
    this.countdown.set(30);

    this.intervalId = setInterval(() => {
      const next = this.countdown() - 1;
      this.countdown.set(next);

      if (next <= 0) {
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
