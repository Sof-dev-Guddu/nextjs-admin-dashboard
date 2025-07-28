import { Row } from '@tanstack/react-table';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';
import { Delete, Download, MoreHorizontal, SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAppDispatch } from '@/store/hooks';
import { openDialog } from '@/store/slices/appeal/appealSlice';
import { useState, useCallback } from 'react';
import { deleteAppeal } from '@/store/slices/appeal/apealThunk';
import { downloadAppealsAsPDF } from '@/utils/pdf-downloader/downloadAppealsAsPDF';
import { DeleteAlertDialog } from '@/components/shared/delete-alert/DeleteAlertDialog';

const ACTIONS = {
  EDIT: 'Edit Letter',
  STATUS: 'Change Status',
  DELETE: 'Delete',
  DOWNLOAD: 'Download',
} as const;

interface Props {
  row: Row<Appeal>;
}

export default function AppealTableRowActions({ row }: Props) {
  const dispatch = useAppDispatch();
  const [isDelete, setIsDelete] = useState(false);

  const menuItems = [
    { icon: <SquarePen />, label: ACTIONS.EDIT },
    { icon: <SquarePen />, label: ACTIONS.STATUS },
    { icon: <Delete />, label: ACTIONS.DELETE },
    { icon: <Download />, label: ACTIONS.DOWNLOAD },
  ];

  const handleAction = useCallback(
    (action: string) => {
      const appeal = row.original;

      switch (action) {
        case ACTIONS.STATUS:
          setTimeout(() => {
            dispatch(
              openDialog({
                mode: 'change_status',
                data: appeal,
              })
            );
          }, 50);
          return;

        case ACTIONS.EDIT:
          setTimeout(() => {
            dispatch(
              openDialog({
                mode: 'edit',
                data: {
                  ...appeal,
                  appealedDeadline:
                    appeal.appealedDeadline instanceof Date
                      ? appeal.appealedDeadline.toISOString()
                      : appeal.appealedDeadline ?? null,
                  appealedDate:
                    appeal.appealedDate instanceof Date
                      ? appeal.appealedDate.toISOString()
                      : appeal.appealedDate ?? null,
                },
              })
            );
          }, 50);
          return;

        case ACTIONS.DELETE:
          setIsDelete(true);
          return;

        case ACTIONS.DOWNLOAD:
          downloadAppealsAsPDF(appeal);
          return;

        default:
          return;
      }
    },
    [dispatch, row.original]
  );

  const handleDelete = () => {
    dispatch(deleteAppeal(row.original));
  };

  const handleDeleteCancel = () => {
    setIsDelete(false);
  };

  if (isDelete) {
    return (
      <DeleteAlertDialog
        open={true}
        onConfirm={handleDelete}
        onOpenChange={handleDeleteCancel}
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-6 w-6 bg-gray-200 hover:bg-gray-300 focus:bg-red-300 focus:text-white rounded-full p-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
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
