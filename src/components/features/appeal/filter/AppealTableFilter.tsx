import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setGlobalFilter } from '@/store/slices/appeal/appeal-filter/tableFilterSlice';
import { Search } from 'lucide-react';

import React from 'react';

const AppealTableFilter = () => {
  const dispatch = useAppDispatch();
  const globalFilter = useAppSelector(
    (state) => state.reducer.tableFilter.globalFilter
  );
  return (
    <div className="w-[30dvw] relative ">
      <Input
        placeholder="Search by Company, Assessor or AppealedBy..."
        value={globalFilter ?? ''}
        onChange={(e) => dispatch(setGlobalFilter(e.target.value))}
        className="pl-[2.4rem]"
      />
      <Search className="absolute top-[0.4rem] left-[0.6rem] text-gray-500 " />
    </div>
  );
};

export default AppealTableFilter;
