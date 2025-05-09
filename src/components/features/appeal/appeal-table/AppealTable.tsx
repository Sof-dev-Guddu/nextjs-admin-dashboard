'use client';

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { AppealTablePagination } from '../pagination/AppealTablePagination';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppeals } from '@/store/slices/appeal/appealSlice';
import { Appeal } from '@/components/features/appeal/data-table/columns';
import { setGlobalFilter } from '@/store/slices/appeal/appeal-filter/tableFilterSlice';

interface AppealTableProps {
  columns: ColumnDef<Appeal, any>[];
  data: Appeal[];
}
export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

export default function AppealTable({ columns, data }: AppealTableProps) {
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useAppDispatch();

  // Get Redux appeal data
  const appealData = useAppSelector((state) => state.reducer.appeals.appeals);

  const globalFilter = useAppSelector(
    (state) => state.reducer.tableFilter.globalFilter
  );
  // Avoid dispatching data if it's already in Redux
  useEffect(() => {
    if (!appealData.length && data.length) {
      const serializedData = data.map((appeal) => ({
        ...appeal,
        appealedDeadline:
          appeal.appealedDeadline instanceof Date
            ? appeal?.appealedDeadline?.toISOString()
            : (appeal.appealedDeadline ?? null),
        appealedDate:
          appeal.appealedDate instanceof Date
            ? appeal?.appealedDate?.toISOString()
            : (appeal.appealedDate ?? null),
      }));

      dispatch(setAppeals(serializedData));
    }
  }, [data, dispatch, appealData.length]);

  const table = useReactTable({
    data: appealData,
    columns,
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: (value) => dispatch(setGlobalFilter(value)),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = String(filterValue).toLowerCase();
      const fieldsToSearch = ['company', 'assessor', 'appealedBy'];

      return fieldsToSearch.some((field) =>
        String(row.getValue(field)).toLowerCase().includes(search)
      );
    },
  });
  const { state } = useSidebar();
  return (
    <div className="rounded-md flex flex-col h-full -mt-1">
      {/* Table container */}
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Search by Company, Assessor or AppealedBy..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm focus-visible:border focus-visible:!ring-0 focus-visible:!ring-transparent  focus:border-gray-300"
        />
      </div> */}
      <Table>
        <TableHeader className=" bg-[#ECF3F9]  sticky top-0 z-10 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className=" text-[0.7rem] text-[#5F7181] py-1 px-4 "
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="overflow-y-auto ">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-none "
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-3 px-4 " key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        className={cn(
          'fixed bottom-[0.4rem] flex-1 ',
          state === 'expanded' && 'w-[calc(100dvw-18rem)]',
          state === 'collapsed' && 'w-[calc(100dvw-10rem)]'
        )}
      >
        <AppealTablePagination table={table} />
      </div>
    </div>
  );
}
