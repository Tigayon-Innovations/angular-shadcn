import { Button } from '@/ui/button';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxList, ComboboxTrigger } from '@/ui/combobox';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChevronsUpDown, LucideAngularModule } from 'lucide-angular';

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
    <Combobox [options]="frameworks" [value]="value()" (valueChange)="value.set($event)">
      <ComboboxTrigger class="w-[200px]">
        <Button variant="outline" class="w-[200px] justify-between">
          {{ selectedLabel() || 'Select framework...' }}
          <lucide-icon [img]="ChevronsUpDown" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxList />
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  `,
})
export class ComboboxDemo {
  protected readonly ChevronsUpDown = ChevronsUpDown;

  protected readonly value = signal('');

  protected readonly frameworks = [
    { value: 'next', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
  ];

  protected readonly selectedLabel = () => {
    const framework = this.frameworks.find((f) => f.value === this.value());
    return framework?.label ?? '';
  };
}
