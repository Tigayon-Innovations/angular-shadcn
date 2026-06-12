import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Input } from '@/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideAngularModule,
  MoreHorizontal,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-angular';

interface Product {
  name: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  price: string;
  stock: number;
}

@Component({
  selector: 'app-products-01',
  imports: [
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
    LucideAngularModule,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  ],
  template: `
    <div class="w-full p-6">
      <Card>
        <CardHeader>
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your products and view their sales performance.</CardDescription>
            </div>
            <div class="flex items-center gap-2">
              <div class="relative">
                <lucide-icon
                  [img]="icons.Search"
                  class="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <input Input type="search" placeholder="Search products..." class="w-[200px] pl-8 lg:w-[280px]" />
              </div>
              <Button>
                <lucide-icon [img]="icons.Plus" class="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[64px]">
                  <span class="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead class="w-[48px]">
                  <span class="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              @for (product of products; track product.name) {
                <TableRow>
                  <TableCell>
                    <div class="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <lucide-icon [img]="icons.Package" class="h-5 w-5 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell class="font-medium">{{ product.name }}</TableCell>
                  <TableCell>
                    <Badge [variant]="getStatusVariant(product.status)">
                      {{ product.status }}
                    </Badge>
                  </TableCell>
                  <TableCell>{{ product.price }}</TableCell>
                  <TableCell>{{ product.stock }}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon">
                          <lucide-icon [img]="icons.MoreHorizontal" class="h-4 w-4" />
                          <span class="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent class="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <lucide-icon [img]="icons.Pencil" class="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <lucide-icon [img]="icons.Trash2" class="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products01Component {
  protected readonly icons = {
    MoreHorizontal,
    Package,
    Pencil,
    Plus,
    Search,
    Trash2,
  };

  protected readonly products: Product[] = [
    { name: 'Laser Lemonade Machine', status: 'In Stock', price: '$499.99', stock: 25 },
    { name: 'Hypernova Headphones', status: 'In Stock', price: '$129.99', stock: 100 },
    { name: 'AeroGlow Desk Lamp', status: 'Low Stock', price: '$39.99', stock: 8 },
    { name: 'TechTonic Energy Drink', status: 'Out of Stock', price: '$2.99', stock: 0 },
    { name: 'Gamer Gear Pro Controller', status: 'In Stock', price: '$59.99', stock: 75 },
    { name: 'Luminous VR Headset', status: 'Low Stock', price: '$199.99', stock: 5 },
    { name: 'Quantum Mechanical Keyboard', status: 'In Stock', price: '$149.99', stock: 42 },
  ];

  protected getStatusVariant(
    status: Product['status'],
  ): 'default' | 'secondary' | 'destructive' {
    switch (status) {
      case 'In Stock':
        return 'default';
      case 'Low Stock':
        return 'secondary';
      case 'Out of Stock':
        return 'destructive';
    }
  }
}
