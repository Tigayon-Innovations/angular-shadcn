import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, ArrowRight, ChevronUp, Search } from 'lucide-angular';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { ButtonGroup } from '@/lib/components/ui/button-group';
import { Card, CardContent } from '@/lib/components/ui/card';
import { Checkbox } from '@/lib/components/ui/checkbox';
import { Field, FieldGroup } from '@/lib/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/lib/components/ui/input-group';
import { RadioGroup, RadioGroupItem } from '@/lib/components/ui/radio-group';
import { Switch } from '@/lib/components/ui/switch';
import { Textarea } from '@/lib/components/ui/textarea';

@Component({
  selector: 'card-ui-elements',
  standalone: true,
  imports: [
    LucideAngularModule,
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Checkbox,
    Field,
    FieldGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    RadioGroup,
    RadioGroupItem,
    Switch,
    Textarea,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card class="w-full">
      <CardContent class="flex flex-col gap-6">
        <div class="flex gap-2">
          <Button>
            Button
            <lucide-icon [img]="icons.ArrowRight" data-icon="inline-end" />
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupInput placeholder="Name" />
              <InputGroupAddon align="inline-end">
                <div class="text-muted-foreground flex items-center gap-2 text-sm">
                  <lucide-icon [img]="icons.Search" />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field class="flex-1">
            <Textarea placeholder="Message" class="resize-none"></Textarea>
          </Field>
        </FieldGroup>
        <div class="flex items-center gap-2">
          <div class="flex gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline" class="hidden 4xl:flex">Outline</Badge>
          </div>
          <RadioGroup
            defaultValue="apple"
            class="ml-auto flex w-fit gap-3"
            aria-label="Fruit preference"
          >
            <RadioGroupItem value="apple" aria-label="Apple" />
            <RadioGroupItem value="banana" aria-label="Banana" />
          </RadioGroup>
          <div class="flex gap-3">
            <Checkbox [checked]="true" aria-label="Enable email alerts" />
            <Checkbox
              class="hidden 4xl:flex"
              aria-label="Enable push alerts"
            />
          </div>
          <Switch
            [checked]="true"
            class="flex 4xl:hidden"
            aria-label="Enable compact notifications"
          />
        </div>
        <div class="flex items-center gap-4">
          <Button variant="outline">
            <span class="hidden md:flex style-sera:md:hidden">
              Alert Dialog
            </span>
            <span class="flex md:hidden style-sera:md:flex">Dialog</span>
          </Button>
          <ButtonGroup class="ml-auto">
            <Button variant="outline">
              <span class="style-sera:hidden">Button Group</span>
              <span class="hidden style-sera:block">Group</span>
            </Button>
            <Button variant="outline" size="icon" aria-label="Open quick actions">
              <lucide-icon [img]="icons.ChevronUp" />
            </Button>
          </ButtonGroup>
          <Switch
            [checked]="true"
            class="hidden 4xl:flex"
            aria-label="Enable advanced setting"
          />
        </div>
      </CardContent>
    </Card>
  `,
})
export class CardUiElements {
  protected readonly icons = { ArrowRight, ChevronUp, Search };
}
