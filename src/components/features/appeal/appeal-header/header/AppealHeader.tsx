'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { openDialog } from '@/store/slices/appeal/appealSlice';
import AppealTableFilter from '@/components/features/appeal/filter/AppealTableFilter';
import { useAppSelector } from '@/store/hooks';
import SelectedAppealsActions from '../selected-appeal-operations/SelectedAppealsActions';

const AppealHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {appeals}= useAppSelector((state) => state.reducer.appeals)
  const handleAddTableData = () => {
    dispatch(openDialog({ mode: 'add' }));
  };
  return (
    <div className=" h-[10dvh] w-full flex justify-between items-center p-[0.4rem]  ">
      <h2 className='text-gray-700 border-b border-b-2 '>Total Appeals : <span className='font-semibold text-gray-600'>{appeals?.length||0}</span></h2>
    <div className="flex justify-between items-center gap-[0.75rem] ">
      
      <AppealTableFilter />
      <Button className="px-6" onClick={handleAddTableData}>
        Add
      </Button>
      <SelectedAppealsActions/>
    </div>
    </div>
  );
};

export default AppealHeader;
