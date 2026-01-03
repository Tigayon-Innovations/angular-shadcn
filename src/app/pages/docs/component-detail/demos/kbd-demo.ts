import { Kbd } from '@/ui/kbd';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'KbdDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Kbd],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
      <div class="flex items-center gap-1">
        <Kbd>Ctrl</Kbd>
        <span class="text-muted-foreground">+</span>
        <Kbd>C</Kbd>
      </div>
      <div class="flex items-center gap-1">
        <Kbd>⇧</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd>P</Kbd>
      </div>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  `,
})
export class KbdDemo {}
