'use client';

import { flexRender, HeaderGroup } from '@tanstack/react-table';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';
import { cn } from '@/lib/utils';
;

interface HeaderProps {
  headerGroups: HeaderGroup<Appeal>[];
}

export const AppealTableHeader = ({ headerGroups }: HeaderProps) => {
  return (
    <TableHeader className="bg-[#ECF3F9] sticky top-0 z-20">
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              className={cn(
                 'text-[0.7rem] text-[#5F7181] py-1 px-4 whitespace-nowrap', 
               header.column.id === 'select' && 'sticky left-0 z-20 bg-[#ECF3F9] ',
               header.column.id === 'actions' && 'sticky right-0 z-20 bg-[#ECF3F9]   '
  )}
              key={header.id}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
