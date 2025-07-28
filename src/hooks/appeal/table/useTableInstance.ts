import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

import { useTablePagination } from './useTablePagination';
import { useTableSorting } from './useTableSorting';
import { useTableGlobalFilter } from './useTableGlobalFilter';
import { useState } from 'react';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';
import { ColumnFiltersState } from '@tanstack/react-table';

export const useTableInstance = (data: Appeal[], columns: ColumnDef<Appeal, any>[]) => {
  const { pagination, setPagination } = useTablePagination();
  const { sorting, setSorting } = useTableSorting();
  const { globalFilter, setGlobalFilter } = useTableGlobalFilter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = String(filterValue).toLowerCase();
      const fieldsToSearch = ['company', 'assessor', 'appealedBy'];
      return fieldsToSearch.some((field) =>
        String(row.getValue(field)).toLowerCase().includes(search)
      );
    },
  });

  return {
    table,
    pagination,
    sorting,
    globalFilter,
    columnFilters,
    rowSelection,
  };
};
