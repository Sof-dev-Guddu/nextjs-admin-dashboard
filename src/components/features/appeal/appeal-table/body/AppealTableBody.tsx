'use client';

import {
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';

import { flexRender, Table as ReactTable } from '@tanstack/react-table';
import LoadingSkeleton from '@/components/shared/loader/LoadingSkeleton';
import { cn } from '@/lib/utils';

interface BodyProps {
  table: ReactTable<Appeal>;
  columnsLength: number;
  loading?: boolean;
  error: string | null;
}

export const AppealTableBody = ({ table, columnsLength, loading, error }: BodyProps) => {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            <LoadingSkeleton showShimmer={false} className='w-full h-full bg-white !rounded' />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <TableBody className="overflow-y-auto">
      {rows?.length ? (
        rows.map((row) => (
          <TableRow
            className="border-none hover:bg-gray-100 group"
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                className={cn(
                  'py-3 px-4 whitespace-nowrap border-b border-b-gray-100    ',
                  cell.column.id === 'select' && 'sticky  left-0 z-10 bg-white shadow-md group-hover:bg-gray-100  ',
                  cell.column.id === 'actions' && 'sticky right-0 z-10 bg-white shadow-md group-hover:bg-gray-100'
                )}
                
                key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            {error ? (
              <p className="text-red-500 group-hover:text-primary">{String(error)}</p>
            ) : (
              <p>No results.</p>
            )}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
