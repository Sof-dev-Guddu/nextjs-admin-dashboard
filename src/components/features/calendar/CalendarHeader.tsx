import React from 'react';
import SelectMonth from '../../layouts/SelectMonth';
import { Button } from '@/components/ui/button';

const CalendarHeader = () => {
  return (
    <div className="h-[8vh] bg-gray-200 flex items-center  px-4 py-2 mx-2 rounded-[5rem] gap-[1rem]">
      <h2 className="text-lg mr-4"> Add new schedules :</h2>
      <SelectMonth />
      <Button className="px-10 rounded-[5rem]">SCHEDULE</Button>
      <Button
        variant={'outline'}
        className="px-10 rounded-[5rem] outline outline-1 outline-gray-800"
      >
        RESET
      </Button>
    </div>
  );
};

export default CalendarHeader;
