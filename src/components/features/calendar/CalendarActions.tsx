import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderInput, Plus, Printer, Trash2 } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';

const CalendarActions = () => {
  //  const dispatch = useAppDispatch();

  // const handleDelete = async () => {
  //   if (selectedEventId) {
  //     await dispatch(deleteEvent(selectedEventId));
  //   }
  // };
  return (
    <div className="flex gap-2 mt-4 px-4">
      <Button className="px-10 rounded-[5rem]">
        <Plus />
        REPLENISH
      </Button>
      <Button className="px-10 rounded-[5rem]">
        <Trash2 />
        DELETE SCHEDULE
      </Button>
      <Button className="px-10 rounded-[5rem]">
        <FolderInput /> EXPORT & DOWNLOAD
      </Button>
      <Button className="px-10 rounded-[5rem]">
        {' '}
        <Printer />
        PRINT
      </Button>
    </div>
  );
};

export default CalendarActions;
