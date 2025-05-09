import { Row } from '@tanstack/react-table';
import { Appeal } from '@/components/features/appeal/data-table/columns';
import { Delete, Download, MoreHorizontal, SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/store/hooks';
import { openDialog } from '@/store/slices/appeal/appealSlice';
import { useState } from 'react';

export default function AppealTableRowActions({ row }: { row: Row<Appeal> }) {
  const dispatch = useAppDispatch();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const menuItems = [
    { icon: <SquarePen />, label: 'Edit Letter' },
    { icon: <SquarePen />, label: 'Change Status' },
    { icon: <Download />, label: 'Download' },
  ];

  const handleAction = (action: string) => {
    if (action === 'Edit Letter') {
      const appeal = row.original;
      setTimeout(() => {
        dispatch(
          openDialog({
            mode: 'edit',
            data: {
              ...appeal,
              appealedDeadline:
                appeal.appealedDeadline instanceof Date
                  ? appeal?.appealedDeadline?.toISOString()
                  : (appeal.appealedDeadline ?? null),
              appealedDate:
                appeal.appealedDate instanceof Date
                  ? appeal?.appealedDate?.toISOString()
                  : (appeal.appealedDate ?? null),
            },
          })
        );
      }, 50);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-6 w-6 bg-gray-200 hover:bg-gray-300 focus:bg-red-300 focus:text-white rounded-[50%] p-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
        >
          <span className="sr-only">Open menu</span>

          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleAction(item.label)}
            className="flex items-center gap-1 p-[0.65rem]"
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
