import { Button } from '@/ui/button';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxTrigger } from '@/ui/combobox';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Check, ChevronsUpDown, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ComboboxDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
    LucideAngularModule,
  ],
  template: `
    <Combobox [value]="value()" (valueChange)="value.set($event)">
      <ComboboxTrigger class="w-[200px]">
        <Button variant="outline" role="combobox" class="w-[200px] justify-between">
          {{ selectedLabel() || 'Select framework...' }}
          <lucide-icon [img]="ChevronsUpDown" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        @for (framework of frameworks; track framework.value) {
          <ComboboxItem [value]="framework.value">
            <lucide-icon
              [img]="Check"
              class="mr-2 h-4 w-4"
              [class.opacity-100]="value() === framework.value"
              [class.opacity-0]="value() !== framework.value"
            />
            {{ framework.label }}
          </ComboboxItem>
        }
      </ComboboxContent>
    </Combobox>
  `,
})
export class ComboboxDemo {
  protected readonly Check = Check;
  protected readonly ChevronsUpDown = ChevronsUpDown;

  protected readonly value = signal('');

  protected readonly frameworks = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
  ];

  protected readonly selectedLabel = () => {
    const framework = this.frameworks.find((f) => f.value === this.value());
    return framework?.label ?? '';
  };
}
