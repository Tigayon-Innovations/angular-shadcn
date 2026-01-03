import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/ui/table';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/**
 * API reference table component for documenting component props.
 */
@Component({
  selector: 'ApiReference',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table, TableBody, TableCell, TableHead, TableHeader, TableRow],
  template: `
    <div class="my-6">
      <h3 class="mb-4 font-semibold text-lg">{{ title() }}</h3>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[200px]">Property</TableHead>
              <TableHead class="w-[200px]">Type</TableHead>
              <TableHead class="w-[100px]">Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            @for (prop of properties(); track prop.name) {
              <TableRow>
                <TableCell class="font-mono text-sm">{{ prop.name }}</TableCell>
                <TableCell class="font-mono text-sm text-muted-foreground">{{ prop.type }}</TableCell>
                <TableCell class="font-mono text-sm text-muted-foreground">{{ prop.default || '-' }}</TableCell>
                <TableCell>{{ prop.description }}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    </div>
  `,
})
export class ApiReference {
  readonly title = input<string>('Props');
  readonly properties = input<ApiProperty[]>([]);
}
