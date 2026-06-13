import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, MoreHorizontal, Settings, Calendar, RefreshCw, ArrowRight } from 'lucide-angular';

import { Breadcrumb } from '@/lib/components/ui/breadcrumb';
import { BreadcrumbItem } from '@/lib/components/ui/breadcrumb';
import { BreadcrumbLink } from '@/lib/components/ui/breadcrumb';
import { BreadcrumbList } from '@/lib/components/ui/breadcrumb';
import { BreadcrumbPage } from '@/lib/components/ui/breadcrumb';
import { BreadcrumbSeparator } from '@/lib/components/ui/breadcrumb';
import { Button } from '@/lib/components/ui/button';
import { Card } from '@/lib/components/ui/card';
import { CardContent } from '@/lib/components/ui/card';
import { CardHeader } from '@/lib/components/ui/card';
import { DropdownMenu } from '@/lib/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@/lib/components/ui/dropdown-menu';
import { DropdownMenuGroup } from '@/lib/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@/lib/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/lib/components/ui/dropdown-menu';
import { Item } from '@/lib/components/ui/item';
import { ItemContent } from '@/lib/components/ui/item';
import { ItemDescription } from '@/lib/components/ui/item';
import { ItemGroup } from '@/lib/components/ui/item';
import { ItemMedia } from '@/lib/components/ui/item';
import { ItemTitle } from '@/lib/components/ui/item';

@Component({
  selector: 'card-payments',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    Card,
    CardContent,
    CardHeader,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
  ],
  template: `
    <Card>
      <CardHeader class="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="icon" variant="ghost" aria-label="Account options">
                    <lucide-icon [img]="icons.MoreHorizontal" />
                    <span class="sr-only">Account options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Statements</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <div role="listitem" class="w-full">
            <Item variant="muted">
              <ItemMedia variant="icon">
                <lucide-icon [img]="icons.Settings" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Change transfer limit</ItemTitle>
                <ItemDescription>
                  Adjust how much you can send from your balance.
                </ItemDescription>
              </ItemContent>
              <lucide-icon [img]="icons.ArrowRight" class="size-4 shrink-0 text-muted-foreground" />
            </Item>
          </div>
          <div role="listitem" class="w-full">
            <Item variant="muted">
              <ItemMedia variant="icon">
                <lucide-icon [img]="icons.Calendar" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Scheduled transfers</ItemTitle>
                <ItemDescription>
                  Set up a transfer to send at a later date.
                </ItemDescription>
              </ItemContent>
              <lucide-icon [img]="icons.ArrowRight" class="size-4 shrink-0 text-muted-foreground" />
            </Item>
          </div>
          <div role="listitem" class="w-full">
            <Item variant="muted">
              <ItemMedia variant="icon">
                <lucide-icon [img]="icons.RefreshCw" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Recurring card payments</ItemTitle>
                <ItemDescription>
                  Manage your repeated card transactions.
                </ItemDescription>
              </ItemContent>
              <lucide-icon [img]="icons.ArrowRight" class="size-4 shrink-0 text-muted-foreground" />
            </Item>
          </div>
        </ItemGroup>
      </CardContent>
    </Card>
  `,
})
export class CardPayments {
  protected readonly icons = { MoreHorizontal, Settings, Calendar, RefreshCw, ArrowRight };
}
