'use client';

import { ColumnDef, Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from '../../../ui/button';
import AppealTableRowActions from '../data-table/AppealTableRowActions';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

export type Appeal = {
  id?: string;
  taxYear: number;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  appealedDeadline: Date | string | null;
  status: 'sent' | 'not sent';
  appealedDate: Date | string | null;
  appealedBy: string;
};

type SortableHeaderProps = {
  column: Column<any, unknown>;
  label: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === 'asc'
      ? ArrowUp
      : isSorted === 'desc'
        ? ArrowDown
        : ArrowUpDown;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={`Sort by ${label}`}
          className="text-[0.65rem] focus:outline-none focus:ring-0 focus:ring-offset-0"
        >
          {label}
          <SortingIcon className="ml-2 h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
type HandleDateProps = {
  date: Date | string;
};

const HandleDate: React.FC<HandleDateProps> = ({ date }) => {
  if (!date) return <div className="text-gray-400 italic">N/A</div>;

  const parsedDate =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  const isValid = parsedDate instanceof Date && !isNaN(parsedDate.getTime());

  if (!isValid) return <div className="text-red-500 italic">Invalid date</div>;

  const formatted = parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <div>{formatted}</div>;
};

export const columns: ColumnDef<Appeal>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'taxYear',
    header: ({ column }) => <SortableHeader column={column} label="TAX YEAR" />,
  },
  {
    accessorKey: 'company',
    header: ({ column }) => <SortableHeader column={column} label="COMPANY" />,
  },
  {
    accessorKey: 'state',
    header: ({ column }) => <SortableHeader column={column} label="STATE" />,
  },
  {
    accessorKey: 'assessor',
    header: ({ column }) => <SortableHeader column={column} label="ASSESSOR" />,
  },
  {
    accessorKey: 'accountNumber',
    header: ({ column }) => (
      <SortableHeader column={column} label="ACCOUNT NUMBER" />
    ),
  },
  {
    accessorKey: 'appealedDeadline',
    header: ({ column }) => (
      <SortableHeader column={column} label="APPEALED DEADLINE" />
    ),
    cell: ({ row }) => {
      const date: Date | string = row.getValue('appealedDeadline');
      return <HandleDate date={date} />;
    },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} label="STATUS" />,
    cell: ({ row }) => {
      const status: String = row.getValue('status');
      return (
        <div className={`${status === 'sent' ? '' : 'text-red-500'}`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: 'appealedDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="APPEALED DATE" />
    ),
    cell: ({ row }) => {
      const date: Date | string = row.getValue('appealedDate');
      return <HandleDate date={date} />;
    },
  },
  {
    accessorKey: 'appealedBy',
    header: ({ column }) => (
      <SortableHeader column={column} label="APPEALED BY" />
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <AppealTableRowActions row={row} />;
    },
  },
];
