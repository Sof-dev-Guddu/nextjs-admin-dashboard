'use client';
import React from 'react';

import { Button } from '../../../ui/button';
import { Download, MoreHorizontal, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { openDialog } from '@/store/slices/appeal/appealSlice';

import AppealTableFilter from '../filter/AppealTableFilter';

const AppealHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddTableData = () => {
    dispatch(openDialog({ mode: 'add' }));
  };
  return (
    <div className="flex justify-between items-center gap-[0.75rem]">
      <AppealTableFilter />
      <Button className="px-6" onClick={handleAddTableData}>
        Add
      </Button>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 w-9 rotate-90 bg-gray-200 hover:bg-gray-300 active:bg-red-300 active:text-white rounded-[50%] p-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              <span className="sr-only">Open menu</span>

              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AppealHeader;
