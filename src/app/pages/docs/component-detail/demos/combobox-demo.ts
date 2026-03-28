import { Button } from '@/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxList,
  ComboboxTrigger,
} from '@/ui/combobox';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Check, ChevronsUpDown, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ComboboxDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxList,
    ComboboxTrigger,
    LucideAngularModule,
  ],
  template: `
    <div class="flex flex-col gap-2">
      <Combobox [options]="frameworks" [value]="value()" (valueChange)="value.set($event)">
        <ComboboxTrigger class="w-[220px]">
          <Button variant="outline" class="w-[220px] justify-between font-normal">
            @if (selectedLabel()) {
              <span>{{ selectedLabel() }}</span>
            } @else {
              <span class="text-muted-foreground">Select framework...</span>
            }
            <lucide-icon [img]="ChevronsUpDown" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </ComboboxTrigger>
        <ComboboxContent class="w-[220px]">
          <ComboboxInput placeholder="Search framework..." />
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxGroup>
            <ComboboxList />
          </ComboboxGroup>
        </ComboboxContent>
      </Combobox>
      @if (value()) {
        <p class="text-sm text-muted-foreground">
          Selected: <span class="font-medium text-foreground">{{ selectedLabel() }}</span>
        </p>
      }
    </div>
  `,
})
export class ComboboxDemo {
  protected readonly ChevronsUpDown = ChevronsUpDown;
  protected readonly Check = Check;

  protected readonly value = signal('');

  protected readonly frameworks = [
    { value: 'angular', label: 'Angular' },
    { value: 'next', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
  ];

  protected readonly selectedLabel = computed(() => {
    const framework = this.frameworks.find((f) => f.value === this.value());
    return framework?.label ?? '';
  });
}
