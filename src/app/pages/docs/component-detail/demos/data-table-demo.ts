import { DataTable, DataTableContent, type ColumnDef } from '@/ui/data-table';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Payment {
  id: string;
  amount: string;
  status: string;
  email: string;
}

@Component({
  selector: 'DataTableDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTable, DataTableContent],
  template: `
    <DataTable [data]="payments" [columns]="columns" class="w-full">
      <DataTableContent />
    </DataTable>
  `,
})
export class DataTableDemo {
  protected readonly payments: Payment[] = [
    { id: '1', amount: '$316.00', status: 'success', email: 'ken99@yahoo.com' },
    { id: '2', amount: '$242.00', status: 'success', email: 'Abe45@gmail.com' },
    { id: '3', amount: '$837.00', status: 'processing', email: 'Monserrat44@gmail.com' },
    { id: '4', amount: '$874.00', status: 'success', email: 'Silas22@gmail.com' },
    { id: '5', amount: '$721.00', status: 'failed', email: 'carmella@hotmail.com' },
  ];

  protected readonly columns: ColumnDef<Payment>[] = [
    { id: 'status', header: 'Status', accessorKey: 'status' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'amount', header: 'Amount', accessorKey: 'amount' },
  ];
}
