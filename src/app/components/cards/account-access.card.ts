import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, AlertCircle, ArrowRight, Lock } from 'lucide-angular';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/lib/components/ui/field';
import { Input } from '@/lib/components/ui/input';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/lib/components/ui/item';

@Component({
  selector: 'card-account-access',
  standalone: true,
  imports: [
    LucideAngularModule,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Button,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>
          Update your credentials or re-authenticate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="email-address">Email Address</FieldLabel>
            <Input
              id="email-address"
              type="email"
              placeholder="artist&#64;studio.inc"
            />
          </Field>
          <Field>
            <div class="flex items-center justify-between">
              <FieldLabel for="current-password">
                Current Password
              </FieldLabel>
              <a
                href="#"
                class="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
              >
                Forgot?
              </a>
            </div>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••••••••••••••••••"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter class="flex-col gap-4">
        <Button class="w-full">
          <lucide-icon [img]="icons.Lock" />
          Update Security
        </Button>
        <Item variant="muted">
          <ItemMedia variant="icon">
            <lucide-icon [img]="icons.AlertCircle" class="text-destructive" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Danger Zone</ItemTitle>
            <ItemDescription class="line-clamp-1">
              Archive account and remove catalog
            </ItemDescription>
          </ItemContent>
          <lucide-icon [img]="icons.ArrowRight" class="size-4" />
        </Item>
      </CardFooter>
    </Card>
  `,
})
export class CardAccountAccess {
  protected readonly icons = { AlertCircle, ArrowRight, Lock };
}
