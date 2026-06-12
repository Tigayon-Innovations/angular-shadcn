import { Button } from '@/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/ui/item';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeCheck, ChevronRight, LucideAngularModule, Music, Shield } from 'lucide-angular';

@Component({
  selector: 'ItemDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
    LucideAngularModule,
  ],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <lucide-icon [img]="BadgeCheck" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
          <ItemDescription>Verified on Feb 21, 2026.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">View</Button>
        </ItemActions>
      </Item>

      <ItemGroup class="rounded-md border">
        <Item>
          <ItemMedia variant="icon">
            <lucide-icon [img]="Music" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Midnight City Lights</ItemTitle>
            <ItemDescription>Neon Dreams &middot; 3:45</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" aria-label="Open">
              <lucide-icon [img]="ChevronRight" class="size-4" />
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <lucide-icon [img]="Shield" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Two-factor authentication</ItemTitle>
            <ItemDescription>
              Add an extra layer of security to your account with 2FA.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Enable</Button>
          </ItemActions>
        </Item>
      </ItemGroup>

      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Compact item</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">Dismiss</Button>
        </ItemActions>
      </Item>
    </div>
  `,
})
export class ItemDemo {
  protected readonly BadgeCheck = BadgeCheck;
  protected readonly ChevronRight = ChevronRight;
  protected readonly Music = Music;
  protected readonly Shield = Shield;
}
