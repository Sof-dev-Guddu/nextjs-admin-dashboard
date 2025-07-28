'use client';

import {ColumnDef} from '@tanstack/react-table';
import {Table} from '@/components/ui/table';
import { useEffect, useMemo } from 'react';
import { AppealTablePagination } from '@/components/features/appeal/pagination/AppealTablePagination';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppeals, setSSRError, setSelectedAppeals,  } from '@/store/slices/appeal/appealSlice';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';
import { useTableInstance } from '@/hooks/appeal/table/useTableInstance';
import { AppealTableBody } from '../body/AppealTableBody';
import { AppealTableHeader } from '../header/AppealTableHeader';

export interface AppealTableProps {
  columns: ColumnDef<Appeal, unknown>[];
  data: Appeal[];
    error?: string | null;
}


export default function AppealTable({ columns, data ,error}: AppealTableProps) {
  
  const dispatch = useAppDispatch();
  const { appeals, loading, errors } = useAppSelector((state) => state.reducer.appeals);

  //custom hook to manage table-operations
  const { table } = useTableInstance(appeals, columns);

  //shadcn hook to manage on collapse of sidebar
  const { state } = useSidebar();

  //memoize serialized data from ssr
  const serialized = useMemo(() => {
    return data.map((appeal) => ({
      ...appeal,
      appealedDeadline:
        appeal.appealedDeadline instanceof Date
          ? appeal.appealedDeadline.toISOString()
          : appeal.appealedDeadline ?? null,
      appealedDate:
        appeal.appealedDate instanceof Date
          ? appeal.appealedDate.toISOString()
          : appeal.appealedDate ?? null,
    }));
  }, [data]);

  //checking if error or data from ssr-component , then dispatch to redux
  useEffect(() => {
    
    if(error){
     dispatch(setSSRError(error ?? null)); 
    }

    if (appeals.length === 0 && Array.isArray(data) && data.length > 0){
    dispatch(setAppeals(serialized));
      };
     
  }, [data, appeals.length,error]);


   //  Listen for selection changes and update selectedAppeals
 useEffect(() => {
  let mounted = true;

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id)
    .filter((id): id is string => typeof id === 'string');

  if (mounted) {
    dispatch(setSelectedAppeals(selectedIds));
  }

  return () => {
    mounted = false;
  };
}, [table.getSelectedRowModel().rows, dispatch]);

  return (
    <div className="rounded-md flex flex-col h-full -mt-1">
      <Table>

        <AppealTableHeader
         headerGroups={table.getHeaderGroups()}
         />

        <AppealTableBody 
         table={table}
         columnsLength={columns.length} 
         loading={loading}
         error={errors}
         />
      
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
