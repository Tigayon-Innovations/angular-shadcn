import { Spinner } from '@/ui/spinner';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'SpinnerDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Spinner],
  template: `
    <div class="flex items-center gap-8">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
    </div>
  `,
})
export class SpinnerDemo {}
