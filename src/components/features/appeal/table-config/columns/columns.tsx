'use client';
import { ColumnDef} from '@tanstack/react-table';
import AppealTableRowActions from '../rows/AppealTableRowActions';
import SortableHeader from '../sortable-header/SortableHeader';
import HandleDate from '../../../../shared/date/handle-date/HandleDate';
import TableRowSelector from '../../table-rows-select/TableRowSelector';


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



export const columns: ColumnDef<Appeal>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <TableRowSelector table={table}/>
    ),
    cell: ({ row }) => (
      <TableRowSelector row={row}/>
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
        <div className={`${status === 'sent' ? 'text-primary font-semibold' : 'text-red-500'}`}>
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
    header: 'ACTIONS',
    cell: ({ row }) => {
      return <AppealTableRowActions row={row} />;
    },
  },
];
