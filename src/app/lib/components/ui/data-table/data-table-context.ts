import { InjectionToken, WritableSignal } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T = unknown> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => unknown;
  cell?: (info: { row: T; value: unknown }) => string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  size?: number;
  minSize?: number;
  maxSize?: number;
}

export interface SortingState {
  id: string;
  desc: boolean;
}

export interface ColumnVisibilityState {
  [key: string]: boolean;
}

export interface RowSelectionState {
  [key: string]: boolean;
}

export interface DataTableContext<T = unknown> {
  data: WritableSignal<T[]>;
  columns: WritableSignal<ColumnDef<T>[]>;
  sorting: WritableSignal<SortingState[]>;
  columnVisibility: WritableSignal<ColumnVisibilityState>;
  rowSelection: WritableSignal<RowSelectionState>;
  globalFilter: WritableSignal<string>;
  pageIndex: WritableSignal<number>;
  pageSize: WritableSignal<number>;
  onSortingChange: (sorting: SortingState[]) => void;
  onColumnVisibilityChange: (visibility: ColumnVisibilityState) => void;
  onRowSelectionChange: (selection: RowSelectionState) => void;
  onGlobalFilterChange: (filter: string) => void;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
}

export const DATA_TABLE_CONTEXT = new InjectionToken<DataTableContext>(
  'DataTableContext'
);
